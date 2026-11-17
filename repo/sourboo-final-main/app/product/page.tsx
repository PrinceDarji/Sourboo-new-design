import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import QuickBuyButton from '../components/cart/QuickBuyButton';
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
const FLAVOUR_COPY: Record<string, string> = {
  sideeyesour: 'Extra tangy. Chaat masala obsessed. Has something to say about everything.',
  tamarintease: 'Sweet, sour and a little fiery. Flirts first. Bites back.',
};

export default function ProductCatalogPage() {
  const singles = CATALOG_PRODUCTS.filter((product) => SINGLE_SLUGS.has(product.slug));
  const bundles = CATALOG_PRODUCTS.filter((product) => !SINGLE_SLUGS.has(product.slug));

  return (
    <main className="sbx-shop">
      <Navbar />

      <section className="sbx-shop__hero" aria-labelledby="sbx-shop-title">
        <h1 id="sbx-shop-title" className="sbx-shop__title">
          Shop
        </h1>
        <p className="sbx-shop__lede">Pick a flavour or grab a bundle. Prices shown. Shipping ₹100 per order.</p>
      </section>

      <Marquee label="Sourboo brand lines" tone="pickle" duration={44} tilt={-0.8} className="sbx-shop__marquee" />

      <section className="sbx-shop__grid" aria-labelledby="sbx-shop-flavours">
        <h2 id="sbx-shop-flavours" className="sr-only">
          Flavours
        </h2>
        <div className="sbx-shop__cards">
          {singles.map((product) => (
            <article key={product.slug} className="sbx-shop__card">
              <Link href={`/product/${product.slug}`} className="sbx-shop__card-img" aria-label={`View ${product.name}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.jarImage} alt="" />
              </Link>
              <h3 className="sbx-shop__card-name">
                <Link href={`/product/${product.slug}`}>{product.name}</Link>
              </h3>
              <p className="sbx-shop__card-flavour">{product.hoverLabel}</p>
              <p className="sbx-shop__card-desc">{FLAVOUR_COPY[product.slug]}</p>
              <p className="sbx-shop__card-price">{product.price}</p>
              <QuickBuyButton
                slug={product.slug}
                name={product.name}
                priceLabel={product.price}
                image={product.jarImage}
                className="sbx-shop__card-add"
              >
                Add to cart
              </QuickBuyButton>
            </article>
          ))}
        </div>
      </section>

      <section className="sbx-shop__bundles" aria-labelledby="sbx-bundles-title">
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
                <QuickBuyButton
                  slug={bundle.slug}
                  name={bundle.name}
                  priceLabel={bundle.price}
                  image={bundle.jarImage}
                  className="sbx-shop__card-add"
                >
                  Add to cart
                </QuickBuyButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sbx-shop__faq" aria-labelledby="sbx-faq-title">
        <h2 id="sbx-faq-title" className="sbx-shop__faq-title">
          FAQs
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
