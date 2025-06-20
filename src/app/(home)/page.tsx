import { RedirectToSignIn, SignedIn } from '@daveyplate/better-auth-ui';
import { type Metadata } from 'next';

import { Assistant } from '@/components/assistant/assistant';

export default function Home() {
  return (
    <>
      <RedirectToSignIn />

      <SignedIn>
        <Assistant />
      </SignedIn>
    </>
  );
}

export const metadata: Metadata = {
  title: 'aris.sh | home',
  description: 'creative studio brain.'
};
