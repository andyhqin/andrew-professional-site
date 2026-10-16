import { Container } from '@andyhqin/ui';

import { AppletPlayer } from '../../components/applet-player';
import { PageHeader } from '../../components/page-header';
import { areaFlat } from '../../content/lounge';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata({
  path: '/lounge',
  title: 'Lounge',
  description: 'Kick back and play AREA FLAT, a Java applet game from 1999.',
});

export default function LoungePage() {
  return (
    <>
      <PageHeader title="Lounge" intro="Take a break and play a little game from the early web." />
      <Container className="pb-4">
        <AppletPlayer game={areaFlat} />
      </Container>
      <Container width="prose" className="pb-16">
        <p className="text-ink-muted text-sm">
          Needs a keyboard, so it is best on a computer. Click the game if it stops responding to keys.
        </p>
        <p className="text-ink-muted mt-6 text-sm">
          {areaFlat.title} is by{' '}
          <a href="https://www.shiftup.net/" className="underline underline-offset-4">
            {areaFlat.developer}
          </a>
          , preserved by{' '}
          <a href={areaFlat.flashpointUrl} className="underline underline-offset-4">
            Flashpoint Archive
          </a>
          , and runs in your browser with{' '}
          <a href="https://cheerpj.com/" className="underline underline-offset-4">
            CheerpJ
          </a>
          . All rights belong to its creators.
        </p>
      </Container>
    </>
  );
}
