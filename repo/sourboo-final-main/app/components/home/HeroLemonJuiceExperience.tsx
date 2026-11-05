'use client';

import Link from 'next/link';

export default function HeroLemonJuiceExperience() {
  return (
    <section className="sb-hero-experience text-center" aria-label="Sourboo Hero Experience">
      {/* Cravings Banner */}
      <div className="sb-hero-cravings-banner sb-entry-stamp sb-delay-1">
        *the sourboo way, cravings comes first*
      </div>

      {/* Main Headline & Recurring Brand Voice */}
      <h1 className="sb-hero-title-main sb-entry-pop sb-delay-2">
        Mouths That <span className="text-punchy">Misbehave</span>
      </h1>

      <p className="sb-hero-subline font-rascal sb-entry-pop sb-delay-3">
        India’s First Cult Sour Snack. Snackable pickled gherkins made to be bold, made to be yours.
      </p>

      {/* Hero Product Showcase (Side Eye Sour vs Tamarin' Tease Duo) */}
      <div className="sb-hero-duo-wrapper sb-entry-jar-drop sb-delay-4">
        {/* Left Featured Product: Side Eye Sour */}
        <Link
          href="/product/sideeyesour"
          className="sb-hero-product-preview left"
          aria-label="Featured: side eye sour"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/side-eye-jar.png"
            alt="Side Eye Sour Jar"
            className="sb-hero-jar-img"
          />
          <span className="sb-hero-prod-label">side eye sour</span>
          <span className="sb-hero-prod-sublabel">Lemon &amp; Chaat Masala</span>
        </Link>

        {/* Central VS Badge */}
        <div className="sb-hero-vs-badge-wrap" aria-hidden="true">
          <div className="sb-hero-vs-circle">
            <span>VS</span>
          </div>
          <span className="sb-hero-vs-sub">PICK YOUR SOUR</span>
        </div>

        {/* Right Featured Product: Tamarin' Tease */}
        <Link
          href="/product/tamarintease"
          className="sb-hero-product-preview right"
          aria-label="Featured: tamarin’ tease"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tamarin-jar.png"
            alt="Tamarin' Tease Jar"
            className="sb-hero-jar-img"
          />
          <span className="sb-hero-prod-label">tamarin’ tease</span>
          <span className="sb-hero-prod-sublabel">Tamarind &amp; Chili</span>
        </Link>
      </div>

      {/* Main SHOP NOW CTA */}
      <div style={{ marginTop: '24px' }}>
        <Link href="/product" className="sb-hero-shop-cta">
          SHOP NOW
        </Link>
      </div>

      {/* Floating spice particles around hero */}
      <div
        className="sb-floating-spice"
        style={{ left: '12%', top: '18%', width: '38px', height: '38px' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/leaf-top.svg" alt="" aria-hidden="true" />
      </div>
      <div
        className="sb-floating-spice"
        style={{ right: '14%', top: '22%', width: '44px', height: '44px', animationDelay: '1.5s' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/leaf-mid.svg" alt="" aria-hidden="true" />
      </div>
      <div
        className="sb-floating-spice"
        style={{ left: '18%', bottom: '12%', width: '28px', height: '28px', animationDelay: '2.5s' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lemondrop.svg" alt="" aria-hidden="true" />
      </div>
    </section>
  );
}
