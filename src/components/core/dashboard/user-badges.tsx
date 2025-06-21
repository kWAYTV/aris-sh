import { Shield } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { type User } from '@/lib/auth';

interface UserBadgesProps {
  user: User;
  variant?: 'header' | 'status';
}

export function UserBadges({ user, variant = 'header' }: UserBadgesProps) {
  if (variant === 'header') {
    return (
      <>
        {user.role === 'admin' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant='secondary' className='cursor-help gap-1'>
                <Shield className='size-3' />
                Admin
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Administrator privileges - can access admin dashboard</p>
            </TooltipContent>
          </Tooltip>
        )}
      </>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      {user.banned ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant='destructive' className='cursor-help'>
              Banned
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Account is temporarily suspended</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant='outline' className='cursor-help text-green-600'>
              Active
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Account is active and in good standing</p>
          </TooltipContent>
        </Tooltip>
      )}
      {user.emailVerified && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant='outline' className='cursor-help text-blue-600'>
              Verified
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Email address has been verified</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
