import { SignedIn } from '@daveyplate/better-auth-ui';
import { redirect } from 'next/navigation';

import { GoButton } from '@/components/core/shared/go-button';
import { JsonViewer } from '@/components/core/shared/json-viewer';
import { getUser } from '@/data/session';

export default async function ThemePage() {
  const user = await getUser();

  if (!user) return redirect('/dashboard');

  return (
    <>
      <SignedIn>
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
      </SignedIn>
    </>
  );
}
