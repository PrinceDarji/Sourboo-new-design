'use client';

import { useState } from 'react';
import SectionThreeEyesSequence from '../about/SectionThreeEyesSequence';
import { LayeredHighlightText } from '../MixedFont';

export default function FoodSensoryStory() {
  const [activeSensory, setActiveSensory] = useState<'squeeze' | 'crunch' | 'tongue'>('squeeze');
  const [squeezeCount, setSqueezeCount] = useState(0);

  const handleSqueeze = () => {
    setSqueezeCount((prev) => prev + 1);
  };

  return (
    <section className="sb-sensory-story-section" aria-label="Food-First Storytelling">
      {/* Soft Wavy Divider at top */}
      <div className="sb-wavy-top-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="sb-divider-svg">
          <path
            d="M0,32 C320,72 480,8 720,40 C960,72 1200,16 1440,48 L1440,80 L0,80 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      <div className="sb-sensory-container">
        {/* Intro Section Headline - Exact Copy Preserved */}
        <div className="sb-sensory-header text-center">
          <h2 className="sb-sensory-headline">
            <span className="font-coolvetica block">YOUR OTHER SNACKS </span>
            <LayeredHighlightText
              mainWord="COULD NEVER"
              revealNote="🥒 nothing compares to that khatta punch!"
              highlightColor="#E81B6D"
            />
          </h2>

          <p className="sb-sensory-lead font-schoolbell">
            Tangy, spicy, unapologetically crunchy. Meet the gherkin that refuses to be a side dish.
          </p>

          <div className="sb-sensory-badge-wrap">
            <span className="sb-sensory-tag font-coolvetica">
              Made for Mouths That Misbehave
            </span>
          </div>
        </div>

        {/* Sensory Exploration Console */}
        <div className="sb-sensory-tabs">
          <button
            type="button"
            onClick={() => setActiveSensory('squeeze')}
            className={`sb-sensory-tab-btn font-schoolbell ${activeSensory === 'squeeze' ? 'active' : ''}`}
          >
            🍋 The Squeeze Test
          </button>
          <button
            type="button"
            onClick={() => setActiveSensory('crunch')}
            className={`sb-sensory-tab-btn font-schoolbell ${activeSensory === 'crunch' ? 'active' : ''}`}
          >
            🥒 Real Food Moments
          </button>
          <button
            type="button"
            onClick={() => setActiveSensory('tongue')}
            className={`sb-sensory-tab-btn font-schoolbell ${activeSensory === 'tongue' ? 'active' : ''}`}
          >
            👅 The Tongue Map
          </button>
        </div>

        {/* TAB 1: LEMON SQUEEZING & MOVING EYES INTERACTIVE EXPERIENCE */}
        {activeSensory === 'squeeze' && (
          <div className="sb-sensory-panel squeeze-panel">
            <div className="sb-sensory-grid">
              {/* Left Column: Interactive Lemon Squeeze Animation */}
              <div className="sb-lemon-squeeze-card">
                <div className="sb-lemon-visual-box">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/lemonsqueze.gif"
                    alt="Lemon being freshly squeezed over spices"
                    className="sb-lemon-gif"
                  />
                  <div className="sb-lemon-droplet" />
                </div>

                <div className="sb-lemon-controls text-center">
                  <button
                    type="button"
                    onClick={handleSqueeze}
                    className="sb-lemon-btn font-schoolbell"
                  >
                    <span>Squeeze for Extra Nimbu! ({squeezeCount})</span>
                  </button>
                  <p className="sb-lemon-note font-schoolbell">
                    {squeezeCount === 0
                      ? 'tap to feel the mouth-puckering citrus spray'
                      : squeezeCount < 5
                      ? 'yesss! that roadside raw mango khatta kick!'
                      : 'WARNING: MAXIMUM SOUR REACHED! JAW CLENCH ENGAGED! ⚡'}
                  </p>
                </div>
              </div>

              {/* Right Column: Moving Eyes Animation + Tasting Reaction */}
              <div className="sb-eyes-reaction-card">
                <div className="sb-eyes-stage">
                  <SectionThreeEyesSequence />
                </div>
                <div className="sb-reaction-text text-center">
                  <h3 className="font-coolvetica text-tamarind text-2xl">
                    That Instant Sour Face
                  </h3>
                  <p className="font-schoolbell text-lg text-charcoal mt-2">
                    The side-eye. The blink. The involuntary shudder of pure culinary joy.
                    We don&apos;t do subtle flavours. We do memorable hits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REAL FOOD & HUMAN PHOTOGRAPHY EXPERIENCES */}
        {activeSensory === 'crunch' && (
          <div className="sb-sensory-panel crunch-panel">
            <div className="sb-food-photos-mosaic">
              {/* Photo 1: Fresh sliced cucumbers */}
              <div className="sb-mosaic-card card-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/recipe-1.jpg"
                  alt="Freshly sliced crisp gherkins with whole spices and herbs"
                  className="sb-mosaic-img"
                />
                <div className="sb-mosaic-caption font-schoolbell">
                  Crisp baby cucumbers hand-sliced &amp; steeped in artisanal brine
                </div>
              </div>

              {/* Photo 2: Real people tasting moments */}
              <div className="sb-mosaic-card card-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/section-six-top-1.webp"
                  alt="People tasting sour pickles and smiling at tasting pop-up"
                  className="sb-mosaic-img"
                />
                <div className="sb-mosaic-caption font-schoolbell">
                  Real people making real sour faces together
                </div>
              </div>

              {/* Photo 3: Pickles on food */}
              <div className="sb-mosaic-card card-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/section-six-top-3.webp"
                  alt="Sharing sour gherkins with friends"
                  className="sb-mosaic-img"
                />
                <div className="sb-mosaic-caption font-schoolbell">
                  Not a meal, a moment. Straight from the jar.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MOVING TONGUE FLAVOUR MAPPING */}
        {activeSensory === 'tongue' && (
          <div className="sb-sensory-panel tongue-panel">
            <div className="sb-tongue-experience">
              <div className="sb-tongue-graphic-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/section-three-tongue.svg"
                  alt="Illustrated Tongue Flavour Map"
                  className="sb-tongue-map-img"
                />

                {/* Interactive Taste Bud Hotspots */}
                <div className="sb-tongue-hotspot hotspot-chaat">
                  <span className="hotspot-pulse" />
                  <span className="hotspot-label font-schoolbell">→ India loves chaaat</span>
                </div>

                <div className="sb-tongue-hotspot hotspot-flavour">
                  <span className="hotspot-pulse" />
                  <span className="hotspot-label font-schoolbell">→ India loves flavour</span>
                </div>

                <div className="sb-tongue-hotspot hotspot-hit">
                  <span className="hotspot-pulse" />
                  <span className="hotspot-label font-schoolbell">→ That sour &amp; spicy hit</span>
                </div>
              </div>

              <div className="sb-tongue-copy text-center">
                <h3 className="font-coolvetica text-tamarind text-3xl">
                  Deeply Fermented • Slightly Unhinged
                </h3>
                <p className="font-schoolbell text-xl text-charcoal mt-2 max-w-xl mx-auto">
                  Your tastebuds have been sleeping on mild snacks. Sourboo wakes up every single receptor on your palate.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
