import { RedirectToSignIn, SignedIn } from '@daveyplate/better-auth-ui';

import { JsonViewer } from '@/components/core/shared/json-viewer';
import { getUser } from '@/data/session';

export default async function ThemePage() {
  const user = await getUser();

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <>
      <SignedIn>
        <div className='flex h-full items-center justify-center p-6'>
          <div className='w-full max-w-[480px] space-y-4'>
            <h1>Dashboard</h1>
            <JsonViewer data={user} className='overflow-x-auto text-sm' />
          </div>
        </div>
      </SignedIn>
    </>
  );
}
