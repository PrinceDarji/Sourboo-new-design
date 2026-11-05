'use client';

export default function BooInTheWildGallery() {
  const moments = [
    {
      src: '/home/latenightmunchies.webp',
      alt: 'Late Night Munchies - Snack Irresponsibly',
      caption: 'straight out of the fridge standing in the dark',
      straightClass: 'straight-late-night',
    },
    {
      src: '/home/girldinner.webp',
      alt: 'Girl Dinner But Sour - Keep Within Reach',
      caption: 'cheese, crackers, chips & 4 fat pickles',
      straightClass: 'straight-girl-dinner',
    },
    {
      src: '/home/postcrysnack.webp',
      alt: 'Post Cry Snack - Not A Meal, A Moment',
      caption: 'crying burns calories. pickle replaces electrolytes',
      straightClass: 'straight-post-cry',
    },
    {
      src: '/home/deskcravings.webp',
      alt: 'Desk Cravings Break',
      caption: 'for when that zoom call could have been an email',
      straightClass: 'straight-desk',
    },
    {
      src: '/home/hangoverdetox.webp',
      alt: 'Hangover Detox',
      caption: 'spicy cold brine to resurrect your soul',
      straightClass: 'straight-hangover',
    },
  ];

  return (
    <section className="sb-wild-section" aria-label="The Boo in the Wild">
      <div className="sb-wild-header">
        <h2 className="sb-wild-title">The Boo in the Wild</h2>
        <p className="sb-wild-callout">
          Your jar called. It wants to be on everything
        </p>
        <p
          className="font-rascal"
          style={{ fontSize: '1.25rem', color: '#2F4918', margin: '8px 0 0', opacity: 0.85 }}
        >
          Good taste looks like this. Snacks with personality. Made to be bold. Made to be yours.
        </p>
      </div>

      <div className="sb-wild-carousel-wrap">
        {moments.map((moment, idx) => (
          <div key={`wild-${idx}`} className="sb-wild-card">
            <div className="sb-wild-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={moment.src}
                alt={moment.alt}
                className={`sb-wild-img ${moment.straightClass}`}
              />
            </div>
            <p className="sb-wild-caption">{moment.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
