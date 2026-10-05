import { describe, expect, it } from 'vitest';

import { books } from '../content/bookshelf';
import { projects } from '../content/projects';
import { formatDate, getPost, listPosts, markdownPage } from '../lib/content';

/** Content is validated when it loads; these make every file load in CI. */
describe('content', () => {
  it.each(['about', 'uses'])('loads content/%s.md', (name) => {
    const page = markdownPage(name);
    expect(page.meta.title).toBeTruthy();
    expect(page.html).toContain('<h2');
  });

  it('loads every blog post, newest first', () => {
    const posts = listPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.map((p) => p.date)).toEqual([...posts.map((p) => p.date)].sort().reverse());
    for (const post of posts) expect(getPost(post.slug)?.html).toBeTruthy();
  });

  it('finds no post for an unknown slug', () => {
    expect(getPost('no-such-post')).toBeNull();
  });

  it('loads projects and books', () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(books.length).toBeGreaterThan(0);
  });

  /** Built from the parts, so a time zone can never move a post to the day before. */
  it('formats dates without shifting the day', () => {
    expect(formatDate('2026-10-04')).toBe('October 4, 2026');
    expect(formatDate('2026-01-01')).toBe('January 1, 2026');
  });
});
