'use client';

import { Suspense } from 'react';

import { GoButton } from '@/components/core/shared/go-button';
import { JsonViewer } from '@/components/core/shared/json-viewer';
import { DashboardSkeleton } from '@/components/core/skeletons/dashboard-skeleton';
import { type User } from '@/lib/auth';

interface DashboardClientProps {
  user: User;
}

export function DashboardClient({ user }: DashboardClientProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <div className='flex h-full items-center justify-center p-6'>
        <div className='w-full max-w-[480px] space-y-4'>
          <div className='flex items-center justify-between'>
            <h1>Dashboard</h1>
            {user.role === 'admin' && (
              <GoButton href='/dashboard/admin' label='Admin Dashboard' />
            )}
          </div>
          <JsonViewer data={user} className='overflow-x-auto text-sm' />
        </div>
      </div>
    </Suspense>
  );
}
