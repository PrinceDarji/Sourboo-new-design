import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import QuickBuyButton from '../components/cart/QuickBuyButton';
import FlavourDuo from '../components/home/FlavourDuo';
import TasteGame from '../components/home/TasteGame';
import Marquee from '../components/site/Marquee';
import { CATALOG_PRODUCTS } from '@/src/lib/catalog/products';
import '../sourboo-home.css';
import '../sourboo-shop.css';
import type { Metadata } from 'next';

export const revalidate = 300;

const pageTitle = 'Shop Sourboo pickled snackable gherkins and bundles';
const pageDescription =
  'Shop Sourboo pickled snackable gherkins and bundles. India’s first cult sour snack. Tangy, spicy, unapologetically crunchy gherkins in craft brines.';

export const metadata: Metadata = {
  alternates: { canonical: '/product' },
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: '/product',
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
};

const FAQ_ITEMS = [
  {
    question: '1. what is it made of?',
    answer: 'sourboo is made using sliced gherkins, flavoured for that sharp, mouth-watering hit.',
  },
  {
    question: '2. is sourboo vegetarian?',
    answer: 'yes!! 100% vegetarian',
  },
  {
    question: '3. is this a pickle?',
    answer: "nope not in the traditional sense. it's not meant to sit quietly next to your meal.",
  },
  {
    question: '4. how do i eat it?',
    answer: 'straight from the jar. no cooking needed. add it to chaat or snacks if you want but it holds its own.',
  },
  {
    question: '5. how should i store it?',
    answer: 'store in a cool, dry place and once opened, refrigerate and keep the lid closed properly.',
  },
];

const SINGLE_SLUGS = new Set(['sideeyesour', 'tamarintease']);

export default function ProductCatalogPage() {
  const bundles = CATALOG_PRODUCTS.filter((product) => !SINGLE_SLUGS.has(product.slug));

  return (
    <main className="sbx-shop">
      <Navbar />

      <section className="sbx-shop__hero" aria-labelledby="sbx-shop-title">
        <p className="sbx-shop__kicker font-schoolbell">*all sour, zero chill • cravings come first*</p>
        <h1 id="sbx-shop-title" className="sbx-shop__title">
          Shop Sourboo pickled snackable gherkins and bundles
        </h1>
        <p className="sbx-shop__lede">
          India’s First Cult Sour Snack. Snackable pickled gherkins made to be bold, made to be yours.
        </p>
      </section>

      <Marquee label="Sourboo brand lines" tone="berry" duration={44} tilt={-0.8} className="sbx-shop__marquee" />

      <FlavourDuo />

      <section className="sbx-shop__bundles" aria-labelledby="sbx-bundles-title">
        <div className="sbx-shop__bundles-head">
          <h2 id="sbx-bundles-title" className="sbx-shop__bundles-title">
            Bundles
          </h2>
          <p className="sbx-shop__bundles-note font-schoolbell">+ ₹100 shipping per order</p>
        </div>

        <div className="sbx-shop__bundle-track" role="list">
          {bundles.map((bundle) => (
            <article key={bundle.slug} className="sbx-shop__bundle" role="listitem">
              <Link href={`/product/${bundle.slug}`} className="sbx-shop__bundle-img" aria-label={`View ${bundle.name}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={bundle.jarImage} alt="" />
              </Link>
              <h3 className="sbx-shop__bundle-name">
                <Link href={`/product/${bundle.slug}`}>{bundle.name}</Link>
              </h3>
              <p className="sbx-shop__bundle-desc">{bundle.hoverLabel.split('\n').join(' + ')}</p>
              <p className="sbx-shop__bundle-price">{bundle.price}</p>
              <div className="sbx-shop__bundle-actions">
                <Link href={`/product/${bundle.slug}`} className="sbx-text-link">
                  DETAILS →
                </Link>
                <QuickBuyButton
                  slug={bundle.slug}
                  name={bundle.name}
                  priceLabel={bundle.price}
                  image={bundle.jarImage}
                  className="sbx-duo__add sbx-duo__add--both"
                >
                  {bundle.slug === 'sourboo-stash' ? 'CLAIM STASH +' : 'QUICK ADD +'}
                </QuickBuyButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <TasteGame id="shop-taste-game" />

      <section className="sbx-shop__faq" aria-labelledby="sbx-faq-title">
        <h2 id="sbx-faq-title" className="sbx-shop__faq-title">
          get your <span className="sbx-layer" data-tone="lemon"><span className="sbx-layer__hand" aria-hidden="true">FAQs</span><span className="sbx-layer__top">FAQs</span></span> of what you put in ur mouth
        </h2>
        <div className="sbx-shop__faq-list">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="sbx-shop__faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
