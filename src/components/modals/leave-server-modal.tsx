'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Separator } from '../ui/separator';

const LeaveServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === 'leaveServer';

  const handleLeave = async () => {
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
      <DialogContent className="gap-y-2 overflow-hidden text-black dark:bg-[#313338] dark:text-zinc-300">
        <DialogHeader className="">
          <DialogTitle className="text-left text-3xl font-bold">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-left text-lg text-zinc-500 dark:text-zinc-500">
            Are you sure you want to leave server? You would not be able to
            rejoin unless invited.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="mr-2 flex flex-row justify-end gap-x-2">
          <Button variant="outline" className="w-24 p-5" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="w-24 p-5"
            onClick={handleLeave}
          >
            {' '}
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Leave'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
