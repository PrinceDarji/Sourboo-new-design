import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import QuickBuyButton from '../components/cart/QuickBuyButton';
import FlavorMatcher from '../components/product/FlavorMatcher';
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
        <div className="sbx-shop__hero-inner">
          {/* Left Column: Bold Typography & Product Discovery */}
          <div className="sbx-shop__hero-copy">
            <p className="sbx-shop__kicker">
              <span>*all sour, zero chill • cravings come first*</span>
            </p>

            <h1 id="sbx-shop-title" className="sbx-shop__title">
              <span className="sbx-shop__title-lead">
                SHOP SOURBOO
                <svg
                  className="sbx-shop__title-sparks"
                  viewBox="0 0 54 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 30" stroke="#f50a59" strokeWidth="5.5" strokeLinecap="round" />
                  <path d="M48 16L23 38" stroke="#f50a59" strokeWidth="5.5" strokeLinecap="round" />
                  <path d="M48 52L26 56" stroke="#f50a59" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="sbx-shop__title-banner-wrap">
                <span className="sbx-shop__title-banner">
                  PICKLED SNACKABLE GHERKINS
                </span>
              </span>
              <span className="sbx-shop__title-sub">&amp; BUNDLES</span>
            </h1>

            <p className="sbx-shop__lede">
              <strong>India’s First Cult Sour Snack.</strong> Snackable pickled gherkins made to be bold, made to be yours.
            </p>

            {/* Shopping & Product Discovery CTAs */}
            <div className="sbx-shop__discovery-row">
              <a href="#flavours" className="sbx-shop__disco-btn sbx-shop__disco-btn--duo">
                <span className="sbx-shop__disco-label">EXPLORE FLAVOURS ↓</span>
                <span className="sbx-shop__disco-tag">Single Jars • ₹399</span>
              </a>
              <a href="#bundles" className="sbx-shop__disco-btn sbx-shop__disco-btn--bundles">
                <span className="sbx-shop__disco-label">CRUNCH BUNDLES ↓</span>
                <span className="sbx-shop__disco-tag">Save up to ₹297</span>
              </a>
            </div>

            {/* Food Trust Badges */}
            <div className="sbx-shop__badges-row">
              <span className="sbx-shop__badge sbx-shop__badge--veg">100% VEGETARIAN</span>
              <span className="sbx-shop__badge sbx-shop__badge--brine">CRAFT FERMENTED BRINE</span>
              <span className="sbx-shop__badge sbx-shop__badge--crunch">CRINKLE-CUT CRUNCH</span>
            </div>
          </div>

          {/* Right Column: Visual Stage with Real Jars & Ingredients */}
          <div className="sbx-shop__hero-stage" aria-hidden="true">
            <div className="sbx-shop__stage-glow" />
            
            <div className="sbx-shop__stage-jars">
              <div className="sbx-shop__jar-card sbx-shop__jar-card--side-eye">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product/catalog/side-eye.webp"
                  alt="Side Eye Sour Jar"
                  className="sbx-shop__stage-img"
                  width={240}
                  height={320}
                />
                <span className="sbx-shop__stage-flavour-badge sbx-shop__stage-flavour-badge--side-eye">
                  SIDE EYE SOUR
                </span>
              </div>

              <div className="sbx-shop__jar-card sbx-shop__jar-card--tamarin">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product/catalog/tamarin-tease.webp"
                  alt="Tamarin' Tease Jar"
                  className="sbx-shop__stage-img"
                  width={240}
                  height={320}
                />
                <span className="sbx-shop__stage-flavour-badge sbx-shop__stage-flavour-badge--tamarin">
                  TAMARIN&apos; TEASE
                </span>
              </div>
            </div>

            {/* Floating Food Elements */}
            <div className="sbx-shop__stage-floats">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/home/ingredients/sliced-gherkin.png"
                alt=""
                className="sbx-shop__float sbx-shop__float--gherkin"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/home/ingredients/lemon-wedge.png"
                alt=""
                className="sbx-shop__float sbx-shop__float--lemon"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/home/ingredients/chaat-masala.png"
                alt=""
                className="sbx-shop__float sbx-shop__float--masala"
              />
              <div className="sbx-shop__stage-sticker font-coolvetica">
                MOUTHS THAT MISBEHAVE
              </div>
            </div>
          </div>
        </div>
      </section>

      <FlavorMatcher />

      <section className="sbx-shop__bundles" id="bundles" aria-labelledby="sbx-bundles-title">
        <div className="sbx-shop__bundles-head">
          <h2 id="sbx-bundles-title" className="sbx-shop__bundles-title">
            Bundles
          </h2>
          <p className="sbx-shop__bundles-note">+ ₹100 shipping per order</p>
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
