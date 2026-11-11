import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import type { Metadata } from 'next';

export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: '/join' },
  title: { absolute: 'Join Us | The Sourboo Community & Collaborations' },
  description:
    'Join the Sourboo inner circle. Connect with Sakshi, explore stockist wholesale partnerships, cafe collaborations, and tasting event invitations.',
};

export default function JoinPage() {
  return (
    <main className="sb-join-container" style={{ minHeight: '100vh', background: '#FDFBF7' }}>
      <Navbar />

      <section className="sb-shop-hero-banner" aria-label="Join Header">
        <div className="sb-shop-hero-pill font-schoolbell">
          community // the inner circle
        </div>
        <h1 className="sb-shop-hero-title font-coolvetica">
          join the <span style={{ color: '#E81B6D' }}>sourboo club.</span>
        </h1>
        <p className="sb-shop-hero-sub font-schoolbell">
          be the first to taste experiment drops, grab unreleased merch, and hang with fellow sour fiends.
        </p>
      </section>

      <section className="sb-collection-section" aria-label="Join Cards">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', maxWidth: '1080px', margin: '0 auto' }}>
          {/* Card 1: Community Snack Chat */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '36px',
              padding: '36px 30px',
              border: '2px solid #EBDDF8',
              boxShadow: '0 16px 36px rgba(99, 45, 16, 0.08)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              className="font-schoolbell"
              style={{
                display: 'inline-block',
                background: '#F4EFFB',
                color: '#632D10',
                padding: '4px 14px',
                borderRadius: '9999px',
                width: 'fit-content',
                fontSize: '1.05rem',
                border: '1px solid #8B5CF6',
              }}
            >
              community &amp; feedback
            </span>
            <h2 className="font-coolvetica" style={{ fontSize: '2.4rem', color: '#26140A', margin: '16px 0 8px' }}>
              snack chat &amp; drops
            </h2>
            <p className="font-schoolbell" style={{ fontSize: '1.25rem', color: '#632D10', lineHeight: 1.35, margin: '0 0 24px', flex: 1 }}>
              Direct access to taste tests, voting on unreleased flavours, and secret pop-up invitations. Have something to say? We want to hear it.
            </p>
            <a
              href="mailto:cravings@sourboo.com"
              className="font-coolvetica"
              style={{
                display: 'inline-block',
                textAlign: 'center',
                background: '#E81B6D',
                color: '#FFFFFF',
                padding: '14px 24px',
                borderRadius: '9999px',
                textDecoration: 'none',
                fontSize: '1.15rem',
                boxShadow: '0 6px 16px rgba(232, 27, 109, 0.3)',
              }}
            >
              email the sour club (cravings@sourboo.com) →
            </a>
          </div>

          {/* Card 2: Stockists & Collabs */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '36px',
              padding: '36px 30px',
              border: '2px solid #EBDDF8',
              boxShadow: '0 16px 36px rgba(99, 45, 16, 0.08)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              className="font-schoolbell"
              style={{
                display: 'inline-block',
                background: '#FFF3CD',
                color: '#632D10',
                padding: '4px 14px',
                borderRadius: '9999px',
                width: 'fit-content',
                fontSize: '1.05rem',
                border: '1px solid #C96A00',
              }}
            >
              partnerships &amp; stockists
            </span>
            <h2 className="font-coolvetica" style={{ fontSize: '2.4rem', color: '#26140A', margin: '16px 0 8px' }}>
              wholesale &amp; cafe collabs
            </h2>
            <p className="font-schoolbell" style={{ fontSize: '1.25rem', color: '#632D10', lineHeight: 1.35, margin: '0 0 24px', flex: 1 }}>
              Run a cocktail bar, gourmet deli, or smash burger joint? Stock Sourboo jars or collaborate on custom branded brine.
            </p>
            <a
              href="mailto:collab@sourboo.com"
              className="font-coolvetica"
              style={{
                display: 'inline-block',
                textAlign: 'center',
                background: '#C96A00',
                color: '#FFFFFF',
                padding: '14px 24px',
                borderRadius: '9999px',
                textDecoration: 'none',
                fontSize: '1.15rem',
                boxShadow: '0 6px 16px rgba(201, 106, 0, 0.3)',
              }}
            >
              email wholesale team (collab@sourboo.com) →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
