import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

/**
 * WCAG AA contrast for every pair of theme tokens the library's blocks put
 * together, read from app/theme.css itself. jsdom cannot compute styles, so
 * the page tests' axe run cannot check contrast; this does.
 */
const css = readFileSync(join(process.cwd(), 'app/theme.css'), 'utf8');
const token = (name: string): string => {
  const value = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1];
  if (!value) throw new Error(`app/theme.css has no 6-digit hex value for --color-${name}`);
  return value;
};

const luminance = (hex: string) => {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
};
/** A colour at `alpha` opacity over a background, as `text-ink-inverted/75` renders. */
const over = (fg: string, bg: string, alpha: number) =>
  '#' +
  [1, 3, 5]
    .map((i) => Math.round(parseInt(fg.slice(i, i + 2), 16) * alpha + parseInt(bg.slice(i, i + 2), 16) * (1 - alpha)))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('');

const TEXT = 4.5;
const NON_TEXT = 3;

describe('theme contrast', () => {
  it.each([
    ['body text', 'ink', 'surface', TEXT],
    ['body text on muted sections', 'ink', 'surface-muted', TEXT],
    ['muted text', 'ink-muted', 'surface', TEXT],
    ['muted text on muted sections', 'ink-muted', 'surface-muted', TEXT],
    ['eyebrows, links, ghost buttons', 'brand-700', 'surface', TEXT],
    ['eyebrows and links on muted sections', 'brand-700', 'surface-muted', TEXT],
    ['primary buttons', 'ink-inverted', 'brand-600', TEXT],
    ['primary buttons, hovered', 'ink-inverted', 'brand-700', TEXT],
    ['text in inverted bands', 'ink-inverted', 'surface-inverted', TEXT],
    ['eyebrows in inverted bands', 'brand-100', 'surface-inverted', TEXT],
    ['success messages and tags', 'ink', 'brand-50', TEXT],
    ['tags, badges, ghost buttons hovered', 'brand-700', 'brand-50', TEXT],
    ['focus outlines', 'brand-600', 'surface', NON_TEXT],
    ['focus outlines on muted sections', 'brand-600', 'surface-muted', NON_TEXT],
  ] as const)('%s: %s on %s', (_, text, background, minimum) => {
    expect(contrast(token(text), token(background))).toBeGreaterThanOrEqual(minimum);
  });

  it('supporting text in inverted bands, at 75% opacity', () => {
    const background = token('surface-inverted');
    expect(contrast(over(token('ink-inverted'), background, 0.75), background)).toBeGreaterThanOrEqual(TEXT);
  });
});
