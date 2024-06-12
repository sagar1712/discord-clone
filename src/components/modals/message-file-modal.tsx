'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FileUpload } from '../file-uploads';
import { Button } from '../ui/button';

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: 'Attachment is required.',
  }),
});

const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const { apiUrl, query } = data;

  const router = useRouter();

  const isModalOpen = isOpen && type === 'messageFile';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: '',
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      });
      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      });
      router.refresh();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black dark:bg-[#313338] dark:text-slate-200">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-xxl text-left font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-left text-gray-300/40">
            Send a file as a message
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-center text-center">
              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="messageFile"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <DialogFooter className="flex flex-row gap-x-2 bg-[#1e1f22]/50 px-5 py-4">
                <Button
                  disabled={isLoading}
                  className="w-32 bg-[#5865F2]/80 text-white hover:bg-[#5865F2]"
                >
                  {isLoading ? <Loader2 className=" animate-spin" /> : 'Send'}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
