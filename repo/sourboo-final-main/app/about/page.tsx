import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import { Wave } from '../components/site/Organic';
import '../sourboo-about.css';
import '../sourboo-home.css';
import '../sourboo-story.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getLatestReels } from '../lib/instagram';

export const revalidate = 300;

const aboutTitle = 'Our Story | Sourboo';
const aboutDescription =
  'hi i am sakshi, and i am really glad you are here. Sourboo is a sour first snack, made for people who don’t eat quietly.';

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: { absolute: aboutTitle },
  description: aboutDescription,
  openGraph: { title: aboutTitle, description: aboutDescription, url: '/about' },
  twitter: { title: aboutTitle, description: aboutDescription },
};

function ShadowWord({ children }: { children: ReactNode }) {
  return (
    <span className="sb-story-shadow">
      <span className="sb-story-shadow__hand" aria-hidden="true">
        {children}
      </span>
      <span className="sb-story-shadow__top">{children}</span>
    </span>
  );
}

export default async function AboutPage() {
  const { reels } = await getLatestReels(3);

  return (
    <main className="sb-story" aria-label="Our Story">
      <Navbar />

      {/* =========================================================================
          STORY CHAPTER 1: SAKSHI'S WELCOME & FOUNDER GREETING (Lime Canvas)
          ========================================================================= */}
      <section className="sb-story-hero" aria-labelledby="sb-story-hero-title">
        <div className="sb-story-wrap sb-story-hero__grid">
          <div className="sb-story-hero__copy">
            <span className="sb-story-tagline">Our Story</span>
            <h1 id="sb-story-hero-title" className="sb-story-hero__title">
              hi i am <ShadowWord>sakshi</ShadowWord>,
              <br />
              and i am really glad you are <ShadowWord>here</ShadowWord>
            </h1>
            <p className="sb-story-hero__sub">
              if u are here, i am assuming, you like sour or curious enough to try it.
            </p>
            <p className="sb-story-hero__lead">
              Sourboo is a sour first snack, made for people who don&apos;t eat quietly.
            </p>
            <div className="sb-story-hero__social">
              <a
                href="https://www.instagram.com/eatsourboo/"
                target="_blank"
                rel="noreferrer"
                className="sb-story-hero__ig-pill"
                aria-label="Connect with Sakshi @eatsourboo on Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
                </svg>
                <span>Connect with Sakshi @eatsourboo ↗</span>
              </a>
            </div>
          </div>

          <div className="sb-story-hero__visual">
            <div className="sb-story-hero__blob-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about-cover.JPG"
                alt="Sourboo founder Sakshi holding a jar of crunchy pickled gherkins"
                className="sb-story-hero__blob-img"
              />
            </div>
            <div className="sb-story-hero__founder-badge">
              <span className="sb-story-hero__badge-name">Sakshi</span>
              <span className="sb-story-hero__badge-tag">Founder &amp; Chief Pickle Addict</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STORY CHAPTER 2: 5-YEAR FLAVOUR OBSESSION & PALATE (Hot Pink Canvas)
          ========================================================================= */}
      <section className="sb-story-flavour" aria-labelledby="sb-story-flavour-title">
        <Wave fill="var(--sbx-pink)" position="top" variant={1} />
        <div className="sb-story-wrap">
          <div className="sb-story-flavour__head">
            <h2 id="sb-story-flavour-title" className="sb-story-flavour__title">
              I&apos;ve always been (annoyingly) obsessed with <ShadowWord>flavours</ShadowWord>.
            </h2>
            <p className="sb-story-flavour__years">
              spent 5 years around food and drinks from london bar shifts to a 9-5 desk job in India
            </p>
          </div>

          <div className="sb-story-flavour__stream">
            {/* Moment 1 */}
            <div className="sb-story-step sb-story-step--1">
              <div className="sb-story-step__frame sb-story-step__frame--1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/originals/section-two-1-photo.jpg" alt="Mixing drinks in London" />
              </div>
              <div className="sb-story-step__text">
                <h3 className="sb-story-step__heading">Mixing things</h3>
                <p className="sb-story-step__desc">
                  Testing acidity, crunch, and sharp tang across late-night bar shifts in London.
                </p>
              </div>
            </div>

            {/* Moment 2 */}
            <div className="sb-story-step sb-story-step--2">
              <div className="sb-story-step__frame sb-story-step__frame--2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/originals/section-two-2-photo.jpg" alt="Tasting and testing flavours" />
              </div>
              <div className="sb-story-step__text">
                <h3 className="sb-story-step__heading">Tasting everything</h3>
                <p className="sb-story-step__desc">
                  Never settling for boring, overly sweet, or timid supermarket snacking.
                </p>
              </div>
            </div>

            {/* Moment 3 */}
            <div className="sb-story-step sb-story-step--3">
              <div className="sb-story-step__frame sb-story-step__frame--3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/originals/section-two-3-photo.jpg" alt="Bar shifts to desk cravings" />
              </div>
              <div className="sb-story-step__text">
                <h3 className="sb-story-step__heading">From bar shifts to 4 PM desk cravings</h3>
                <p className="sb-story-step__desc">
                  When the afternoon slump hits and your palate desperately craves a real sour punch.
                </p>
              </div>
            </div>
          </div>

          {/* Desi Palate Narrative (Seamless Flow, Zero Cartoon Vectors) */}
          <div className="sb-story-palate-bridge">
            <h3 className="sb-story-palate-bridge__heading">
              Different lives, <ShadowWord>same cravings</ShadowWord>.
            </h3>
            <p className="sb-story-palate-bridge__text">
              Nothing worked for a desi palate that loves bold, spicy, and sour — but doesn&apos;t want to feel weighed down after snacking.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STORY CHAPTER 3: INTRODUCING SOURBOO & EDITORIAL UNCROPPED PHOTOGRAPHY (Lime Canvas)
          ========================================================================= */}
      <section className="sb-story-manifesto-wrap" aria-labelledby="sb-story-manifesto-title">
        <Wave fill="var(--sbx-lime)" position="top" variant={1} />
        <div className="sb-story-wrap">
          <div className="sb-story-manifesto__head">
            <div className="sb-story-manifesto__brandmark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Sourboo" className="sb-story-manifesto__logo" />
            </div>
            <h2 id="sb-story-manifesto-title" className="sb-story-manifesto__title">
              Sour first snack, made for people who don&apos;t eat quietly.
            </h2>
            <p className="sb-story-manifesto__statement">
              For women who love loud flavours, strong opinions, and fully indulging. The kind who make faces when they eat. The kind who ask for extra nimbu. A new way of snacking.
            </p>
          </div>

          {/* Editorial Uncropped Photography Gallery */}
          <div className="sb-story-editorial-gallery" role="region" aria-label="Sourboo Real Moments">
            <div className="sb-story-editorial-grid">
              {/* Image 1: Tasting Moment */}
              <div className="sb-story-editorial-item sb-story-editorial-item--1">
                <div className="sb-story-editorial-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/about/section-six-top-1.webp"
                    alt="Sourboo event tasting moment"
                    className="sb-story-editorial-img"
                  />
                </div>
                <span className="sb-story-editorial-caption">Tasting sour live</span>
              </div>

              {/* Image 2: Team Moment */}
              <div className="sb-story-editorial-item sb-story-editorial-item--2">
                <div className="sb-story-editorial-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/about/section-six-top-2.webp"
                    alt="Sourboo event team moment"
                    className="sb-story-editorial-img"
                  />
                </div>
                <span className="sb-story-editorial-caption">The sour squad</span>
              </div>

              {/* Image 3: Customer Reaction */}
              <div className="sb-story-editorial-item sb-story-editorial-item--3">
                <div className="sb-story-editorial-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/about/section-six-top-3.webp"
                    alt="Sourboo customer reaction"
                    className="sb-story-editorial-img"
                  />
                </div>
                <span className="sb-story-editorial-caption">Unapologetic reactions</span>
              </div>

              {/* Image 4: Authentic Food Dish */}
              <div className="sb-story-editorial-item sb-story-editorial-item--dish">
                <div className="sb-story-editorial-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/recipe-1.jpg"
                    alt="Bowl of crunchy seasoned pickled gherkins"
                    className="sb-story-editorial-img"
                  />
                </div>
                <p className="sb-story-editorial-caption">
                  Snackable pickled gherkins — crisp, juicy &amp; uncompromisingly tangy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STORY CHAPTER 4: SAKSHI'S NOTE & OFFICIAL REELS FEED (Electric Pink Canvas)
          ========================================================================= */}
      <section className="sb-story-social-feed" aria-labelledby="sb-story-social-title">
        <Wave fill="var(--sbx-pink)" position="top" variant={2} />
        <div className="sb-story-wrap">
          <div className="sb-story-social__header">
            <div className="sb-story-social__copy">
              <h2 id="sb-story-social-title" className="sb-story-social__title">
                That&apos;s Sourboo to me.
              </h2>
              <p className="sb-story-social__hope">
                And I hope you love it as much as I do — Sakshi
              </p>
            </div>

            <div className="sb-story-social__account">
              <p className="sb-story-social__kicker">get to know</p>
              <a
                href="https://www.instagram.com/eatsourboo/"
                target="_blank"
                rel="noreferrer"
                className="sb-story-social__handle"
                aria-label="Visit Sakshi's official Instagram @eatsourboo"
              >
                <svg
                  className="sb-story-social__ig-icon"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
                </svg>
                <span>@eatsourboo</span>
                <span className="sb-story-social__arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="sb-ab-reels__grid">
            {reels.map((reel) => (
              <a key={reel.href} className="sb-ab-reel" href={reel.href} target="_blank" rel="noreferrer">
                <span className="sb-ab-reel__frame">
                  {reel.videoUrl ? (
                    <video
                      src={reel.videoUrl}
                      poster={reel.thumb}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      className="sb-ab-reel__video"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={reel.thumb} alt={reel.title} />
                  )}
                  <span className="sb-ab-reel__shade" />
                  <span className="sb-ab-reel__play">
                    <span className="sb-ab-reel__icon" aria-hidden="true" />
                    <span>WATCH REEL</span>
                  </span>
                </span>
                <span className="sb-ab-reel__kicker">INSTAGRAM</span>
                <span className="sb-ab-reel__title">{reel.title}</span>
              </a>
            ))}
          </div>

          <div className="sb-story-social__cta">
            <Link href="/product" className="sb-story-shop-btn">
              Shop Now →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
