import { SignedIn } from '@daveyplate/better-auth-ui';
import { AlertCircleIcon } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { AdminDashboardClient } from '@/components/core/admin/users-table/admin-dashboard-client';
import { ReturnButton } from '@/components/core/shared/return-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getUser } from '@/data/session';
import { type User } from '@/lib/auth';
import { auth } from '@/lib/auth';

export default async function AdminUsersPage() {
  const user = await getUser();

  if (!user) return redirect('/dashboard');

  if (user.role !== 'admin') {
    return (
      <div className='container mx-auto max-w-screen-lg space-y-8 px-8 py-16'>
        <div className='space-y-4'>
          <ReturnButton
            href='/dashboard/admin'
            label='Back to Admin Dashboard'
          />

          <h1 className='text-3xl font-bold'>User Management</h1>

          <Alert variant='destructive'>
            <AlertCircleIcon />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don&apos;t have permission to access this admin area.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const { users } = await auth.api.listUsers({
    headers: await headers(),
    query: {
      sortBy: 'name'
    }
  });

  // Transform the data to match our User type
  const transformedUsers: User[] = users.map(
    u =>
      ({
        ...u,
        createdAt: new Date(u.createdAt),
        updatedAt: new Date(u.updatedAt),
        banExpires: u.banExpires ? new Date(u.banExpires) : undefined
      }) as User
  );

  // Sort users (admins first)
  const sortedUsers = transformedUsers.sort((a, b) => {
    if (a.role === 'admin' && b.role !== 'admin') return -1;
    if (a.role !== 'admin' && b.role === 'admin') return 1;
    return 0;
  });

  return (
    <>
      <SignedIn>
        <div className='container mx-auto max-w-screen-xl space-y-8 px-8 py-16'>
          <div className='space-y-6'>
            <ReturnButton
              href='/dashboard/admin'
              label='Back to Admin Dashboard'
            />

            <div className='space-y-2'>
              <h1 className='text-3xl font-bold'>User Management</h1>
              <p className='text-muted-foreground'>
                Manage user accounts, roles, and permissions
              </p>
            </div>

            <AdminDashboardClient users={sortedUsers} />
          </div>
        </div>
      </SignedIn>
    </>
  );
}
