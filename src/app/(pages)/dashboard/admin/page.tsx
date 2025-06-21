import { SignedIn } from '@daveyplate/better-auth-ui';
import { AlertCircleIcon } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  DeleteUserButton,
  PlaceholderDeleteUserButton
} from '@/components/core/admin/delete-user-button';
import { UserRoleSelect } from '@/components/core/admin/user-role-select';
import { ReturnButton } from '@/components/core/shared/return-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getUser } from '@/data/session';
import { auth } from '@/lib/auth';
import { type userRoles } from '@/schemas/db.schema';

type UserRole = (typeof userRoles.enumValues)[number];

export default async function ThemePage() {
  const user = await getUser();

  if (!user) return redirect('/dashboard');

  if (user.role !== 'admin') {
    return (
      <div className='container mx-auto max-w-screen-lg space-y-8 px-8 py-16'>
        <div className='space-y-4'>
          <ReturnButton href='/dashboard' label='Back to Dashboard' />

          <h1 className='text-3xl font-bold'>Admin Dashboard</h1>

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

  const sortedUsers = users.sort((a, b) => {
    if (a.role === 'admin' && b.role !== 'admin') return -1;
    if (a.role !== 'admin' && b.role === 'admin') return 1;
    return 0;
  });

  return (
    <>
      <SignedIn>
        <div className='container mx-auto max-w-screen-lg space-y-8 px-8 py-16'>
          <div className='space-y-4'>
            <ReturnButton href='/dashboard' label='Back to Dashboard' />

            <h1 className='text-3xl font-bold'>Admin Dashboard</h1>

            <Alert
              variant='default'
              className='mb-4 rounded-md border-green-200'
            >
              <AlertCircleIcon />
              <AlertTitle>Access Granted</AlertTitle>
              <AlertDescription>
                You have access to the admin area.
              </AlertDescription>
            </Alert>

            <div className='w-full overflow-x-auto'>
              <table className='min-w-full table-auto whitespace-nowrap'>
                <thead>
                  <tr className='border-b text-left text-sm'>
                    <th className='px-4 py-2'>ID</th>
                    <th className='px-4 py-2'>Name</th>
                    <th className='px-4 py-2'>Email</th>
                    <th className='px-4 py-2 text-center'>Role</th>
                    <th className='px-4 py-2 text-center'>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedUsers.map(user => (
                    <tr key={user.id} className='border-b text-left text-sm'>
                      <td className='px-4 py-2'>{user.id.slice(0, 8)}</td>
                      <td className='px-4 py-2'>{user.name}</td>
                      <td className='px-4 py-2'>{user.email}</td>
                      <td className='px-4 py-2 text-center'>
                        <UserRoleSelect
                          userId={user.id}
                          role={user.role as UserRole}
                        />
                      </td>
                      <td className='px-4 py-2 text-center'>
                        {user.role === 'user' ? (
                          <DeleteUserButton userId={user.id} />
                        ) : (
                          <PlaceholderDeleteUserButton />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
