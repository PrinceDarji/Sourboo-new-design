'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Wave } from '../site/Organic';

const POST_URL = 'https://www.instagram.com/p/DcRE7dRDbcv/';

const SLIDES = [
  { src: '/home/baddies/ig-dcre7d-1.webp', alt: 'Instagram slide: a plate with Side Eye Sour gherkins, captioned “The internet’s sour girls have spoken.”' },
  { src: '/home/baddies/ig-dcre7d-2.webp', alt: 'Instagram slide: a customer with a jar of Tamarin’ Tease and her message about the gherkins' },
  { src: '/home/baddies/ig-dcre7d-3.webp', alt: 'Instagram slide: a customer’s profile and direct messages about Sourboo' },
  { src: '/home/baddies/ig-dcre7d-4.webp', alt: 'Instagram slide: a customer selfie with her messages about the tamarind flavour' },
  { src: '/home/baddies/ig-dcre7d-5.webp', alt: 'Instagram slide: a customer with Sourboo jars and her messages' },
  { src: '/home/baddies/ig-dcre7d-6.webp', alt: 'Instagram slide: two friends with a Side Eye Sour jar, captioned “Everybody is obsessed! Go get yourself a jar!”' },
];

/** Short bubbles from the original site's review phone, plus quotes from the post caption. */
const BUBBLES = [
  { text: 'addictive', tone: 'lime' },
  { text: 'super punchy & sour', tone: 'lilac' },
  { text: '“I cannot stop eating these”', tone: 'cream' },
  { text: 'perfect spicy', tone: 'amber' },
  { text: '“the spicy ones are gone in a week”', tone: 'cream' },
  { text: 'instant fav', tone: 'pink' },
];

export default function FavBaddiesReviews() {
  const screenRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;
    const onScroll = () => {
      if (screen.clientWidth > 0) {
        setActive(Math.round(screen.scrollLeft / screen.clientWidth));
      }
    };
    screen.addEventListener('scroll', onScroll, { passive: true });
    return () => screen.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (index: number) => {
    const screen = screenRef.current;
    if (!screen) return;
    const next = Math.max(0, Math.min(SLIDES.length - 1, index));
    screen.scrollTo({ left: next * screen.clientWidth, behavior: 'smooth' });
    setActive(next);
  };

  return (
    <section className="sbx-baddies" aria-labelledby="sbx-baddies-title">
      <Wave fill="var(--sbx-lime)" position="top" variant={2} />
      <div className="sbx-baddies__inner">
        <div className="sbx-baddies__copy">
          <h2 id="sbx-baddies-title" className="sbx-baddies__title">
            Your Internet Fav Baddies and Their Moms Love It ;)
          </h2>
          <a href={POST_URL} target="_blank" rel="noopener noreferrer" className="sbx-baddies__link font-schoolbell">
            see the real post on Instagram ↗
          </a>
        </div>

        <div className="sbx-baddies__stage">
          <ul className="sbx-baddies__bubbles" aria-label="What people said">
            {BUBBLES.map((bubble, index) => (
              <li key={bubble.text} className={`sbx-baddies__bubble sbx-baddies__bubble--${index + 1}`} data-tone={bubble.tone}>
                {bubble.text}
              </li>
            ))}
          </ul>

          <div className="sbx-phone">
            <div className="sbx-phone__frame">
              {/* iPhone Dynamic Island */}
              <span className="sbx-phone__island" aria-hidden="true">
                <span className="sbx-phone__island-sensor" />
                <span className="sbx-phone__island-camera" />
              </span>

              <div className="sbx-phone__screen">
                {/* Authentic iOS Status Bar */}
                <div className="sbx-phone__status" aria-hidden="true">
                  <span className="sbx-phone__status-time">9:41</span>
                  <div className="sbx-phone__status-icons">
                    {/* Cellular Signal (4 bars) */}
                    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
                      <rect x="0" y="8" width="3" height="3" rx="0.7" />
                      <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.7" />
                      <rect x="9" y="3" width="3" height="8" rx="0.7" />
                      <rect x="13.5" y="0.5" width="3" height="10.5" rx="0.7" />
                    </svg>
                    {/* Wi-Fi Icon */}
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">
                      <path d="M7.5 9.2a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6z" />
                      <path d="M4.3 5.8a4.5 4.5 0 0 1 6.4 0 .8.8 0 0 0 1.1-1.1 6 6 0 0 0-8.6 0 .8.8 0 0 0 1.1 1.1z" />
                      <path d="M1.8 3.3a8 8 0 0 1 11.4 0 .8.8 0 0 0 1.1-1.1 9.6 9.6 0 0 0-13.6 0 .8.8 0 0 0 1.1 1.1z" />
                    </svg>
                    {/* iOS Battery Icon */}
                    <svg width="24" height="11.5" viewBox="0 0 24 11.5" fill="none" aria-hidden="true">
                      <rect x="0.5" y="0.5" width="20" height="10.5" rx="3.2" stroke="currentColor" strokeWidth="1" />
                      <rect x="2" y="2" width="14" height="7.5" rx="1.8" fill="currentColor" />
                      <path d="M22 4v3.5a1.2 1.2 0 0 1-1.2 1.2V2.8A1.2 1.2 0 0 1 22 4z" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* Instagram Post Header */}
                <div className="sbx-phone__post-head">
                  <div className="sbx-phone__post-user">
                    <span className="sbx-phone__avatar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/favicon-32x32.png" alt="" width="32" height="32" />
                    </span>
                    <div className="sbx-phone__user-meta">
                      <span className="sbx-phone__handle">eatsourboo</span>
                      <span className="sbx-phone__verified" title="Verified">✓</span>
                    </div>
                  </div>
                  <button type="button" className="sbx-phone__more-btn" aria-label="Post options" tabIndex={-1}>
                    •••
                  </button>
                </div>

                {/* Instagram Media with Internal Carousel Arrows */}
                <div className="sbx-phone__media">
                  <div
                    ref={screenRef}
                    className="sbx-phone__slides"
                    role="group"
                    aria-roledescription="carousel"
                    aria-label="Instagram post from @eatsourboo"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowRight') goTo(active + 1);
                      if (event.key === 'ArrowLeft') goTo(active - 1);
                    }}
                  >
                    {SLIDES.map((slide, index) => (
                      <div
                        key={slide.src}
                        className="sbx-phone__slide"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${SLIDES.length}`}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          sizes="(max-width: 768px) 90vw, 440px"
                          quality={85}
                          priority={index === 0}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Instagram-style Carousel Navigation Arrows */}
                  {active > 0 && (
                    <button
                      type="button"
                      className="sbx-phone__arrow sbx-phone__arrow--prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(active - 1);
                      }}
                      aria-label="Previous photo"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                  )}

                  {active < SLIDES.length - 1 && (
                    <button
                      type="button"
                      className="sbx-phone__arrow sbx-phone__arrow--next"
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(active + 1);
                      }}
                      aria-label="Next photo"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Instagram Action Icons */}
                <div className="sbx-phone__actions" aria-hidden="true">
                  <div className="sbx-phone__actions-left">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </div>
                  <div className="sbx-phone__dots-wrap">
                    <div className="sbx-phone__dots">
                      {SLIDES.map((slide, index) => (
                        <span key={slide.src} className={active === index ? 'is-active' : ''} />
                      ))}
                    </div>
                  </div>
                  <div className="sbx-phone__actions-right">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                </div>

                {/* Instagram Caption */}
                <div className="sbx-phone__caption-wrap">
                  <p className="sbx-phone__likes">1,428 likes</p>
                  <p className="sbx-phone__caption">
                    <strong>eatsourboo</strong> From “I cannot stop eating these” to “the spicy ones are gone in a week” — we’ll take that as a very good sign.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
