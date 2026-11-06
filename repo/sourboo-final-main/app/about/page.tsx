import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import Highlight from '../components/site/Highlight';
import '../sourboo-about.css';
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
            <div className="sb-ab-pill-tag-row sb-entry-stamp sb-delay-1">
              <span className="sb-ab-pill-tag">About Sourboo</span>
              <svg className="sb-ab-pink-squiggle" viewBox="0 0 60 12" fill="none" aria-hidden="true">
                <path
                  d="M2 7C9 2 17 11 25 6C33 1 41 11 49 6C53 3.5 56 5 58 7"
                  stroke="#E81B6D"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h1 className="sb-ab-hero-heading sb-entry-pop sb-delay-2">
              The pickle project
              <br />
              that got{' '}
              <span className="sb-ab-pink-box">
                <Highlight>out of hand.</Highlight>
                <svg className="sb-ab-brush-sparks" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M4 28L12 20M2 14L14 14M10 2L14 12" stroke="#E81B6D" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="sb-ab-hero-sub sb-entry-pop sb-delay-3">
              Born from a serious love for tangy, punchy and slightly unhinged flavours.
            </p>
          </div>

          {/* Right Column: Cutout photo with pink burst & speech arrow */}
          <div className="sb-ab-hero-media">
            <div className="sb-ab-founder-frame sb-entry-jar-drop sb-delay-3">
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
                <svg className="sb-ab-sticker-arrow" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <path
                    d="M10 8C20 4 32 12 28 26C26 31 22 34 16 36M16 36L22 32M16 36L20 40"
                    stroke="#26140A"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="sb-ab-founder-sticker">
                  The Founder (Also Chief Pickle Addict) 🥒
                </div>
              </div>

              {/* Founder Image */}
              <div className="sb-ab-founder-img-holder">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about-cover.JPG"
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
            <svg viewBox="0 0 100 80" width="85" height="68">
              <ellipse cx="50" cy="40" rx="44" ry="34" fill="#632D10" stroke="#26140A" strokeWidth="3" />
              <ellipse cx="50" cy="40" rx="38" ry="28" fill="#D7F557" />
              <ellipse cx="50" cy="40" rx="30" ry="21" fill="#FDFBF7" />
              <ellipse cx="44" cy="38" rx="4" ry="2" fill="#632D10" transform="rotate(-15 44 38)" />
              <ellipse cx="54" cy="36" rx="4" ry="2" fill="#632D10" transform="rotate(20 54 36)" />
              <ellipse cx="49" cy="45" rx="3.5" ry="1.8" fill="#632D10" transform="rotate(5 49 45)" />
              <circle cx="38" cy="42" r="1.5" fill="#26140A" />
              <circle cx="61" cy="40" r="1.5" fill="#26140A" />
            </svg>
          </div>

          {/* Main Rounded Green Bar */}
          <div className="sb-ab-values-bar">
            {/* Value 1: Big on Flavour */}
            <div className="sb-ab-value-col">
              <div className="sb-ab-val-icon">
                <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                  <rect x="12" y="7" width="24" height="6" rx="3" fill="#D7F557" stroke="#26140A" strokeWidth="2.5" />
                  <path d="M14 13H34V37C34 40.5 31.5 43 28 43H20C16.5 43 14 40.5 14 37V13Z" fill="#FDFBF7" stroke="#26140A" strokeWidth="2.5" />
                  <ellipse cx="24" cy="28" rx="6" ry="9" fill="#D7F557" stroke="#632D10" strokeWidth="1.5" />
                  <ellipse cx="24" cy="28" rx="4" ry="6" fill="#FDFBF7" />
                  <circle cx="23" cy="27" r="1" fill="#632D10" />
                </svg>
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
                <svg viewBox="0 0 54 48" width="46" height="40" fill="none">
                  <ellipse cx="20" cy="26" rx="15" ry="11" fill="#D7F557" stroke="#26140A" strokeWidth="2.5" transform="rotate(-20 20 26)" />
                  <ellipse cx="20" cy="26" rx="10" ry="7" fill="#FDFBF7" transform="rotate(-20 20 26)" />
                  <ellipse cx="34" cy="24" rx="15" ry="11" fill="#C96A00" stroke="#26140A" strokeWidth="2.5" transform="rotate(22 34 24)" />
                  <ellipse cx="34" cy="24" rx="10" ry="7" fill="#FDFBF7" transform="rotate(22 34 24)" />
                  <circle cx="34" cy="24" r="1.5" fill="#632D10" />
                </svg>
              </div>
              <div className="sb-ab-val-text-wrap">
                <span className="sb-ab-val-title">Real Ingredients</span>
              </div>
            </div>

            <div className="sb-ab-val-divider" aria-hidden="true" />

            {/* Value 3: For Real Life Cravings */}
            <div className="sb-ab-value-col">
              <div className="sb-ab-val-icon">
                <svg viewBox="0 0 44 48" width="36" height="40" fill="none">
                  <polygon
                    points="26,4 12,25 22,25 18,44 34,21 24,21"
                    fill="#D7F557"
                    stroke="#26140A"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="sb-ab-val-text-wrap">
                <span className="sb-ab-val-title">For Real Life Cravings</span>
              </div>
            </div>
          </div>

          {/* Floating Pickle Slice Right */}
          <div className="sb-ab-pickle-slice right" aria-hidden="true">
            <svg viewBox="0 0 100 80" width="85" height="68">
              <ellipse cx="50" cy="40" rx="44" ry="34" fill="#632D10" stroke="#26140A" strokeWidth="3" />
              <ellipse cx="50" cy="40" rx="38" ry="28" fill="#D7F557" />
              <ellipse cx="50" cy="40" rx="30" ry="21" fill="#FDFBF7" />
              <ellipse cx="44" cy="38" rx="4" ry="2" fill="#632D10" transform="rotate(-15 44 38)" />
              <ellipse cx="54" cy="36" rx="4" ry="2" fill="#632D10" transform="rotate(20 54 36)" />
              <ellipse cx="49" cy="45" rx="3.5" ry="1.8" fill="#632D10" transform="rotate(5 49 45)" />
              <circle cx="38" cy="42" r="1.5" fill="#26140A" />
            </svg>
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
                  src="/home/recipe-2.webp"
                  alt="Sourboo pickle jars on rustic cutting board with pickled snack bowl"
                  className="sb-ab-polaroid-img"
                />
              </div>

              {/* Doodle Cartoon Eyes looking up */}
              <div className="sb-ab-polaroid-eyes" aria-hidden="true">
                <svg viewBox="0 0 64 42" width="60" height="40" fill="none">
                  {/* Left eye */}
                  <ellipse cx="20" cy="22" rx="16" ry="18" fill="#FFFFFF" stroke="#26140A" strokeWidth="3" />
                  <ellipse cx="24" cy="18" rx="8" ry="9" fill="#26140A" />
                  <circle cx="27" cy="15" r="3" fill="#FFFFFF" />
                  <path d="M6 10C12 4 24 5 30 11" stroke="#E81B6D" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Right eye */}
                  <ellipse cx="46" cy="22" rx="14" ry="16" fill="#FFFFFF" stroke="#26140A" strokeWidth="3" />
                  <ellipse cx="50" cy="18" rx="7" ry="8" fill="#26140A" />
                  <circle cx="53" cy="15" r="2.5" fill="#FFFFFF" />
                  <path d="M36 11C42 5 54 6 58 12" stroke="#E81B6D" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column: Story Copy & Yellow Pill */}
          <div className="sb-ab-story-text-col">
            <div className="sb-ab-story-tag-wrap">
              <span className="sb-ab-story-pill">Our Story</span>
              {/* Pink Doodles near the tag */}
              <svg className="sb-ab-story-spark" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <path d="M4 18L14 10L10 24L26 12M24 28L32 20" stroke="#E81B6D" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

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
                  <svg viewBox="0 0 54 48" width="48" height="42" fill="none">
                    <ellipse cx="20" cy="26" rx="14" ry="10" fill="#D7F557" stroke="#26140A" strokeWidth="2.5" transform="rotate(-20 20 26)" />
                    <ellipse cx="20" cy="26" rx="9" ry="6" fill="#FDFBF7" transform="rotate(-20 20 26)" />
                    <ellipse cx="34" cy="24" rx="14" ry="10" fill="#C96A00" stroke="#26140A" strokeWidth="2.5" transform="rotate(22 34 24)" />
                    <ellipse cx="34" cy="24" rx="9" ry="6" fill="#FDFBF7" transform="rotate(22 34 24)" />
                  </svg>
                </div>
                <h3 className="sb-ab-pillar-label">Simple, real ingredients</h3>
              </div>

              <div className="sb-ab-pillar-line" aria-hidden="true" />

              {/* Pillar 2: Bold, unapologetic flavours */}
              <div className="sb-ab-pillar-item">
                <div className="sb-ab-pillar-icon">
                  <svg viewBox="0 0 48 48" width="46" height="42" fill="none">
                    {/* Pink lips */}
                    <path
                      d="M10 23C13 18 19 19 24 22C29 19 35 18 38 23C38 23 34 32 24 32C14 32 10 23 10 23Z"
                      fill="#E81B6D"
                      stroke="#26140A"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    {/* Green tongue */}
                    <path d="M19 26C19 34 21.5 39 24 39C26.5 39 29 34 29 26H19Z" fill="#FDFBF7" stroke="#26140A" strokeWidth="2" />
                    <line x1="24" y1="26" x2="24" y2="35" stroke="#632D10" strokeWidth="1.5" />
                    {/* Spark */}
                    <path d="M8 12L12 16M14 8L16 14" stroke="#E81B6D" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="sb-ab-pillar-label">Bold, unapologetic flavours</h3>
              </div>

              <div className="sb-ab-pillar-line" aria-hidden="true" />

              {/* Pillar 3: Made in small batches */}
              <div className="sb-ab-pillar-item">
                <div className="sb-ab-pillar-icon">
                  <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
                    <rect x="12" y="7" width="24" height="6" rx="3" fill="#E81B6D" stroke="#26140A" strokeWidth="2.5" />
                    <path d="M14 13H34V37C34 40.5 31.5 43 28 43H20C16.5 43 14 40.5 14 37V13Z" fill="#D7F557" stroke="#26140A" strokeWidth="2.5" />
                    <line x1="16" y1="20" x2="32" y2="20" stroke="#26140A" strokeWidth="2" />
                  </svg>
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
          <svg viewBox="0 0 1440 32" preserveAspectRatio="none" fill="#FDFBF7">
            <path d="M0 0L40 18L80 4L120 22L160 8L200 24L240 6L280 20L320 8L360 26L400 6L440 22L480 4L520 20L560 8L600 24L640 4L680 22L720 6L760 24L800 8L840 22L880 6L920 24L960 4L1000 20L1040 6L1080 22L1120 6L1160 22L1200 6L1240 24L1280 8L1320 24L1360 6L1400 20L1440 0V32H0V0Z" />
          </svg>
        </div>

        <div className="sb-ab-container sb-ab-torn-content">
          {/* Floating Pickle Slice on Left */}
          <div className="sb-ab-torn-pickle-left" aria-hidden="true">
            <svg viewBox="0 0 100 80" width="90" height="72">
              <ellipse cx="50" cy="40" rx="44" ry="34" fill="#632D10" stroke="#26140A" strokeWidth="3" />
              <ellipse cx="50" cy="40" rx="38" ry="28" fill="#D7F557" />
              <ellipse cx="50" cy="40" rx="30" ry="21" fill="#FDFBF7" />
              <ellipse cx="44" cy="38" rx="4" ry="2" fill="#632D10" transform="rotate(-15 44 38)" />
              <ellipse cx="54" cy="36" rx="4" ry="2" fill="#632D10" transform="rotate(20 54 36)" />
              <circle cx="38" cy="42" r="1.5" fill="#26140A" />
            </svg>
            <svg className="sb-ab-torn-arrow" viewBox="0 0 40 40" fill="none">
              <path d="M8 8C16 12 24 24 20 34M20 34L14 30M20 34L26 30" stroke="#D7F557" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
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
            {/* Yellow Doodle Star */}
            <svg className="sb-ab-torn-star" viewBox="0 0 36 36" fill="none">
              <polygon
                points="18,2 22,12 34,14 25,22 28,34 18,27 8,34 11,22 2,14 14,12"
                stroke="#D7F557"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>
            <svg viewBox="0 0 100 80" width="85" height="68">
              <ellipse cx="50" cy="40" rx="44" ry="34" fill="#632D10" stroke="#26140A" strokeWidth="3" />
              <ellipse cx="50" cy="40" rx="38" ry="28" fill="#D7F557" />
              <ellipse cx="50" cy="40" rx="30" ry="21" fill="#FDFBF7" />
              <ellipse cx="44" cy="38" rx="4" ry="2" fill="#632D10" transform="rotate(-15 44 38)" />
              <ellipse cx="54" cy="36" rx="4" ry="2" fill="#632D10" transform="rotate(20 54 36)" />
            </svg>
          </div>
        </div>

        {/* Bottom Torn Jagged Edge SVG */}
        <div className="sb-ab-torn-edge bottom" aria-hidden="true">
          <svg viewBox="0 0 1440 32" preserveAspectRatio="none" fill="#FDFBF7">
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
                  src="/recipe-1.jpg"
                  alt="Delicious bowl of freshly seasoned sliced pickled gherkins"
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
