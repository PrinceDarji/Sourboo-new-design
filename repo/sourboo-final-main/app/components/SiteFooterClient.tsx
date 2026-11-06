'use client';

import Link from 'next/link';
import type { FooterLink, InstagramPostLink } from '@/src/lib/sanity/siteSettings';
import Marquee from './site/Marquee';
import { Wave } from './site/Organic';

export const CONTACT_EMAIL = 'cravings@sourboo.com';

type SiteFooterClientProps = {
  instagram: {
    profileUrl: string;
    handle: string;
    posts: InstagramPostLink[];
    headingPrefix: string;
    fallbackCardLabel: string;
  };
  whatsappUrl: string;
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

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20.5 12.2A8.5 8.5 0 1 1 8.1 4.7a8.5 8.5 0 0 1 12.4 7.5Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="m4.8 20.4 1.1-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M9.6 8.8c.2-.4.5-.4.7-.4h.5c.2 0 .5 0 .6.4l.5 1.3c.1.2.1.5 0 .7l-.3.5c-.2.2-.2.4-.1.6.3.5 1 1.4 2.1 1.9.3.1.5.1.7-.1l.5-.5c.2-.2.4-.2.7-.1l1.2.5c.4.1.4.4.4.6v.5c0 .2 0 .6-.4.8-.4.3-1 .5-1.7.4-1.2-.2-2.8-.9-4.2-2.3-1.3-1.3-2-2.8-2.1-3.9-.1-.8.1-1.4.4-1.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3.5 6.5c5.6-.6 11.4-.6 17 0 .4 3.6.4 7.4 0 11-5.6.6-11.4.6-17 0-.4-3.6-.4-7.4 0-11Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m4 7.5 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function instagramHandleFromUrl(url: string) {
  try {
    const segment = new URL(url).pathname.split('/').filter(Boolean)[0];
    return segment ? `@${segment}` : '@eatsourboo';
  } catch {
    return '@eatsourboo';
  }
}

export default function SiteFooterClient({ instagram, whatsappUrl, footer }: SiteFooterClientProps) {
  const handle = instagramHandleFromUrl(instagram.profileUrl);
  const exploreLinks = [...footer.primaryLinks, ...footer.secondaryLinks];

  return (
    <footer className="sbx-footer">
      <Wave fill="var(--sbx-footer-bg)" position="top" variant={3} className="sbx-footer__wave" />
      <Marquee label="Sourboo brand lines" tone="lime" duration={48} tilt={-1.5} className="sbx-footer__marquee" />

      <div className="sbx-footer__inner">
        <div className="sbx-footer__hero">
          <a href={instagram.profileUrl} target="_blank" rel="noopener noreferrer" className="sbx-footer__handle">
            <span className="sbx-footer__handle-small font-rascal">*{instagram.headingPrefix}</span>
            <span className="sbx-footer__handle-big">{handle}*</span>
          </a>
          <p className="sbx-footer__motto font-schoolbell">*Made for mouths that misbehave*</p>
        </div>

        <div className="sbx-footer__cols">
          <nav className="sbx-footer__col" aria-label="Footer">
            <p className="sbx-footer__col-title">explore</p>
            <ul>
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="sbx-footer__col" aria-label="Policies">
            <p className="sbx-footer__col-title">the fine print</p>
            <ul>
              {footer.policyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sbx-footer__col">
            <p className="sbx-footer__col-title">say hi</p>
            <ul className="sbx-footer__social">
              <li>
                <a href={instagram.profileUrl} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <MailIcon />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="sbx-footer__base">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-green.svg" alt="Sourboo" className="sbx-footer__logo" width="520" height="140" loading="lazy" />
          <p className="sbx-footer__legal">
            © {new Date().getFullYear()} Sourboo Snacks LLP · <span className="font-rascal">{footer.tagline}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
