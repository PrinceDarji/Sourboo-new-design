import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import AboutTongue from '../components/about/AboutTongue';
import AboutFlavorWords from '../components/about/AboutFlavorWords';
import AboutTopStrip from '../components/about/AboutTopStrip';
import AboutWordByWordReveal from '../components/about/AboutWordByWordReveal';
import '../sourboo-about.css';
import '../sourboo-home.css';
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
  Asset checklist — original About image → section
  Hero graphic (Sanity SVG)            → sb-story-hero
  /about/section-two-1.svg             → sb-story-collage (Mixing things)
  /about/section-two-2.svg             → sb-story-collage (Tasting everything)
  /about/section-two-3.svg             → sb-story-collage (third visual)
  /about/section-three-eyes.webp       → AboutTongue / SectionThreeEyesSequence
  /about/section-three-tongue.svg      → AboutTongue
  /about/boldbg.svg                    → AboutFlavorWords
  /about/spicybg.svg                   → AboutFlavorWords
  /about/sourbg.svg                    → AboutFlavorWords
  /about/lemonsqueze.gif               → sb-story-issue (A squeeze here)
  /about/spoonofpickle.gif             → sb-story-issue (A spoon of pickle)
  /about/paper-tear.svg                → sb-story-paper (both chapter breaks)
  /logo.svg                            → sb-story-introducing
  /tagline.svg                         → sb-story-introducing
  /about/section-six-top-1.webp        → AboutTopStrip
  /about/section-six-top-2.webp        → AboutTopStrip
  /about/section-six-top-3.webp        → AboutTopStrip
  /navbody.webp                        → shared nav (existing site chrome)
  /footer-photo.webp                   → site footer collage
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

function PaperTear({ side }: { side: 'into' | 'out' }) {
  return (
    <div className={`sb-story-paper sb-story-paper--${side}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/about/paper-tear.svg" alt="" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="sb-story" aria-label="Our Story">
      <Navbar />
      <AboutWordByWordReveal />

      <section className="sb-story-hero" aria-label="Sakshi">
        <div className="sb-story-hero__frame">
          <div className="sb-story-hero__crop">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_SRC} alt="Hero" className="sb-story-hero__img" fetchPriority="high" />
          </div>
          <div className="sb-story-hero__caption" data-word-reveal-skip>
            <h1 className="sb-story-hero__hi">
              hi i am <ShadowWord>sakshi</ShadowWord>,
            </h1>
          </div>
        </div>
        <div className="sb-story-welcome">
          <h2 className="sb-story-hero__glad">
            and i am really glad you are <ShadowWord>here</ShadowWord>
          </h2>
          <p className="sb-story-welcome__sub">
            if u are here, i am assuming, you like sour or curious enough to try it
          </p>
        </div>
      </section>

      <section className="sb-story-collage" aria-label="Flavour obsession">
        <p className="sb-story-line sb-story-line--center sb-story-collage__lead">
          I&apos;ve always been (annoyingly) obsessed with flavours.
        </p>
        <div className="sb-story-collage__stage">
          <p className="sb-story-collage__note sb-story-collage__note--mix" data-word-reveal-skip>
            Mixing things
          </p>
          <figure className="sb-story-collage__shot sb-story-collage__shot--mix">
            <img src="/about/section-two-1.svg" alt="Mixing drinks" />
          </figure>
          <p className="sb-story-collage__note sb-story-collage__note--taste" data-word-reveal-skip>
            Tasting everything
          </p>
          <figure className="sb-story-collage__shot sb-story-collage__shot--taste">
            <img src="/about/section-two-2.svg" alt="Tasting everything" />
          </figure>
          <figure className="sb-story-collage__shot sb-story-collage__shot--third">
            <img src="/about/section-two-3.svg" alt="Third collage visual" />
          </figure>
        </div>
        <p className="sb-story-line sb-story-line--center">spent 5 years</p>
        <p className="sb-story-line sb-story-line--center sb-story-collage__years">
          around food and drinks from london bar shifts to a 9-5 desk job in India
        </p>
      </section>

      <AboutTongue />

      <section className="sb-story-taste" aria-label="Bold spicy sour">
        <div className="sb-story-taste__blobs">
          <AboutFlavorWords />
        </div>
        <p className="sb-story-line sb-story-line--center">
          but doesn&apos;t want to feel weighed down after snacking
        </p>
        <h2 className="sb-story-issue">
          <span className="sb-story-issue__scribble" aria-hidden="true" />
          MY BIGGEST ISSUE?
        </h2>
        <p className="sb-story-line sb-story-line--center">Sour was always treated like a side.</p>
        <div className="sb-story-squeeze">
          <div className="sb-story-squeeze__gif" aria-hidden="true">
            <img src="/about/lemonsqueze.gif" alt="" />
          </div>
          <p>A squeeze here.</p>
        </div>
        <div className="sb-story-pickle">
          <div className="sb-story-pickle__gif" aria-hidden="true">
            <img src="/about/spoonofpickle.gif" alt="" />
          </div>
          <p>A spoon of pickle there.</p>
        </div>
      </section>

      <section className="sb-story-introducing" aria-label="Introducing Sourboo">
        <PaperTear side="into" />
        <p className="sb-story-introducing__kicker">Introducing</p>
        <div className="sb-story-introducing__logo">
          <img src="/logo.svg" alt="Sourboo logo" />
        </div>
        <div className="sb-story-introducing__tagline">
          <img src="/tagline.svg" alt="Tagline illustration" />
        </div>
        <p className="sb-story-line sb-story-line--center">
          sour first snack, made for people who don&apos;t eat quietly.
        </p>
        <p className="sb-story-line sb-story-line--center">
          for women who love <span className="sb-story-lime">loud flavours, strong opinions, and fully indulging.</span>
        </p>
        <p className="sb-story-line sb-story-line--center">The kind who make faces when they eat.</p>
        <p className="sb-story-line sb-story-line--center">The kind who ask for extra nimbu.</p>
        <p className="sb-story-newway">
          <ShadowWord>A new way of snacking.</ShadowWord>
        </p>
        <PaperTear side="out" />
      </section>

      <section className="sb-story-events" aria-label="Sourboo events" data-scroll-reveal="off">
        <AboutTopStrip />
        <p className="sb-story-line sb-story-line--center sb-story-events__close">
          That&apos;s Sourboo to me.
          <br />
          And I hope you love it as much as I do
        </p>
      </section>

      <section className="sb-story-ig" aria-label="Instagram">
        <div className="sb-story-ig__photo" aria-hidden="true">
          <img src="/footer-photo.webp" alt="" />
        </div>
        <p className="sb-story-line sb-story-line--center">get to know</p>
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
