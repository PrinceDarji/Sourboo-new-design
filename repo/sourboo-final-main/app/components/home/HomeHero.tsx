import Image from 'next/image';
import Link from 'next/link';

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
            quality={85}
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
            <span className="sbx-hero__lead-line">
              INDIA&apos;S FIRST
              <svg
                className="sbx-hero__sparks"
                viewBox="0 0 54 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M20 6L9 30" stroke="#f50a59" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M48 16L23 38" stroke="#f50a59" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M48 52L26 56" stroke="#f50a59" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="sbx-hero__banner-wrap">
              <span className="sbx-hero__banner">
                CULT SOUR SNACK
              </span>
            </span>
            <span className="sbx-hero__sub">
              Snackable pickled gherkins made<br />to be bold, made to be yours.
            </span>
          </h1>
        </div>

        <div className="sbx-hero__cta-row">
          <Link href="/product" className="sbx-hero__shop-btn" aria-label="Shop now">
            <span className="sbx-hero__shop-text">SHOP NOW</span>
            <svg
              className="sbx-hero__shop-wave"
              viewBox="0 0 195 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5 13C24 16 55 9 98 8C138 7 168 9 190 8"
                stroke="#d4f82a"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
