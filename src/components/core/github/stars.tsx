'use client';

import { Star } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

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
  html_url: string;
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);
  const [state, setState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchStars = useCallback(async () => {
    const cached = localStorage.getItem('github-stars');
    const cacheTime = localStorage.getItem('github-stars-time');

    if (cached && cacheTime) {
      const timeDiff = Date.now() - parseInt(cacheTime);
      // Cache for 5 minutes
      if (timeDiff < 5 * 60 * 1000) {
        setStars(parseInt(cached));
        setState('success');
        return;
      }
    }

    setState('loading');
    setError(null);

    try {
      const response = await fetch(
        'https://api.github.com/repos/kWAYTV/aris-sh'
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data: GitHubRepo = await response.json();
      const starCount = data.stargazers_count;

      setStars(starCount);
      setState('success');

      // Cache the result
      localStorage.setItem('github-stars', starCount.toString());
      localStorage.setItem('github-stars-time', Date.now().toString());
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to fetch stars';
      setError(errorMsg);
      setState('error');
    }
  }, []);

  useEffect(() => {
    fetchStars();
  }, [fetchStars]);

  const formatStars = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const handleRetry = () => {
    // Clear cache on retry
    localStorage.removeItem('github-stars');
    localStorage.removeItem('github-stars-time');
    fetchStars();
  };

  if (state === 'loading' || state === 'idle') {
    return (
      <div className='flex items-center gap-2'>
        <Skeleton className='h-4 w-4 rounded' />
        <Skeleton className='h-4 w-8' />
      </div>
    );
  }

  if (state === 'error') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleRetry}
              className='text-muted-foreground hover:text-foreground h-auto p-1'
              aria-label='Retry fetching GitHub stars'
            >
              <Star className='h-4 w-4' />
              <span className='text-sm'>?</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Failed to load stars. Click to retry.</p>
            {error && <p className='text-muted-foreground text-xs'>{error}</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (stars === null) return null;

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
