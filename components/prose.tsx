import { Container } from '@andyhqin/ui';

/**
 * Long-form text rendered from this site's own Markdown (lib/content.ts). The
 * HTML is trusted because only the site's owner writes it.
 */
export function Prose({ html }: { html: string }) {
  return (
    <Container width="prose" className="pb-16">
      <div className="prose prose-lg prose-site max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
}
