'use-client';

import { UploadDropzone } from '@/lib/upload-thing';
import '@uploadthing/react/styles.css';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: 'messageFile' | 'serverImage';
}
export const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const fileType = value?.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20">
        <Skeleton className="relative h-20 w-20 rounded-full" />
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange('')}
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      appearance={{
        button: 'rounded-r-none',
        container: 'dark:bg-[#2B2D31]',
        allowedContent: 'h-8 items-center justify-center px-2 dark:text-white',
      }}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
