'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../cart/CartProvider';

export default function PlayerGameExperience() {
  const [selectedPlayer, setSelectedPlayer] = useState<1 | 2>(1);
  const [sourPower, setSourPower] = useState(90);
  const [spiceLevel, setSpiceLevel] = useState(65);
  const [crunchFactor, setCrunchFactor] = useState(85);
  const [isCrunching, setIsCrunching] = useState(false);
  const [scorePop, setScorePop] = useState<string | null>(null);

  const { addItem, openCart } = useCart();

  const handleTestBite = () => {
    setIsCrunching(true);
    const soundWords = ['*LOUD CRUNCH!*', '*JAW-CLENCH!*', '*KHATTA HIT!*', '*100% AUDIBLE!*'];
    const chosen = soundWords[Math.floor(Math.random() * soundWords.length)];
    setScorePop(chosen);

    setTimeout(() => {
      setIsCrunching(false);
    }, 700);

    setTimeout(() => {
      setScorePop(null);
    }, 1500);
  };

  const handleQuickAdd = () => {
    if (selectedPlayer === 1) {
      addItem(
        {
          slug: 'sideeyesour',
          name: 'Side Eye Sour',
          price: 399,
          image: '/product/catalog/side-eye.webp',
        },
        1,
      );
    } else {
      addItem(
        {
          slug: 'tamarintease',
          name: "Tamarin' Tease",
          price: 399,
          image: '/product/catalog/tamarin-tease.webp',
        },
        1,
      );
    }
    openCart();
  };

  return (
    <section className="sb-arcade-game-section" aria-label="Player 1 vs Player 2 Game">
      {/* Organic Background Waves & Bubbles */}
      <div className="sb-arcade-bg-waves" aria-hidden="true">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="sb-arcade-wave">
          <path
            d="M0 40C360 90 720 0 1080 50C1260 75 1380 30 1440 45V180H0V40Z"
            fill="#FFFDF9"
          />
        </svg>
      </div>

      <div className="sb-arcade-container">
        {/* Game Title & Stage Intro */}
        <div className="sb-arcade-header text-center">
          <div className="sb-arcade-badge font-schoolbell">
            🎮 ARCADE MINI-GAME
          </div>
          <h2 className="sb-arcade-title font-coolvetica">
            can&apos;t decide?
          </h2>
          <p className="sb-arcade-subtitle font-schoolbell">
            let&apos;s match you with your flavour ;)
          </p>
        </div>

        {/* ARCADE CONSOLE INTERACTION */}
        <div className="sb-arcade-console">
          {/* Console Header: Fighter Switcher */}
          <div className="sb-arcade-switch-row">
            <button
              type="button"
              onClick={() => setSelectedPlayer(1)}
              className={`sb-arcade-fighter-btn fighter-1 font-coolvetica ${selectedPlayer === 1 ? 'is-active' : ''}`}
            >
              <span className="fighter-avatar">🍋</span>
              <span>PLAYER 1: KHATTA SOUR</span>
            </button>

            <div className="sb-arcade-vs font-coolvetica" aria-hidden="true">
              VS
            </div>

            <button
              type="button"
              onClick={() => setSelectedPlayer(2)}
              className={`sb-arcade-fighter-btn fighter-2 font-coolvetica ${selectedPlayer === 2 ? 'is-active' : ''}`}
            >
              <span className="fighter-avatar">🌰</span>
              <span>PLAYER 2: IMLI TANGY</span>
            </button>
          </div>

          {/* Console Main Board: 2 Columns */}
          <div className="sb-arcade-board-grid">
            {/* Left: Player Persona & Interactive Sliders */}
            <div className="sb-arcade-controls-col">
              <div className="sb-fighter-stat-card">
                <div className="sb-fighter-header">
                  <span className="sb-fighter-pill font-schoolbell">
                    {selectedPlayer === 1 ? 'Player 1 Archetype' : 'Player 2 Archetype'}
                  </span>
                  <h3 className="sb-fighter-headline font-coolvetica">
                    {selectedPlayer === 1 ? 'The Chaat Masala Obsessive' : 'The Sweet Troublemaker'}
                  </h3>
                  <p className="sb-fighter-tagline font-schoolbell">
                    {selectedPlayer === 1
                      ? '“if you dislike sweet snacks and add extra chilli without tasting”'
                      : '“you want tang? you handle spice! makes total sense ;)”'}
                  </p>
                </div>

                {/* Interactive Taste Dials */}
                <div className="sb-arcade-sliders-wrap">
                  {/* Slider 1: Sourness */}
                  <div className="sb-slider-group">
                    <div className="sb-slider-label font-schoolbell">
                      <span>⚡ Sour Kick Power</span>
                      <span className="font-bold text-pink">{sourPower}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      value={sourPower}
                      onChange={(e) => setSourPower(Number(e.target.value))}
                      className="sb-game-range"
                      aria-label="Sour power level"
                    />
                  </div>

                  {/* Slider 2: Spice Heat */}
                  <div className="sb-slider-group">
                    <div className="sb-slider-label font-schoolbell">
                      <span>🌶️ Spice Tolerance</span>
                      <span className="font-bold text-amber">{spiceLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={spiceLevel}
                      onChange={(e) => setSpiceLevel(Number(e.target.value))}
                      className="sb-game-range"
                      aria-label="Spice level"
                    />
                  </div>

                  {/* Slider 3: Crunch Factor */}
                  <div className="sb-slider-group">
                    <div className="sb-slider-label font-schoolbell">
                      <span>🥒 Decibel Crunch</span>
                      <span className="font-bold text-pickle">{crunchFactor}%</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="100"
                      value={crunchFactor}
                      onChange={(e) => setCrunchFactor(Number(e.target.value))}
                      className="sb-game-range"
                      aria-label="Crunch factor"
                    />
                  </div>
                </div>

                {/* TEST THE BITE INTERACTIVE BUTTON */}
                <div className="sb-bite-test-row">
                  <button
                    type="button"
                    onClick={handleTestBite}
                    className={`sb-bite-test-btn font-coolvetica ${isCrunching ? 'crunching' : ''}`}
                  >
                    <span>💥 TEST THE BITE</span>
                  </button>
                  {scorePop && (
                    <span className="sb-score-pop font-schoolbell" role="status">
                      {scorePop}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Unlocked Jar Reward & Instant Action */}
            <div className="sb-arcade-reward-col">
              <div className="sb-reward-card">
                <div className="sb-selection-status font-coolvetica">
                  SELECTION LOCKED:
                </div>

                {/* Jar Visual */}
                <div className="sb-reward-jar-box">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      selectedPlayer === 1
                        ? '/product/catalog/side-eye.webp'
                        : '/product/catalog/tamarin-tease.webp'
                    }
                    alt={selectedPlayer === 1 ? 'Side Eye Sour Jar' : "Tamarin' Tease Jar"}
                    className="sb-reward-jar-img"
                  />
                </div>

                <h4 className="sb-reward-title font-coolvetica">
                  {selectedPlayer === 1 ? 'SIDE EYE SOUR' : "TAMARIN' TEASE"}
                </h4>
                <p className="sb-reward-spec font-schoolbell">
                  {selectedPlayer === 1 ? 'Lemon & Chaat Masala • ₹399' : 'Tamarind & Chilli • ₹399'}
                </p>

                {/* Action Buttons */}
                <div className="sb-reward-btn-stack">
                  <button
                    type="button"
                    onClick={handleQuickAdd}
                    className="sb-reward-lock-btn font-coolvetica"
                  >
                    <span>+ ADD TO BAG (₹399)</span>
                  </button>

                  <Link
                    href={selectedPlayer === 1 ? '/product/sideeyesour' : '/product/tamarintease'}
                    className="sb-reward-explore-link font-schoolbell"
                  >
                    explore flavour details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
