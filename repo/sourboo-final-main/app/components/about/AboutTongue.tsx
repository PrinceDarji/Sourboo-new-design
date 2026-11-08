'use client';

import { useEffect, useRef, useState } from 'react';

const TASTE_LABELS = [
  { id: 'chaat', text: 'India loves chaaat', x: '4%', y: '12%' },
  { id: 'flavour', text: 'India loves flavour', x: '58%', y: '6%' },
  { id: 'hit', text: 'India loves that sour & spicy hit', x: '52%', y: '78%' },
] as const;

export default function AboutTongue() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onScroll = () => {
      const rect = stage.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const progress = 1 - Math.min(1, Math.max(0, (rect.top + rect.height * 0.4) / view));
      stage.style.setProperty('--tongue', progress.toFixed(3));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="sb-ab-tongue" aria-label="What India loves to taste">
      <div className="sb-ab-tongue__copy">
        <p>India loves chaaat</p>
        <p>India loves flavour</p>
        <p>India loves that sour & spicy hit</p>
        <h2 className="sb-ab-tongue__title">
          Nothing worked for a desi palate that loves
          <br />
          <span className="sbx-layer" data-tone="lemon">
            <span className="sbx-layer__hand" aria-hidden="true">
              BOLD
            </span>
            <span className="sbx-layer__top">BOLD</span>
          </span>{' '}
          spicy sour
        </h2>
        <p>but doesn&apos;t want to feel weighed down after snacking</p>
      </div>
      <div ref={stageRef} className={`sb-ab-tongue__stage ${active ? 'is-hot' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/about/section-three-tongue.webp" alt="Sourboo tongue taste map" className="sb-ab-tongue__art" />
        {TASTE_LABELS.map((label) => (
          <button
            key={label.id}
            type="button"
            className={`sb-ab-tongue__pin ${active === label.id ? 'is-on' : ''}`}
            style={{ left: label.x, top: label.y }}
            onMouseEnter={() => setActive(label.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(label.id)}
            onBlur={() => setActive(null)}
          >
            {label.text}
          </button>
        ))}
      </div>
    </section>
  );
}
