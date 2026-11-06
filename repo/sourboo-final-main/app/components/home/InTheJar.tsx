import Image from 'next/image';
import { CATALOG_PRODUCTS } from '@/src/lib/catalog/products';
import { Wave } from '../site/Organic';

type Tag = { text: string; x: number; y: number; tilt: number };

const SIDE_EYE_TAGS: Tag[] = [
  { text: 'Lemon slices', x: 6, y: 10, tilt: -6 },
  { text: 'Chaat masala powder', x: 54, y: 4, tilt: 4 },
  { text: 'Whole red chilli', x: 62, y: 78, tilt: -3 },
  { text: 'Gherkins', x: 4, y: 74, tilt: 5 },
];

const TAMARIN_TAGS: Tag[] = [
  { text: 'Tamarind pulp', x: 8, y: 8, tilt: -4 },
  { text: 'Yellow mustard seeds', x: 46, y: 82, tilt: 3 },
  { text: 'Rock salt', x: 70, y: 12, tilt: 6 },
];

function TagLayer({ tags }: { tags: Tag[] }) {
  return (
    <ul className="sbx-jarstory__tags">
      {tags.map((tag) => (
        <li key={tag.text} style={{ left: `${tag.x}%`, top: `${tag.y}%`, rotate: `${tag.tilt}deg` }}>
          {tag.text}
        </li>
      ))}
    </ul>
  );
}

export default function InTheJar() {
  const sideEye = CATALOG_PRODUCTS.find((product) => product.slug === 'sideeyesour');
  const title = sideEye?.detailInJarTitle ?? 'In the jar';

  return (
    <section className="sbx-jarstory" aria-labelledby="sbx-jarstory-title">
      <Wave fill="var(--sbx-purple)" position="bottom" variant={3} />
      <h2 id="sbx-jarstory-title" className="sbx-jarstory__title">
        <span className="sbx-layer" data-tone="lime">
          <span className="sbx-layer__hand" aria-hidden="true">
            {title}
          </span>
          <span className="sbx-layer__top">{title}</span>
        </span>
      </h2>

      <div className="sbx-jarstory__frames">
        <figure className="sbx-jarstory__frame sbx-jarstory__frame--side">
          <div className="sbx-jarstory__photo">
            <Image
              src="/product/catalog/side-eye-lifestyle.webp"
              alt="A jar of Side Eye Sour next to a plate of crinkle-cut gherkins"
              fill
              sizes="(max-width: 768px) 92vw, 52vw"
              quality={78}
            />
          </div>
          <TagLayer tags={SIDE_EYE_TAGS} />
          <figcaption>SIDE EYE SOUR</figcaption>
        </figure>

        <figure className="sbx-jarstory__frame sbx-jarstory__frame--tamarin">
          <div className="sbx-jarstory__photo">
            <Image
              src="/product/catalog/tamarin-lifestyle.webp"
              alt="Tamarin’ Tease gherkins being lifted out of the jar with a fork"
              fill
              sizes="(max-width: 768px) 92vw, 40vw"
              quality={78}
            />
          </div>
          <TagLayer tags={TAMARIN_TAGS} />
          <figcaption>TAMARIN’ TEASE</figcaption>
        </figure>
      </div>
    </section>
  );
}
