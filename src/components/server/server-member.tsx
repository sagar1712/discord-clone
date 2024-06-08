'use client';
import { cn } from '@/lib/utils';
import { Member, MemberRole, Profile, Server } from '@prisma/client';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useParams } from 'next/navigation';
import { UserAvatar } from '../user-avatar';

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const icon = roleIconMap[member?.role];

  return (
    <button
      className={cn(
        'group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/20',
        params?.memberId == member?.id && 'bg-zinc-700/20 dark:bg-zinc-700',
      )}
    >
      <UserAvatar
        src={member?.profile?.imageUrl}
        className="h-5 w-5 md:h-5 md:w-5"
      />
      <p
        className={cn(
          'dark:text=zinc-500 line-clamp-1 text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:group-hover:text-zinc-300',
          params?.channelId === member?.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white',
        )}
      >
        {member?.profile?.name}
      </p>
      {icon}
    </button>
  );
};

export default ServerMember;
