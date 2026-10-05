import { z } from 'zod';

/*
 * PLACEHOLDER: replace these with your own books. See CONTENT.md.
 * Validated at build time, so a typo in a status fails the build.
 */

export const BOOK_STATUSES = {
  reading: 'Reading now',
  read: 'Read',
  'want-to-read': 'Want to read',
} as const;

const bookSchema = z.object({
  title: z.string().min(1).max(120),
  author: z.string().min(1).max(120),
  status: z.enum(['reading', 'read', 'want-to-read']),
  /** A sentence or two on what you thought. */
  note: z.string().max(300).optional(),
});

export type Book = z.output<typeof bookSchema>;

export const books: Book[] = z.array(bookSchema).parse([
  { title: 'Placeholder title', author: 'Placeholder author', status: 'reading' },
  {
    title: 'Another placeholder',
    author: 'Placeholder author',
    status: 'read',
    note: 'A sentence or two on what you thought.',
  },
  { title: 'A third placeholder', author: 'Placeholder author', status: 'want-to-read' },
]);
