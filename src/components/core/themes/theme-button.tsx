'use client';

import { Palette } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

export default function ThemeButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant='ghost'
          size='icon'
          className='hover:bg-accent focus-visible:ring-ring h-9 w-9 rounded-full transition-all duration-200 focus-visible:ring-2'
        >
          <Link href='/theme' aria-label='Theme selector'>
            <Palette className='h-[1.2rem] w-[1.2rem]' />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Theme selector</p>
      </TooltipContent>
    </Tooltip>
  );
}
