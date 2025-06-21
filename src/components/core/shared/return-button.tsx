import type { VariantProps } from 'class-variance-authority';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { type buttonVariants } from '@/components/ui/button';

interface ReturnButtonProps {
  href: string;
  label: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
}

export const ReturnButton = ({
  href,
  label,
  variant = 'link'
}: ReturnButtonProps) => {
  return (
    <Button size='sm' variant={variant} asChild>
      <Link href={href} className='group'>
        <ArrowLeftIcon className='transition-transform group-hover:-translate-x-0.5' />
        <span>{label}</span>
      </Link>
    </Button>
  );
};
