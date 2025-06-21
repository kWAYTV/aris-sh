import { ProfileAvatar } from '@/components/core/dashboard/profile-avatar';
import { UserBadges } from '@/components/core/dashboard/user-badges';
import { UserDetails } from '@/components/core/dashboard/user-details';
import { UserInfo } from '@/components/core/dashboard/user-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { type User } from '@/lib/auth';

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-start gap-4'>
          <ProfileAvatar user={user} />
          <div className='flex-1 space-y-2'>
            <div className='flex items-center gap-2'>
              <CardTitle className='text-xl'>{user.name}</CardTitle>
              <UserBadges user={user} variant='header' />
            </div>
            <UserInfo user={user} />
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        <Separator />
        <UserDetails user={user} />
      </CardContent>
    </Card>
  );
}
