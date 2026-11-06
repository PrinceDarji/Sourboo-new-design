import type { CSSProperties } from 'react';

export const BRAND_LINES = [
  'Made for Mouths That Misbehave.',
  'MOUTHS THAT MISBEHAVE.',
  'India’s First Cult Sour Snack.',
  'Snackable pickled gherkins.',
  'Made to be bold. Made to be yours.',
  'Stay sour.',
  'Good taste looks like this.',
  'Snacks with personality.',
  'Deeply Fermented • Slightly Unhinged.',
];

type MarqueeProps = {
  items?: readonly string[];
  label: string;
  tone?: 'lilac' | 'amber' | 'lime' | 'cream' | 'berry';
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  tilt?: number;
  className?: string;
};

function MarqueeRow({ items, hidden }: { items: readonly string[]; hidden?: boolean }) {
  return (
    <ul className="sbx-marquee__row" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="sbx-marquee__item">
          <span>{item}</span>
          <svg className="sbx-marquee__sep" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5c.6 3.6 1.5 5.8 3 7.2 1.4 1.3 3.4 2 6.5 2.3-3.2.4-5.2 1.1-6.6 2.5-1.4 1.4-2.2 3.6-2.9 7-.6-3.4-1.5-5.6-2.9-7-1.4-1.4-3.4-2.1-6.6-2.5 3.1-.3 5.1-1 6.5-2.3 1.5-1.4 2.4-3.6 3-7.2Z" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

/**
 * Seamless CSS marquee. The list is rendered twice and the track slides by
 * exactly half its width, so the loop never jumps regardless of content length.
 */
export default function Marquee({
  items = BRAND_LINES,
  label,
  tone = 'lilac',
  duration = 42,
  reverse = false,
  tilt = 0,
  className = '',
}: MarqueeProps) {
  const style = {
    '--sbx-marquee-duration': `${duration}s`,
    '--sbx-marquee-tilt': `${tilt}deg`,
  } as CSSProperties;

  return (
    <div
      className={`sbx-marquee sbx-marquee--${tone} ${reverse ? 'sbx-marquee--reverse' : ''} ${className}`}
      role="region"
      aria-label={label}
      style={style}
    >
      <div className="sbx-marquee__track">
        <MarqueeRow items={items} />
        <MarqueeRow items={items} hidden />
      </div>
    </div>
  );
}
