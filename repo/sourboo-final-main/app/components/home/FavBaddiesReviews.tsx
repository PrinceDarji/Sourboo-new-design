'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Wave } from '../site/Organic';
import { SOCIAL_PROOF } from '@/src/lib/socialProof';

export default function FavBaddiesReviews() {
  const screenRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { title, instagramUrl, instagramLabel, handle, caption, slides, quotes } = SOCIAL_PROOF;

  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;
    const onScroll = () => setActive(Math.round(screen.scrollLeft / Math.max(1, screen.clientWidth)));
    screen.addEventListener('scroll', onScroll, { passive: true });
    return () => screen.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (index: number) => {
    const screen = screenRef.current;
    if (!screen) return;
    const next = (index + slides.length) % slides.length;
    screen.scrollTo({ left: next * screen.clientWidth, behavior: 'smooth' });
  };

  return (
    <section className="sbx-baddies" aria-labelledby="sbx-baddies-title">
      <Wave fill="var(--sbx-lime)" position="top" variant={2} />
      <div className="sbx-baddies__inner">
        <div className="sbx-baddies__copy">
          <h2 id="sbx-baddies-title" className="sbx-baddies__title">
            {title}
          </h2>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="sbx-baddies__link">
            {instagramLabel}
          </a>
        </div>

        <div className="sbx-baddies__stage">
          <ul className="sbx-baddies__bubbles" aria-label="What people said">
            {quotes.map((bubble, index) => (
              <li key={bubble.text} className={`sbx-baddies__bubble sbx-baddies__bubble--${index + 1}`} data-tone={bubble.tone}>
                {bubble.text}
              </li>
            ))}
          </ul>

          <div className="sbx-phone">
            <div className="sbx-phone__frame">
              <span className="sbx-phone__island" aria-hidden="true" />
              <div className="sbx-phone__screen">
                <div className="sbx-phone__status" aria-hidden="true">
                  <span>9:41</span>
                  <span className="sbx-phone__status-icons">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <div className="sbx-phone__post-head">
                  <span className="sbx-phone__avatar">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/favicon-32x32.png" alt="" width="32" height="32" />
                  </span>
                  <span className="sbx-phone__handle">{handle}</span>
                </div>
                <div
                  ref={screenRef}
                  className="sbx-phone__slides"
                  role="group"
                  aria-roledescription="carousel"
                  aria-label={`Instagram post from @${handle}`}
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowRight') goTo(active + 1);
                    if (event.key === 'ArrowLeft') goTo(active - 1);
                  }}
                >
                  {slides.map((slide, index) => (
                    <div key={slide.src} className="sbx-phone__slide" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`}>
                      <Image src={slide.src} alt={slide.alt} fill sizes="300px" quality={80} />
                    </div>
                  ))}
                </div>
                <div className="sbx-phone__dots" aria-hidden="true">
                  {slides.map((slide, index) => (
                    <span key={slide.src} className={active === index ? 'is-active' : ''} />
                  ))}
                </div>
                <p className="sbx-phone__caption">
                  <strong>{handle}</strong> {caption}
                </p>
              </div>
            </div>
            <div className="sbx-phone__controls">
              <button type="button" className="sbx-round-btn" onClick={() => goTo(active - 1)} aria-label="Previous slide">
                ←
              </button>
              <button type="button" className="sbx-round-btn" onClick={() => goTo(active + 1)} aria-label="Next slide">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
