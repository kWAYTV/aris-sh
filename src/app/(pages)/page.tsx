import { RedirectToSignIn, SignedIn } from '@daveyplate/better-auth-ui';
import { type Metadata } from 'next';
import { Suspense } from 'react';

import { Assistant } from '@/components/assistant/assistant';
import { AssistantSkeleton } from '@/components/core/skeletons/assistant-skeleton';

export default function Home() {
  return (
    <>
      <RedirectToSignIn />

      <SignedIn>
        <Suspense fallback={<AssistantSkeleton />}>
          <Assistant />
        </Suspense>
      </SignedIn>
    </>
  );
}

export const metadata: Metadata = {
  title: 'aris.sh | home',
  description: 'creative studio brain.'
};
