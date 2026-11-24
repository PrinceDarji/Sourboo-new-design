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

const SLICED_GHERKIN = '/home/ingredients/sliced-gherkin.png';
const WHOLE_GHERKIN = '/home/ingredients/whole-gherkin.png';
const LEMON = '/home/ingredients/lemon-wedge.png';
const MASALA = '/home/ingredients/chaat-masala.png';
const TAMARIND = '/home/ingredients/tamarind-pod.png';
const CHILLI = '/home/ingredients/red-chilli.png';

const INGREDIENTS: Record<JarFlavour, Ingredient[]> = {
  'side-eye': [
    { src: SLICED_GHERKIN, x: -22, y: 16, w: 36, rotate: -18, delay: 50 },
    { src: SLICED_GHERKIN, x: 78, y: 36, w: 35, rotate: 20, delay: 150 },
    { src: SLICED_GHERKIN, x: -18, y: 60, w: 34, rotate: 28, delay: 230 },
    { src: LEMON, x: 76, y: 2, w: 32, rotate: 42, delay: 100 },
    { src: LEMON, x: -16, y: -10, w: 30, rotate: -32, delay: 190 },
    { src: MASALA, x: -36, y: 38, w: 40, rotate: 8, delay: 160, className: 'is-dust' },
    { src: MASALA, x: 72, y: 68, w: 44, rotate: -6, delay: 240, className: 'is-dust' },
  ],
  tamarin: [
    { src: WHOLE_GHERKIN, x: -34, y: 22, w: 54, rotate: -32, delay: 50 },
    { src: WHOLE_GHERKIN, x: 68, y: 34, w: 52, rotate: 30, delay: 160 },
    { src: TAMARIND, x: -34, y: -10, w: 54, rotate: -20, delay: 110 },
    { src: TAMARIND, x: 64, y: 66, w: 50, rotate: 16, delay: 230 },
    { src: CHILLI, x: 72, y: -4, w: 46, rotate: -38, delay: 140 },
    { src: CHILLI, x: -30, y: 62, w: 44, rotate: 24, delay: 200 },
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
  const [isLockedOpen, setIsLockedOpen] = useState(false);

  const handleClick = () => {
    if (!open) {
      // If closed, clicking opens and locks it
      setOpen(true);
      setIsLockedOpen(true);
    } else if (open && !isLockedOpen) {
      // If open due to hover, clicking locks it open
      setIsLockedOpen(true);
    } else {
      // If already locked open, clicking toggles it closed
      setOpen(false);
      setIsLockedOpen(false);
    }
  };

  const handlePointerEnter = (event: React.PointerEvent) => {
    if (event.pointerType === 'mouse' && !isLockedOpen) {
      setOpen(true);
    }
  };

  const handlePointerLeave = (event: React.PointerEvent) => {
    if (event.pointerType === 'mouse' && !isLockedOpen) {
      setOpen(false);
    }
  };

  const jarSrc = JAR_IMAGES[flavour];

  return (
    <button
      type="button"
      className={`sbx-jar sbx-jar--${flavour} ${open ? 'is-open' : ''} ${className}`}
      aria-pressed={open}
      aria-label={`${open ? 'Close' : 'Open'} the ${name} jar to see what goes in it: ${label}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
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
        <span className="sbx-jar__hint-hover">click to open</span>
        <span className="sbx-jar__hint-tap">tap to open</span>
      </span>
    </button>
  );
}
