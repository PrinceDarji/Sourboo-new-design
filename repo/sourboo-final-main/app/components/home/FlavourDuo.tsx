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
  combo: string;
  description: string;
};

const FLAVOURS: Flavour[] = [
  {
    slug: 'sideeyesour',
    jar: 'side-eye',
    name: 'SIDE EYE SOUR',
    combo: 'LEMON + CHAAT MASALA',
    description: 'Extra tangy. Chaat masala obsessed. Has something to say about everything.',
  },
  {
    slug: 'tamarintease',
    jar: 'tamarin',
    name: 'TAMARIN’ TEASE',
    combo: 'TAMARIND + CHILLI',
    description: 'Sweet, sour and a little fiery. Flirts first. Bites back.',
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
        <p className="sbx-duo__kicker">Snackable pickled gherkins.</p>
        <h2 id="sbx-duo-title" className="sbx-duo__title">
          Snacks with <span className="sbx-duo__mark">personality.</span>
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
                {/* 1. Product name */}
                <h3 className="sbx-duo__name">{flavour.name}</h3>

                {/* 2. Flavour */}
                <p className="sbx-duo__combo">{flavour.combo}</p>

                {/* 3. One short description */}
                <p className="sbx-duo__desc">{flavour.description}</p>

                {/* 4. Price */}
                <p className="sbx-duo__price">{price}</p>

                {/* 5. One purchase CTA */}
                <div className="sbx-duo__actions">
                  <QuickBuyButton
                    slug={flavour.slug}
                    name={flavour.name}
                    priceLabel={price}
                    image={product?.jarImage ?? (flavour.slug === 'sideeyesour' ? '/product/side-eye-jar.webp' : '/product/tamarin-jar.webp')}
                    className="sbx-duo__buy-cta"
                  >
                    ADD TO BAG →
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
    <div className="sbx-duo__both" aria-label="Sour sampler pack">
      <div className="sbx-duo__both-img">
        <Image
          src={sampler.jarImage}
          alt={`${sampler.name}: one jar of each flavour`}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 48vw, 480px"
          quality={88}
        />
      </div>
      <div className="sbx-duo__both-copy">
        <h3 className="sbx-duo__both-name">{sampler.name}</h3>
        <p className="sbx-duo__both-desc">{sampler.hoverLabel.split('\n').join(' + ')}</p>
        <div className="sbx-duo__actions">
          <QuickBuyButton
            slug={sampler.slug}
            name={sampler.name}
            priceLabel={sampler.price}
            image={sampler.jarImage}
            className="sbx-duo__add sbx-duo__add--both"
          >
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
