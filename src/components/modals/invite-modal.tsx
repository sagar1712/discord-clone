'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { useOrigin } from '@/hooks/use-origin';
import axios from 'axios';
import { Check, Copy, Hash, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const InviteModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === 'invite';
  const { server } = data;

  const [copied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const onNewPass = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      );

      onOpen('invite', { server: response.data });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 dark:bg-[#313338] dark:text-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-left text-xl font-bold">
            Invite friends to {server?.name}
            <p className="mt-2 flex flex-row gap-x-1">
              <Hash className="h-4 w-4 text-gray-500 dark:text-gray-300/70" />
              <span className="text-sm font-medium text-gray-500 dark:text-gray-300/40">
                general
              </span>
            </p>
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs font-bold uppercase dark:text-white ">
            Server invite link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              disabled={isLoading}
              className="border-0 bg-[#1e1f22] text-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#1e1f22] dark:text-zinc-300 "
              value={inviteUrl}
            />
            <Button disabled={isLoading} onClick={onCopy} size="icon">
              {copied ? (
                <Check className="text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            onClick={onNewPass}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="mt-2 text-xs text-zinc-500 dark:text-zinc-400"
          >
            Generate a new link
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
