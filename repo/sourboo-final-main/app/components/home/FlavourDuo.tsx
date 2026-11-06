'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import InteractiveJar, { type JarFlavour } from '../product/InteractiveJar';
import QuickBuyButton from '../cart/QuickBuyButton';
import { findCatalogProduct } from '@/src/lib/catalog/products';

type Flavour = {
  slug: string;
  jar: JarFlavour;
  name: string;
  persona: string;
  description: string;
  combo: string;
  cta: string;
};

const FLAVOURS: Flavour[] = [
  {
    slug: 'sideeyesour',
    jar: 'side-eye',
    name: 'SIDE EYE SOUR',
    persona: 'The drama queen.',
    description: 'Extra tangy. Chaat masala obsessed. Has something to say about everything.',
    combo: 'LEMON + CHAAT MASALA',
    cta: 'GET SIDE EYED →',
  },
  {
    slug: 'tamarintease',
    jar: 'tamarin',
    name: 'TAMARIN’ TEASE',
    persona: 'The sweet troublemaker.',
    description: 'Sweet, sour and a little fiery. Flirts first. Bites back.',
    combo: 'TAMARIND + CHILLI',
    cta: 'GET TEASED →',
  },
];

export default function FlavourDuo({ children }: { children?: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const centre = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    Array.from(track.children).forEach((child, index) => {
      const slide = child as HTMLElement;
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - centre);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', updateActive, { passive: true });
    return () => track.removeEventListener('scroll', updateActive);
  }, [updateActive]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <section className="sbx-duo" id="flavours" aria-labelledby="sbx-duo-title">
      <div className="sbx-duo__head">
        <p className="sbx-duo__kicker font-schoolbell">Snackable pickled gherkins.</p>
        <h2 id="sbx-duo-title" className="sbx-duo__title">
          Snacks with <span className="sbx-layer" data-tone="amber"><span className="sbx-layer__hand" aria-hidden="true">personality.</span><span className="sbx-layer__top">personality.</span></span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="sbx-duo__track"
        role="group"
        aria-roledescription="carousel"
        aria-label="Sourboo flavours"
      >
        {FLAVOURS.map((flavour, index) => {
          const product = findCatalogProduct(flavour.slug);
          const price = product?.price ?? '₹399';
          return (
            <article
              key={flavour.slug}
              className={`sbx-duo__slide sbx-duo__slide--${flavour.jar}`}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${FLAVOURS.length}: ${flavour.name}`}
            >
              <div className="sbx-duo__jar">
                <InteractiveJar
                  flavour={flavour.jar}
                  name={flavour.name}
                  label={product?.hoverLabel ?? flavour.combo}
                  sizes="(max-width: 768px) 56vw, 280px"
                />
              </div>
              <div className="sbx-duo__info">
                <h3 className="sbx-duo__name">{flavour.name}</h3>
                <p className="sbx-duo__persona font-rascal">
                  <em>{flavour.persona}</em>
                </p>
                <p className="sbx-duo__desc">{flavour.description}</p>
                <p className="sbx-duo__combo">{flavour.combo}</p>
                <div className="sbx-duo__actions">
                  <Link href={`/product/${flavour.slug}`} className="sbx-duo__cta">
                    {flavour.cta}
                  </Link>
                  <QuickBuyButton
                    slug={flavour.slug}
                    name={flavour.name}
                    priceLabel={price}
                    image={product?.jarImage ?? '/product/side-eye-jar.png'}
                    className="sbx-duo__add"
                  >
                    add to bag · {price}
                  </QuickBuyButton>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="sbx-duo__controls" aria-label="Choose a flavour">
        <button type="button" className="sbx-round-btn" onClick={() => goTo(Math.max(0, active - 1))} aria-label="Previous flavour" disabled={active === 0}>
          ←
        </button>
        <div className="sbx-duo__dots">
          {FLAVOURS.map((flavour, index) => (
            <button
              key={flavour.slug}
              type="button"
              className={`sbx-duo__dot ${active === index ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Show ${flavour.name}`}
              aria-current={active === index ? 'true' : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          className="sbx-round-btn"
          onClick={() => goTo(Math.min(FLAVOURS.length - 1, active + 1))}
          aria-label="Next flavour"
          disabled={active === FLAVOURS.length - 1}
        >
          →
        </button>
      </div>
      {children}
    </section>
  );
}

export function FlavourSampler() {
  const sampler = findCatalogProduct('sour-sampler');
  if (!sampler) return null;

  return (
    <div className="sbx-duo__both">
      <div className="sbx-duo__both-img">
        <Image src={sampler.jarImage} alt={`${sampler.name}: one jar of each flavour`} fill sizes="(max-width: 768px) 70vw, 300px" quality={78} />
      </div>
      <div className="sbx-duo__both-copy">
        <p className="sbx-duo__both-name">{sampler.name}</p>
        <p className="sbx-duo__both-desc">{sampler.hoverLabel.split('\n').join(' + ')}</p>
        <div className="sbx-duo__actions">
          <QuickBuyButton slug={sampler.slug} name={sampler.name} priceLabel={sampler.price} image={sampler.jarImage} className="sbx-duo__add sbx-duo__add--both">
            add both to bag · {sampler.price}
          </QuickBuyButton>
          <Link href="/product" className="sbx-text-link">
            SHOP NOW →
          </Link>
        </div>
      </div>
    </div>
  );
}
