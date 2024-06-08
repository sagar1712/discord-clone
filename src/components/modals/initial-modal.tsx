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
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);
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
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  if (!isMounted) return null;

  return (
    <Dialog open>
      <DialogContent className="overflow-hidden bg-white p-0 text-black dark:bg-[#313338] dark:text-slate-200">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-xxl text-left font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-left text-gray-300/40">
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
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-gray-400/80">
                    Server Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-[#1e1f22] text-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <DialogFooter className="flex flex-row gap-x-2 bg-[#1e1f22]/50 px-5 py-4">
                <Button
                  disabled={isLoading}
                  className="w-32 bg-[#5865F2]/80 text-white hover:bg-[#5865F2]"
                >
                  {isLoading ? <Loader2 className=" animate-spin" /> : 'Create'}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
