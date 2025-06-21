import type { VariantProps } from 'class-variance-authority';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { type buttonVariants } from '@/components/ui/button';

interface GoButtonProps {
  href: string;
  label: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
}

export const GoButton = ({ href, label, variant = 'link' }: GoButtonProps) => {
  return (
    <Button size='sm' variant={variant} asChild>
      <Link href={href} className='group'>
        <span>{label}</span>
        <ArrowRightIcon className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5' />
      </Link>
    </Button>
  );
};
