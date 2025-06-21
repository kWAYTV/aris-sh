import { RedirectToSignIn, SignedIn } from '@daveyplate/better-auth-ui';
import { type Metadata } from 'next';

import Navbar from '@/components/core/layout/nav';

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RedirectToSignIn />

      <SignedIn>
        <Navbar />
        {children}
      </SignedIn>
    </>
  );
}

export const metadata: Metadata = {
  title: 'aris.sh | admin',
  description: 'creative brain studio.'
};
