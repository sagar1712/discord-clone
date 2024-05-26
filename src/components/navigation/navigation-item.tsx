'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ActionTooltip } from '../action-tooltip';

interface NavigationItemsProps {
  id: string;
  name: string;
  imageUrl: string;
}

const NavigationItem = ({ id, name, imageUrl }: NavigationItemsProps) => {
  const params = useParams();
  const router = useRouter();
  const onClick = () => {
    router.push(`/servers/${id}`);
  };
  return (
    <ActionTooltip side="right" label={name} align="center">
      <button className="group relative flex items-center" onClick={onClick}>
        <div
          className={cn(
            'absolute left-0 w-[4px] rounded-r-full bg-primary transition-all',
            params?.serverId !== id && 'group-hover:h-[20px]',
            params?.serverId === id ? 'h-[36px]' : 'h-[8px]',
          )}
        />
        <div
          className={cn(
            'group relative mx-3 flex h-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]',
            params?.serverId === id &&
              'rounded-[16px] bg-primary/10 text-primary ',
          )}
        >
          <Image src={imageUrl} alt="channel" height={48} width={48} />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
