import { ImageResponse } from 'next/og';

import { SHARE_IMAGE } from '../../lib/metadata';
import { person } from '../../lib/site';

/**
 * The image shown when a page is shared. The site's own, not the library's
 * OgImage: that one draws on the library's light background, where this
 * theme's cyan reads poorly. Colours match app/theme.css.
 */
export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 96,
          color: '#e8ebff',
          background: 'radial-gradient(900px 600px at 85% 0%, #2a1466 0%, #070a1a 70%)',
          borderTop: '16px solid #22d3ee',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, color: '#67e8f9', letterSpacing: 2 }}>{person.role.toUpperCase()}</div>
        <div style={{ display: 'flex', marginTop: 20, fontSize: 104, fontWeight: 700 }}>{person.name}</div>
      </div>
    ),
    { width: SHARE_IMAGE.width, height: SHARE_IMAGE.height },
  );
}
