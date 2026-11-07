'use client';

const TASTE_LABELS = [
  { id: 'chaat', text: 'India loves chaaat.', x: '2%', y: '18%' },
  { id: 'flavour', text: 'India loves flavour.', x: '68%', y: '8%' },
  { id: 'hit', text: 'India loves that sour & spicy hit.', x: '62%', y: '72%' },
] as const;

export default function AboutTongue() {
  return (
    <section className="sb-ab-tongue" aria-label="What India loves to taste">
      <div className="sb-ab-tongue__copy">
        <p className="sb-ab-tongue__kicker">a taste map</p>
        <h2 className="sb-ab-tongue__title">
          Nothing worked for a desi palate that loves{' '}
          <span className="sbx-layer" data-tone="lemon">
            <span className="sbx-layer__hand" aria-hidden="true">
              BOLD
            </span>
            <span className="sbx-layer__top">BOLD</span>
          </span>{' '}
          sour
        </h2>
      </div>
      <div className="sb-ab-tongue__stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/about/section-three-tongue.webp" alt="Illustrated Sourboo tongue taste map" className="sb-ab-tongue__art" />
        {TASTE_LABELS.map((label) => (
          <button
            key={label.id}
            type="button"
            className="sb-ab-tongue__pin"
            style={{ left: label.x, top: label.y }}
          >
            {label.text}
          </button>
        ))}
      </div>
    </section>
  );
}
