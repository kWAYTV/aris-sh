import { RedirectToSignIn, SignedIn } from '@daveyplate/better-auth-ui';
import Link from 'next/link';

import { getUser } from '@/data/session';

export default async function ThemePage() {
  const user = await getUser();

  if (!user || user.role !== 'admin') {
    return <RedirectToSignIn />;
  }

  return (
    <>
      <RedirectToSignIn />

      <SignedIn>
        <div className='flex h-full items-center justify-center p-6'>
          <div className='w-full max-w-[480px]'>
            <h1>Admin</h1>
          </div>

          {user.role === 'admin' && (
            <div className='mt-4 text-center'>
              <Link
                href='/admin'
                className='text-muted-foreground hover:text-primary text-sm underline'
              >
                Admin
              </Link>
            </div>
          )}
        </div>
      </SignedIn>
    </>
  );
}
