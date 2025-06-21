'use client';

import { DashboardHeader } from '@/components/core/dashboard/dashboard-header';
import { JsonDebug } from '@/components/core/dashboard/json-debug';
import { ProfileCard } from '@/components/core/dashboard/profile-card';
import { type User } from '@/lib/auth';

interface DashboardClientProps {
  user: User;
}

export function DashboardClient({ user }: DashboardClientProps) {
  return (
    <div className='flex h-full items-center justify-center p-6'>
      <div className='w-full max-w-2xl space-y-6'>
        <DashboardHeader user={user} />
        <ProfileCard user={user} />
        <JsonDebug user={user} />
      </div>
    </div>
  );
}
