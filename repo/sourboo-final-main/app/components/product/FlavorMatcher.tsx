'use client';

import { useState, useEffect } from 'react';
import QuickBuyButton from '../cart/QuickBuyButton';

type FlavourMatchId = 1 | 2;

export default function FlavorMatcher() {
  const [selected, setSelected] = useState<FlavourMatchId | null>(null);

  // Keyboard shortcut listener: press "1" for Player 1, "2" for Player 2
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === '1') setSelected((prev) => (prev === 1 ? null : 1));
      if (e.key === '2') setSelected((prev) => (prev === 2 ? null : 2));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="shop-taste-game"
      className={`sbx-game ${selected ? `has-p${selected}` : ''}`}
      aria-labelledby="shop-taste-game-title"
    >
      {/* Top HUD: PLAYER 1, Coin, PLAYER 2 */}
      <div className="sbx-game__hud" role="group" aria-label="Choose a flavour player">
        <button
          type="button"
          className={`sbx-game__tag sbx-game__tag--p1 ${selected === 1 ? 'is-on' : ''}`}
          aria-pressed={selected === 1}
          onClick={() => setSelected(selected === 1 ? null : 1)}
        >
          <span className="sbx-game__tag-cue" aria-hidden="true">▶</span>
          PLAYER 1
        </button>

        <span className="sbx-game__coin" aria-hidden="true">
          <span />
        </span>

        <button
          type="button"
          className={`sbx-game__tag sbx-game__tag--p2 ${selected === 2 ? 'is-on' : ''}`}
          aria-pressed={selected === 2}
          onClick={() => setSelected(selected === 2 ? null : 2)}
        >
          <span className="sbx-game__tag-cue" aria-hidden="true">▶</span>
          PLAYER 2
        </button>
      </div>

      {/* Head: can't decide? let's match you with your flavour ;) */}
      <div className="sbx-game__head">
        <h2 id="shop-taste-game-title" className="sbx-game__title">
          can&apos;t decide?
        </h2>
        <p className="sbx-game__sub">let&apos;s match you with your flavour ;)</p>
      </div>

      {/* Arena: Player 1 VS Player 2 */}
      <div className="sbx-game__arena">
        {/* PLAYER 1 CARD */}
        <div className={`sbx-game__side sbx-game__side--p1 ${selected === 1 ? 'is-selected' : ''}`}>
          <div className={`sbx-game__card ${selected === 1 ? 'is-selected' : ''}`}>
            <button
              type="button"
              className="sbx-game__pick"
              onClick={() => setSelected(selected === 1 ? null : 1)}
              aria-pressed={selected === 1}
              aria-controls="shop-taste-game-result-1"
            >
              <span className="sbx-game__player">PLAYER 1</span>
              <span className="sbx-game__prompt">
                <span>if you dislike sweet snacks</span>
                <span>and you add extra chilli</span>
                <span>without tasting</span>
              </span>
              {selected === 1 ? (
                <span className="sbx-game__locked-flag">LOCKED IN</span>
              ) : (
                <span className="sbx-game__key" aria-hidden="true">
                  press <kbd>1</kbd>
                </span>
              )}
            </button>

            <div
              id="shop-taste-game-result-1"
              className="sbx-game__result"
              aria-live="polite"
              hidden={selected !== 1}
            >
              {selected === 1 && (
                <>
                  <ul className="sbx-game__meters">
                    <li>
                      <span className="sbx-game__meter-label">SPICE</span>
                      <span className="sbx-game__meter-track">
                        <span className="sbx-game__meter-fill" style={{ width: '32%' }} />
                      </span>
                      <span className="sbx-game__meter-value">32</span>
                    </li>
                    <li>
                      <span className="sbx-game__meter-label">SOUR</span>
                      <span className="sbx-game__meter-track">
                        <span className="sbx-game__meter-fill" style={{ width: '100%' }} />
                      </span>
                      <span className="sbx-game__meter-value">100</span>
                    </li>
                    <li>
                      <span className="sbx-game__meter-label">CRUNCH</span>
                      <span className="sbx-game__meter-track">
                        <span className="sbx-game__meter-fill" style={{ width: '85%' }} />
                      </span>
                      <span className="sbx-game__meter-value">85</span>
                    </li>
                    <li>
                      <span className="sbx-game__meter-label">ATTITUDE</span>
                      <span className="sbx-game__meter-track">
                        <span className="sbx-game__meter-fill" style={{ width: '100%' }} />
                      </span>
                      <span className="sbx-game__meter-value">100</span>
                    </li>
                  </ul>

                  <div className="sbx-game__locked">
                    <span className="sbx-game__locked-jar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/product/side-eye-jar.webp"
                        alt="SIDE EYE SOUR"
                        width={84}
                        height={135}
                      />
                    </span>
                    <div>
                      <p className="sbx-game__locked-title">selection locked:</p>
                      <QuickBuyButton
                        slug="sideeyesour"
                        name="SIDE EYE SOUR"
                        priceLabel="₹399"
                        image="/product/catalog/side-eye.webp"
                        className="sbx-game__cta"
                      >
                        get Side eye Sour
                      </QuickBuyButton>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* PLAYER 2 CARD */}
        <div className={`sbx-game__side sbx-game__side--p2 ${selected === 2 ? 'is-selected' : ''}`}>
          <div className={`sbx-game__card ${selected === 2 ? 'is-selected' : ''}`}>
            <button
              type="button"
              className="sbx-game__pick"
              onClick={() => setSelected(selected === 2 ? null : 2)}
              aria-pressed={selected === 2}
              aria-controls="shop-taste-game-result-2"
            >
              <span className="sbx-game__player">PLAYER 2</span>
              <span className="sbx-game__prompt">
                <span>you want tang?</span>
                <span>you handle spice!</span>
              </span>
              {selected === 2 ? (
                <span className="sbx-game__locked-flag">LOCKED IN</span>
              ) : (
                <span className="sbx-game__key" aria-hidden="true">
                  press <kbd>2</kbd>
                </span>
              )}
            </button>

            <div
              id="shop-taste-game-result-2"
              className="sbx-game__result"
              aria-live="polite"
              hidden={selected !== 2}
            >
              {selected === 2 && (
                <>
                  <ul className="sbx-game__meters">
                    <li>
                      <span className="sbx-game__meter-label">SPICE</span>
                      <span className="sbx-game__meter-track">
                        <span className="sbx-game__meter-fill" style={{ width: '56%' }} />
                      </span>
                      <span className="sbx-game__meter-value">56</span>
                    </li>
                    <li>
                      <span className="sbx-game__meter-label">TANG</span>
                      <span className="sbx-game__meter-track">
                        <span className="sbx-game__meter-fill" style={{ width: '100%' }} />
                      </span>
                      <span className="sbx-game__meter-value">100</span>
                    </li>
                    <li>
                      <span className="sbx-game__meter-label">HIT</span>
                      <span className="sbx-game__meter-track">
                        <span className="sbx-game__meter-fill" style={{ width: '54%' }} />
                      </span>
                      <span className="sbx-game__meter-value">54</span>
                    </li>
                    <li>
                      <span className="sbx-game__meter-label">SNAPS</span>
                      <span className="sbx-game__meter-track">
                        <span className="sbx-game__meter-fill" style={{ width: '100%' }} />
                      </span>
                      <span className="sbx-game__meter-value">100</span>
                    </li>
                  </ul>

                  <div className="sbx-game__locked">
                    <span className="sbx-game__locked-jar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/product/tamarin-jar.webp"
                        alt="TAMARIN' TEASE"
                        width={84}
                        height={135}
                      />
                    </span>
                    <div>
                      <p className="sbx-game__locked-title">selection locked:</p>
                      <QuickBuyButton
                        slug="tamarintease"
                        name="TAMARIN’ TEASE"
                        priceLabel="₹399"
                        image="/product/catalog/tamarin-tease.webp"
                        className="sbx-game__cta"
                      >
                        tamarin tease
                      </QuickBuyButton>
                      <p className="sbx-game__closing">makes sense :)</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SOUR SAMPLER / 2 PLAYER MODE */}
      <div className="sbx-game__coop">
        <div className="sbx-game__coop-header">
          <span className="sbx-game__coop-tag">2 PLAYER MODE</span>
          <span className="sbx-game__coop-name">Sour sampler</span>
        </div>
        <p className="sbx-game__coop-desc">
          1 × SIDE EYE SOUR (Lemon &amp; Chaat Masala) + 1 × TAMARIN&apos; TEASE (Tamarind &amp; Chili)
        </p>
        <QuickBuyButton
          slug="sour-sampler"
          name="Sour sampler"
          priceLabel="₹759"
          image="/product/catalog/sour-sampler.webp"
          className="sbx-game__coop-btn"
        >
          add both - ₹759
        </QuickBuyButton>
      </div>
    </section>
  );
}
