import Link from 'next/link';
import Navbar from '@/app/components/about/AboutNavbar';
import SiteFooter from '@/app/components/SiteFooter';

type SocialPlatform = 'instagram' | 'whatsapp';

type SocialLink = {
  label: string;
  href: string;
  platform: SocialPlatform;
};

type ReachUsPageTemplateProps = {
  title: string;
  email: string;
  phoneNumber: string;
  socialLinks: SocialLink[];
  intro?: string;
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
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

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === 'instagram') return <InstagramIcon />;
  return <WhatsAppIcon />;
}

export default function ReachUsPageTemplate({
  title,
  email,
  phoneNumber,
  socialLinks,
  intro,
}: ReachUsPageTemplateProps) {
  return (
    <main className="sbx-legal sbx-legal--reach">
      <Navbar />

      <section className="sbx-legal__inner" aria-labelledby="sbx-legal-title">
        <h1 id="sbx-legal-title" className="sbx-legal__title">
          {title}
        </h1>

        {intro ? <p className="sbx-legal__intro font-schoolbell">{intro}</p> : null}

        <div className="sbx-legal__sections">
          <article className="sbx-legal__article">
            <h2>COMPANY NAME</h2>
            <p>Sourboo Snacks LLP</p>
          </article>

          <article className="sbx-legal__article">
            <h2>MAIL</h2>
            <p>
              <Link href={`mailto:${email}`}>{email}</Link>
            </p>
          </article>

          <article className="sbx-legal__article">
            <h2>PHONE NUMBER</h2>
            <p>
              <Link href={`tel:${phoneNumber.replace(/\s+/g, '')}`}>{phoneNumber}</Link>
            </p>
          </article>

          <article className="sbx-legal__article">
            <h2>SOCIAL</h2>
            <ul className="sbx-legal__social">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <Link href={social.href} target="_blank" rel="noreferrer noopener">
                    <SocialIcon platform={social.platform} />
                    <span>{social.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
