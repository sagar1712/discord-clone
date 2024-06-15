'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import qs from 'query-string';
import { useState } from 'react';
import { Button } from '../ui/button';

const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === 'deleteMessage';

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      });
      await axios.delete(url);
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black dark:bg-[#313338] dark:text-slate-200">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-left text-xl font-bold text-muted-foreground dark:text-zinc-300">
            Delete Message
          </DialogTitle>
          <article className="text-start text-[#D2D5D8]">
            Are you sure you really want to delete this? <br />
            The message will be permanently deleted.
          </article>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-start gap-x-2 p-3 dark:bg-[#23262c]">
          <Button variant="outline" className="w-24" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" className="w-24" onClick={handleDelete}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMessageModal;
