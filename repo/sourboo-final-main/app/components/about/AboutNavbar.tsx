'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/app/components/cart/CartProvider';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Our Story' },
  { href: '/product', label: 'Shop' },
  { href: '/join', label: 'Join Us' },
] as const;

function BagIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        d="M7.2 11.4c-.3 0-.6.3-.6.6l-.9 14.1c0 1.2.9 2.2 2.1 2.2h16.4c1.2 0 2.2-1 2.1-2.2l-.9-14.1c0-.3-.3-.6-.6-.6Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M7.4 11.2c3-.3 14.4-.4 17.4.1.5 4.4.9 9.7 1.1 14.6.1 1.4-.8 2.3-2.2 2.3-5.2.2-10.8.2-15.9 0-1.3-.1-2.2-1-2.1-2.3.3-5 .9-10.1 1.7-14.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M11.5 14.4c-.4-5.6 1.6-9.2 4.6-9.2s5 3.4 4.6 9.1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { openCart, totalItems } = useCart();
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  // Tying the open state to the path closes the menu on navigation.
  const menuOpen = menuOpenOn !== null && menuOpenOn === pathname;
  const setMenuOpen = (next: boolean | ((open: boolean) => boolean)) => {
    const value = typeof next === 'function' ? next(menuOpen) : next;
    setMenuOpenOn(value ? pathname : null);
  };
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const normalizedPathname = pathname?.replace(/\/+$/, '') || '/';

  function isActive(href: string) {
    const normalizedHref = href.replace(/\/+$/, '') || '/';
    if (normalizedHref === '/') return normalizedPathname === '/' || normalizedPathname === '/home';
    if (normalizedHref === '/product') {
      return normalizedPathname === '/product' || normalizedPathname.startsWith('/product/') || normalizedPathname === '/shop';
    }
    return normalizedPathname === normalizedHref;
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpenOn(null);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const skipToContent = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const main = document.querySelector('main');
    if (!main) return;
    event.preventDefault();
    main.setAttribute('tabindex', '-1');
    main.focus();
  };

  const openQuiz = () => {
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('open-sourboo-quiz'));
  };

  return (
    <header className={`sbx-nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`}>
      <a href="#main-content" className="sbx-skip-link" onClick={skipToContent}>
        Skip to content
      </a>
      <div className="sbx-nav__bar">
        <Link href="/" className="sbx-nav__logo" aria-label="Sourboo home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-green.svg" alt="" width="132" height="36" />
        </Link>

        <nav className="sbx-nav__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`sbx-nav__link ${isActive(link.href) ? 'is-active' : ''}`}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              <span>{link.label}</span>
              <svg className="sbx-nav__scribble" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 8C20 4 38 3 56 5C70 7 84 9 97 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </Link>
          ))}
        </nav>

        <div className="sbx-nav__actions">
          <button type="button" onClick={openQuiz} className="sbx-nav__quiz" aria-label="Take the flavour quiz and get 5% off">
            <span className="sbx-nav__quiz-full">take quiz (get 5% off)</span>
            <span className="sbx-nav__quiz-short" aria-hidden="true">
              quiz · 5% off
            </span>
          </button>

          <button
            type="button"
            onClick={openCart}
            className="sbx-nav__bag"
            aria-label={`Open bag, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
          >
            <BagIcon />
            <span className="sbx-nav__bag-count" aria-hidden="true">
              {totalItems}
            </span>
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="sbx-nav__burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="sbx-mobile-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="sbx-mobile-menu"
        ref={menuRef}
        className="sbx-nav__sheet"
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`sbx-nav__sheet-link ${isActive(link.href) ? 'is-active' : ''}`}
              aria-current={isActive(link.href) ? 'page' : undefined}
              style={{ animationDelay: `${80 + index * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button type="button" onClick={openQuiz} className="sbx-nav__sheet-quiz">
          take quiz (get 5% off)
        </button>
        <svg className="sbx-nav__sheet-wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0H1440V40C1310 80 1180 30 1010 52C850 74 720 96 560 70C400 44 260 20 120 50C70 60 30 62 0 58Z" fill="currentColor" />
        </svg>
      </div>
    </header>
  );
}
