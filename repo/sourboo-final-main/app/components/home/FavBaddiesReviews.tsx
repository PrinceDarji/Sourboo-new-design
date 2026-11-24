'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setActive(Math.max(0, Math.min(SLIDES.length - 1, index)));
    setDragOffset(0);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goTo(active - 1);
      } else if (e.key === 'ArrowRight') {
        goTo(active + 1);
      }
    },
    [active, goTo]
  );

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    currentXRef.current = touch.clientX;
    isDraggingRef.current = true;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    currentXRef.current = touch.clientX;
    const diff = touch.clientX - startXRef.current;

    // Apply edge resistance
    if ((active === 0 && diff > 0) || (active === SLIDES.length - 1 && diff < 0)) {
      setDragOffset(diff * 0.35);
    } else {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const diff = currentXRef.current - startXRef.current;
    const threshold = 45; // Minimum swipe distance in px

    if (diff < -threshold && active < SLIDES.length - 1) {
      goTo(active + 1);
    } else if (diff > threshold && active > 0) {
      goTo(active - 1);
    } else {
      setDragOffset(0);
    }
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
    isDraggingRef.current = true;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    currentXRef.current = e.clientX;
    const diff = e.clientX - startXRef.current;

    if ((active === 0 && diff > 0) || (active === SLIDES.length - 1 && diff < 0)) {
      setDragOffset(diff * 0.35);
    } else {
      setDragOffset(diff);
    }
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const diff = currentXRef.current - startXRef.current;
    const threshold = 45;

    if (diff < -threshold && active < SLIDES.length - 1) {
      goTo(active + 1);
    } else if (diff > threshold && active > 0) {
      goTo(active - 1);
    } else {
      setDragOffset(0);
    }
  };

  // Global mouseup / mouseleave safety
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        handleMouseUp();
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [active, goTo]);

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

          {/* Realistic iPhone Pro Mockup */}
          <div className="sbx-phone">
            {/* Physical Side Hardware Buttons */}
            <span className="sbx-phone__btn sbx-phone__btn--action" aria-hidden="true" />
            <span className="sbx-phone__btn sbx-phone__btn--vol-up" aria-hidden="true" />
            <span className="sbx-phone__btn sbx-phone__btn--vol-down" aria-hidden="true" />
            <span className="sbx-phone__btn sbx-phone__btn--power" aria-hidden="true" />

            {/* iPhone Chassis Outer Frame */}
            <div className="sbx-phone__frame">
              {/* Inner Screen Display */}
              <div className="sbx-phone__screen">
                {/* Dynamic Island with sensor & camera */}
                <div className="sbx-phone__island" aria-hidden="true">
                  <span className="sbx-phone__island-sensor" />
                  <span className="sbx-phone__island-camera" />
                </div>

                {/* iOS Authentic Status Bar */}
                <div className="sbx-phone__status" aria-hidden="true">
                  <span className="sbx-phone__status-time">9:41</span>
                  <div className="sbx-phone__status-icons">
                    {/* Cellular 4-bars */}
                    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
                      <rect x="0" y="8" width="3" height="3" rx="0.75" />
                      <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.75" />
                      <rect x="9" y="3" width="3" height="8" rx="0.75" />
                      <rect x="13.5" y="0.5" width="3" height="10.5" rx="0.75" />
                    </svg>
                    {/* Wi-Fi */}
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
                      <path d="M7.5 9.2a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6z" />
                      <path d="M4.3 5.8a4.5 4.5 0 0 1 6.4 0 .8.8 0 0 0 1.1-1.1 6 6 0 0 0-8.6 0 .8.8 0 0 0 1.1 1.1z" />
                      <path d="M1.8 3.3a8 8 0 0 1 11.4 0 .8.8 0 0 0 1.1-1.1 9.6 9.6 0 0 0-13.6 0 .8.8 0 0 0 1.1 1.1z" />
                    </svg>
                    {/* Battery */}
                    <svg width="24" height="11.5" viewBox="0 0 24 11.5" fill="none">
                      <rect x="0.5" y="0.5" width="20" height="10.5" rx="3.2" stroke="currentColor" strokeWidth="1" />
                      <rect x="2" y="2" width="14" height="7.5" rx="1.8" fill="currentColor" />
                      <path d="M22 4v3.5a1.2 1.2 0 0 1-1.2 1.2V2.8A1.2 1.2 0 0 1 22 4z" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* Instagram Post Header */}
                <div className="sbx-phone__post-head">
                  <div className="sbx-phone__avatar-wrap">
                    <span className="sbx-phone__avatar-ring">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/favicon-32x32.png" alt="Sourboo logo" width="30" height="30" className="sbx-phone__avatar-img" />
                    </span>
                  </div>
                  <div className="sbx-phone__user-info">
                    <div className="sbx-phone__user-title">
                      <span className="sbx-phone__username">eatsourboo</span>
                      <svg className="sbx-phone__verified-icon" width="13" height="13" viewBox="0 0 24 24" fill="#0095f6">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.2l-3.8-3.8 1.4-1.4 2.4 2.4 5.6-5.6 1.4 1.4-7 7z" />
                      </svg>
                    </div>
                    <span className="sbx-phone__location">Original audio</span>
                  </div>
                  <button type="button" className="sbx-phone__options-btn" aria-label="More options">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="5" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="12" r="2" />
                    </svg>
                  </button>
                </div>

                {/* Instagram Carousel Media Container */}
                <div
                  ref={containerRef}
                  className="sbx-phone__media"
                  tabIndex={0}
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="Instagram post photos"
                  onKeyDown={handleKeyDown}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                >
                  {/* Sliding Track */}
                  <div
                    className="sbx-phone__track"
                    style={{
                      transform: `translateX(calc(-${active * 100}% + ${dragOffset}px))`,
                      transition: isDragging ? 'none' : 'transform 0.36s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {SLIDES.map((slide, index) => (
                      <div
                        key={slide.src}
                        className="sbx-phone__slide"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${SLIDES.length}`}
                        aria-hidden={active !== index}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          sizes="(max-width: 768px) 340px, 380px"
                          quality={88}
                          priority={index <= 1}
                          draggable={false}
                          className="sbx-phone__slide-img"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Slide Counter Badge */}
                  <div className="sbx-phone__counter" aria-hidden="true">
                    {active + 1}/{SLIDES.length}
                  </div>

                  {/* Navigation Arrows */}
                  {active > 0 && (
                    <button
                      type="button"
                      className="sbx-phone__arrow sbx-phone__arrow--prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(active - 1);
                      }}
                      aria-label="Previous image"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
                      aria-label="Next image"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Instagram Action Buttons & Pagination Dots */}
                <div className="sbx-phone__actions">
                  <div className="sbx-phone__actions-left">
                    {/* Like button with toggle */}
                    <button
                      type="button"
                      className={`sbx-phone__action-btn sbx-phone__action-btn--like ${isLiked ? 'is-liked' : ''}`}
                      onClick={() => setIsLiked(!isLiked)}
                      aria-label={isLiked ? 'Unlike' : 'Like'}
                    >
                      {isLiked ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ed4956" className="sbx-phone__heart-icon sbx-phone__heart-icon--liked">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      )}
                    </button>
                    {/* Comment */}
                    <button type="button" className="sbx-phone__action-btn" aria-label="Comment">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </button>
                    {/* Share */}
                    <button type="button" className="sbx-phone__action-btn" aria-label="Share">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </div>

                  {/* Centered Pagination Dots */}
                  <div className="sbx-phone__dots" aria-label="Slide indicators">
                    {SLIDES.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`sbx-phone__dot ${active === index ? 'is-active' : ''}`}
                        onClick={() => goTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Bookmark Button */}
                  <div className="sbx-phone__actions-right">
                    <button
                      type="button"
                      className="sbx-phone__action-btn"
                      onClick={() => setIsSaved(!isSaved)}
                      aria-label={isSaved ? 'Remove bookmark' : 'Save post'}
                    >
                      {isSaved ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Instagram Likes & Caption */}
                <div className="sbx-phone__caption-area">
                  <p className="sbx-phone__likes">{isLiked ? '1,429 likes' : '1,428 likes'}</p>
                  <p className="sbx-phone__caption">
                    <strong className="sbx-phone__caption-user">eatsourboo</strong>{' '}
                    From “I cannot stop eating these” to “the spicy ones are gone in a week” — we’ll take that as a very good sign.
                  </p>
                  <p className="sbx-phone__comments-link">View all 38 comments</p>
                  <time className="sbx-phone__time">2 DAYS AGO</time>
                </div>

                {/* iOS Home Indicator Bar */}
                <div className="sbx-phone__home-indicator" aria-hidden="true">
                  <span className="sbx-phone__home-bar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
