import { Footer, Nav } from '@andyhqin/blocks';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import AboutPage from '../app/about/page';
import PostPage from '../app/blog/[slug]/page';
import BlogPage from '../app/blog/page';
import BookshelfPage from '../app/bookshelf/page';
import NotFound from '../app/not-found';
import HomePage from '../app/page';
import ProjectsPage from '../app/projects/page';
import UsesPage from '../app/uses/page';
import { listPosts } from '../lib/content';
import { footer, nav } from '../lib/site';

/** A page inside the site's chrome, as the layout renders it (without <html>). */
function renderPage(page: ReactNode) {
  return render(
    <>
      <Nav {...nav} />
      <main id="main">{page}</main>
      <Footer {...footer} />
    </>,
  );
}

/** axe's WCAG A/AA rules. Colour contrast needs real styles; tests/theme.test.ts covers it. */
async function violations(container: HTMLElement) {
  const results = await axe.run(container, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  return results.violations.map((v) => `${v.id}: ${v.help}`);
}

const firstPost = listPosts()[0]!;

const pages: [string, () => ReactNode | Promise<ReactNode>][] = [
  ['home', () => <HomePage />],
  ['about', () => <AboutPage />],
  ['projects', () => <ProjectsPage />],
  ['blog', () => <BlogPage />],
  ['a blog post', () => PostPage({ params: Promise.resolve({ slug: firstPost.slug }) })],
  ['uses', () => <UsesPage />],
  ['bookshelf', () => <BookshelfPage />],
  ['not found', () => <NotFound />],
];

describe.each(pages)('the %s page', (_, page) => {
  it('has exactly one h1', async () => {
    renderPage(await page());
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  /** Skipping from h1 to h3 leaves screen-reader users guessing at the structure. */
  it('never skips a heading level', async () => {
    renderPage(await page());
    const levels = screen.getAllByRole('heading').map((h) => Number(h.tagName.slice(1)));
    expect(levels.filter((level, i) => i > 0 && level > levels[i - 1]! + 1)).toEqual([]);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderPage(await page());
    expect(await violations(container)).toEqual([]);
  });
});

describe('site chrome', () => {
  it('links every section from the nav, with the contact form as its call to action', () => {
    renderPage(<HomePage />);
    const navigation = screen.getAllByRole('navigation')[0]!;
    const links = [...navigation.querySelectorAll('a')].map((a) => [a.textContent, a.getAttribute('href')]);
    expect(links).toEqual(
      expect.arrayContaining([
        ['About', '/about'],
        ['Projects', '/projects'],
        ['Blog', '/blog'],
        ['Uses', '/uses'],
        ['Bookshelf', '/bookshelf'],
        ['Get in touch', '/about#contact'],
      ]),
    );
  });

  it('puts the contact form at /about#contact, posting to /api/contact', () => {
    const { container } = renderPage(<AboutPage />);
    expect(container.querySelector('#contact form')?.getAttribute('action')).toBe('/api/contact');
  });
});
