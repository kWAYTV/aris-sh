import '@/app/globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Providers } from '@/components/core/providers/providers';
import { ThemeProvider } from '@/components/core/providers/theme-provider';
import { ActiveThemeProvider } from '@/components/core/themes/active-theme';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'aris.sh',
  description: 'creative studio brain.'
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ActiveThemeProvider>
            <Providers>
              {children}
              {modal}
            </Providers>
          </ActiveThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
