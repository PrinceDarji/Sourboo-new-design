'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import QuickBuyButton from '../cart/QuickBuyButton';
import { findCatalogProduct } from '@/src/lib/catalog/products';

type PlayerId = 1 | 2;

type Player = {
  id: PlayerId;
  slug: string;
  jar: string;
  prompt: string[];
  meters: { label: string; fill: number }[];
  ctaText: string;
  closing?: string;
};

const PLAYERS: Player[] = [
  {
    id: 1,
    slug: 'sideeyesour',
    jar: '/product/side-eye-jar.png',
    prompt: ['if you dislike sweet snacks', 'and you add extra chilli', 'without tasting'],
    meters: [
      { label: 'spice', fill: 82 },
      { label: 'sour', fill: 100 },
      { label: 'crunch', fill: 68 },
      { label: 'attitude', fill: 100 },
    ],
    ctaText: 'get side eye sour ¬‿¬',
  },
  {
    id: 2,
    slug: 'tamarintease',
    jar: '/product/tamarin-jar.png',
    prompt: ['you want tang?', 'you handle spice!'],
    meters: [
      { label: 'spice', fill: 84 },
      { label: 'tang', fill: 100 },
      { label: 'hit', fill: 84 },
      { label: 'snaps', fill: 100 },
    ],
    ctaText: 'tamarin tease',
    closing: 'makes sense ;)',
  },
];

function isTypingTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  if (!element) return false;
  return element.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName);
}

export default function TasteGame({ id = 'taste-game' }: { id?: string }) {
  const [selected, setSelected] = useState<PlayerId | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const sampler = findCatalogProduct('sour-sampler');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const onKey = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target) || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === '1') setSelected(1);
      if (event.key === '2') setSelected(2);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`sbx-game ${selected ? `has-p${selected}` : ''}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="sbx-game__hud" aria-hidden="true">
        <span className={`sbx-game__tag sbx-game__tag--p1 ${selected === 1 ? 'is-on' : ''}`}>PLAYER 1</span>
        <span className="sbx-game__coin">
          <span />
        </span>
        <span className={`sbx-game__tag sbx-game__tag--p2 ${selected === 2 ? 'is-on' : ''}`}>PLAYER 2</span>
      </div>

      <div className="sbx-game__head">
        <h2 id={`${id}-title`} className="sbx-game__title">
          can&apos;t decide?
        </h2>
        <p className="sbx-game__sub font-schoolbell">let&apos;s match you with your flavour ;)</p>
      </div>

      <div className="sbx-game__arena">
        {PLAYERS.map((player) => {
          const product = findCatalogProduct(player.slug);
          const isSelected = selected === player.id;
          return (
            <div key={player.id} className={`sbx-game__side sbx-game__side--p${player.id} ${isSelected ? 'is-selected' : ''}`}>
              <button
                type="button"
                className="sbx-game__pick"
                onClick={() => setSelected(player.id)}
                aria-pressed={isSelected}
                aria-controls={`${id}-result-${player.id}`}
              >
                <span className="sbx-game__player">PLAYER {player.id}</span>
                <span className="sbx-game__prompt font-schoolbell">
                  {player.prompt.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
                <span className="sbx-game__key" aria-hidden="true">
                  press <kbd>{player.id}</kbd>
                </span>
              </button>

              <div id={`${id}-result-${player.id}`} className="sbx-game__result" aria-live="polite" hidden={!isSelected}>
                {isSelected ? (
                  <>
                    <ul className="sbx-game__meters">
                      {player.meters.map((meter, index) => (
                        <li key={meter.label} style={{ '--fill': `${meter.fill}%`, '--i': index } as CSSProperties}>
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
                        <Image src={player.jar} alt={product?.name ?? ''} fill sizes="140px" quality={78} />
                      </span>
                      <div>
                        <p className="sbx-game__locked-title font-schoolbell">selection locked:</p>
                        <Link href={`/product/${player.slug}`} className="sbx-game__cta font-rascal">
                          {player.ctaText}
                        </Link>
                        {player.closing ? <p className="sbx-game__closing font-schoolbell">{player.closing}</p> : null}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {selected && sampler ? (
        <div className="sbx-game__coop">
          <span className="sbx-game__coop-tag">2 PLAYER MODE</span>
          <span className="sbx-game__coop-name">{sampler.name}</span>
          <span className="sbx-game__coop-desc">{sampler.hoverLabel.split('\n').join(' + ')}</span>
          <QuickBuyButton slug={sampler.slug} name={sampler.name} priceLabel={sampler.price} image={sampler.jarImage} className="sbx-game__coop-btn">
            add both · {sampler.price}
          </QuickBuyButton>
        </div>
      ) : null}
    </section>
  );
}
