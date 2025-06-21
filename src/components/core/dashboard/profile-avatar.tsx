import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { type User } from '@/lib/auth';

interface ProfileAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

export function ProfileAvatar({ user, size = 'lg' }: ProfileAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: 'size-8',
    md: 'size-12',
    lg: 'size-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg'
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar className={`${sizeClasses[size]} cursor-help`}>
          <AvatarImage src={user.image || undefined} alt={user.name} />
          <AvatarFallback className={textSizeClasses[size]}>
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent>
        <p>Profile picture for {user.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
