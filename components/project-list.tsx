import type { Project } from '../content/projects';

const link =
  'text-brand-700 hover:underline focus-visible:outline-brand-600 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2';

/** Project cards: what it is, its tags, and links to it and its source. */
export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.name} className="border-line bg-surface-muted/60 rounded-lg border p-6">
          <h2 className="font-display text-xl font-semibold">{project.name}</h2>
          <p className="text-ink-muted mt-2">{project.description}</p>
          {project.tags.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
              {project.tags.map((tag) => (
                <li key={tag} className="bg-brand-50 text-brand-700 rounded-sm px-2 py-1 text-xs font-medium">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          {project.href || project.source ? (
            <p className="mt-4 flex gap-4 text-sm font-medium">
              {project.href ? (
                <a href={project.href} className={link}>
                  Visit<span className="sr-only"> {project.name}</span>
                </a>
              ) : null}
              {project.source ? (
                <a href={project.source} className={link}>
                  Source<span className="sr-only"> for {project.name}</span>
                </a>
              ) : null}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
