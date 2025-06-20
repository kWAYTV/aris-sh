'use client';

import { Star } from 'lucide-react';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface GitHubRepo {
  stargazers_count: number;
}

async function fetchGitHubStars(): Promise<number> {
  'use cache';

  const response = await fetch('https://api.github.com/repos/kWAYTV/aris-sh');

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data: GitHubRepo = await response.json();
  return data.stargazers_count;
}

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

async function GitHubStarsContent() {
  const stars = await fetchGitHubStars();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            asChild
            className='text-muted-foreground hover:text-foreground h-auto p-1 transition-colors'
          >
            <a
              href='https://github.com/kWAYTV/aris-sh'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1.5'
              aria-label={`${stars} GitHub stars`}
            >
              <Star className='h-4 w-4 fill-current' />
              <span className='text-sm font-medium'>{formatStars(stars)}</span>
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Star us on GitHub ({stars.toLocaleString()} stars)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function GitHubStarsLoading() {
  return (
    <div className='flex items-center gap-2'>
      <Skeleton className='h-4 w-4 rounded' />
      <Skeleton className='h-4 w-8' />
    </div>
  );
}

export function GitHubStars() {
  return (
    <Suspense fallback={<GitHubStarsLoading />}>
      <GitHubStarsContent />
    </Suspense>
  );
}
