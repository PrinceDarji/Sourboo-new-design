'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import InteractiveJar, { type JarFlavour } from '../product/InteractiveJar';
import QuickBuyButton from '../cart/QuickBuyButton';
import { findCatalogProduct } from '@/src/lib/catalog/products';

type Flavour = {
  slug: string;
  jar: JarFlavour;
  name: string;
  description: string;
  ingredients: string[];
};

const FLAVOURS: Flavour[] = [
  {
    slug: 'sideeyesour',
    jar: 'side-eye',
    name: 'SIDE EYE SOUR',
    description: 'Extra tangy. Chaat masala obsessed. Has something to say about everything.',
    ingredients: ['Lemon', 'Chaat masala'],
  },
  {
    slug: 'tamarintease',
    jar: 'tamarin',
    name: 'TAMARIN’ TEASE',
    description: 'Sweet, sour and a little fiery. Flirts first. Bites back.',
    ingredients: ['Tamarind', 'Chilli'],
  },
];

export default function FlavourDuo({ children }: { children?: ReactNode }) {
  return (
    <section className="sbx-duo" id="flavours" aria-labelledby="sbx-duo-title">
      <div className="sbx-duo__head">
        <h2 id="sbx-duo-title" className="sbx-duo__title">
          WHAT’S IN THE JAR?
        </h2>
        <p className="sbx-duo__kicker">Hover a jar to see the ingredients. Then pick your flavour.</p>
      </div>

      <div className="sbx-duo__track">
        {FLAVOURS.map((flavour) => {
          const product = findCatalogProduct(flavour.slug);
          const price = product?.price ?? '₹399';
          return (
            <article key={flavour.slug} className={`sbx-duo__slide sbx-duo__slide--${flavour.jar}`}>
              <div className="sbx-duo__jar">
                <InteractiveJar
                  flavour={flavour.jar}
                  name={flavour.name}
                  label={product?.hoverLabel ?? flavour.ingredients.join(' & ')}
                  sizes="(max-width: 768px) 70vw, 280px"
                  priority
                />
              </div>
              <div className="sbx-duo__info">
                <p className="sbx-duo__combo" aria-label={`${flavour.name} ingredients`}>
                  {flavour.ingredients.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </p>
                <h3 className="sbx-duo__name">
                  <Link href={`/product/${flavour.slug}`}>{flavour.name}</Link>
                </h3>
                <p className="sbx-duo__desc">{flavour.description}</p>
                <p className="sbx-duo__price">{price}</p>
                <QuickBuyButton
                  slug={flavour.slug}
                  name={flavour.name}
                  priceLabel={price}
                  image={product?.jarImage ?? '/product/side-eye-jar.webp'}
                  className="sbx-duo__add"
                >
                  Add to bag · {price}
                </QuickBuyButton>
              </div>
            </article>
          );
        })}
      </div>
      {children}
    </section>
  );
}

export function FlavourSampler() {
  const sampler = findCatalogProduct('sour-sampler');
  if (!sampler) return null;

  return (
    <aside className="sbx-duo__both" aria-labelledby="sbx-sampler-title">
      <div className="sbx-duo__both-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sampler.jarImage}
          alt={`${sampler.name}: one jar of Side Eye Sour and one jar of Tamarin’ Tease`}
        />
      </div>
      <div className="sbx-duo__both-copy">
        <p className="sbx-duo__both-kicker">Buy both flavours together</p>
        <h3 id="sbx-sampler-title" className="sbx-duo__both-name">
          {sampler.name}
        </h3>
        <p className="sbx-duo__both-desc">1 × Side Eye Sour + 1 × Tamarin’ Tease</p>
        <p className="sbx-duo__price sbx-duo__price--sampler">{sampler.price}</p>
        <QuickBuyButton
          slug={sampler.slug}
          name={sampler.name}
          priceLabel={sampler.price}
          image={sampler.jarImage}
          className="sbx-duo__add sbx-duo__add--both"
        >
          Add sampler · {sampler.price}
        </QuickBuyButton>
      </div>
    </aside>
  );
}
