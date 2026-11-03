import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import QuickBuyButton from '../components/cart/QuickBuyButton';
import FlavorMatcher from '../components/product/FlavorMatcher';
import { CATALOG_PRODUCTS } from '@/src/lib/catalog/products';
import type { Metadata } from 'next';

export const revalidate = 300;

const shopTitle = 'Shop All Flavours | Sourboo';
const shopDescription =
  'Browse the complete Sourboo stash. Crisp gherkins in spicy vinegar brine, sweet tamarind crunch, small-batch gift bundles and sampler packs.';

export const metadata: Metadata = {
  alternates: { canonical: '/product' },
  title: {
    absolute: shopTitle,
  },
  description: shopDescription,
  openGraph: {
    title: shopTitle,
    description: shopDescription,
    url: '/product',
  },
  twitter: {
    title: shopTitle,
    description: shopDescription,
  },
};

export default function ProductCatalogPage() {
  return (
    <main className="sb-shop-container" style={{ minHeight: '100vh', background: '#F8F6F0' }}>
      <Navbar />

      {/* Shop Header */}
      <section className="sb-shop-hero" aria-label="Shop Header">
        <div className="sb-shop-hero-inner">
          <div className="sb-tag font-schoolbell">catalog // the full lineup</div>
          <h1 className="sb-shop-heading font-coolvetica">
            all sour, <span className="text-[#FF6392]">zero chill.</span>
          </h1>
          <p className="sb-shop-subheading font-rascal">
            handcrafted in small batches. free shipping on 2+ jars. get your crunch on.
          </p>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="sb-catalog-section" aria-label="Products Grid">
        <div className="sb-catalog-grid">
          {CATALOG_PRODUCTS.map((prod) => {
            const secondaryImage =
              prod.galleryImages && prod.galleryImages.length > 1
                ? prod.galleryImages[1]
                : null;

            return (
              <div key={prod.slug} className="sb-catalog-card">
                <Link href={`/product/${prod.slug}`} className="sb-catalog-img-link">
                  <div className="sb-catalog-img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prod.jarImage}
                      alt={prod.name}
                      className="sb-catalog-jar-img primary"
                    />
                    {secondaryImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={secondaryImage}
                        alt={`${prod.name} lifestyle`}
                        className="sb-catalog-jar-img secondary"
                      />
                    )}
                  </div>
                </Link>

                <div className="sb-catalog-details">
                  <div className="sb-catalog-badge font-schoolbell">small batch</div>
                  <h3 className="sb-catalog-title font-coolvetica">
                    <Link href={`/product/${prod.slug}`}>{prod.name}</Link>
                  </h3>
                  <p className="sb-catalog-price font-schoolbell">₹{prod.price}</p>
                  <p className="sb-catalog-snippet font-rascal">{prod.detailInJarSummary}</p>

                  <div className="sb-catalog-actions">
                    <Link href={`/product/${prod.slug}`} className="sb-catalog-view-btn font-coolvetica">
                      view jar
                    </Link>
                    <QuickBuyButton
                      slug={prod.slug}
                      name={prod.name}
                      priceLabel={prod.price}
                      image={prod.jarImage}
                      className="sb-catalog-quick-btn font-coolvetica"
                    >
                      quick add +
                    </QuickBuyButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Flavor Matcher */}
      <FlavorMatcher />

      {/* Reviews Marquee */}
      <section className="sb-trust-ribbon" aria-label="Reviews Ribbon" style={{ background: '#FF6392', color: '#FFF' }}>
        <div className="sb-ribbon-track font-coolvetica">
          <span>&ldquo;SO ADDICTIVE!&rdquo;</span>
          <span>★</span>
          <span>&ldquo;THE BRINE IS LIQUID GOLD&rdquo;</span>
          <span>★</span>
          <span>&ldquo;PERFECT COCKTAIL GARNISH&rdquo;</span>
          <span>★</span>
          <span>&ldquo;ZERO GUILT SNACKING&rdquo;</span>
          <span>★</span>
          <span>&ldquo;SO ADDICTIVE!&rdquo;</span>
          <span>★</span>
          <span>&ldquo;THE BRINE IS LIQUID GOLD&rdquo;</span>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
