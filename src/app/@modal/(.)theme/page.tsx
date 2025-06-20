'use client';

import { useRouter } from 'next/navigation';

import { ThemeSelector } from '@/components/core/themes/theme-selector';

export default function ThemeModal() {
  const router = useRouter();

  return (
    <ThemeSelector
      isModal={true}
      open={true}
      onOpenChange={() => router.back()}
    />
  );
}
