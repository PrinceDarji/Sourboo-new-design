import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import QuickBuyButton from '../components/cart/QuickBuyButton';
import OpenQuizButton from '../components/popup/OpenQuizButton';
import { findCatalogProduct } from '@/src/lib/catalog/products';
import type { Metadata } from 'next';

export const revalidate = 300;

const homeTitle = 'Sourboo | The Snack Diary • The Sourboo Way';
const homeDescription =
  'Sourboo makes spicy-sour gherkin snacks and snackable pickles for people obsessed with tangy munchies, cocktails and bold snacking. Handcrafted in small batches.';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: {
    absolute: homeTitle,
  },
  description: homeDescription,
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: '/',
  },
  twitter: {
    title: homeTitle,
    description: homeDescription,
  },
};

export default function HomePage() {
  const sideEye = findCatalogProduct('side-eye-sour');
  const tamarinTease = findCatalogProduct('tamarind-tease');

  return (
    <main className="sb-home-container" style={{ minHeight: '100vh', background: '#F8F6F0' }}>
      <Navbar />

      {/* SECTION 1: Asymmetric Broadsheet Hero */}
      <section className="sb-hero-section" aria-label="Hero">
        <div className="sb-hero-grid">
          {/* Left Column: Headlines & Story */}
          <div className="sb-hero-left">
            <div className="sb-hero-pill-badge font-schoolbell">
              issue 01 • the snack diary
            </div>

            <h1 className="sb-hero-heading font-coolvetica">
              all sour, <br />
              <span className="text-[#FF6392]">zero chill.</span>
            </h1>

            <p className="sb-hero-subheading font-rascal">
              handcrafted gherkins and sour snacks for people who take tangy munchies way too seriously. no preservatives, pure bold bite.
            </p>

            <div className="sb-hero-actions">
              <Link href="/product" className="sb-cta-btn font-coolvetica">
                shop the stash →
              </Link>
              <OpenQuizButton className="sb-quiz-btn font-schoolbell" />
            </div>

            <div className="sb-hero-stickers-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/eyes1.svg" alt="Eyes badge" className="sb-sticker-small" />
              <span className="font-schoolbell text-[#2F4918] text-sm">
                ★ 100% small-batch fermented in mustard oil
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual & Floating Stamps */}
          <div className="sb-hero-right">
            <div className="sb-hero-visual-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-placeholder.webp"
                alt="Sourboo Snack Lifestyle"
                className="sb-hero-img"
              />
              <div className="sb-hero-polaroid-caption font-schoolbell">
                our first batch, august 2024 (we cried eating it)
              </div>
            </div>

            {/* Floating Jars */}
            <div className="sb-hero-floating-jar jar-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/side-eye-jar.png" alt="Side Eye Jar" />
            </div>
            <div className="sb-hero-floating-jar jar-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/tamarin-jar.png" alt="Tamarin Jar" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Wavy Trust Ribbon */}
      <section className="sb-trust-ribbon" aria-label="Brand Highlights">
        <div className="sb-ribbon-track font-coolvetica">
          <span>CRISP GHERKINS</span>
          <span>•</span>
          <span>COLD-PRESSED MUSTARD OIL</span>
          <span>•</span>
          <span>NO PRESERVATIVES</span>
          <span>•</span>
          <span>FIERCE KHATTA FLAVOUR</span>
          <span>•</span>
          <span>SMALL BATCH FERMENTED</span>
          <span>•</span>
          <span>CRISP GHERKINS</span>
          <span>•</span>
          <span>COLD-PRESSED MUSTARD OIL</span>
          <span>•</span>
          <span>NO PRESERVATIVES</span>
        </div>
      </section>

      {/* SECTION 3: The Sour Dossier (Catalog Grid) */}
      <section className="sb-dossier-section" aria-label="The Sour Dossier">
        <div className="sb-section-header">
          <div className="sb-tag font-schoolbell">dossier // 02 flavours</div>
          <h2 className="sb-section-title font-coolvetica">
            meet the <span className="text-[#2F4918]">troublemakers</span>
          </h2>
          <p className="sb-section-subtitle font-rascal">
            two obsessively perfected recipes. choose your side or double up.
          </p>
        </div>

        <div className="sb-dossier-grid">
          {/* Card 1: Side-Eye Sour */}
          {sideEye && (
            <div className="sb-dossier-card card-green">
              <div className="sb-card-badge font-schoolbell">player 01 • the classic khatta</div>
              <div className="sb-card-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sideEye.jarImage}
                  alt={sideEye.name}
                  className="sb-card-img"
                />
              </div>
              <div className="sb-card-content">
                <h3 className="sb-card-title font-coolvetica">{sideEye.name}</h3>
                <p className="sb-card-price font-schoolbell">₹{sideEye.price}</p>
                <p className="sb-card-desc font-rascal">
                  Crisp baby cucumbers doused in fiery mustard seeds, whole black pepper, and unapologetic vinegar crunch.
                </p>
                <div className="sb-card-actions">
                  <Link href={`/product/${sideEye.slug}`} className="sb-card-view-btn font-coolvetica">
                    view details
                  </Link>
                  <QuickBuyButton
                    slug={sideEye.slug}
                    name={sideEye.name}
                    priceLabel={sideEye.price}
                    image={sideEye.jarImage}
                    className="sb-card-quick-buy font-coolvetica"
                  >
                    quick add +
                  </QuickBuyButton>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Tamarind Tease */}
          {tamarinTease && (
            <div className="sb-dossier-card card-orange">
              <div className="sb-card-badge font-schoolbell">player 02 • sweet & psycho</div>
              <div className="sb-card-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tamarinTease.jarImage}
                  alt={tamarinTease.name}
                  className="sb-card-img"
                />
              </div>
              <div className="sb-card-content">
                <h3 className="sb-card-title font-coolvetica">{tamarinTease.name}</h3>
                <p className="sb-card-price font-schoolbell">₹{tamarinTease.price}</p>
                <p className="sb-card-desc font-rascal">
                  Pungent sweet tamarind pulp intertwined with roasted cumin, Kashmiri chili, and crunchy spiced cornichons.
                </p>
                <div className="sb-card-actions">
                  <Link href={`/product/${tamarinTease.slug}`} className="sb-card-view-btn font-coolvetica">
                    view details
                  </Link>
                  <QuickBuyButton
                    slug={tamarinTease.slug}
                    name={tamarinTease.name}
                    priceLabel={tamarinTease.price}
                    image={tamarinTease.jarImage}
                    className="sb-card-quick-buy font-coolvetica"
                  >
                    quick add +
                  </QuickBuyButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: Moments Archive (Zine Wall) */}
      <section className="sb-moments-section" aria-label="Snack Moments Archive">
        <div className="sb-section-header">
          <div className="sb-tag font-schoolbell">scrapbook // archive</div>
          <h2 className="sb-section-title font-coolvetica">
            when to reach for <span className="text-[#FF6392]">the jar</span>
          </h2>
        </div>

        <div className="sb-moments-grid">
          <div className="sb-moment-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/latenightmunchies.webp" alt="Late Night Munchies" />
            <h4 className="sb-moment-title font-coolvetica">2am munchies</h4>
            <p className="font-schoolbell">straight out of the fridge standing in the dark</p>
          </div>

          <div className="sb-moment-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/girldinner.webp" alt="Girl Dinner" />
            <h4 className="sb-moment-title font-coolvetica">girl dinner essential</h4>
            <p className="font-schoolbell">cheese, crackers, chips & 4 fat pickles</p>
          </div>

          <div className="sb-moment-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/postcrysnack.webp" alt="Post Cry Snack" />
            <h4 className="sb-moment-title font-coolvetica">post-cry snack</h4>
            <p className="font-schoolbell">crying burns calories. pickle replaces electrolytes</p>
          </div>

          <div className="sb-moment-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/deskcravings.webp" alt="Desk Cravings" />
            <h4 className="sb-moment-title font-coolvetica">desk break</h4>
            <p className="font-schoolbell">for when that zoom call could have been an email</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Real Ingredients Zero Drama */}
      <section className="sb-ingredients-section" aria-label="Ingredients">
        <div className="sb-ingredients-container">
          <div className="sb-ingredients-content">
            <div className="sb-tag font-schoolbell">zero drama // 100% clean</div>
            <h2 className="sb-ingredients-title font-coolvetica">
              real ingredients, <br />
              <span className="text-[#2F4918]">no sneaky chemicals.</span>
            </h2>
            <p className="sb-ingredients-copy font-rascal">
              Every jar is packed by hand using fresh farm cucumbers, pure cold-pressed mustard oil, whole dried chilies, and authentic Indian spices. Zero artificial colours. Zero synthetic preservatives.
            </p>
            <div className="sb-ingredients-badges">
              <span className="sb-badge-pill font-schoolbell">✓ gluten free</span>
              <span className="sb-badge-pill font-schoolbell">✓ vegan</span>
              <span className="sb-badge-pill font-schoolbell">✓ no refined sugars</span>
              <span className="sb-badge-pill font-schoolbell">✓ probiotic friendly</span>
            </div>
          </div>

          <div className="sb-ingredients-graphic">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/freshingredients.svg"
              alt="Fresh Ingredients Showcase"
              className="sb-fresh-svg"
            />
          </div>
        </div>
      </section>

      {/* SECTION 6: Reviews & Phone Mockup */}
      <section className="sb-reviews-section" aria-label="Customer Reviews">
        <div className="sb-section-header">
          <div className="sb-tag font-schoolbell">the receipts // fan texts</div>
          <h2 className="sb-section-title font-coolvetica">
            what the <span className="text-[#FF6392]">sour babes</span> say
          </h2>
        </div>

        <div className="sb-reviews-phone-container">
          <div className="sb-phone-mockup">
            <div className="sb-phone-header">
              <span className="font-schoolbell text-xs">9:41 AM • 100%</span>
            </div>
            <div className="sb-phone-messages">
              <div className="sb-chat-bubble incoming">
                <p className="font-schoolbell text-base m-0">
                  &ldquo;I literally finished the whole jar in 2 days. The brine is insane on toast!&rdquo;
                </p>
                <span className="text-[10px] text-gray-500 mt-1 block">Ananya K. • Verified Buyer</span>
              </div>
              <div className="sb-chat-bubble incoming">
                <p className="font-schoolbell text-base m-0">
                  &ldquo;Finally an Indian pickle brand that gets aesthetic snacking. Tamarind tease is god-tier.&rdquo;
                </p>
                <span className="text-[10px] text-gray-500 mt-1 block">Rohan M. • Mumbai</span>
              </div>
              <div className="sb-chat-bubble incoming">
                <p className="font-schoolbell text-base m-0">
                  &ldquo;My boyfriend hates pickles and he stole half my jar. Sending you the breakup bill.&rdquo;
                </p>
                <span className="text-[10px] text-gray-500 mt-1 block">Pooja S. • Bangalore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
