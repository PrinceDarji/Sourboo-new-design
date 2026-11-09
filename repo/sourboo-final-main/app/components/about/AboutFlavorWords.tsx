'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const REVEAL_RATIO = 0.2;

type FlavorWordOverride = {
  label?: string;
  bgSrc?: string;
};

const WORDS = [
  {
    itemClassName: 'about-flavor-word-1',
    textClassName: 'sb-story-blob__label sb-story-blob__label--bold',
    defaultLabel: 'BOLD',
    defaultBgSrc: '/about/boldbg.svg',
  },
  {
    itemClassName: 'about-flavor-word-2',
    textClassName: 'sb-story-blob__label sb-story-blob__label--spicy',
    defaultLabel: 'spicy',
    defaultBgSrc: '/about/spicybg.svg',
  },
  {
    itemClassName: 'about-flavor-word-3',
    textClassName: 'sb-story-blob__label sb-story-blob__label--sour',
    defaultLabel: 'sour',
    defaultBgSrc: '/about/sourbg.svg',
  },
] as const;

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

type AboutFlavorWordsProps = {
  words?: FlavorWordOverride[];
};

export default function AboutFlavorWords({ words }: AboutFlavorWordsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const setVisible = (visible: boolean) => {
      container.classList.toggle('about-flavor-words-visible', visible);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= REVEAL_RATIO) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: [0, REVEAL_RATIO],
        rootMargin: '0px 0px -8% 0px',
      },
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      setVisible(false);
    };
  }, []);

  return (
    <div ref={containerRef} className="about-flavor-words sb-story-blobs">
      {WORDS.map((layout, index) => {
        const override = words?.[index];
        const label = asNonEmptyString(override?.label) || layout.defaultLabel;
        const bgSrc = asNonEmptyString(override?.bgSrc) || layout.defaultBgSrc;
        return (
          <div key={layout.itemClassName} className={`sb-story-blob sb-story-blob--${index + 1}`}>
            <div className={`about-flavor-word ${layout.itemClassName} relative h-full w-full`}>
              <Image
                src={bgSrc}
                alt=""
                fill
                className="about-flavor-word-blob object-contain"
                aria-hidden="true"
              />
              <p className={`relative z-10 flex h-full w-full items-center justify-center ${layout.textClassName}`}>
                {label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
