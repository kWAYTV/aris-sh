'use client';

import { Suspense } from 'react';

import { StarDisplay } from './star-display';
import { StarSkeleton } from './star-skeleton';
import { useGitHubStars } from './use-github-stars';

interface GitHubStarsProps {
  owner?: string;
  repo?: string;
  className?: string;
}

function GitHubStarsContent({
  owner = 'kWAYTV',
  repo = 'aris-sh',
  className
}: GitHubStarsProps) {
  const { stars, loading, error } = useGitHubStars({ owner, repo });

  if (error) return null;
  if (loading || stars === null) return <StarSkeleton className={className} />;

  return <StarDisplay count={stars} className={className} />;
}

export function GitHubStars({ owner, repo, className }: GitHubStarsProps) {
  return (
    <Suspense fallback={<StarSkeleton className={className} />}>
      <GitHubStarsContent owner={owner} repo={repo} className={className} />
    </Suspense>
  );
}
