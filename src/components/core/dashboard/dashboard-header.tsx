import { GoButton } from '@/components/core/shared/go-button';
import { type User } from '@/lib/auth';

interface DashboardHeaderProps {
  user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p className='text-muted-foreground text-sm'>
          Welcome back, {user.name}
        </p>
      </div>
      {user.role === 'admin' && (
        <GoButton href='/dashboard/admin' label='Admin Dashboard' />
      )}
    </div>
  );
}
