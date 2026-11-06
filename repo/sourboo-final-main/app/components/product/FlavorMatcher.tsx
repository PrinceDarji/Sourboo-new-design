'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FlavorMatcher() {
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);

  return (
    <section id="ShopFlavorMatcher" className="sb-matcher-section" aria-label="Flavour Matcher Quiz">
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2
          className="font-coolvetica text-pink"
          style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.4rem)', margin: 0, lineHeight: 1 }}
        >
          can&apos;t decide?
        </h2>
        <p
          className="font-schoolbell"
          style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', margin: '6px 0 0', color: '#2F4918' }}
        >
          let&apos;s match you with your flavour ;)
        </p>
        <div
          style={{
            display: 'inline-flex',
            gap: '12px',
            marginTop: '20px',
            background: 'rgba(0,0,0,0.06)',
            padding: '6px',
            borderRadius: '9999px',
          }}
        >
          <button
            type="button"
            onClick={() => setActivePlayer(1)}
            className={`sb-matcher-switch-btn ${activePlayer === 1 ? 'active' : ''}`}
            aria-pressed={activePlayer === 1}
          >
            Player 1 (Khatta / Sour)
          </button>
          <button
            type="button"
            onClick={() => setActivePlayer(2)}
            className={`sb-matcher-switch-btn ${activePlayer === 2 ? 'active' : ''}`}
            aria-pressed={activePlayer === 2}
          >
            Player 2 (Imli / Tangy)
          </button>
        </div>
      </div>

      {/* Player 1 Card */}
      {activePlayer === 1 && (
        <div className="sb-matcher-player-card sb-matcher-player-1">
          <div className="sb-matcher-grid">
            <div style={{ textAlign: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/player1.svg"
                alt="Player 1"
                style={{ width: 'min(70vw, 260px)', margin: '0 auto 18px' }}
              />
              <p
                className="font-schoolbell"
                style={{ fontSize: '1.45rem', lineHeight: 1.2, color: '#26140A' }}
              >
                if you dislike sweet snacks and add extra chilli without tasting
              </p>
              <div style={{ maxWidth: '380px', margin: '24px auto 0', textAlign: 'left' }}>
                <div className="sb-flavor-meter-row">
                  <div className="sb-flavor-meter-label">
                    <span>spice</span>
                    <span>82%</span>
                  </div>
                  <div className="sb-meter-track">
                    <div className="sb-meter-fill" style={{ width: '82%' }} />
                  </div>
                </div>
                <div className="sb-flavor-meter-row">
                  <div className="sb-flavor-meter-label">
                    <span>sour</span>
                    <span>100%</span>
                  </div>
                  <div className="sb-meter-track">
                    <div
                      className="sb-meter-fill"
                      style={{ width: '100%', background: 'var(--sb-green-moss, #4A6318)' }}
                    />
                  </div>
                </div>
                <div className="sb-flavor-meter-row">
                  <div className="sb-flavor-meter-label">
                    <span>crunch</span>
                    <span>68%</span>
                  </div>
                  <div className="sb-meter-track">
                    <div className="sb-meter-fill" style={{ width: '68%' }} />
                  </div>
                </div>
                <div className="sb-flavor-meter-row">
                  <div className="sb-flavor-meter-label">
                    <span>attitude</span>
                    <span>100%</span>
                  </div>
                  <div className="sb-meter-track">
                    <div
                      className="sb-meter-fill"
                      style={{ width: '100%', background: 'var(--sb-pink)' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: '32px',
                padding: '32px 28px',
                textAlign: 'center',
                border: '3px solid var(--sb-green-moss, #4A6318)',
                boxShadow: 'var(--sb-shadow-card)',
              }}
            >
              <p
                className="font-coolvetica"
                style={{ fontSize: '1.6rem', color: 'var(--sb-green-moss, #4A6318)', margin: '0 0 12px' }}
              >
                selection locked:
              </p>
              
              {/* Prominent Jar Image Container */}
              <div className="sb-matcher-jar-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product/catalog/side-eye.webp"
                  alt="Side Eye Sour"
                  className="sb-matcher-jar-img"
                />
              </div>

              <h3
                className="font-coolvetica text-pink"
                style={{ fontSize: '2.5rem', margin: '0 0 8px', lineHeight: 1 }}
              >
                SIDE EYE SOUR
              </h3>
              <p
                className="font-schoolbell"
                style={{ fontSize: '1.35rem', color: '#333333', marginBottom: '22px', fontWeight: 600 }}
              >
                Lemon &amp; Chaat Masala • ₹399
              </p>

              {/* Responsive, fully padded CTA button */}
              <Link
                href="/product/sideeyesour"
                className="sb-matcher-cta-btn sb-matcher-cta-p1"
              >
                <span>get side eye sour ¬‿¬</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Player 2 Card */}
      {activePlayer === 2 && (
        <div className="sb-matcher-player-card sb-matcher-player-2">
          <div className="sb-matcher-grid">
            <div style={{ textAlign: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/player2.svg"
                alt="Player 2"
                style={{ width: 'min(70vw, 260px)', margin: '0 auto 18px' }}
              />
              <p
                className="font-schoolbell"
                style={{ fontSize: '1.45rem', lineHeight: 1.2, color: '#26140A' }}
              >
                you want tang? you handle spice! makes sense ;)
              </p>
              <div style={{ maxWidth: '380px', margin: '24px auto 0', textAlign: 'left' }}>
                <div className="sb-flavor-meter-row">
                  <div className="sb-flavor-meter-label">
                    <span>spice</span>
                    <span>84%</span>
                  </div>
                  <div className="sb-meter-track">
                    <div className="sb-meter-fill" style={{ width: '84%' }} />
                  </div>
                </div>
                <div className="sb-flavor-meter-row">
                  <div className="sb-flavor-meter-label">
                    <span>tang</span>
                    <span>100%</span>
                  </div>
                  <div className="sb-meter-track">
                    <div
                      className="sb-meter-fill"
                      style={{ width: '100%', background: 'var(--sb-amber, #C96A00)' }}
                    />
                  </div>
                </div>
                <div className="sb-flavor-meter-row">
                  <div className="sb-flavor-meter-label">
                    <span>hit</span>
                    <span>84%</span>
                  </div>
                  <div className="sb-meter-track">
                    <div className="sb-meter-fill" style={{ width: '84%' }} />
                  </div>
                </div>
                <div className="sb-flavor-meter-row">
                  <div className="sb-flavor-meter-label">
                    <span>snaps</span>
                    <span>100%</span>
                  </div>
                  <div className="sb-meter-track">
                    <div
                      className="sb-meter-fill"
                      style={{ width: '100%', background: 'var(--sb-pink)' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: '32px',
                padding: '32px 28px',
                textAlign: 'center',
                border: '3px solid var(--sb-amber, #C96A00)',
                boxShadow: 'var(--sb-shadow-card)',
              }}
            >
              <p
                className="font-coolvetica"
                style={{ fontSize: '1.6rem', color: 'var(--sb-amber, #C96A00)', margin: '0 0 12px' }}
              >
                selection locked:
              </p>

              {/* Prominent Jar Image Container */}
              <div className="sb-matcher-jar-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product/catalog/tamarin-tease.webp"
                  alt="Tamarin' Tease"
                  className="sb-matcher-jar-img"
                />
              </div>

              <h3
                className="font-coolvetica text-pink"
                style={{ fontSize: '2.5rem', margin: '0 0 8px', lineHeight: 1 }}
              >
                TAMARIN&apos; TEASE
              </h3>
              <p
                className="font-schoolbell"
                style={{ fontSize: '1.35rem', color: '#333333', marginBottom: '22px', fontWeight: 600 }}
              >
                Tamarind &amp; Chilli • ₹399
              </p>

              {/* Responsive, fully padded CTA button */}
              <Link
                href="/product/tamarintease"
                className="sb-matcher-cta-btn sb-matcher-cta-p2"
              >
                <span>get tamarin&apos; tease ¬‿¬</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
