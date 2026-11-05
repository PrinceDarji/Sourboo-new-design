'use client';

import Link from 'next/link';
import { useCart } from '../cart/CartProvider';

export default function FlavourFaceOffArena() {
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
    <section className="sb-faceoff-section" aria-label="Flavour Face Off">
      <div className="sb-faceoff-header">
        <h2 className="sb-faceoff-title">
          Flavour Face Off <span className="vs">VS</span>
        </h2>
        <p className="sb-faceoff-subtitle">
          Deeply Fermented • Slightly Unhinged
        </p>
      </div>

      <div className="sb-faceoff-grid">
        {/* Fighter 1: SIDE EYE SOUR */}
        <div className="sb-fighter-card side-eye">
          <div className="sb-fighter-top">
            <div>
              <h3 className="sb-fighter-name">SIDE EYE SOUR</h3>
              <p className="sb-fighter-persona">*The drama queen.*</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/player1.svg" alt="Player 1" className="sb-fighter-badge-svg" />
          </div>

          <div className="sb-fighter-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/side-eye-jar.png"
              alt="Side Eye Sour"
              className="sb-fighter-jar"
            />
          </div>

          <div>
            <p className="sb-fighter-desc">
              Extra tangy. Chaat masala obsessed. Has something to say about everything.
            </p>

            <div className="sb-fighter-combo">
              LEMON + CHAAT MASALA
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/product/sideeyesour"
                className="sb-fighter-cta"
                style={{ flex: 1 }}
              >
                GET SIDE EYED →
              </Link>
              <button
                type="button"
                onClick={(e) =>
                  handleQuickAdd(
                    e,
                    'sideeyesour',
                    'SIDE EYE SOUR',
                    399,
                    '/side-eye-jar.png',
                  )
                }
                className="sb-fighter-cta"
                style={{
                  background: '#2F4918',
                  color: '#D7F557',
                  border: '3px solid #141414',
                  padding: '16px 20px',
                }}
                aria-label="Quick add Side Eye Sour to bag"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Fighter 2: TAMARIN' TEASE */}
        <div className="sb-fighter-card tamarin">
          <div className="sb-fighter-top">
            <div>
              <h3 className="sb-fighter-name">TAMARIN&apos; TEASE</h3>
              <p className="sb-fighter-persona">*The sweet troublemaker.*</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/player2.svg" alt="Player 2" className="sb-fighter-badge-svg" />
          </div>

          <div className="sb-fighter-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tamarin-jar.png"
              alt="Tamarin' Tease"
              className="sb-fighter-jar"
            />
          </div>

          <div>
            <p className="sb-fighter-desc">
              Sweet, sour and a little fiery. Flirts first. Bites back.
            </p>

            <div className="sb-fighter-combo">
              TAMARIND + CHILLI
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/product/tamarintease"
                className="sb-fighter-cta"
                style={{ flex: 1 }}
              >
                GET TEASED →
              </Link>
              <button
                type="button"
                onClick={(e) =>
                  handleQuickAdd(
                    e,
                    'tamarintease',
                    "TAMARIN' TEASE",
                    399,
                    '/tamarin-jar.png',
                  )
                }
                className="sb-fighter-cta"
                style={{
                  background: '#FFF',
                  color: '#141414',
                  border: '3px solid #141414',
                  padding: '16px 20px',
                }}
                aria-label="Quick add Tamarin' Tease to bag"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
