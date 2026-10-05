import { Container, Heading } from '@andyhqin/ui';

/** The heading at the top of an inner page: its one h1, and an intro line. */
export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <Container as="header" width="prose" className="pt-16 pb-8 sm:pt-24">
      <Heading level={1} size="lg">
        {title}
      </Heading>
      {intro ? <p className="text-ink-muted mt-4 text-lg">{intro}</p> : null}
    </Container>
  );
}
