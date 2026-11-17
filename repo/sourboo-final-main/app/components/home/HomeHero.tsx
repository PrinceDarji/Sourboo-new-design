import Image from 'next/image';
import Link from 'next/link';

export default function HomeHero() {
  return (
    <section className="sbx-hero" aria-labelledby="sbx-hero-title">
      <div className="sbx-hero__media">
        <Image
          src="/home/hero-placeholder.webp"
          alt="Hands holding crinkle-cut Sourboo pickled gherkin slices"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="sbx-hero__img"
        />
        <div className="sbx-hero__shade" aria-hidden="true" />
      </div>

      <div className="sbx-hero__copy">
        <p className="sbx-hero__lockup">Made for Mouths That Misbehave.</p>
        <h1 id="sbx-hero-title" className="sbx-hero__title">
          INDIA’S FIRST
          <br />
          CULT SOUR SNACK
        </h1>
        <p className="sbx-hero__lede">Snackable pickled gherkins made to be bold, made to be yours.</p>
        <Link href="/product" className="sbx-hero__cta">
          SHOP NOW
        </Link>
      </div>
    </section>
  );
}
