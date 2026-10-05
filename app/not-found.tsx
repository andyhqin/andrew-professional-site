import { Container, Heading } from '@andyhqin/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container width="prose" className="py-24">
      <p className="text-brand-700 font-medium">404</p>
      <Heading level={1} size="lg" className="mt-2">
        Lost in space
      </Heading>
      <p className="text-ink-muted mt-4 text-lg">There is nothing at this address.</p>
      <p className="mt-6">
        <Link
          href="/"
          className="text-brand-700 focus-visible:outline-brand-600 rounded-sm font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Back to the home page
        </Link>
      </p>
    </Container>
  );
}
