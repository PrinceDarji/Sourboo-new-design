'use client';

import Link from 'next/link';
import type { FooterLink, InstagramPostLink } from '@/src/lib/sanity/siteSettings';

type SiteFooterClientProps = {
  instagram: {
    profileUrl: string;
    handle: string;
    posts: InstagramPostLink[];
    headingPrefix: string;
    fallbackCardLabel: string;
  };
  footer: {
    backgroundImageUrl?: string;
    logoImageUrl: string;
    logoAlt: string;
    tagline: string;
    primaryLinks: FooterLink[];
    secondaryLinks: FooterLink[];
    policyLinks: FooterLink[];
  };
};

export default function SiteFooterClient({ instagram: _instagram, footer }: SiteFooterClientProps) {
  return (
    <footer className="sb-footer" role="contentinfo">
      <div className="sb-footer-grid">
        {/* Brand Column */}
        <div className="sb-footer-brand-col">
          <Link href="/" className="sb-footer-logo font-coolvetica">
            sourboo
          </Link>
          <p className="sb-footer-tagline font-schoolbell">
            {footer.tagline || 'Spicy, sour, unapologetically unchill pickles.'}
          </p>
          <p className="sb-footer-copy font-rascal">
            Handcrafted in small batches with cold-pressed mustard oil, whole spices, and zero preservatives. Made for bold snackers.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="sb-footer-col">
          <h4 className="sb-footer-col-title font-coolvetica">explore</h4>
          <ul className="sb-footer-links">
            <li>
              <Link href="/product">shop all</Link>
            </li>
            <li>
              <Link href="/about">our diary</Link>
            </li>
            <li>
              <Link href="/join">join club</Link>
            </li>
            <li>
              <Link href="/popup">personality quiz</Link>
            </li>
            {footer.primaryLinks?.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Column */}
        <div className="sb-footer-col">
          <h4 className="sb-footer-col-title font-coolvetica">boring legal</h4>
          <ul className="sb-footer-links">
            <li>
              <Link href="/privacy-policy">privacy policy</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions">terms of service</Link>
            </li>
            <li>
              <Link href="/refund-policy">shipping & returns</Link>
            </li>
            <li>
              <Link href="/contact">contact us</Link>
            </li>
            {footer.policyLinks?.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Community */}
        <div className="sb-footer-col">
          <h4 className="sb-footer-col-title font-coolvetica">stay sour</h4>
          <p className="sb-footer-news-text">
            drop your email for secret drops, 5% off codes, and chaotic pickle recipes.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thanks for subscribing!');
            }}
            className="sb-footer-newsletter-form"
          >
            <input
              type="email"
              placeholder="youremail@cool.com"
              required
              className="sb-footer-email-input"
            />
            <button type="submit" className="sb-footer-submit-btn font-coolvetica">
              join
            </button>
          </form>
          <div className="sb-footer-socials">
            <a
              href="https://instagram.com/sourboo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="sb-footer-social-link"
            >
              Instagram ↗
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="sb-footer-social-link"
            >
              WhatsApp ↗
            </a>
          </div>
        </div>
      </div>

      <div className="sb-footer-bottom">
        <p className="sb-footer-bottom-text">
          © {new Date().getFullYear()} Sourboo Foods Pvt Ltd. All rights reserved. Zero chill guaranteed.
        </p>
      </div>
    </footer>
  );
}
