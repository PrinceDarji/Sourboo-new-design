import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import QuickBuyButton from '../components/cart/QuickBuyButton';
import FlavorMatcher from '../components/product/FlavorMatcher';
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

export default function ProductCatalogPage() {
  const individualProducts = [
    {
      slug: 'sideeyesour',
      name: 'SIDE EYE SOUR',
      badge: 'CASE #001',
      isBestseller: false,
      descriptor: 'Lemon & Chaat Masala',
      descriptorClass: '',
      price: '₹399',
      priceNumber: 399,
      shippingNote: '+ ₹100 shipping per order',
      summary:
        'Properly khatta with street-style chaat masala obsession and crinkle-cut crunch. Perfect for loud cravings.',
      primaryImage: '/product/catalog/side-eye.webp',
      hoverImage: '/product/catalog/side-eye-lifestyle.webp',
    },
    {
      slug: 'tamarintease',
      name: 'TAMARIN’ TEASE',
      badge: 'BEST SELLER',
      isBestseller: true,
      descriptor: 'Tamarind & Chilli',
      descriptorClass: 'chilli',
      price: '₹399',
      priceNumber: 399,
      shippingNote: '+ ₹100 shipping per order',
      summary:
        'Sweet-sour authentic imli hit with whole gherkin snap and a slow teasing chilli warmth that refuses to be ignored.',
      primaryImage: '/product/catalog/tamarin-tease.webp',
      hoverImage: '/product/catalog/tamarin-lifestyle.webp',
    },
  ];

  const bundleProducts = [
    {
      slug: 'tamarind-twins',
      name: 'TAMARIND TWINS',
      badge: '2-JAR PACK',
      isBestseller: false,
      descriptor: '2 × TAMARIN’ TEASE (Tamarind & Chilli)',
      price: '₹729',
      priceNumber: 729,
      shippingNote: '+ ₹100 shipping per order',
      image: '/product/catalog/tamarind-twins.webp',
      ctaText: 'QUICK ADD +',
    },
    {
      slug: 'lemon-lovers',
      name: 'LEMON LOVERS',
      badge: '2-JAR PACK',
      isBestseller: false,
      descriptor: '2 × SIDE EYE SOUR (Lemon & Chaat Masala)',
      price: '₹729',
      priceNumber: 729,
      shippingNote: '+ ₹100 shipping per order',
      image: '/product/catalog/lemon-lovers.webp',
      ctaText: 'QUICK ADD +',
    },
    {
      slug: 'sour-sampler',
      name: 'SOUR SAMPLER',
      badge: 'BESTSELLER',
      isBestseller: true,
      descriptor:
        '1 × SIDE EYE SOUR (Lemon & Chaat Masala) + 1 × TAMARIN’ TEASE (Tamarind & Chilli)',
      price: '₹729',
      priceNumber: 729,
      shippingNote: '+ ₹100 shipping per order',
      image: '/product/catalog/sour-sampler.webp',
      ctaText: 'QUICK ADD +',
    },
    {
      slug: 'sourboo-stash',
      name: 'SOURBOO STASH',
      badge: 'ULTIMATE 4-PACK',
      isBestseller: false,
      descriptor:
        '2 × SIDE EYE SOUR (Lemon & Chaat Masala) + 2 × TAMARIN’ TEASE (Tamarind & Chilli)',
      price: '₹1,299',
      priceNumber: 1299,
      shippingNote: '+ ₹100 shipping per order',
      image: '/product/catalog/sourboo-stash.webp',
      ctaText: 'CLAIM STASH +',
    },
  ];

  return (
    <main className="sb-shop-page" aria-label="Sourboo Product Collection">
      {/* Navigation */}
      <Navbar />

      {/* Collection Hero Banner */}
      <section className="sb-shop-hero-banner" aria-label="Catalog Title">
        <div className="sb-shop-hero-pill sb-entry-stamp sb-delay-1">
          *all sour, zero chill • cravings come first*
        </div>
        <h1 className="sb-shop-hero-title sb-entry-pop sb-delay-2">
          Shop Sourboo pickled snackable gherkins and bundles
        </h1>
        <p className="sb-shop-hero-sub sb-entry-pop sb-delay-3">
          Tangy, spicy, unapologetically crunchy. Handcrafted in small batches with
          zero dead weight. Meet the gherkin that refuses to be a side dish.
        </p>
      </section>

      {/* Main Collection Container */}
      <div className="sb-collection-section sb-entry-jar-drop sb-delay-4">
        {/* Section 1: Individual Products */}
        <div className="sb-collection-header">
          <h2 className="sb-collection-heading">
            Individual products
          </h2>
          <span className="sb-collection-tag">Single Jars // Net Wt: 370 ml</span>
        </div>

        <div className="sb-singles-grid">
          {individualProducts.map((prod) => (
            <div key={prod.slug} className="sb-product-card-large">
              <span
                className={`sb-card-badge ${prod.isBestseller ? 'bestseller' : ''}`}
              >
                {prod.badge}
              </span>

              <Link
                href={`/product/${prod.slug}`}
                className="sb-card-image-box"
                aria-label={`View ${prod.name}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prod.primaryImage}
                  alt={prod.name}
                  className="sb-card-img-primary"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prod.hoverImage}
                  alt={`${prod.name} lifestyle`}
                  className="sb-card-img-hover"
                />
              </Link>

              <div className="sb-card-content">
                <h3 className="sb-card-title">
                  <Link href={`/product/${prod.slug}`}>{prod.name}</Link>
                </h3>

                <p className={`sb-card-descriptor ${prod.descriptorClass}`}>
                  {prod.descriptor}
                </p>

                <p className="sb-card-summary">{prod.summary}</p>

                <div className="sb-card-price-row">
                  <span className="sb-card-price">{prod.price}</span>
                  <span className="sb-card-shipping-pill">{prod.shippingNote}</span>
                </div>

                <div className="sb-card-btn-row">
                  <Link href={`/product/${prod.slug}`} className="sb-btn-view">
                    VIEW JAR →
                  </Link>
                  <QuickBuyButton
                    slug={prod.slug}
                    name={prod.name}
                    priceLabel={prod.price}
                    image={prod.primaryImage}
                    className="sb-btn-quick-add"
                  >
                    QUICK ADD +
                  </QuickBuyButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Bundles */}
        <div className="sb-collection-header" style={{ marginTop: '30px' }}>
          <h2 className="sb-collection-heading">
            Bundles
          </h2>
          <span className="sb-collection-tag">Multi-Packs // Save on Craving Fuel</span>
        </div>

        <div className="sb-bundles-grid">
          {bundleProducts.map((bundle) => (
            <div key={bundle.slug} className="sb-product-card-bundle">
              <span
                className={`sb-card-badge ${bundle.isBestseller ? 'bestseller' : ''}`}
              >
                {bundle.badge}
              </span>

              <Link
                href={`/product/${bundle.slug}`}
                className="sb-bundle-image-box"
                aria-label={`View ${bundle.name}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="sb-bundle-img"
                />
              </Link>

              <h3 className="sb-bundle-title">
                <Link href={`/product/${bundle.slug}`}>{bundle.name}</Link>
              </h3>

              <p className="sb-bundle-descriptor">{bundle.descriptor}</p>

              <div className="sb-bundle-price-row">
                <span className="sb-bundle-price">{bundle.price}</span>
                <span className="sb-bundle-shipping-pill">{bundle.shippingNote}</span>
              </div>

              <div className="sb-bundle-btn-row">
                <Link href={`/product/${bundle.slug}`} className="sb-btn-view">
                  DETAILS →
                </Link>
                <QuickBuyButton
                  slug={bundle.slug}
                  name={bundle.name}
                  priceLabel={bundle.price}
                  image={bundle.image}
                  className="sb-btn-quick-add"
                >
                  {bundle.ctaText}
                </QuickBuyButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flavour Matcher Interactive Section */}
      <FlavorMatcher />

      {/* Trust & Reviews Ribbon */}
      <section className="sb-shop-reviews-ribbon" aria-label="Customer Reviews Ticker">
        <div className="sb-shop-ribbon-track">
          <span>&ldquo;SO ADDICTIVE!&rdquo;</span>
          <span>★</span>
          <span>&ldquo;THE BRINE IS LIQUID GOLD&rdquo;</span>
          <span>★</span>
          <span>&ldquo;PERFECT COCKTAIL GARNISH&rdquo;</span>
          <span>★</span>
          <span>&ldquo;ZERO GUILT SNACKING&rdquo;</span>
          <span>★</span>
          <span>&ldquo;UNAPOLOGETICALLY CRUNCHY&rdquo;</span>
          <span>★</span>
          <span>&ldquo;BEST PICKLES IN INDIA&rdquo;</span>
          <span>★</span>
          <span>&ldquo;SO ADDICTIVE!&rdquo;</span>
          <span>★</span>
          <span>&ldquo;THE BRINE IS LIQUID GOLD&rdquo;</span>
        </div>
      </section>

      {/* Brand Footer */}
      <SiteFooter />
    </main>
  );
}
