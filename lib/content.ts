import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import matter from 'gray-matter';
import { marked } from 'marked';
import { z } from 'zod';

/*
 * Markdown content in content/: the about and uses pages, and blog posts.
 * Front matter is validated, so a missing title or a malformed date fails the
 * build instead of shipping a broken page. The Markdown is this site's own,
 * written by its owner, so its HTML is trusted.
 */

const CONTENT = join(process.cwd(), 'content');

const pageSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().min(1).max(160),
});

const postSchema = pageSchema.extend({
  // YAML reads an unquoted `date: 2026-10-04` as a date, and a quoted one as a
  // string. Accept both, and keep the day as written, in YYYY-MM-DD.
  date: z.preprocess(
    (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD.'),
  ),
  draft: z.boolean().default(false),
});

export type PageMeta = z.output<typeof pageSchema>;
export type PostMeta = z.output<typeof postSchema> & { slug: string };

function read<S extends z.ZodTypeAny>(file: string, schema: S): { meta: z.output<S>; html: string } {
  const { data, content } = matter(readFileSync(file, 'utf8'));
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const problems = parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
    throw new Error(`Front matter in ${file} is invalid:\n- ${problems.join('\n- ')}`);
  }
  return { meta: parsed.data, html: marked.parse(content, { async: false }) };
}

/** A standalone Markdown page, such as content/about.md. */
export function markdownPage(name: string) {
  return read(join(CONTENT, `${name}.md`), pageSchema);
}

/** Drafts show in development and are left out of production builds. */
const showDrafts = process.env.NODE_ENV !== 'production';

/** Blog posts, newest first. The file name is the URL: content/blog/hello.md is /blog/hello. */
export function listPosts(): PostMeta[] {
  return readdirSync(join(CONTENT, 'blog'))
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({ ...read(join(CONTENT, 'blog', file), postSchema).meta, slug: file.replace(/\.md$/, '') }))
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): { meta: PostMeta; html: string } | null {
  if (!listPosts().some((post) => post.slug === slug)) return null;
  const { meta, html } = read(join(CONTENT, 'blog', `${slug}.md`), postSchema);
  return { meta: { ...meta, slug }, html };
}

/** "2026-10-04" as "October 4, 2026", without the time zone shifting the day. */
export function formatDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year!, month! - 1, day!)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
