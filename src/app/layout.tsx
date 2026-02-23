import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import '../index.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://salary-calculator.app'),
  title: 'Loon Calculator - Bereken je Salaris',
  description: 'Salariscalculator - Bereken je salaris met toeslagen en aftrekposten. Gratis en eenvoudig te gebruiken.',
  keywords: 'salaris, calculator, loon, berekening, toeslagen, aftrekposten',
  authors: [{ name: 'Salary Calculator' }],
  openGraph: {
    type: 'website',
    url: 'https://salary-calculator.app/',
    title: 'Salariscalculator',
    description: 'Bereken je salaris met toeslagen en aftrekposten',
    images: [
      {
        url: '/favicon.svg',
        width: 128,
        height: 128,
        alt: 'Salary Calculator Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salariscalculator',
    description: 'Bereken je salaris met toeslagen en aftrekposten',
    images: ['/favicon.svg'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
  themeColor: '#3b82f6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        {/* Preconnect for fonts performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <noscript>Je moet JavaScript inschakelen om deze app te gebruiken.</noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}