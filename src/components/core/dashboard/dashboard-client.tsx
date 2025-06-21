'use client';

import { type User } from '@/lib/auth';

import { DashboardHeader } from './dashboard-header';
import { ProfileCard } from './profile-card';

interface DashboardClientProps {
  user: User;
}

export function DashboardClient({ user }: DashboardClientProps) {
  return (
    <div className='flex h-full items-center justify-center p-6'>
      <div className='w-full max-w-2xl space-y-6'>
        <DashboardHeader user={user} />
        <ProfileCard user={user} />
      </div>
    </div>
  );
}
