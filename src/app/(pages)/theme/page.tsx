import { ThemeSelector } from '@/components/core/themes/theme-selector';

export default function ThemePage() {
  return (
    <div className='flex h-full items-center justify-center p-6'>
      <div className='w-full max-w-[480px]'>
        <ThemeSelector />
      </div>
    </div>
  );
}
