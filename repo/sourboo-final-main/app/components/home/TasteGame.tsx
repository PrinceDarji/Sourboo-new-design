'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import QuickBuyButton from '../cart/QuickBuyButton';
import { findCatalogProduct } from '@/src/lib/catalog/products';

type FlavourMatchId = 1 | 2;

type FlavourMatch = {
  id: FlavourMatchId;
  slug: string;
  name: string;
  flavourTag: string;
  jar: string;
  prompt: string[];
  meters: { label: string; fill: number }[];
  ctaText: string;
  closing?: string;
};

const FLAVOUR_MATCHES: FlavourMatch[] = [
  {
    id: 1,
    slug: 'sideeyesour',
    name: 'SIDE EYE SOUR',
    flavourTag: 'EXTRA TANGY · CHAAT MASALA',
    jar: '/product/side-eye-jar.webp',
    prompt: [
      'Dislike sweet snacks?',
      'Add extra chilli without tasting?',
      'Crave unapologetic khatta crunch?',
    ],
    meters: [
      { label: 'spice', fill: 82 },
      { label: 'sour', fill: 100 },
      { label: 'crunch', fill: 68 },
      { label: 'attitude', fill: 100 },
    ],
    ctaText: 'GET SIDE EYE SOUR →',
  },
  {
    id: 2,
    slug: 'tamarintease',
    name: "TAMARIN' TEASE",
    flavourTag: 'SWEET, SOUR & A LITTLE FIERY',
    jar: '/product/tamarin-jar.webp',
    prompt: [
      'Craving rich tamarind tang?',
      'Handle spice that bites back?',
      'Love complex sweet-sour heat?',
    ],
    meters: [
      { label: 'spice', fill: 84 },
      { label: 'tang', fill: 100 },
      { label: 'hit', fill: 84 },
      { label: 'snaps', fill: 100 },
    ],
    ctaText: "GET TAMARIN' TEASE →",
    closing: 'makes sense ;)',
  },
];

export default function TasteGame({ id = 'taste-game' }: { id?: string }) {
  const [selected, setSelected] = useState<FlavourMatchId | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const sampler = findCatalogProduct('sour-sampler');

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`sbx-game ${selected ? `has-p${selected}` : ''}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="sbx-game__head">
        <span className="sbx-game__kicker">FLAVOUR MATCH QUIZ</span>
        <h2 id={`${id}-title`} className="sbx-game__title">
          can&apos;t decide?
        </h2>
        <p className="sbx-game__sub">let&apos;s match you with your flavour ;)</p>
      </div>

      <div className="sbx-game__arena" role="region" aria-label="Flavour matches">
        {FLAVOUR_MATCHES.map((match) => {
          const product = findCatalogProduct(match.slug);
          const isSelected = selected === match.id;
          return (
            <div
              key={match.id}
              className={`sbx-game__side sbx-game__side--p${match.id} ${isSelected ? 'is-selected' : ''}`}
            >
              <div className={`sbx-game__card ${isSelected ? 'is-selected' : ''}`}>
                <button
                  type="button"
                  className="sbx-game__pick"
                  onClick={() => setSelected(isSelected ? null : match.id)}
                  aria-pressed={isSelected}
                  aria-controls={`${id}-result-${match.id}`}
                  aria-label={`Select ${match.name} flavour profile`}
                >
                  <span className="sbx-game__card-tag">{match.flavourTag}</span>
                  <span className="sbx-game__card-name">{match.name}</span>
                  <span className="sbx-game__prompt">
                    {match.prompt.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                  {isSelected ? (
                    <span className="sbx-game__locked-flag">✨ MATCH LOCKED IN ✨</span>
                  ) : (
                    <span className="sbx-game__pick-btn">CLICK TO MATCH VIBE →</span>
                  )}
                </button>

                <div
                  id={`${id}-result-${match.id}`}
                  className="sbx-game__result"
                  aria-live="polite"
                  hidden={!isSelected}
                >
                  {isSelected ? (
                    <>
                      <ul className="sbx-game__meters">
                        {match.meters.map((meter, index) => (
                          <li
                            key={meter.label}
                            style={{ '--fill': `${meter.fill}%`, '--i': index } as CSSProperties}
                          >
                            <span className="sbx-game__meter-label">{meter.label}</span>
                            <span className="sbx-game__meter-track">
                              <span className="sbx-game__meter-fill" />
                            </span>
                            <span className="sbx-game__meter-value">{meter.fill}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="sbx-game__locked">
                        <span className="sbx-game__locked-jar">
                          <Image
                            src={match.jar}
                            alt={product?.name ?? match.name}
                            fill
                            sizes="140px"
                            quality={80}
                          />
                        </span>
                        <div>
                          <p className="sbx-game__locked-title">YOUR FLAVOUR MATCH:</p>
                          <Link href={`/product/${match.slug}`} className="sbx-game__cta">
                            {match.ctaText}
                          </Link>
                          {match.closing ? <p className="sbx-game__closing">{match.closing}</p> : null}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected && sampler ? (
        <div className="sbx-game__coop">
          <span className="sbx-game__coop-tag">STILL CAN&apos;T DECIDE? GET BOTH</span>
          <span className="sbx-game__coop-name">{sampler.name}</span>
          <span className="sbx-game__coop-desc">{sampler.hoverLabel.split('\n').join(' + ')}</span>
          <QuickBuyButton
            slug={sampler.slug}
            name={sampler.name}
            priceLabel={sampler.price}
            image={sampler.jarImage}
            className="sbx-game__coop-btn"
          >
            add both · {sampler.price}
          </QuickBuyButton>
        </div>
      ) : null}


    </section>
  );
}
