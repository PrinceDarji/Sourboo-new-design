import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import AboutTongue from '../components/about/AboutTongue';
import '../sourboo-about.css';
import '../sourboo-home.css';
import type { Metadata } from 'next';

export const revalidate = 300;

const aboutTitle = 'About Sourboo — The Pickle Project That Got Out Of Hand';
const aboutDescription =
  'hi i am sakshi, and i am really glad you are here. Sourboo is a sour first snack, made for people who don’t eat quietly.';

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: { absolute: aboutTitle },
  description: aboutDescription,
  openGraph: { title: aboutTitle, description: aboutDescription, url: '/about' },
  twitter: { title: aboutTitle, description: aboutDescription },
};

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

export default function AboutPage() {
  return (
    <main className="sb-about-page" aria-label="About Sourboo">
      <Navbar />

      <section className="sb-ab-hero-wrap" aria-label="Sakshi">
        <div className="sb-ab-container sb-ab-hero-grid">
          <div className="sb-ab-hero-text">
            <p className="sb-ab-hero-kicker">hi i am sakshi,</p>
            <h1 className="sb-ab-hero-heading">and i am really glad you are here</h1>
            <p className="sb-ab-hero-sub">
              if u are here, i am assuming, you like sour or curious enough to try it
            </p>
          </div>
          <div className="sb-ab-hero-media">
            <figure className="sb-ab-photo sb-ab-photo--hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/about-cover.JPG" alt="Sakshi and a friend eating Sourboo pickled gherkins" />
            </figure>
          </div>
        </div>
      </section>

      <section className="sb-ab-edit sb-ab-edit--lime" aria-label="Flavour obsession">
        <div className="sb-ab-edit__copy">
          <p>I&apos;ve always been (annoyingly) obsessed with flavours.</p>
          <p>Mixing things Tasting everything</p>
          <p>spent 5 years around food and drinks from london bar shifts to a 9-5 desk job in India</p>
          <p>different lives, same cravings</p>
        </div>
        <div className="sb-ab-edit__photos">
          <figure className="sb-ab-photo">
            <img src="/about/originals/section-two-1-photo.jpg" alt="Sakshi with the bar team during London shifts" />
          </figure>
          <figure className="sb-ab-photo sb-ab-photo--offset">
            <img src="/about/originals/section-two-3-photo.jpg" alt="Sakshi tasting and celebrating with friends" />
          </figure>
        </div>
      </section>

      <AboutTongue />

      <section className="sb-ab-edit sb-ab-edit--white" aria-label="The problem">
        <div className="sb-ab-edit__copy">
          <h2>MY BIGGEST ISSUE?</h2>
          <p>Sour was always treated like a side.</p>
          <p>A squeeze here.</p>
          <p>A spoon of pickle there.</p>
        </div>
        <div className="sb-ab-edit__bits">
          <img src="/about/lemondrop.svg" alt="A drop of lemon" />
          <img src="/about/spoonofpickle.gif" alt="A spoon of pickle" />
        </div>
      </section>

      <section className="sb-ab-edit sb-ab-edit--purple" aria-label="Introducing Sourboo">
        <div className="sb-ab-edit__copy">
          <p className="sb-ab-intro-kicker">Introducing</p>
          <img src="/logo.svg" alt="Sourboo" className="sb-ab-intro-logo" width="220" height="80" />
          <h2>Made for mouths that misbehave</h2>
          <p>sour first snack, made for people who don&apos;t eat quietly.</p>
          <p>for women who love loud flavours, strong opinions, and fully indulging.</p>
          <p>The kind who make faces when they eat.</p>
          <p>The kind who ask for extra nimbu.</p>
          <p>A new way of snacking.</p>
        </div>
        <figure className="sb-ab-photo">
          <img src="/about/originals/section-two-2-photo.jpg" alt="The Sourboo team behind the bar" />
        </figure>
      </section>

      <section className="sb-ab-edit sb-ab-edit--lime" aria-label="Community">
        <div className="sb-ab-community">
          <figure className="sb-ab-photo">
            <img src="/about/section-six-top-1.webp" alt="Sakshi tasting Sourboo at a brand event" />
          </figure>
          <figure className="sb-ab-photo sb-ab-photo--offset">
            <img src="/about/section-six-top-3.JPEG" alt="A guest tasting Sourboo pickled gherkins" />
          </figure>
          <figure className="sb-ab-photo">
            <img src="/about/section-six-top-2.JPEG" alt="Sourboo event moment" />
          </figure>
        </div>
        <div className="sb-ab-edit__copy">
          <p>That&apos;s Sourboo to me.</p>
          <p>And I hope you love it as much as I do</p>
          <p>get to know</p>
          <p>
            <a href="https://www.instagram.com/eatsourboo/" target="_blank" rel="noreferrer">
              @eatsourboo
            </a>
          </p>
        </div>
      </section>

      <section className="sb-ab-reels" aria-label="Instagram reels">
        <div className="sb-ab-reels__grid">
          {REELS.map((reel) => (
            <a key={reel.href} className="sb-ab-reel" href={reel.href} target="_blank" rel="noreferrer">
              <span className="sb-ab-reel__frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={reel.thumb} alt="" />
                <span className="sb-ab-reel__shade" />
                <span className="sb-ab-reel__meta">
                  <span>REEL {reel.number}</span>
                  <span>INSTAGRAM</span>
                </span>
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
