'use-client';

import { UploadDropzone } from '@/lib/upload-thing';
import '@uploadthing/react/styles.css';
import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: 'messageFile' | 'serverImage';
}
export const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const fileType = value.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <figure className="relative h-20 w-20">
        <Skeleton className="h-full w-full rounded-full" />
        <Image
          fill
          src={value}
          alt="Uploaded image"
          className="h-full w-full rounded-full shadow-lg"
        />
        <button
          onClick={() => onChange('')}
          className="absolute right-0 top-0 rounded-full border-red-700 bg-red-500 p-1 text-white shadow-lg"
        >
          <X className="h-4 w-4" />
        </button>
      </figure>
    );
  }

  if (value && fileType === 'pdf') {
    return (
      <div className="relative mt-2 flex items-center rounded-md bg-background/10 p-2">
        <FileIcon className="h-20 w-20 fill-indigo-200 stroke-indigo-400" />

        <button
          onClick={() => onChange('')}
          className="absolute -right-1 -top-2 rounded-full border-red-700 bg-red-500 p-1 text-white shadow-lg"
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
