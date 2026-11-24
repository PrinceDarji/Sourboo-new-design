import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import { Wave } from '../components/site/Organic';
import '../sourboo-about.css';
import '../sourboo-home.css';
import '../sourboo-story.css';
import type { Metadata } from 'next';
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
              hi i am <span className="sb-story-hero__name font-rascal">sakshi</span>,
              <br />
              and i am really glad you are <span className="sb-story-hero__highlight font-rascal">here</span>
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
              <span className="sb-story-hero__badge-tag font-rascal">Founder &amp; Chief Pickle Addict</span>
            </div>
            {/* Natural gherkin illustration from approved brand assets */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/home/ingredients/sliced-gherkin.png"
              alt=""
              aria-hidden="true"
              className="sb-story-hero__gherkin-accent"
              width="100"
              height="100"
            />
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
              I&apos;ve always been (annoyingly) obsessed with <span className="sb-story-flavour__accent font-rascal">flavours</span>.
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

          {/* Desi Palate Narrative with natural lemon & gherkin flavour accents */}
          <div className="sb-story-palate-bridge">
            <div className="sb-story-palate-bridge__copy">
              <h3 className="sb-story-palate-bridge__heading">
                Different lives, <span className="sb-story-palate-bridge__highlight font-rascal">same cravings</span>.
              </h3>
              <p className="sb-story-palate-bridge__text">
                Nothing worked for a desi palate that loves bold, spicy, and sour — but doesn&apos;t want to feel weighed down after snacking.
              </p>
            </div>
            <div className="sb-story-palate-bridge__accents" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/home/ingredients/lemon-wedge.png"
                alt=""
                className="sb-story-palate-bridge__lemon"
                width="84"
                height="84"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/home/ingredients/sliced-gherkin.png"
                alt=""
                className="sb-story-palate-bridge__gherkin"
                width="76"
                height="76"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STORY CHAPTER 3: INTRODUCING SOURBOO & PLAYFUL POLAROID PHOTOGRAPHY (Lime Canvas)
          ========================================================================= */}
      <section className="sb-story-manifesto-wrap" aria-labelledby="sb-story-manifesto-title">
        <Wave fill="var(--sbx-lime)" position="top" variant={1} />
        <div className="sb-story-wrap">
          <div className="sb-story-manifesto__head">
            <div className="sb-story-manifesto__brandmark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Sourboo" className="sb-story-manifesto__logo" width="280" height="98" />
            </div>
            <h2 id="sb-story-manifesto-title" className="sb-story-manifesto__title">
              Sour first snack, made for people who don&apos;t eat quietly.
            </h2>
            <div className="sb-story-manifesto__content">
              <p className="sb-story-manifesto__statement">
                For women who love loud flavours, strong opinions, and fully indulging.
              </p>

              {/* Lemon and gherkin illustrations naturally placed with corresponding copy */}
              <div className="sb-story-manifesto__moments">
                <div className="sb-story-manifesto__moment">
                  <div className="sb-story-manifesto__moment-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/about/spoonofpickle.gif"
                      alt="Crunchy pickled gherkin on spoon"
                      className="sb-story-manifesto__moment-img"
                      width="88"
                      height="88"
                    />
                  </div>
                  <p className="sb-story-manifesto__moment-text">
                    The kind who make faces when they eat.
                  </p>
                </div>

                <div className="sb-story-manifesto__moment">
                  <div className="sb-story-manifesto__moment-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/about/lemonsqueze.gif"
                      alt="Fresh lemon squeeze"
                      className="sb-story-manifesto__moment-img"
                      width="88"
                      height="88"
                    />
                  </div>
                  <p className="sb-story-manifesto__moment-text">
                    The kind who ask for extra nimbu.
                  </p>
                </div>
              </div>

              <p className="sb-story-manifesto__newway">
                A new way of snacking.
              </p>
            </div>
          </div>

          {/* Playful Polaroid-Style Photo Section (No Rigid Grids) */}
          <div className="sb-story-polaroids" role="region" aria-label="Sourboo Real Moments">
            {/* Image 1: Tasting Moment */}
            <div className="sb-polaroid sb-polaroid--1">
              <div className="sb-polaroid__inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/section-six-top-1.webp"
                  alt="Sourboo event tasting moment"
                  className="sb-polaroid__img"
                />
                <p className="sb-polaroid__caption font-rascal">Tasting sour live</p>
              </div>
            </div>

            {/* Image 2: Team Moment */}
            <div className="sb-polaroid sb-polaroid--2">
              <div className="sb-polaroid__inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/section-six-top-2.webp"
                  alt="Sourboo event team moment"
                  className="sb-polaroid__img"
                />
                <p className="sb-polaroid__caption font-rascal">The sour squad</p>
              </div>
            </div>

            {/* Image 3: Customer Reaction */}
            <div className="sb-polaroid sb-polaroid--3">
              <div className="sb-polaroid__inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/section-six-top-3.webp"
                  alt="Sourboo customer reaction"
                  className="sb-polaroid__img"
                />
                <p className="sb-polaroid__caption font-rascal">Unapologetic reactions</p>
              </div>
            </div>

            {/* Image 4: Authentic Food Dish */}
            <div className="sb-polaroid sb-polaroid--4">
              <div className="sb-polaroid__inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/recipe-1.jpg"
                  alt="Bowl of crunchy seasoned pickled gherkins"
                  className="sb-polaroid__img"
                />
                <p className="sb-polaroid__caption font-rascal">
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
