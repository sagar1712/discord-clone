'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FileUpload } from '../file-uploads';
import { Button } from '../ui/button';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server image is required',
  }),
  imageUrl: z.string().min(1, {
    message: 'server image is required.',
  }),
});

const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'createServer';
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/servers', values);
      form.reset();
      router.refresh();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden p-0 text-black dark:bg-[#313338] dark:text-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 dark:text-white">
            Give your server a personality with a name and an image. You can
            always change it later
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-center text-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="m-6">
                  <FormLabel className="text-sm font-bold uppercase text-zinc-500 dark:text-white">
                    Server Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#1E1F22] dark:text-white"
                      placeholder="Enter server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <DialogFooter className="bg-gray-100 px-6 py-4 dark:bg-[#2B2D31]">
                <Button variant="primary" disabled={isLoading}>
                  Create
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
