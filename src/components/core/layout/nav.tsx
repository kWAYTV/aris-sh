'use client';

import { UserButton } from '@daveyplate/better-auth-ui';
import { Brain } from 'lucide-react';
import Link from 'next/link';

import { ModeToggle } from '@/components/ui/mode-toggle';
import { cn } from '@/lib/utils';

export default function Navbar() {
  return (
    <div className='sticky top-0 right-0 left-0 z-50 mb-2 p-4'>
      <nav
        className={cn(
          'bg-background/95 mx-auto max-w-7xl rounded-xl border shadow-lg',
          'p-2 transition-all duration-700'
        )}
      >
        <div className='flex h-14 items-center justify-between px-4'>
          <div className='touch-manipulation'>
            <Link
              href='/'
              className='group flex min-h-[44px] min-w-[44px] cursor-pointer touch-manipulation items-center gap-3 transition-all duration-200 hover:opacity-80'
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Brain className='h-6 w-6 transition-transform duration-200 group-hover:scale-110' />
              <span className='font-mono text-xl font-bold'>aris.sh</span>
            </Link>
          </div>

          <div
            className='flex touch-manipulation items-center gap-3'
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div
              className='relative touch-manipulation'
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <ModeToggle />
            </div>
            <div
              className='relative touch-manipulation'
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <UserButton size='icon' />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
