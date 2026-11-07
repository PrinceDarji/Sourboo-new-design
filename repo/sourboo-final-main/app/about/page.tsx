import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import Highlight from '../components/site/Highlight';
import AboutTongue from '../components/about/AboutTongue';
import '../sourboo-about.css';
import '../sourboo-home.css';
import type { Metadata } from 'next';

export const revalidate = 300;

const aboutTitle = 'About Sourboo — The Pickle Project That Got Out Of Hand';
const aboutDescription =
  'Born from a serious love for tangy, punchy and slightly unhinged flavours. Discover the story of Sourboo, small batches, real ingredients and crunch that actually hits.';

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: {
    absolute: aboutTitle,
  },
  description: aboutDescription,
  openGraph: {
    title: aboutTitle,
    description: aboutDescription,
    url: '/about',
  },
  twitter: {
    title: aboutTitle,
    description: aboutDescription,
  },
};

export default function AboutPage() {
  return (
    <main className="sb-about-page" aria-label="About Sourboo">
      {/* Top Navigation */}
      <Navbar />

      {/* =========================================================================
          1. HERO SECTION: Sakshi - Founder Pickle Feature
          ========================================================================= */}
      <section className="sb-ab-hero-wrap" aria-label="The Pickle Project Hero">
        <div className="sb-ab-container sb-ab-hero-grid">
          {/* Left Column: Heading & Subtitle */}
          <div className="sb-ab-hero-text">
            <p className="sb-ab-hero-kicker">hi i am sakshi, and i am really glad you are here</p>

            <h1 className="sb-ab-hero-heading">
              The pickle project
              <br />
              that got <Highlight>out of hand.</Highlight>
            </h1>

            <p className="sb-ab-hero-sub">
              Born from a serious love for tangy, punchy and slightly unhinged flavours.
            </p>
          </div>

          {/* Right Column: Cutout photo with pink burst & speech arrow */}
          <div className="sb-ab-hero-media">
            <div className="sb-ab-founder-frame">
              {/* Pink Doodle Rays radiating upward */}
              <div className="sb-ab-pink-rays" aria-hidden="true">
                <svg viewBox="0 0 90 50" fill="none" stroke="#E81B6D" strokeWidth="3" strokeLinecap="round">
                  <line x1="16" y1="44" x2="8" y2="18" />
                  <line x1="38" y1="42" x2="34" y2="8" />
                  <line x1="60" y1="44" x2="68" y2="12" />
                  <line x1="80" y1="46" x2="88" y2="28" />
                </svg>
              </div>

              {/* Hand-drawn arrow & yellow pill sticker */}
              <div className="sb-ab-founder-sticker-wrap">
                <p className="sb-ab-founder-sticker">The Founder (Also Chief Pickle Addict)</p>
              </div>

              {/* Founder Image */}
              <div className="sb-ab-founder-img-holder">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/about-cover.JPG"
                  alt="Sourboo Founder Sakshi eating pickled gherkins"
                  className="sb-ab-founder-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. VALUE PROPS STRIP: Soft green wave bar with 3 pillars
          ========================================================================= */}
      <section className="sb-ab-values-section" aria-label="Brand Values">
        <div className="sb-ab-container sb-ab-values-outer">
          {/* Floating Pickle Slice Left */}
          <div className="sb-ab-pickle-slice left" aria-hidden="true">
            <img src="/about/section-three-eyes.webp" alt="" width="110" height="70" />
          </div>

          {/* Main Rounded Green Bar */}
          <div className="sb-ab-values-bar">
            {/* Value 1: Big on Flavour */}
            <div className="sb-ab-value-col">
              <div className="sb-ab-val-icon">
                <img src="/product/side-eye-jar.png" alt="" width="42" height="68" />
              </div>
              <div className="sb-ab-val-text-wrap">
                <span className="sb-ab-val-title">
                  Big on <span className="sb-ab-val-pink-underline">Flavour</span>
                </span>
              </div>
            </div>

            <div className="sb-ab-val-divider" aria-hidden="true" />

            {/* Value 2: Real Ingredients */}
            <div className="sb-ab-value-col">
              <div className="sb-ab-val-icon">
                <img src="/home/ingredients/lemon-wedge.png" alt="" width="46" height="46" />
              </div>
              <div className="sb-ab-val-text-wrap">
                <span className="sb-ab-val-title">Real Ingredients</span>
              </div>
            </div>

            <div className="sb-ab-val-divider" aria-hidden="true" />

            {/* Value 3: For Real Life Cravings */}
            <div className="sb-ab-value-col">
              <div className="sb-ab-val-icon">
                <img src="/home/ingredients/red-chilli.png" alt="" width="52" height="22" />
              </div>
              <div className="sb-ab-val-text-wrap">
                <span className="sb-ab-val-title">For Real Life Cravings</span>
              </div>
            </div>
          </div>

          {/* Floating Pickle Slice Right */}
          <div className="sb-ab-pickle-slice right" aria-hidden="true">
            <img src="/about/eyes2.webp" alt="" width="90" height="70" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. OUR STORY SECTION: Polaroid with 3 jars & Narrative
          ========================================================================= */}
      <section className="sb-ab-story-section" aria-label="Our Story Narrative">
        <div className="sb-ab-container sb-ab-story-grid">
          {/* Left Column: Polaroid Photo Card */}
          <div className="sb-ab-story-photo-col">
            <div className="sb-ab-polaroid-card">
              {/* Yellow Washi Tape at Top */}
              <div className="sb-ab-polaroid-tape" aria-hidden="true" />

              {/* Photo */}
              <div className="sb-ab-polaroid-img-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/section-two-1.webp"
                  alt="Sakshi mixing drinks with friends behind a bar"
                  className="sb-ab-polaroid-img"
                />
              </div>

              {/* Doodle Cartoon Eyes looking up */}
              <div className="sb-ab-polaroid-eyes" aria-hidden="true">
                <img src="/about/section-three-eyes.webp" alt="" width="88" height="56" />
              </div>
            </div>
          </div>

          {/* Right Column: Story Copy & Yellow Pill */}
          <div className="sb-ab-story-text-col">
            <p className="sb-ab-story-kicker">
              <Highlight>Our Story</Highlight>
            </p>

            <p className="sb-ab-story-para">
              It started with late-night cravings, fridge experiments and a very serious question —
              why are good pickles so hard to find?
            </p>

            <p className="sb-ab-story-para">
              So we made our own. Small batches, real ingredients and flavours that actually hit.
            </p>

            <svg className="sb-ab-pink-dash" viewBox="0 0 80 16" fill="none" aria-hidden="true">
              <path d="M2 12C16 4 32 16 48 8C60 2 72 10 78 6" stroke="#E81B6D" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      <section className="sb-ab-life" aria-label="Mixing, tasting, living loud">
        <figure className="sb-ab-life__shot sb-ab-life__shot--a">
          <img src="/about/section-two-2.webp" alt="Sakshi with the bar team tasting and working hospitality shifts" />
        </figure>
        <figure className="sb-ab-life__shot sb-ab-life__shot--b">
          <img src="/about/section-two-3.webp" alt="Sakshi tasting and celebrating with friends" />
        </figure>
        <figure className="sb-ab-life__shot sb-ab-life__shot--c">
          <img src="/about/section-six-top-2.webp" alt="Sourboo tasting moment at an event" />
        </figure>
        <p className="sb-ab-life__note">
          Mixing things. Tasting everything. Different lives, same cravings.
        </p>
      </section>

      <AboutTongue />

      {/* =========================================================================
          4. THE SOURBOO WAY: Left Heading + Soft Yellow Container with 3 pillars
          ========================================================================= */}
      <section className="sb-ab-pillars-section" aria-label="The Sourboo Way">
        <div className="sb-ab-container sb-ab-pillars-grid">
          {/* Left: Heading */}
          <div className="sb-ab-pillars-left">
            <div className="sb-ab-pillars-heading-wrap">
              <svg className="sb-ab-pink-tick top" viewBox="0 0 24 16" fill="none" aria-hidden="true">
                <line x1="4" y1="14" x2="14" y2="4" stroke="#E81B6D" strokeWidth="3" strokeLinecap="round" />
                <line x1="12" y1="14" x2="22" y2="4" stroke="#E81B6D" strokeWidth="3" strokeLinecap="round" />
              </svg>

              <h2 className="sb-ab-pillars-heading">
                The
                <br />
                Sourboo
                <br />
                <Highlight>Way</Highlight>
              </h2>

              <svg className="sb-ab-pink-tick bottom" viewBox="0 0 24 16" fill="none" aria-hidden="true">
                <line x1="4" y1="14" x2="14" y2="4" stroke="#E81B6D" strokeWidth="3" strokeLinecap="round" />
                <line x1="12" y1="14" x2="22" y2="4" stroke="#E81B6D" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Right: Soft Yellow Pill Container */}
          <div className="sb-ab-pillars-right">
            <div className="sb-ab-pillars-yellow-card">
              {/* Pillar 1: Simple, real ingredients */}
              <div className="sb-ab-pillar-item">
                <div className="sb-ab-pillar-icon">
                  <img src="/home/ingredients/chaat-masala.png" alt="" width="54" height="36" />
                </div>
                <h3 className="sb-ab-pillar-label">Simple, real ingredients</h3>
              </div>

              <div className="sb-ab-pillar-line" aria-hidden="true" />

              {/* Pillar 2: Bold, unapologetic flavours */}
              <div className="sb-ab-pillar-item">
                <div className="sb-ab-pillar-icon">
                  <img src="/about/section-three-tongue.webp" alt="" width="54" height="54" />
                </div>
                <h3 className="sb-ab-pillar-label">Bold, unapologetic flavours</h3>
              </div>

              <div className="sb-ab-pillar-line" aria-hidden="true" />

              {/* Pillar 3: Made in small batches */}
              <div className="sb-ab-pillar-item">
                <div className="sb-ab-pillar-icon">
                  <img src="/product/tamarin-jar.png" alt="" width="36" height="58" />
                </div>
                <h3 className="sb-ab-pillar-label">Made in small batches</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. BEHIND THE BRAND: Hot Pink Torn Paper Banner with Checklist
          ========================================================================= */}
      <section className="sb-ab-pink-torn-banner" aria-label="Behind The Brand">
        {/* Top Torn Jagged Edge SVG */}
        <div className="sb-ab-torn-edge top" aria-hidden="true">
          <svg viewBox="0 0 1440 32" preserveAspectRatio="none" fill="#FFFFFF">
            <path d="M0 0L40 18L80 4L120 22L160 8L200 24L240 6L280 20L320 8L360 26L400 6L440 22L480 4L520 20L560 8L600 24L640 4L680 22L720 6L760 24L800 8L840 22L880 6L920 24L960 4L1000 20L1040 6L1080 22L1120 6L1160 22L1200 6L1240 24L1280 8L1320 24L1360 6L1400 20L1440 0V32H0V0Z" />
          </svg>
        </div>

        <div className="sb-ab-container sb-ab-torn-content">
          {/* Floating Pickle Slice on Left */}
          <div className="sb-ab-torn-pickle-left" aria-hidden="true">
            <img src="/about/section-six-top-2.webp" alt="" width="140" height="110" />
          </div>

          {/* Yellow Angled Sticker: Behind The Brand */}
          <div className="sb-ab-torn-badge-wrap">
            <div className="sb-ab-torn-yellow-badge">
              Behind
              <br />
              The Brand
            </div>
          </div>

          {/* Checklist on Right */}
          <div className="sb-ab-torn-checklist">
            <div className="sb-ab-torn-check-item">
              <span className="sb-ab-check-box">✓</span>
              <span className="sb-ab-check-text">A lot of taste testing</span>
            </div>
            <div className="sb-ab-torn-check-item">
              <span className="sb-ab-check-box">✓</span>
              <span className="sb-ab-check-text">Countless fridge raids</span>
            </div>
            <div className="sb-ab-torn-check-item">
              <span className="sb-ab-check-box">✓</span>
              <span className="sb-ab-check-text">Debates over &ldquo;the perfect tang&rdquo;</span>
            </div>
            <div className="sb-ab-torn-check-item">
              <span className="sb-ab-check-box">✓</span>
              <span className="sb-ab-check-text">And a growing pickle obsession</span>
            </div>
          </div>

          {/* Floating Pickle Slice & Star on Right */}
          <div className="sb-ab-torn-pickle-right" aria-hidden="true">
            <img src="/about/section-six-top-3.webp" alt="" width="130" height="110" />
          </div>
        </div>

        {/* Bottom Torn Jagged Edge SVG */}
        <div className="sb-ab-torn-edge bottom" aria-hidden="true">
          <svg viewBox="0 0 1440 32" preserveAspectRatio="none" fill="#D7F557">
            <path d="M0 32L40 14L80 28L120 10L160 24L200 8L240 26L280 12L320 24L360 6L400 26L440 10L480 28L520 12L560 24L600 8L640 28L680 10L720 26L760 8L800 24L840 10L880 26L920 8L960 28L1000 12L1040 26L1080 10L1120 26L1160 10L1200 26L1240 8L1280 24L1320 8L1360 26L1400 12L1440 32V0H0V32Z" />
          </svg>
        </div>
      </section>

      {/* =========================================================================
          6. STILL CURIOUS? SECTION: Pickle Bowl Photo + CTA
          ========================================================================= */}
      <section className="sb-ab-closing-section" aria-label="Still Curious Call to Action">
        <div className="sb-ab-container sb-ab-closing-grid">
          {/* Left Column: Seasoned Pickle Bowl Photo */}
          <div className="sb-ab-closing-media">
            <div className="sb-ab-bowl-card">
              {/* Yellow Floating Seed Dots */}
              <div className="sb-ab-seed-doodles" aria-hidden="true">
                <svg viewBox="0 0 40 30" width="36" height="26" fill="none">
                  <ellipse cx="8" cy="18" rx="2.5" ry="5" fill="#D7F557" transform="rotate(-25 8 18)" />
                  <ellipse cx="20" cy="10" rx="2.5" ry="5" fill="#D7F557" transform="rotate(5 20 10)" />
                  <ellipse cx="32" cy="16" rx="2.5" ry="5" fill="#D7F557" transform="rotate(25 32 16)" />
                </svg>
              </div>

              {/* Photo Frame */}
              <div className="sb-ab-bowl-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/section-six-top-1.webp"
                  alt="Sakshi tasting Sourboo pickled gherkins at a brand event"
                  className="sb-ab-bowl-img"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Title, Subtitle & Buttons */}
          <div className="sb-ab-closing-content">
            <div className="sb-ab-closing-heading-wrap">
              <h2 className="sb-ab-closing-heading">
                Still <Highlight>Curious?</Highlight>
              </h2>
              <svg className="sb-ab-pink-tick right" viewBox="0 0 24 16" fill="none" aria-hidden="true">
                <line x1="4" y1="14" x2="14" y2="4" stroke="#E81B6D" strokeWidth="3" strokeLinecap="round" />
                <line x1="12" y1="14" x2="22" y2="4" stroke="#E81B6D" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            <p className="sb-ab-closing-sub">
              Explore the flavours, read our rant, or just say hi. We’re always up for a good pickle chat.
            </p>

            <div className="sb-ab-closing-buttons">
              <Link href="/product" className="sb-ab-btn-shop">
                Shop Now →
              </Link>
              <Link href="/contact" className="sb-ab-btn-touch">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Website Footer */}
      <SiteFooter />
    </main>
  );
}
