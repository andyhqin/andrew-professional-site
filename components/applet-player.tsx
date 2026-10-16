'use client';

import { Button } from '@andyhqin/ui';
import { useState } from 'react';

import type { LoungeGame } from '../content/lounge';

/**
 * A click-to-play frame for a lounge game. CheerpJ's Java runtime is several
 * megabytes, so nothing loads until the visitor presses Play; then the game's
 * static page loads in an iframe, which takes focus so the keyboard reaches it.
 */
export function AppletPlayer({ game }: { game: LoungeGame }) {
  const [playing, setPlaying] = useState(false);
  // As wide as the page allows, but never taller than most of the screen; the
  // game page scales the applet up or down to fill whatever size this is.
  const frameStyle = {
    aspectRatio: `${game.width} / ${game.height}`,
    width: `min(100%, calc(80svh * ${game.width} / ${game.height}))`,
  };

  if (playing) {
    return (
      <iframe
        src={game.src}
        title={game.title}
        style={frameStyle}
        className="border-line mx-auto block rounded-md border"
        onLoad={(event) => event.currentTarget.focus()}
      />
    );
  }

  return (
    <div
      style={frameStyle}
      className="border-line bg-surface-muted mx-auto flex flex-col items-center justify-center gap-4 rounded-md border p-6 text-center"
    >
      <p className="font-display text-2xl font-bold">{game.title}</p>
      <p className="text-ink-muted text-sm">
        {game.developer}, {game.year}
      </p>
      <Button onClick={() => setPlaying(true)}>Play</Button>
      <p className="text-ink-muted text-xs">Loads a few MB of Java runtime the first time.</p>
    </div>
  );
}
