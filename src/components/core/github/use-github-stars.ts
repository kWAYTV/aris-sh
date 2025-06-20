import { useEffect, useState } from 'react';

interface UseGitHubStarsProps {
  owner: string;
  repo: string;
}

interface UseGitHubStarsReturn {
  stars: number | null;
  loading: boolean;
  error: boolean;
}

export function useGitHubStars({
  owner,
  repo
}: UseGitHubStarsProps): UseGitHubStarsReturn {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );
        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (err) {
        console.error('Failed to fetch GitHub stars:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStars();
  }, [owner, repo]);

  return { stars, loading, error };
}
