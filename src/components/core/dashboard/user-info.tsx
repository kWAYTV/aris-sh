import { CheckCircle, User as UserIcon } from 'lucide-react';
import { Spoiler } from 'spoiled';

import { CardDescription } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { type User } from '@/lib/auth';

interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <div className='flex-1 space-y-2'>
      <CardDescription className='flex items-center gap-2'>
        <Spoiler revealOn='hover' theme='system'>
          {user.email}
        </Spoiler>
        {user.emailVerified && (
          <Tooltip>
            <TooltipTrigger asChild>
              <CheckCircle className='size-4 cursor-help text-green-500' />
            </TooltipTrigger>
            <TooltipContent>
              <p>Email address verified</p>
            </TooltipContent>
          </Tooltip>
        )}
      </CardDescription>
      <div className='text-muted-foreground flex items-center gap-2 text-sm'>
        <UserIcon className='size-4' />
        <Tooltip>
          <TooltipTrigger asChild>
            <span className='cursor-help'>
              @{user.displayUsername || user.username}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Your unique username handle</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
