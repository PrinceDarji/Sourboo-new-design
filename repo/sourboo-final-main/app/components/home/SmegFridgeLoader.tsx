'use client';

import { useEffect, useState } from 'react';

export default function SmegFridgeLoader() {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'revealed' | 'complete'>('closed');
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if user already saw the loader in this session or prefers reduced motion
    const hasSeen = sessionStorage.getItem('sb_fridge_loaded');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeen || prefersReducedMotion) {
      setShouldRender(false);
      return;
    }

    // Phase 1: Wait 400ms then start opening door
    const t1 = setTimeout(() => {
      setPhase('opening');
    }, 500);

    // Phase 2: Door wide open, interior revealed
    const t2 = setTimeout(() => {
      setPhase('revealed');
    }, 1800);

    // Phase 3: Dissolve loader into website
    const t3 = setTimeout(() => {
      setPhase('complete');
      sessionStorage.setItem('sb_fridge_loaded', 'true');
      setTimeout(() => setShouldRender(false), 700);
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`sb-fridge-overlay ${phase === 'complete' ? 'sb-fridge-fade-out' : ''}`}
      aria-label="Loading Sourboo Experience"
      role="progressbar"
      aria-valuetext="Opening the fridge..."
    >
      <div className="sb-fridge-stage">
        {/* Retro 3D Fridge Container */}
        <div className={`sb-fridge-box ${phase}`}>
          {/* FRIDGE INTERIOR (Chilled Sourboo Experience) */}
          <div className="sb-fridge-interior">
            <div className="sb-fridge-light-glow" />
            <div className="sb-fridge-frost-mist" />

            {/* Interior Shelves */}
            <div className="sb-fridge-shelf shelf-top">
              <div className="sb-shelf-jar jar-side-eye">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product/catalog/side-eye.webp"
                  alt="Side Eye Sour"
                  className="sb-shelf-img"
                />
              </div>
              <div className="sb-shelf-jar jar-tamarin">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product/catalog/tamarin-tease.webp"
                  alt="Tamarin' Tease"
                  className="sb-shelf-img"
                />
              </div>
            </div>

            <div className="sb-fridge-shelf shelf-bottom">
              <div className="sb-shelf-jar jar-sampler">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product/catalog/lemon-lovers.webp"
                  alt="Lemon Lovers"
                  className="sb-shelf-img"
                />
              </div>
              <div className="sb-shelf-jar jar-stash">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product/catalog/sourboo-stash.webp"
                  alt="Sourboo Stash"
                  className="sb-shelf-img"
                />
              </div>
            </div>

            {/* Floating Pickle Slice Drops */}
            <div className="sb-fridge-droplet drop-1" />
            <div className="sb-fridge-droplet drop-2" />
          </div>

          {/* FRIDGE EXTERIOR DOOR (Smooth 3D Swing) */}
          <div className={`sb-fridge-door ${phase === 'opening' || phase === 'revealed' || phase === 'complete' ? 'door-open' : ''}`}>
            {/* Real Smeg Fridge Image Face */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fridge.webp"
              alt="Retro Cream Smeg Fridge"
              className="sb-fridge-face-img"
            />
            {/* Chrome Handle & Specular Shine */}
            <div className="sb-fridge-handle" />
            <div className="sb-fridge-specular" />
          </div>
        </div>
      </div>
    </div>
  );
}
