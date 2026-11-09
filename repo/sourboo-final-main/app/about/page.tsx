import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import AboutTongue from '../components/about/AboutTongue';
import AboutFlavorWords from '../components/about/AboutFlavorWords';
import AboutTopStrip from '../components/about/AboutTopStrip';
import '../sourboo-about.css';
import '../sourboo-home.css';
import '../sourboo-story.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const revalidate = 300;

const HERO_SRC =
  'https://cdn.sanity.io/files/9xcisbtj/production/e16e68ace7ed228d0c8e4206e2c6a2e2a141c532.svg';

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

/*
  Asset checklist — original About image → new editorial section
  Hero graphic (Sanity SVG)            → sb-story-hero
  /about/section-two-1.svg             → sb-story-flavour (Mixing things)
  /about/section-two-2.svg             → sb-story-flavour (Tasting everything)
  /about/section-two-3.svg             → sb-story-flavour (third visual)
  /about/section-three-eyes.webp       → AboutTongue / eyes
  /about/section-three-tongue.svg      → AboutTongue
  /about/boldbg.svg                    → AboutFlavorWords
  /about/spicybg.svg                   → AboutFlavorWords
  /about/sourbg.svg                    → AboutFlavorWords
  /about/lemonsqueze.gif               → sb-story-issue
  /about/spoonofpickle.gif             → sb-story-issue
  /logo.svg                            → sb-story-manifesto
  /about/section-six-top-1.webp        → AboutTopStrip / manifesto photos
  /about/section-six-top-2.webp        → AboutTopStrip
  /about/section-six-top-3.webp        → AboutTopStrip
  /footer-photo.webp                   → Instagram backdrop
*/

const REELS = [
  {
    number: '01',
    title: 'Try Sourboo',
    href: 'https://www.instagram.com/reel/DUYW9E8kstT/',
    thumb: '/about/reels/DUYW9E8kstT.jpg',
  },
  {
    number: '02',
    title: "What's up with us",
    href: 'https://www.instagram.com/reel/DX6DhJbpD28/',
    thumb: '/about/reels/DX6DhJbpD28.jpg',
  },
  {
    number: '03',
    title: 'Eat w Sakshi',
    href: 'https://www.instagram.com/reel/DTzhFCuElJ-/',
    thumb: '/about/reels/DTzhFCuElJ-.jpg',
  },
] as const;

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

export default function AboutPage() {
  return (
    <main className="sb-story" aria-label="Our Story">
      <Navbar />

      <section className="sb-story-hero" aria-label="Sakshi">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_SRC} alt="Sakshi" className="sb-story-hero__img" fetchPriority="high" />
      </section>

      <section className="sb-story-intro" aria-labelledby="sb-story-intro-title">
        <div className="sb-story-wrap">
          <p className="sb-story-kicker">Our Story</p>
          <h1 id="sb-story-intro-title" className="sb-story-intro__hi">
            hi i am <ShadowWord>sakshi</ShadowWord>,
          </h1>
          <p className="sb-story-intro__glad">
            and i am really glad you are <ShadowWord>here</ShadowWord>
          </p>
          <p className="sb-story-intro__sub">
            if u are here, i am assuming, you like sour or curious enough to try it
          </p>
        </div>
      </section>

      <section className="sb-story-flavour" aria-labelledby="sb-story-flavour-title">
        <div className="sb-story-wrap sb-story-flavour__copy">
          <p className="sb-story-kicker sb-story-kicker--lime">Flavour obsession</p>
          <h2 id="sb-story-flavour-title">
            I&apos;ve always been (annoyingly) obsessed with <ShadowWord>flavours</ShadowWord>.
          </h2>
          <p className="sb-story-flavour__years">
            spent 5 years around food and drinks from london bar shifts to a 9-5 desk job in India
          </p>
        </div>
        <div className="sb-story-flavour__photos">
          <figure className="sb-story-shot sb-story-shot--mix">
            <img src="/about/section-two-1.svg" alt="Mixing drinks" />
            <figcaption>Mixing things</figcaption>
          </figure>
          <figure className="sb-story-shot sb-story-shot--taste">
            <img src="/about/section-two-2.svg" alt="Tasting everything" />
            <figcaption>Tasting everything</figcaption>
          </figure>
          <figure className="sb-story-shot sb-story-shot--third">
            <img src="/about/section-two-3.svg" alt="Friends at a bar" />
          </figure>
        </div>
      </section>

      <AboutTongue />

      <section className="sb-story-taste" aria-labelledby="sb-story-taste-title">
        <div className="sb-story-wrap">
          <p className="sb-story-kicker sb-story-kicker--lime">The palate</p>
          <h2 id="sb-story-taste-title" className="sr-only">
            Bold, spicy, sour
          </h2>
          <AboutFlavorWords />
          <p className="sb-story-taste__after">
            but doesn&apos;t want to feel weighed down after snacking
          </p>
        </div>
      </section>

      <section className="sb-story-issue" aria-labelledby="sb-story-issue-title">
        <div className="sb-story-wrap">
          <p className="sb-story-kicker">The problem</p>
          <h2 id="sb-story-issue-title">
            My biggest <ShadowWord>issue</ShadowWord>?
          </h2>
          <p className="sb-story-issue__lead">Sour was always treated like a side.</p>
          <div className="sb-story-issue__pair">
            <figure className="sb-story-gif">
              <img src="/about/lemonsqueze.gif" alt="" />
              <figcaption>A squeeze here.</figcaption>
            </figure>
            <figure className="sb-story-gif">
              <img src="/about/spoonofpickle.gif" alt="" />
              <figcaption>A spoon of pickle there.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="sb-story-manifesto" aria-labelledby="sb-story-manifesto-title">
        <div className="sb-story-wrap sb-story-manifesto__top">
          <p className="sb-story-kicker">Introducing</p>
          <div className="sb-story-manifesto__logo">
            <img src="/logo.svg" alt="Sourboo" />
          </div>
          <h2 id="sb-story-manifesto-title">
            Sour first snack, made for people who don&apos;t eat quietly.
          </h2>
        </div>

        <div className="sb-story-wrap sb-story-manifesto__photos">
          <AboutTopStrip />
        </div>

        <div className="sb-story-manifesto__band">
          <div className="sb-story-wrap sb-story-manifesto__who">
            <p className="sb-story-manifesto__for">
              For women who love loud flavours, strong opinions, and fully indulging.
            </p>
            <div className="sb-story-manifesto__kinds">
              <figure className="sb-story-kind sb-story-kind--faces">
                <img src="/about/spoonofpickle.gif" alt="" />
                <figcaption>The kind who make faces when they eat.</figcaption>
              </figure>
              <figure className="sb-story-kind sb-story-kind--nimbu">
                <img src="/about/lemonsqueze.gif" alt="" />
                <figcaption>The kind who ask for extra nimbu.</figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div className="sb-story-manifesto__closer">
          <div className="sb-story-wrap">
            <p className="sb-story-manifesto__way">A new way of snacking.</p>
          </div>
        </div>
      </section>

      <section className="sb-story-close" aria-label="Closing">
        <div className="sb-story-wrap">
          <p className="sb-story-close__line">That&apos;s Sourboo to me.</p>
          <p className="sb-story-close__hope">And I hope you love it as much as I do</p>
        </div>
      </section>

      <section className="sb-story-ig" aria-label="Instagram">
        <div className="sb-story-ig__photo" aria-hidden="true">
          <img src="/footer-photo.webp" alt="" />
        </div>
        <p className="sb-story-kicker sb-story-kicker--lime">get to know</p>
        <p className="sb-story-ig__handle">
          <a href="https://www.instagram.com/sourboosnacks/" target="_blank" rel="noreferrer">
            @sourboosnacks
          </a>
        </p>
        <div className="sb-ab-reels__grid">
          {REELS.map((reel) => (
            <a key={reel.href} className="sb-ab-reel" href={reel.href} target="_blank" rel="noreferrer">
              <span className="sb-ab-reel__frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={reel.thumb} alt="" />
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
        <Link href="/product" className="sb-ab-btn-shop">
          Shop Now →
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
