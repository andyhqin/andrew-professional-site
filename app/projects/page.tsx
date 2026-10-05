import { Container } from '@andyhqin/ui';

import { PageHeader } from '../../components/page-header';
import { ProjectList } from '../../components/project-list';
import { projects } from '../../content/projects';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata({
  path: '/projects',
  title: 'Projects',
  description: 'Things Andrew Qin has built: what they do, and links to them.',
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" intro="Things I have built, and what I learned building them." />
      <Container className="pb-16">
        <ProjectList projects={projects} />
      </Container>
    </>
  );
}
