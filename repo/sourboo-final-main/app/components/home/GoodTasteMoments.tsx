import Image from 'next/image';
import { HandArrow, Wave } from '../site/Organic';

const MOMENTS = [
  { src: '/about/section-six-top-3.webp', alt: 'A Sourboo fan biting into a gherkin at a tasting' },
  { src: '/footer.JPEG', alt: 'Friends posing at the Sourboo tasting stand' },
  { src: '/about/section-six-top-1.webp', alt: 'A guest tasting Sourboo at a pop-up' },
  { src: '/about-cover.JPG', alt: 'Two friends laughing while snacking on Sourboo' },
  { src: '/about/section-six-top-2.webp', alt: 'The Sourboo pop-up stand with jars on display' },
];

export default function GoodTasteMoments() {
  return (
    <section className="sbx-moments" aria-labelledby="sbx-moments-title">
      <Wave fill="var(--sbx-lilac)" position="bottom" variant={1} />
      <h2 id="sbx-moments-title" className="sbx-moments__title">
        Good taste <span className="sbx-moments__title-hand font-rascal">looks like this.</span>
      </h2>

      <ul className="sbx-moments__strip" aria-label="Photos of people enjoying Sourboo">
        {MOMENTS.map((moment, index) => (
          <li key={moment.src} className={`sbx-moments__item sbx-moments__item--${index + 1}`}>
            <Image src={moment.src} alt={moment.alt} fill sizes="(max-width: 768px) 70vw, 22vw" quality={74} />
          </li>
        ))}
      </ul>

      <p className="sbx-moments__line font-schoolbell">
        Deeply Fermented • Slightly Unhinged.
        <HandArrow className="sbx-moments__arrow" />
      </p>
    </section>
  );
}
