import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import { getSocialLinksConfig } from '@/src/lib/sanity/siteSettings';
import type { Metadata } from 'next';

export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: '/join' },
  title: { absolute: 'Join The Sourboo Club | Sourboo' },
  description: 'Join the Sourboo inner circle. Get first dibs on limited batch drops, secret 5% discount codes, and stockist wholesale enquiries.',
};

export default async function JoinPage() {
  const social = await getSocialLinksConfig(revalidate);

  return (
    <main className="sb-join-container" style={{ minHeight: '100vh', background: '#F8F6F0' }}>
      <Navbar />

      <section className="sb-shop-hero" aria-label="Join Header">
        <div className="sb-shop-hero-inner">
          <div className="sb-tag font-schoolbell">community // the inner circle</div>
          <h1 className="sb-shop-heading font-coolvetica">
            join the <span className="text-[#FF6392]">sourboo club.</span>
          </h1>
          <p className="sb-shop-subheading font-rascal">
            be the first to taste experiment drops, grab unreleased merch, and hang with fellow sour fiends.
          </p>
        </div>
      </section>

      <section className="sb-catalog-section" aria-label="Join Cards">
        <div className="sb-catalog-grid" style={{ maxWidth: '960px', margin: '0 auto' }}>
          {/* Card 1: WhatsApp Community */}
          <div className="sb-dossier-card card-green" style={{ padding: '36px' }}>
            <div className="sb-card-badge font-schoolbell">vip access</div>
            <h3 className="sb-card-title font-coolvetica" style={{ fontSize: '2.4rem', marginTop: '16px' }}>
              whatsapp snack chat
            </h3>
            <p className="sb-card-desc font-rascal" style={{ fontSize: '1.2rem', margin: '16px 0 24px' }}>
              Direct access to Sakshi, secret discount codes, voting on flavour drops, and midnight snack memes. No spam, just pure sour love.
            </p>
            <a
              href={social.whatsappUrl || 'https://wa.me/919999999999'}
              target="_blank"
              rel="noopener noreferrer"
              className="sb-cta-btn font-coolvetica"
              style={{ display: 'inline-block', textAlign: 'center' }}
            >
              join whatsapp community →
            </a>
          </div>

          {/* Card 2: Stockists & Collabs */}
          <div className="sb-dossier-card card-orange" style={{ padding: '36px' }}>
            <div className="sb-card-badge font-schoolbell">partnerships</div>
            <h3 className="sb-card-title font-coolvetica" style={{ fontSize: '2.4rem', marginTop: '16px' }}>
              stockist & cafe collabs
            </h3>
            <p className="sb-card-desc font-rascal" style={{ fontSize: '1.2rem', margin: '16px 0 24px' }}>
              Run a cocktail bar, gourmet deli, or smash burger joint? Stock Sourboo jars or collaborate on custom branded brine.
            </p>
            <a
              href="mailto:cravings@sourboo.com"
              className="sb-cta-btn font-coolvetica"
              style={{ display: 'inline-block', textAlign: 'center', background: '#2F4918' }}
            >
              email wholesale team →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
