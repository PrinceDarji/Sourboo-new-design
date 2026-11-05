'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

interface RouteTheme {
  title: string;
  subtitle: string;
  icon: 'lemon' | 'pickle' | 'lightning' | 'lips' | 'jar';
}

function getThemeForPath(pathname: string): RouteTheme {
  const cleanPath = pathname?.replace(/\/+$/, '') || '/';

  if (cleanPath === '' || cleanPath === '/' || cleanPath === '/home') {
    return {
      title: 'MOUTHS THAT MISBEHAVE',
      subtitle: "INDIA'S FIRST CULT SOUR SNACK ⚡",
      icon: 'lemon',
    };
  }

  if (cleanPath === '/about') {
    return {
      title: 'THE PICKLE PROJECT',
      subtitle: 'UNFILTERED & SLIGHTLY UNHINGED 🫙',
      icon: 'jar',
    };
  }

  if (cleanPath === '/product' || cleanPath === '/shop') {
    return {
      title: 'CRUNCH INCOMING...',
      subtitle: 'HANDCRAFTED SOUR GHERKINS 🥒',
      icon: 'pickle',
    };
  }

  if (cleanPath.startsWith('/product/')) {
    return {
      title: 'TASTE EXPLOSION',
      subtitle: 'PREPARE YOUR TASTEBUDS 👅',
      icon: 'lips',
    };
  }

  if (cleanPath === '/join') {
    return {
      title: 'THE SOURBOO CLUB',
      subtitle: 'THE INNER CIRCLE OF SOUR ⚡',
      icon: 'lightning',
    };
  }

  if (cleanPath === '/contact') {
    return {
      title: 'SAY HI TO SOURBOO',
      subtitle: 'ALWAYS READY FOR A PICKLE CHAT 💬',
      icon: 'pickle',
    };
  }

  return {
    title: 'STAY SOUR',
    subtitle: 'DEEPLY FERMENTED • BOLD CRUNCH ⚡',
    icon: 'lemon',
  };
}

export default function BrandPageTransition() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const [theme, setTheme] = useState<RouteTheme>(() => getThemeForPath(pathname));
  const isFirstMount = useRef(true);

  useEffect(() => {
    // When pathname changes (or on initial load), trigger the sensory brand entry
    setTheme(getThemeForPath(pathname));
    setVisible(true);
    setOpening(false);

    // Phase 1: Show curtain with animated lemon squeeze & splash
    const openTimer = setTimeout(() => {
      setOpening(true);
    }, 280);

    // Phase 2: Complete curtain exit, hide transition
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setOpening(false);
    }, 720);

    isFirstMount.current = false;

    return () => {
      clearTimeout(openTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className="sb-trans-overlay"
      role="status"
      aria-live="polite"
      aria-label={`Navigating to ${theme.title}`}
    >
      {/* Top Pink Curtain with Torn Paper Bottom Edge */}
      <div className={`sb-trans-curtain-top ${opening ? 'sb-opening' : ''}`}>
        <svg
          className="sb-curtain-tear"
          viewBox="0 0 1440 24"
          preserveAspectRatio="none"
          fill="#E81B6D"
          aria-hidden="true"
        >
          <path d="M0 0H1440V12L1400 20L1360 6L1320 22L1280 8L1240 22L1200 6L1160 20L1120 6L1080 22L1040 8L1000 20L960 4L920 22L880 8L840 22L800 6L760 22L720 8L680 22L640 4L600 22L560 8L520 20L480 6L440 22L400 8L360 22L320 6L280 20L240 8L200 22L160 6L120 22L80 6L40 20L0 8Z" />
        </svg>
      </div>

      {/* Center Animated Brand Emblem */}
      <div className={`sb-trans-center ${opening ? 'sb-opening' : ''}`}>
        {/* Lemon Mascot with Squeeze and Dripping Brine */}
        <div className="sb-trans-mascot-box">
          <svg className="sb-trans-lemon-svg" viewBox="0 0 72 72" fill="none" aria-hidden="true">
            {/* Lemon Body */}
            <path
              d="M12 36C12 22 24 10 36 10C50 10 60 22 60 36C60 50 48 62 36 62C22 62 12 50 12 36Z"
              fill="#FFE664"
              stroke="#1A3320"
              strokeWidth="3.5"
            />
            {/* Lemon Tip Left */}
            <path d="M14 36C8 36 6 34 5 32C6 30 8 28 14 28" fill="#FFE664" stroke="#1A3320" strokeWidth="2.5" />
            {/* Lemon Tip Right */}
            <path d="M58 28C64 28 66 30 67 32C66 34 64 36 58 36" fill="#FFE664" stroke="#1A3320" strokeWidth="2.5" />
            {/* Pickle Slice Accent Inside */}
            <ellipse cx="36" cy="36" rx="14" ry="10" fill="#88C744" stroke="#1A3320" strokeWidth="2" transform="rotate(-15 36 36)" />
            <ellipse cx="36" cy="36" rx="9" ry="6" fill="#ABDE68" transform="rotate(-15 36 36)" />
            <circle cx="34" cy="35" r="1.5" fill="#1A3320" />
            <circle cx="39" cy="37" r="1.5" fill="#1A3320" />
          </svg>

          {/* Dripping Juice Droplets */}
          <div className="sb-trans-drips" aria-hidden="true">
            <span className="sb-trans-drip" />
            <span className="sb-trans-drip" />
            <span className="sb-trans-drip" />
          </div>
        </div>

        {/* Dynamic Badge */}
        <div className="sb-trans-badge">
          <h2 className="sb-trans-badge-title">{theme.title}</h2>
          <p className="sb-trans-badge-sub">{theme.subtitle}</p>
        </div>

        {/* Juice Splash Radial Burst Particles */}
        <div className="sb-trans-splash-burst" aria-hidden="true">
          <span className="sb-splash-particle p1" />
          <span className="sb-splash-particle p2" />
          <span className="sb-splash-particle p3" />
          <span className="sb-splash-particle p4" />
          <span className="sb-splash-particle p5" />
          <span className="sb-splash-particle p6" />
          <span className="sb-splash-particle p7" />
          <span className="sb-splash-particle p8" />
        </div>
      </div>

      {/* Bottom Yellow Curtain with Torn Paper Top Edge */}
      <div className={`sb-trans-curtain-bottom ${opening ? 'sb-opening' : ''}`}>
        <svg
          className="sb-curtain-tear"
          viewBox="0 0 1440 24"
          preserveAspectRatio="none"
          fill="#FFE664"
          aria-hidden="true"
        >
          <path d="M0 24H1440V12L1400 4L1360 18L1320 2L1280 16L1240 2L1200 18L1160 4L1120 18L1080 2L1040 16L1000 4L960 20L920 2L880 16L840 2L800 18L760 2L720 16L680 2L640 20L600 2L560 16L520 4L480 18L440 2L400 16L360 2L320 18L280 4L240 16L200 2L160 18L120 2L80 18L40 4L0 16Z" />
        </svg>
      </div>
    </div>
  );
}
