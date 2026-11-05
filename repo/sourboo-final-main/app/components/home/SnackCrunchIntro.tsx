'use client';

import { useState } from 'react';

export default function SnackCrunchIntro() {
  const [isCrunching, setIsCrunching] = useState(false);

  return (
    <section className="sb-intro-section" aria-label="Intro Section">
      <div className="sb-intro-container">
        {/* Visual Column: Authentic 2 Hands with Pickle Polaroid */}
        <div className="sb-intro-visual">
          <div
            className="sb-intro-polaroid-wrap"
            onMouseEnter={() => setIsCrunching(true)}
            onMouseLeave={() => setIsCrunching(false)}
          >
            {/* Playful washi tape accents */}
            <div className="sb-intro-tape top-left" aria-hidden="true" />
            <div className="sb-intro-tape bottom-right" aria-hidden="true" />

            <div className="sb-intro-img-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/home/hero-placeholder.webp"
                alt="Two hands holding authentic crunchy sour pickles"
                className="sb-intro-hero-img"
              />
            </div>

            <div className="sb-intro-stamp">
              {isCrunching ? '*LOUD CRUNCH*' : 'CRUNCH READY'}
            </div>
          </div>
        </div>

        {/* Text Column with exact requested copy */}
        <div className="sb-intro-text-col">
          <h2 className="sb-intro-headline">
            YOUR OTHER SNACKS COULD NEVER
          </h2>

          <p className="sb-intro-body">
            Tangy, spicy, unapologetically crunchy. Meet the gherkin that refuses to be a side dish.
          </p>

          <p className="sb-intro-body font-schoolbell" style={{ fontSize: '1.45rem', color: '#141414' }}>
            Sour first snack, made for people who don’t eat quietly.
          </p>

          <div style={{ marginTop: '28px' }}>
            <span className="sb-intro-badge">
              Made for Mouths That Misbehave
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
