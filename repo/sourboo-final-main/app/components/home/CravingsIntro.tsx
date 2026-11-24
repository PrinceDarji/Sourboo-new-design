import Image from 'next/image';
import Link from 'next/link';
import Highlight from '../site/Highlight';
import { HandUnderline, Wave } from '../site/Organic';

const PHOTOS = [
  {
    src: '/home/recipe-1.jpg',
    alt: 'Grilled cheese sandwich stacked high with Sourboo gherkin slices',
    className: 'sbx-crave__photo--sandwich',
    sizes: '(max-width: 768px) 62vw, 30vw',
  },
  {
    src: '/home/packagingbg.JPEG',
    alt: 'A snack platter with gherkins, cheese and dips laid out on a table',
    className: 'sbx-crave__photo--platter',
    sizes: '(max-width: 768px) 70vw, 34vw',
  },
  {
    src: '/home/readmyrant.webp',
    alt: 'Hands holding an open jar of Sourboo pickled gherkins',
    className: 'sbx-crave__photo--hands',
    sizes: '(max-width: 768px) 46vw, 20vw',
  },
];

export default function CravingsIntro() {
  return (
    <section className="sbx-crave" aria-labelledby="sbx-crave-title">
      <Wave fill="var(--sbx-pink)" position="bottom" variant={2} />
      <div className="sbx-crave__grid">
        <div className="sbx-crave__copy">
          <h2 id="sbx-crave-title" className="sbx-crave__title" aria-label="YOUR OTHER SNACKS COULD NEVER">
            <span className="sbx-crave__title-line">YOUR OTHER SNACKS</span>
            <span className="sbx-crave__intent">
              <Highlight tone="lime">COULD NEVER</Highlight>
              <HandUnderline className="sbx-crave__underline" color="var(--sbx-pink)" />
            </span>
          </h2>
          <div className="sbx-crave__hand">
            <span>Tangy, spicy, unapologetically crunchy. Meet the gherkin that refuses to be a side dish.</span>
            <span className="sbx-crave__callout">Made for Mouths That Misbehave.</span>
          </div>
          <Link href="/about" className="sbx-crave__rant-link" aria-label="Read my rant">
            <span>read my rant</span>
            <span className="sbx-crave__arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="sbx-crave__collage">
          {PHOTOS.map((photo) => (
            <figure key={photo.src} className={`sbx-crave__photo ${photo.className}`}>
              <Image src={photo.src} alt={photo.alt} fill sizes={photo.sizes} quality={76} />
            </figure>
          ))}
          <svg className="sbx-crave__doodle" viewBox="0 0 200 200" aria-hidden="true">
            <path d="M40 96C38 52 82 24 122 30c40 6 62 44 50 84-10 34-48 56-86 48C52 156 34 128 44 96" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          <span className="sbx-bubble sbx-bubble--a" aria-hidden="true" />
          <span className="sbx-bubble sbx-bubble--b" aria-hidden="true" />
          <span className="sbx-bubble sbx-bubble--c" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
