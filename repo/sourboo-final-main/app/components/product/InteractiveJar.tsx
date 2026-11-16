'use client';

import Image from 'next/image';
import { useRef, useState, type CSSProperties } from 'react';

export type JarFlavour = 'side-eye' | 'tamarin';

type Ingredient = {
  src: string;
  /** Final position relative to the jar box, in percent. */
  x: number;
  y: number;
  /** Width relative to the jar box width, in percent. */
  w: number;
  rotate: number;
  delay: number;
  className?: string;
};

const JAR_IMAGES: Record<JarFlavour, string> = {
  'side-eye': '/product/side-eye-jar.webp',
  tamarin: '/product/tamarin-jar.webp',
};

const LEMON = '/home/ingredients/lemon-wedge.png';
const MASALA = '/home/ingredients/chaat-masala.png';
const TAMARIND = '/home/ingredients/tamarind-pod.png';
const CHILLI = '/home/ingredients/red-chilli.png';

const INGREDIENTS: Record<JarFlavour, Ingredient[]> = {
  'side-eye': [
    { src: LEMON, x: -30, y: 6, w: 38, rotate: -18, delay: 40 },
    { src: LEMON, x: 92, y: 18, w: 32, rotate: 64, delay: 120 },
    { src: LEMON, x: -24, y: 62, w: 30, rotate: 150, delay: 200 },
    { src: MASALA, x: 70, y: 70, w: 62, rotate: -4, delay: 160, className: 'is-dust' },
    { src: MASALA, x: -44, y: 36, w: 54, rotate: 8, delay: 260, className: 'is-dust' },
    { src: MASALA, x: 18, y: -18, w: 58, rotate: 0, delay: 320, className: 'is-dust is-sprinkle' },
  ],
  tamarin: [
    { src: TAMARIND, x: -58, y: 14, w: 74, rotate: -22, delay: 40 },
    { src: TAMARIND, x: 78, y: 62, w: 66, rotate: 16, delay: 160 },
    { src: CHILLI, x: 86, y: 8, w: 64, rotate: -38, delay: 100 },
    { src: CHILLI, x: -52, y: 64, w: 60, rotate: 28, delay: 220 },
    { src: CHILLI, x: 24, y: -20, w: 52, rotate: -8, delay: 300 },
  ],
};

type InteractiveJarProps = {
  flavour: JarFlavour;
  name: string;
  /** Original hover label from the shop page, e.g. "Lemon & Chaat Masala". */
  label: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export default function InteractiveJar({
  flavour,
  name,
  label,
  sizes = '(max-width: 768px) 60vw, 300px',
  priority = false,
  className = '',
}: InteractiveJarProps) {
  const [open, setOpen] = useState(false);
  const lastPointer = useRef<string>('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Mouse users open the jar by hovering; clicks only toggle for touch, pen and keyboard.
    const keyboard = event.detail === 0;
    if (!keyboard && lastPointer.current === 'mouse') return;
    setOpen((value) => !value);
  };

  const jarSrc = JAR_IMAGES[flavour];

  return (
    <button
      type="button"
      className={`sbx-jar sbx-jar--${flavour} ${open ? 'is-open' : ''} ${className}`}
      aria-pressed={open}
      aria-label={`${open ? 'Close' : 'Open'} the ${name} jar to see what goes in it: ${label}`}
      onPointerDown={(event) => {
        lastPointer.current = event.pointerType;
      }}
      onPointerEnter={(event) => {
        lastPointer.current = event.pointerType;
        if (event.pointerType === 'mouse') setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setOpen(false);
      }}
      onBlur={() => {
        if (lastPointer.current !== 'mouse') setOpen(false);
      }}
      onClick={handleClick}
    >
      <span className="sbx-jar__blob" aria-hidden="true">
        <svg viewBox="0 0 200 200" preserveAspectRatio="none">
          <path d="M43.5 23.6C66 4.6 104.8 3.6 131.6 13.4c27.8 10.2 54 33 60.6 62.4 6.8 30-7.6 64.4-32 84.6-24.4 20.4-58.6 27-89 21.4C40.8 176 13.6 158 6.2 130.8-1.4 103 4 71.6 15 51.2c7.2-13.6 16.6-20.4 28.5-27.6Z" />
        </svg>
      </span>

      <span className="sbx-jar__label" aria-hidden="true">
        {label}
      </span>

      <span className="sbx-jar__stage" aria-hidden="true">
        <span className="sbx-jar__ingredients">
          {INGREDIENTS[flavour].map((ingredient, index) => (
            <span
              key={index}
              className={`sbx-jar__ingredient ${ingredient.className ?? ''}`}
              style={
                {
                  left: `${ingredient.x}%`,
                  top: `${ingredient.y}%`,
                  width: `${ingredient.w}%`,
                  '--r': `${ingredient.rotate}deg`,
                  '--d': `${ingredient.delay}ms`,
                  '--fx': `${50 - ingredient.x - ingredient.w / 2}cqw`,
                  '--fy': `${8 - ingredient.y}cqh`,
                } as CSSProperties
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ingredient.src} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </span>

        <span className="sbx-jar__glass">
          <span className="sbx-jar__body">
            <Image src={jarSrc} alt="" fill sizes={sizes} priority={priority} quality={80} />
          </span>
          <span className="sbx-jar__mouth" />
          <span className="sbx-jar__lid">
            <Image src={jarSrc} alt="" fill sizes={sizes} priority={priority} quality={80} />
          </span>
        </span>
        <span className="sbx-jar__shadow" />
      </span>
      <span className="sbx-jar__hint" aria-hidden="true">
        <span className="sbx-jar__hint-hover">hover to open</span>
        <span className="sbx-jar__hint-tap">tap to open</span>
      </span>
    </button>
  );
}
