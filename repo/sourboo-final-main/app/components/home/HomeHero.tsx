import Image from 'next/image';
import Link from 'next/link';
import { Wave } from '../site/Organic';

function Butter({ children, tone = 'lime' }: { children: string; tone?: 'lime' | 'berry' }) {
  return (
    <span className="sbx-hero__butter" data-tone={tone}>
      <span className="sbx-hero__butter-back" aria-hidden="true">
        {children}
      </span>
      <span className="sbx-hero__butter-front">{children}</span>
    </span>
  );
}

export default function HomeHero() {
  return (
    <section className="sbx-hero" aria-labelledby="sbx-hero-title" data-scroll-reveal="off">
      <div className="sbx-hero__media">
        <div className="sbx-hero__frame">
          <Image
            src="/home/hero-placeholder.webp"
            alt="Two hands holding crinkle-cut Sourboo pickled gherkin slices"
            fill
            priority
            sizes="100vw"
            quality={80}
            className="sbx-hero__img"
          />
        </div>
        <div className="sbx-hero__bubbles" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>

      <div className="sbx-hero__copy">
      <div className="sbx-hero__content">
        <h1 id="sbx-hero-title" className="sbx-hero__title">
          <span className="sbx-hero__kicker">*the sourboo way, cravings comes first*</span>
          <span className="sbx-hero__headline">
            Mouths That <Butter>Misbehave</Butter> <span className="sbx-hero__and">and</span> India’s First{' '}
            <Butter tone="berry">Cult</Butter> Sour Snack.
          </span>
          <span className="sbx-hero__lede">
            Snackable pickled gherkins made to be <Butter>bold,</Butter> made to be <Butter tone="berry">yours.</Butter>
          </span>
        </h1>
      </div>

      <div className="sbx-hero__cta-row">
        <Link href="/product" className="sbx-hero__shop" aria-label="Shop now">
          <svg className="sbx-hero__shop-ring" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="sbx-shop-ring-path" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" />
            </defs>
            <text>
              <textPath href="#sbx-shop-ring-path" startOffset="0">
                SHOP NOW ✹ SHOP NOW ✹ SHOP NOW ✹
              </textPath>
            </text>
          </svg>
          <span className="sbx-hero__shop-jar">
            <Image src="/product/side-eye-jar.webp" alt="" fill sizes="90px" quality={78} />
          </span>
        </Link>
        <div className="sbx-hero__picks">
          <Link href="/product/sideeyesour" className="sbx-hero__pick sbx-hero__pick--side">
            <span className="sbx-hero__pick-jar">
              <Image src="/product/side-eye-jar.webp" alt="" fill sizes="48px" quality={78} />
            </span>
            <span>SIDE EYE SOUR</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/product/tamarintease" className="sbx-hero__pick sbx-hero__pick--tamarin">
            <span className="sbx-hero__pick-jar">
              <Image src="/product/tamarin-jar.webp" alt="" fill sizes="48px" quality={78} />
            </span>
            <span>TAMARIN’ TEASE</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      </div>

      <Wave fill="var(--sbx-lime)" position="bottom" variant={1} />
    </section>
  );
}
