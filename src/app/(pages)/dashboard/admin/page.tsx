import { SignedIn } from '@daveyplate/better-auth-ui';
import { AlertCircleIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

import { ReturnButton } from '@/components/core/shared/return-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getUser } from '@/data/session';

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

  return (
    <>
      <SignedIn>
        <div className='container mx-auto max-w-screen-lg space-y-8 px-8 py-16'>
          <div className='space-y-4'>
            <ReturnButton href='/dashboard' label='Back to Dashboard' />

            <h1 className='text-3xl font-bold'>Admin Dashboard</h1>

            {/* Admin content goes here */}
          </div>
        </div>
      </SignedIn>
    </>
  );
}
