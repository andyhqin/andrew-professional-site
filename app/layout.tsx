import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';

import { Footer, Nav } from '@andyhqin/blocks';
import type { Viewport } from 'next';
import type { ReactNode } from 'react';

import { pageMetadata } from '../lib/metadata';
import { footer, nav } from '../lib/site';
import './globals.css';

/** Site-wide defaults; each page sets its own title, description, and path. */
export const metadata = pageMetadata({ path: '/' });

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#070a1a' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <a
          href="#main"
          className="bg-brand-600 text-ink-inverted sr-only rounded-md px-4 py-2 font-medium focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        <Nav {...nav} />
        <main id="main">{children}</main>
        <Footer {...footer} />
      </body>
    </html>
  );
}
