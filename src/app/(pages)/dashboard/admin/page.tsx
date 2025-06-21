import { SignedIn } from '@daveyplate/better-auth-ui';
import { AlertCircleIcon, Users } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ReturnButton } from '@/components/core/shared/return-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { getUser } from '@/data/session';

export default async function AdminDashboardPage() {
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

  return (
    <>
      <SignedIn>
        <div className='container mx-auto max-w-screen-xl space-y-8 px-8 py-16'>
          <div className='space-y-6'>
            <ReturnButton href='/dashboard' label='Back to Dashboard' />

            <div className='space-y-2'>
              <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
              <p className='text-muted-foreground'>
                Manage your application and monitor system status
              </p>
            </div>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              <Link href='/dashboard/admin/users'>
                <Card className='hover:bg-muted/50 cursor-pointer transition-colors'>
                  <CardHeader>
                    <div className='flex items-center gap-2'>
                      <Users className='text-primary h-5 w-5' />
                      <CardTitle>User Management</CardTitle>
                    </div>
                    <CardDescription>
                      Manage user accounts, roles, and permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className='text-muted-foreground text-sm'>
                      View, edit, and manage all user accounts in the system
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
