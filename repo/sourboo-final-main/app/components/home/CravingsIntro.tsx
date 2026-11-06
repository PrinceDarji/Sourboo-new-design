import Image from 'next/image';
import Link from 'next/link';
import Highlight from '../site/Highlight';
import { HandUnderline } from '../site/Organic';

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
      <div className="sbx-crave__grid">
        <div className="sbx-crave__copy">
          <h2 id="sbx-crave-title" className="sbx-crave__title" aria-label="sourboo made for people who eat with intent">
            <span className="sbx-crave__title-line">sourboo made for people who eat</span>
            <span className="sbx-crave__intent">
              <Highlight>with intent</Highlight>
              <HandUnderline className="sbx-crave__underline" />
            </span>
          </h2>
          <p className="sbx-crave__hand">
            <span>who like flavour loud and immediate</span>
            <span>food that fits into real moments</span>
          </p>
          <Link href="/about" className="sbx-brush-btn">
            <span>read my rant →</span>
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
