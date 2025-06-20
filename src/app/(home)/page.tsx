import { RedirectToSignIn, SignedIn } from '@daveyplate/better-auth-ui';

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
