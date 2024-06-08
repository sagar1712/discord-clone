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
import { useParams, useRouter } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';
import { Button } from '../ui/button';

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const params = useParams();

  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === 'deleteServer';

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/servers/${params?.serverId}`,
      });
      await axios.delete(url);
      router.refresh();
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
            Delete &apos;{server?.name}&apos;
          </DialogTitle>
          <article className="px-6 text-start text-[#D2D5D8]">
            Are you sure you really want to delete
            <span className="font-semibold"> {data.server?.name}</span> server?
            Once deleted, it can not be restored.
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

export default DeleteServerModal;
