import { Github } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export function GitHubButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='hover:bg-accent focus-visible:ring-ring relative h-9 w-9 overflow-hidden rounded-full transition-all duration-200 focus-visible:ring-2'
            asChild
          >
            <Link
              href='https://github.com/kWAYTV/aris-sh'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Github className='h-[1.2rem] w-[1.2rem]' />
              <span className='sr-only'>View GitHub Repository</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View GitHub Repository</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
