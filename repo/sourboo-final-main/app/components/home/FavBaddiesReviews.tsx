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
    const onScroll = () => setActive(Math.round(screen.scrollLeft / Math.max(1, screen.clientWidth)));
    screen.addEventListener('scroll', onScroll, { passive: true });
    return () => screen.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (index: number) => {
    const screen = screenRef.current;
    if (!screen) return;
    const next = (index + SLIDES.length) % SLIDES.length;
    screen.scrollTo({ left: next * screen.clientWidth, behavior: 'smooth' });
  };

  return (
    <section className="sbx-baddies" aria-labelledby="sbx-baddies-title">
      <Wave fill="var(--sbx-lilac)" position="top" variant={2} />
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
                  <span className="sbx-phone__handle">eatsourboo</span>
                </div>
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
                    <div key={slide.src} className="sbx-phone__slide" aria-roledescription="slide" aria-label={`${index + 1} of ${SLIDES.length}`}>
                      <Image src={slide.src} alt={slide.alt} fill sizes="300px" quality={80} />
                    </div>
                  ))}
                </div>
                <div className="sbx-phone__dots" aria-hidden="true">
                  {SLIDES.map((slide, index) => (
                    <span key={slide.src} className={active === index ? 'is-active' : ''} />
                  ))}
                </div>
                <p className="sbx-phone__caption">
                  <strong>eatsourboo</strong> From “I cannot stop eating these” to “the spicy ones are gone in a week” — we’ll take that as a
                  very good sign. 😌
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
