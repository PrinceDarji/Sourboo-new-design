'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../cart/CartProvider';

export default function FlavourFaceOffDual() {
  const { addItem, openCart } = useCart();
  const [hoveredFlavor, setHoveredFlavor] = useState<'sideeye' | 'tamarin' | null>(null);

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
    <section className="sb-faceoff-dual-section" aria-label="Flavour Face Off">
      {/* Organic Wavy Flowing Background */}
      <div className="sb-faceoff-bg-waves" aria-hidden="true">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="sb-wavy-curve">
          <path
            d="M0 60C240 120 480 20 720 70C960 120 1200 40 1440 80V220H0V60Z"
            fill="#F7F1FD"
          />
        </svg>
      </div>

      <div className="sb-faceoff-container">
        {/* Header */}
        <div className="sb-faceoff-header text-center">
          <span className="sb-faceoff-pill font-schoolbell">
            Two Icons • One Unstoppable Crunch
          </span>
          <h2 className="sb-faceoff-dual-title font-coolvetica">
            Flavour Face Off <span className="sb-dual-amp">&amp;</span> Perfect Pair
          </h2>
          <p className="sb-faceoff-sub font-schoolbell">
            Why choose one when you can experience both dimensions of sour?
          </p>
        </div>

        {/* Dual Flavour Stage */}
        <div className="sb-faceoff-dual-grid">
          {/* FLAVOUR 1: SIDE EYE SOUR */}
          <div
            className={`sb-flavour-card side-eye-card ${hoveredFlavor === 'sideeye' ? 'is-hovered' : ''}`}
            onMouseEnter={() => setHoveredFlavor('sideeye')}
            onMouseLeave={() => setHoveredFlavor(null)}
          >
            {/* Interactive Opening Jar & Bursting Ingredients */}
            <div className="sb-jar-reveal-zone">
              {/* Floating burst ingredients appearing on hover */}
              <div className="sb-ingredient-cloud cloud-side-eye" aria-hidden="true">
                <span className="sb-ing-item ing-lemon-1">🍋 juicy lemon</span>
                <span className="sb-ing-item ing-chaat">✨ chaat masala</span>
                <span className="sb-ing-item ing-dill">🌿 fresh dill</span>
                <span className="sb-ing-item ing-khatta">⚡ khatta hit</span>
              </div>

              {/* Jar Visual with Lifting Lid on Hover */}
              <div className="sb-interactive-jar-wrapper">
                <div className="sb-jar-lid-anim" aria-hidden="true" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product/catalog/side-eye.webp"
                  alt="Side Eye Sour Jar"
                  className="sb-hover-jar-img"
                />
              </div>

              <div className="sb-jar-hover-hint font-schoolbell">
                {hoveredFlavor === 'sideeye' ? '✨ jar opened! smelling that chaat!' : 'hover over jar to pop lid'}
              </div>
            </div>

            {/* Exact Preserved Copy */}
            <div className="sb-flavour-info">
              <h3 className="sb-flavour-name font-coolvetica">
                SIDE EYE SOUR
              </h3>
              <p className="sb-flavour-persona font-schoolbell">
                *The drama queen.*
              </p>
              <p className="sb-flavour-desc font-schoolbell">
                Extra tangy. Chaat masala obsessed. Has something to say about everything.
              </p>
              <div className="sb-flavour-formula font-coolvetica">
                LEMON + CHAAT MASALA
              </div>

              {/* Button Row */}
              <div className="sb-flavour-actions">
                <Link
                  href="/product/sideeyesour"
                  className="sb-flavour-btn btn-side-eye font-coolvetica"
                >
                  GET SIDE EYED →
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
                  className="sb-flavour-bag-btn font-schoolbell"
                >
                  + Add to Bag (₹399)
                </button>
              </div>
            </div>
          </div>

          {/* DUAL CONNECTOR: EXPERIENTIAL TASTE BRIDGE */}
          <div className="sb-dual-bridge" aria-hidden="true">
            <div className="sb-bridge-circle font-schoolbell">
              <span>BETTER</span>
              <span>TOGETHER</span>
            </div>
          </div>

          {/* FLAVOUR 2: TAMARIN' TEASE */}
          <div
            className={`sb-flavour-card tamarin-card ${hoveredFlavor === 'tamarin' ? 'is-hovered' : ''}`}
            onMouseEnter={() => setHoveredFlavor('tamarin')}
            onMouseLeave={() => setHoveredFlavor(null)}
          >
            {/* Interactive Opening Jar & Bursting Ingredients */}
            <div className="sb-jar-reveal-zone">
              {/* Floating burst ingredients appearing on hover */}
              <div className="sb-ingredient-cloud cloud-tamarin" aria-hidden="true">
                <span className="sb-ing-item ing-tamarind-1">🌰 sweet tamarind</span>
                <span className="sb-ing-item ing-chilli-1">🌶️ fiery chilli</span>
                <span className="sb-ing-item ing-amber">🍯 tangy nectar</span>
                <span className="sb-ing-item ing-snap">🔥 fiery bite</span>
              </div>

              {/* Jar Visual with Lifting Lid on Hover */}
              <div className="sb-interactive-jar-wrapper">
                <div className="sb-jar-lid-anim lid-tamarin" aria-hidden="true" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product/catalog/tamarin-tease.webp"
                  alt="Tamarin' Tease Jar"
                  className="sb-hover-jar-img"
                />
              </div>

              <div className="sb-jar-hover-hint font-schoolbell">
                {hoveredFlavor === 'tamarin' ? '🔥 jar opened! tasting the chilli-sweetness!' : 'hover over jar to pop lid'}
              </div>
            </div>

            {/* Exact Preserved Copy */}
            <div className="sb-flavour-info">
              <h3 className="sb-flavour-name font-coolvetica">
                TAMARIN&apos; TEASE
              </h3>
              <p className="sb-flavour-persona font-schoolbell">
                *The sweet troublemaker.*
              </p>
              <p className="sb-flavour-desc font-schoolbell">
                Sweet, sour and a little fiery. Flirts first. Bites back.
              </p>
              <div className="sb-flavour-formula font-coolvetica">
                TAMARIND + CHILLI
              </div>

              {/* Button Row */}
              <div className="sb-flavour-actions">
                <Link
                  href="/product/tamarintease"
                  className="sb-flavour-btn btn-tamarin font-coolvetica"
                >
                  GET TEASED →
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
                  className="sb-flavour-bag-btn font-schoolbell"
                >
                  + Add to Bag (₹399)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Both Flavours Bundle Promotion */}
        <div className="sb-faceoff-duo-banner text-center">
          <Link
            href="/product/tamarind-twins"
            className="sb-duo-bundle-pill font-schoolbell"
          >
            <span>✨ Can&apos;t pick one? Get the Twin Pack (₹749) &amp; save 5% →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
