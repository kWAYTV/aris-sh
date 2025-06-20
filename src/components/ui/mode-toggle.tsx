'use client';

import * as React from 'react';
import { Loader2, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

export function ModeToggle() {
  const { setTheme, theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant='ghost'
        size='icon'
        disabled
        className='h-9 w-9 rounded-full'
      >
        <Loader2 className='h-[1.2rem] w-[1.2rem] animate-spin' />
        <span className='sr-only'>Loading theme</span>
      </Button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
          variant='ghost'
          size='icon'
          className='hover:bg-accent focus-visible:ring-ring relative h-9 w-9 overflow-hidden rounded-full transition-all duration-200 focus-visible:ring-2'
          aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
        >
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out ${
              currentTheme === 'dark'
                ? 'scale-0 -rotate-90'
                : 'scale-100 rotate-0'
            }`}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out ${
              currentTheme === 'dark'
                ? 'scale-100 rotate-0'
                : 'scale-0 rotate-90'
            }`}
          />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Switch to {currentTheme === 'light' ? 'dark' : 'light'} mode</p>
      </TooltipContent>
    </Tooltip>
  );
}
