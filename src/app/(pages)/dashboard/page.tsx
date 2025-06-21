import { SignedIn } from '@daveyplate/better-auth-ui';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { DashboardClient } from '@/components/core/dashboard/dashboard-client';
import { DashboardSkeleton } from '@/components/core/skeletons/dashboard-skeleton';
import { getUser } from '@/data/session';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) return redirect('/dashboard');

  return (
    <>
      <SignedIn>
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardClient user={user} />
        </Suspense>
      </SignedIn>
    </>
  );
}
