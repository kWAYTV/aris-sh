import { Star } from 'lucide-react';

interface StarDisplayProps {
  count: number;
  className?: string;
}

export function StarDisplay({ count, className }: StarDisplayProps) {
  return (
    <div
      className={`text-muted-foreground flex items-center gap-2 text-sm ${className}`}
    >
      <span className='font-medium'>{count.toLocaleString()}</span>
      <Star className='h-4 w-4 fill-current' />
    </div>
  );
}
