import React from 'react';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { NoiseTexture } from '@/components/ui/NoiseTexture';
import './globals.css';

export const metadata: Metadata = {
  title: 'Raj Kaushki | Human Resources Manager',
  description: 'Portfolio of Raj Kaushki, a Human Resources professional specializing in talent acquisition, team leadership, and HR operations in Noida, India.',
  openGraph: {
    title: 'Raj Kaushki | Human Resources Manager',
    description: 'Building teams that build companies.',
    url: 'https://rajkaushki.com',
    siteName: 'Raj Kaushki Portfolio',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className="antialiased min-h-screen relative">
        <NoiseTexture />
        <CustomCursor />
        <ScrollProgress />
        <Toaster position="bottom-right" theme="dark" />
        {children}
      </body>
    </html>
  );
}
