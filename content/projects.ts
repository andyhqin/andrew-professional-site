import { z } from 'zod';

/*
 * PLACEHOLDER: replace these with your own projects. See CONTENT.md.
 * Validated at build time, so a malformed link fails the build.
 */

const projectSchema = z.object({
  name: z.string().min(1).max(60),
  description: z.string().min(1).max(240),
  /** The live project, if there is one. */
  href: z.string().url().optional(),
  /** The source code, if it is public. */
  source: z.string().url().optional(),
  tags: z.array(z.string().min(1).max(24)).max(6).default([]),
});

export type Project = z.output<typeof projectSchema>;

export const projects: Project[] = z.array(projectSchema).parse([
  {
    name: 'Placeholder project',
    description: 'What it does, who it is for, and the part you are proudest of.',
    tags: ['TypeScript'],
  },
  {
    name: 'Another placeholder',
    description: 'A second project, with a link to it and to its source code once you add them.',
    tags: ['Next.js', 'Postgres'],
  },
]);
