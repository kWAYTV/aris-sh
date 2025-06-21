import { type User } from '@/lib/auth';

import { UserBadges } from './user-badges';

interface UserDetailsProps {
  user: User;
}

export function UserDetails({ user }: UserDetailsProps) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      <div className='space-y-1'>
        <p className='text-sm font-medium'>Member Since</p>
        <p className='text-muted-foreground text-sm'>
          {formatDate(user.createdAt)}
        </p>
      </div>

      <div className='space-y-1'>
        <p className='text-sm font-medium'>Account Status</p>
        <UserBadges user={user} variant='status' />
      </div>
    </div>
  );
}
