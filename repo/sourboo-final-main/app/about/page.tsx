import Link from 'next/link';
import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import type { Metadata } from 'next';

export const revalidate = 300;

const aboutTitle = 'Our Story // Sakshi’s Diary • Sourboo';
const aboutDescription =
  'Read the founder’s diary: how an obsession with khatta snacks and hatred for bland pickles turned into Sourboo. Small-batch, handcrafted, zero chill.';

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: {
    absolute: aboutTitle,
  },
  description: aboutDescription,
  openGraph: {
    title: aboutTitle,
    description: aboutDescription,
    url: '/about',
  },
  twitter: {
    title: aboutTitle,
    description: aboutDescription,
  },
};

export default function AboutPage() {
  return (
    <main className="sb-about-container" style={{ minHeight: '100vh', background: '#F8F6F0' }}>
      <Navbar />

      {/* About Header: Sakshi's Diary */}
      <section className="sb-about-hero" aria-label="About Header">
        <div className="sb-about-hero-inner">
          <div className="sb-tag font-schoolbell">diary // confidential issue 01</div>
          <h1 className="sb-about-heading font-coolvetica">
            dear snackers, <br />
            <span className="text-[#FF6392]">we were bored.</span>
          </h1>
          <p className="sb-about-subheading font-rascal">
            the true unfiltered story of how a late-night pickle craving turned into an artisanal sour revolution.
          </p>
        </div>
      </section>

      {/* Chapter 01: The Obsession */}
      <section className="sb-chapter-section" aria-label="Chapter 1">
        <div className="sb-chapter-grid">
          <div className="sb-chapter-text-col">
            <span className="sb-chapter-num font-schoolbell">chapter 01 // the origin</span>
            <h2 className="sb-chapter-title font-coolvetica">
              it started with a <span className="text-[#2F4918]">soggy dill pickle.</span>
            </h2>
            <div className="sb-diary-entry font-schoolbell">
              <p>
                &ldquo;August 2024. I was sitting on my kitchen counter at 1:30 AM looking for something intensely sour. Everything in the fridge was either sugary sweet or completely lifeless. Commercial pickles were pale, floating in cloudy chemical vinegar with zero crunch.&rdquo;
              </p>
              <p>
                &ldquo;Where was that mouth-puckering, jaw-clenching khatta kick we all grew up with in Indian summers? That raw mango by the roadside kick? Nowhere. So I bought 5 kilos of baby cucumbers the next morning.&rdquo;
              </p>
            </div>
          </div>
          <div className="sb-chapter-visual-col">
            <div className="sb-scrapbook-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/recipe-1.jpg" alt="Kitchen Experiments" className="sb-scrapbook-img" />
              <p className="sb-scrapbook-caption font-schoolbell">
                batch #04 notes: added more mustard seed, jaw hurts, perfection achieved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 02: Why Khatta? */}
      <section className="sb-chapter-section bg-cream" aria-label="Chapter 2">
        <div className="sb-chapter-grid reversed">
          <div className="sb-chapter-visual-col">
            <div className="sb-scrapbook-card rotate-neg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about-cover.JPG" alt="Sakshi Founder" className="sb-scrapbook-img" />
              <p className="sb-scrapbook-caption font-schoolbell">
                sakshi in her natural habitat: judging people who don&apos;t finish the brine.
              </p>
            </div>
          </div>
          <div className="sb-chapter-text-col">
            <span className="sb-chapter-num font-schoolbell">chapter 02 // the mission</span>
            <h2 className="sb-chapter-title font-coolvetica">
              sour is a <span className="text-[#FF6392]">personality trait.</span>
            </h2>
            <div className="sb-diary-entry font-rascal">
              <p>
                Sweet snacks put you to sleep. Spicy snacks make you sweat. But sour snacks? Sour snacks wake your whole nervous system up.
              </p>
              <p>
                We wanted a snack you can munch while bingeing your favourite comfort show, toss into a spicy bloody mary, stack into a 3 AM grilled cheese, or just eat directly from the open jar with a fork while leaning against the sink.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 03: The Cold-Pressed Mustard Oil Secret */}
      <section className="sb-chapter-section" aria-label="Chapter 3">
        <div className="sb-chapter-grid">
          <div className="sb-chapter-text-col">
            <span className="sb-chapter-num font-schoolbell">chapter 03 // the craft</span>
            <h2 className="sb-chapter-title font-coolvetica">
              mustard oil is our <span className="text-[#2F4918]">secret weapon.</span>
            </h2>
            <div className="sb-diary-entry font-rascal">
              <p>
                Most Western pickles rely entirely on watered-down white vinegar. We ditched that playbook. Instead, we bloom cracked mustard seeds, whole peppercorns, and roasted cumin in authentic Indian cold-pressed mustard oil.
              </p>
              <p>
                That warm golden pungency clings to every ridge of the cucumber. When you bite in, you get that crisp loud SNAP, followed by deep aromatic heat and electric tartness.
              </p>
            </div>
          </div>
          <div className="sb-chapter-visual-col">
            <div className="sb-scrapbook-card rotate-pos">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/packagingbg.webp" alt="Mustard Oil Bloom" className="sb-scrapbook-img" />
              <p className="sb-scrapbook-caption font-schoolbell">
                golden cold-pressed brine infused with whole aromatic spices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 04: The Manifesto & Call to Action */}
      <section className="sb-manifesto-section" aria-label="Our Manifesto">
        <div className="sb-manifesto-card">
          <div className="sb-tag font-schoolbell">the promise // no compromises</div>
          <h2 className="sb-manifesto-title font-coolvetica">
            what we will <span className="text-[#FF6392]">never do</span>
          </h2>
          <div className="sb-manifesto-rules font-schoolbell">
            <div className="sb-rule-item">✕ Never use artificial dyes or neon food colours</div>
            <div className="sb-rule-item">✕ Never dilute our brine to save costs</div>
            <div className="sb-rule-item">✕ Never make soggy, limp cucumbers</div>
            <div className="sb-rule-item">✕ Never apologize for being excessively sour</div>
          </div>

          <div className="sb-manifesto-action">
            <Link href="/product" className="sb-cta-btn font-coolvetica">
              taste the rebellion →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
