'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  XIcon
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { useThemeConfig } from '@/components/core/themes/active-theme';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { useMobile } from '@/hooks/use-mobile.hook';
import { baseThemes } from '@/lib/themes';
import { cn } from '@/lib/utils';

interface ThemeSelectorProps {
  isModal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideCloseButton?: boolean;
}

const THEMES_PER_PAGE_MOBILE = 4;
const THEMES_PER_PAGE_DESKTOP = 6;

function ThemeSelectorContent({
  isModal = false,
  hideCloseButton = false
}: {
  isModal?: boolean;
  hideCloseButton?: boolean;
}) {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  const [mounted, setMounted] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const { setTheme, resolvedTheme: theme } = useTheme();
  const isMobile = useMobile();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const themesPerPage = isMobile
    ? THEMES_PER_PAGE_MOBILE
    : THEMES_PER_PAGE_DESKTOP;
  const totalPages = Math.ceil(baseThemes.length / themesPerPage);
  const startIndex = currentPage * themesPerPage;
  const endIndex = startIndex + themesPerPage;
  const currentThemes = baseThemes.slice(startIndex, endIndex);

  const modeOptions = [
    { value: 'light', label: 'Light', icon: SunIcon },
    { value: 'dark', label: 'Dark', icon: MoonIcon },
    { value: 'system', label: 'System', icon: MonitorIcon }
  ];

  return (
    <div className='flex h-full w-full flex-col'>
      {!isModal && (
        <div className='flex items-start justify-between border-b pb-4'>
          <div className='space-y-1'>
            <div
              className={`font-semibold tracking-tight ${isMobile ? 'text-xl' : 'text-lg'}`}
            >
              Customize
            </div>
            <div className='text-muted-foreground text-sm'>
              Choose your style and color preferences
            </div>
          </div>
          {!hideCloseButton && (
            <Button
              asChild
              variant='ghost'
              size='icon'
              className='hover:bg-muted rounded-[0.5rem] transition-colors'
              aria-label='Close theme selector'
            >
              <Link href='/'>
                <XIcon className='size-4' />
              </Link>
            </Button>
          )}
        </div>
      )}

      {/* Scrollable Content */}
      <div
        className={cn(
          'flex-1 overflow-y-auto',
          isModal ? 'space-y-6' : 'space-y-6 pt-6'
        )}
      >
        {/* Color Theme Selection */}
        <div className='space-y-4'>
          <Label className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>
            Color Theme
          </Label>
          {mounted ? (
            <>
              <div
                className={`grid gap-3 ${isMobile ? 'grid-cols-2' : isModal ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}
              >
                {currentThemes.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setActiveTheme(color.name)}
                    className={cn(
                      'hover:bg-accent/50 flex touch-manipulation items-center gap-4 rounded-xl border p-4 text-left transition-all active:scale-[0.98]',
                      isMobile
                        ? 'min-h-[72px] flex-col gap-3 text-center'
                        : 'min-h-[60px]',
                      activeTheme === color.name
                        ? 'border-primary bg-accent ring-primary/20 shadow-sm ring-2'
                        : 'border-border hover:border-border/80'
                    )}
                    aria-label={`Select ${color.label} theme`}
                  >
                    <span
                      className={cn(
                        'flex-shrink-0 rounded-full border-2 border-white shadow-md',
                        isMobile ? 'size-8' : 'size-6'
                      )}
                      style={{
                        backgroundColor:
                          color?.activeColor[
                            theme === 'dark' ? 'dark' : 'light'
                          ]
                      }}
                    />
                    <span
                      className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}
                    >
                      {color.label}
                    </span>
                    {activeTheme === color.name && (
                      <div
                        className={cn(
                          'bg-primary rounded-full',
                          isMobile ? 'mt-auto size-2' : 'ml-auto size-2'
                        )}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  className={cn(
                    'flex items-center justify-between pt-4',
                    isMobile && 'px-2'
                  )}
                >
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className={cn(
                      'touch-manipulation',
                      isMobile ? 'h-12 px-6' : 'h-10 px-4'
                    )}
                  >
                    <ChevronLeftIcon
                      className={cn('mr-1', isMobile ? 'size-5' : 'size-4')}
                    />
                    <span className='hidden sm:inline'>Previous</span>
                  </Button>

                  <div className='flex items-center gap-3'>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={cn(
                          'touch-manipulation rounded-full transition-all',
                          isMobile ? 'size-4' : 'size-3',
                          i === currentPage
                            ? 'bg-primary scale-125'
                            : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        )}
                        aria-label={`Go to page ${i + 1}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
                    }
                    disabled={currentPage === totalPages - 1}
                    className={cn(
                      'touch-manipulation',
                      isMobile ? 'h-12 px-6' : 'h-10 px-4'
                    )}
                  >
                    <span className='hidden sm:inline'>Next</span>
                    <ChevronRightIcon
                      className={cn('ml-1', isMobile ? 'size-5' : 'size-4')}
                    />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div
              className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}
            >
              {Array.from({ length: themesPerPage }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={cn(
                    'w-full rounded-xl',
                    isMobile ? 'h-[72px]' : 'h-[60px]'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mode Selection */}
        <div className='space-y-4'>
          <Label className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>
            Appearance Mode
          </Label>
          {mounted ? (
            <div className='grid grid-cols-3 gap-3'>
              {modeOptions.map(mode => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.value}
                    onClick={() => setTheme(mode.value)}
                    className={cn(
                      'hover:bg-accent/50 flex touch-manipulation items-center gap-3 rounded-xl border p-4 transition-all active:scale-[0.98]',
                      isMobile
                        ? 'min-h-[80px] flex-col gap-2'
                        : 'min-h-[60px] sm:flex-col sm:gap-3',
                      theme === mode.value
                        ? 'border-primary bg-accent ring-primary/20 shadow-sm ring-2'
                        : 'border-border hover:border-border/80'
                    )}
                    aria-label={`Select ${mode.label} mode`}
                  >
                    <Icon
                      className={cn(
                        'flex-shrink-0',
                        isMobile ? 'size-6' : 'size-6 sm:size-5'
                      )}
                    />
                    <span
                      className={cn(
                        'font-medium',
                        isMobile ? 'text-sm' : 'text-base sm:text-sm'
                      )}
                    >
                      {mode.label}
                    </span>
                    {theme === mode.value && (
                      <div
                        className={cn(
                          'bg-primary rounded-full',
                          isMobile ? 'mt-auto size-2' : 'ml-auto size-2 sm:ml-0'
                        )}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className='grid grid-cols-3 gap-3'>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={cn(
                    'w-full rounded-xl',
                    isMobile ? 'h-[80px]' : 'h-[60px]'
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ThemeSelector({
  isModal = false,
  open,
  onOpenChange,
  hideCloseButton = false
}: ThemeSelectorProps = {}) {
  const isMobile = useMobile();

  if (isModal) {
    if (isMobile) {
      return (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent
            side='bottom'
            className='h-[90vh] rounded-t-3xl border-t-0 p-0 [&>button]:hidden'
          >
            <VisuallyHidden>
              <SheetTitle>Theme Settings</SheetTitle>
            </VisuallyHidden>
            <div className='flex h-full flex-col'>
              {/* Handle bar */}
              <div className='flex justify-center py-3'>
                <div className='bg-muted-foreground/30 h-1 w-12 rounded-full' />
              </div>

              {/* Header */}
              <div className='border-b px-6 pb-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='text-xl font-semibold'>Theme Settings</h2>
                    <p className='text-muted-foreground text-sm'>
                      Customize your appearance
                    </p>
                  </div>
                  {!hideCloseButton && (
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => onOpenChange?.(false)}
                      className='h-9 w-9'
                    >
                      <XIcon className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              </div>

              {/* Content - Full height with proper scroll */}
              <div className='min-h-0 flex-1 px-6 py-6'>
                <ThemeSelectorContent
                  isModal={true}
                  hideCloseButton={hideCloseButton}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='flex max-h-[90vh] w-full max-w-[420px] flex-col p-0'>
          <DialogHeader className='border-b px-6 pt-6 pb-4'>
            <DialogTitle>Theme Settings</DialogTitle>
          </DialogHeader>
          <div className='px-6 py-6'>
            <ThemeSelectorContent
              isModal={true}
              hideCloseButton={hideCloseButton}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className='h-full p-6'>
      <ThemeSelectorContent isModal={false} hideCloseButton={hideCloseButton} />
    </div>
  );
}
