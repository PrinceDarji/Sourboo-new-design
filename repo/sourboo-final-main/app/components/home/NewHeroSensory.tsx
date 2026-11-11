'use client';

import Link from 'next/link';
import { LayeredHighlightText } from '../MixedFont';
import { useCart } from '../cart/CartProvider';

export default function NewHeroSensory() {
  const { addItem, openCart } = useCart();

  const handleQuickAdd = (
    e: React.MouseEvent,
    slug: string,
    name: string,
    price: number,
    image: string,
  ) => {
    e.preventDefault();
    addItem({ slug, name, price, image }, 1);
    openCart();
  };

  return (
    <section className="sb-hero-sensory" aria-label="Sourboo Hero Experience">
      {/* Background Soft Organic Wavy Blobs & Lilac Swirls */}
      <div className="sb-hero-bg-waves" aria-hidden="true">
        <svg
          viewBox="0 0 1440 720"
          className="sb-hero-wave-svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120C180 80 340 180 520 140C700 100 880 20 1060 60C1240 100 1360 40 1440 80V720H0V120Z"
            fill="#F4EFFB"
            opacity="0.8"
          />
          <path
            d="M0 240C220 190 400 320 620 260C840 200 1020 300 1220 230C1340 190 1400 240 1440 260V720H0V240Z"
            fill="#FBF8F3"
          />
        </svg>
      </div>

      <div className="sb-hero-content-wrap">
        {/* Exact Hero Copy 1: Cravings Banner */}
        <div className="sb-hero-cravings-pill">
          <span className="font-schoolbell font-bold text-tamarind">
            *the sourboo way, cravings comes first*
          </span>
        </div>

        {/* Sensory Food & Human Photography Banner */}
        <div className="sb-hero-sensory-stage">
          {/* Main Headline with Layered Typography */}
          <h1 className="sb-hero-headline">
            <span className="font-coolvetica block">Mouths That </span>
            <LayeredHighlightText
              mainWord="Misbehave"
              highlightWord="Misbehave"
              revealNote="💥 unapologetically crunchy!"
              highlightColor="#E81B6D"
              className="sb-hero-highlight-word"
            />
          </h1>

          <p className="sb-hero-sub-text font-schoolbell">
            India’s First Cult Sour Snack. Snackable pickled gherkins made to be bold, made to be yours.
          </p>

          {/* Real Human & Food Photography Feature (Hands clinking pickles) */}
          <div className="sb-hero-real-food-feature">
            <div className="sb-hero-food-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/home/hero-placeholder.webp"
                alt="Real hands holding fresh crunchy Sourboo pickle slices"
                className="sb-hero-food-photo"
              />
              <div className="sb-hero-food-badge font-schoolbell">
                🍋 real food • loud crunch
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Duo: Side Eye Sour & Tamarin' Tease */}
        <div className="sb-hero-products-showcase">
          <p className="sb-hero-featured-tag font-schoolbell">
            Featured products:
          </p>

          <div className="sb-hero-duo-grid">
            {/* 1. Side Eye Sour */}
            <div className="sb-hero-duo-item duo-side-eye">
              <Link href="/product/sideeyesour" className="sb-hero-jar-link">
                <div className="sb-hero-hover-jar-wrap">
                  {/* Floating ingredients on hover */}
                  <div className="sb-burst-ingredients side-eye-burst" aria-hidden="true">
                    <span className="sb-burst-item burst-lemon">🍋</span>
                    <span className="sb-burst-item burst-spice">✨ chaat masala</span>
                    <span className="sb-burst-item burst-herb">🌿</span>
                  </div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/product/catalog/side-eye.webp"
                    alt="Side Eye Sour Jar"
                    className="sb-hero-jar-art"
                  />
                </div>
                <h2 className="sb-hero-item-title font-coolvetica">side eye sour</h2>
                <p className="sb-hero-item-flavor font-schoolbell">Lemon + Chaat Masala • ₹399</p>
              </Link>

              {/* Edgy Unusual Button Below Image */}
              <div className="sb-hero-btn-row">
                <Link
                  href="/product/sideeyesour"
                  className="sb-edgy-btn btn-side-eye font-schoolbell"
                >
                  <span className="sb-edgy-text">GET SIDE EYED →</span>
                </Link>
                <button
                  type="button"
                  onClick={(e) =>
                    handleQuickAdd(
                      e,
                      'sideeyesour',
                      'Side Eye Sour',
                      399,
                      '/product/catalog/side-eye.webp',
                    )
                  }
                  className="sb-edgy-quick-add font-coolvetica"
                  aria-label="Quick add Side Eye Sour to bag"
                >
                  + BAG
                </button>
              </div>
            </div>

            {/* 2. Tamarin' Tease */}
            <div className="sb-hero-duo-item duo-tamarin">
              <Link href="/product/tamarintease" className="sb-hero-jar-link">
                <div className="sb-hero-hover-jar-wrap">
                  {/* Floating ingredients on hover */}
                  <div className="sb-burst-ingredients tamarin-burst" aria-hidden="true">
                    <span className="sb-burst-item burst-tamarind">🌰 tamarind</span>
                    <span className="sb-burst-item burst-chilli">🌶️ fiery chilli</span>
                    <span className="sb-burst-item burst-splash">💧</span>
                  </div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/product/catalog/tamarin-tease.webp"
                    alt="Tamarin' Tease Jar"
                    className="sb-hero-jar-art"
                  />
                </div>
                <h2 className="sb-hero-item-title font-coolvetica">tamarin’ tease</h2>
                <p className="sb-hero-item-flavor font-schoolbell">Tamarind + Chilli • ₹399</p>
              </Link>

              {/* Edgy Unusual Button Below Image */}
              <div className="sb-hero-btn-row">
                <Link
                  href="/product/tamarintease"
                  className="sb-edgy-btn btn-tamarin font-schoolbell"
                >
                  <span className="sb-edgy-text">GET TEASED →</span>
                </Link>
                <button
                  type="button"
                  onClick={(e) =>
                    handleQuickAdd(
                      e,
                      'tamarintease',
                      "Tamarin' Tease",
                      399,
                      '/product/catalog/tamarin-tease.webp',
                    )
                  }
                  className="sb-edgy-quick-add font-coolvetica"
                  aria-label="Quick add Tamarin' Tease to bag"
                >
                  + BAG
                </button>
              </div>
            </div>
          </div>

          {/* Primary Call To Action: SHOP NOW */}
          <div className="sb-hero-primary-cta-row">
            <Link
              href="/product"
              className="sb-hero-shop-now-brush font-coolvetica"
            >
              <span className="sb-shop-now-text">SHOP NOW →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
