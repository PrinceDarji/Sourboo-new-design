'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/app/components/cart/CartProvider';

export default function Navbar() {
  const pathname = usePathname();
  const { openCart, totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const normalizedPathname = pathname?.replace(/\/+$/, '') || '/';

  function isActive(href: string) {
    const normalizedHref = href.replace(/\/+$/, '') || '/';
    if (normalizedHref === '/') return normalizedPathname === '/' || normalizedPathname === '/home';
    if (normalizedHref === '/product') return normalizedPathname === '/product' || normalizedPathname.startsWith('/product/') || normalizedPathname === '/shop';
    return normalizedPathname === normalizedHref;
  }

  const handleQuizClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-sourboo-quiz'));
    }
  };

  return (
    <header className="sb-nav-wrapper sb-entry-nav" role="banner">
      <div className="sb-navbar">
        {/* Brand & Left Links */}
        <div className="sb-nav-left">
          <Link href="/" className="sb-nav-logo-link" aria-label="Sourboo Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Sourboo"
              className="sb-nav-real-logo"
            />
          </Link>

          <nav className="sb-nav-links" aria-label="Primary navigation">
            <Link
              href="/"
              className={`sb-nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/product"
              className={`sb-nav-link ${isActive('/product') ? 'active' : ''}`}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={`sb-nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
            <Link
              href="/join"
              className={`sb-nav-link ${isActive('/join') ? 'active' : ''}`}
            >
              Join Us
            </Link>
          </nav>
        </div>

        {/* Right Actions: Quiz Pill + Cart Bag Button */}
        <div className="sb-nav-right">
          <button
            type="button"
            onClick={handleQuizClick}
            className="sb-nav-quiz-pill"
            aria-label="Open personality quiz for 5% off"
          >
            take quiz (get 5% off)
          </button>

          <button
            type="button"
            onClick={openCart}
            className="sb-nav-cart-btn"
            aria-label={`Shopping Cart with ${totalItems} items`}
          >
            <span className="sb-nav-cart-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </span>
            <span className="sb-nav-cart-text">bag</span>
            <span className="sb-nav-cart-badge">{totalItems}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="sb-nav-mobile-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sb-nav-hamburger-bar"></span>
            <span className="sb-nav-hamburger-bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sb-nav-mobile-menu">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`sb-nav-mobile-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`sb-nav-mobile-link ${isActive('/about') ? 'active' : ''}`}
          >
            Our Story
          </Link>
          <Link
            href="/product"
            onClick={() => setMobileMenuOpen(false)}
            className={`sb-nav-mobile-link ${isActive('/product') ? 'active' : ''}`}
          >
            Shop
          </Link>
          <Link
            href="/join"
            onClick={() => setMobileMenuOpen(false)}
            className={`sb-nav-mobile-link ${isActive('/join') ? 'active' : ''}`}
          >
            Join Us
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              handleQuizClick();
            }}
            className="sb-nav-quiz-pill"
            style={{ marginTop: '12px', width: '100%', textAlign: 'center' }}
          >
            take quiz (get 5% off)
          </button>
        </div>
      )}
    </header>
  );
}
