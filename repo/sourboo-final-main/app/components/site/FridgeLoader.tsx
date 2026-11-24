'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FRIDGE_SEEN_KEY } from './fridgeConfig';

type Phase = 'closed' | 'opening' | 'entering' | 'done';

const SHELF_JARS = [
  { src: '/product/side-eye-jar.webp', shelf: 0, x: 16 },
  { src: '/product/tamarin-jar.webp', shelf: 0, x: 52 },
  { src: '/product/tamarin-jar.webp', shelf: 1, x: 4 },
  { src: '/product/side-eye-jar.webp', shelf: 1, x: 35 },
  { src: '/product/tamarin-jar.webp', shelf: 1, x: 66 },
];

export default function FridgeLoader() {
  const [phase, setPhase] = useState<Phase>('closed');
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    document.documentElement.setAttribute('data-fridge', 'skip');
    document.body.style.removeProperty('overflow');
    setPhase('done');
  }, []);

  useEffect(() => {
    // When skipped, the overlay stays hidden by html[data-fridge='skip'].
    if (document.documentElement.getAttribute('data-fridge') !== 'play') return;

    try {
      window.localStorage.setItem(FRIDGE_SEEN_KEY, String(Date.now()));
    } catch {
      // Without storage the loader simply plays again next visit.
    }

    document.body.style.overflow = 'hidden';
    timers.current = [
      window.setTimeout(() => setPhase('opening'), 380),
      window.setTimeout(() => setPhase('entering'), 1750),
      window.setTimeout(finish, 2550),
    ];

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      timers.current.forEach((id) => window.clearTimeout(id));
      document.body.style.removeProperty('overflow');
    };
  }, [finish]);

  if (phase === 'done') return null;

  return (
    <div className={`sbx-fridge is-${phase}`} aria-hidden="true" onClick={finish}>
      <div className="sbx-fridge__glow" />
      <div className="sbx-fridge__stage">
        <div className="sbx-fridge__unit">
          <div className="sbx-fridge__cabinet">
            <div className="sbx-fridge__interior">
              <div className="sbx-fridge__lamp" />
              {[0, 1].map((shelf) => (
                <div key={shelf} className={`sbx-fridge__shelf sbx-fridge__shelf--${shelf}`}>
                  {SHELF_JARS.filter((jar) => jar.shelf === shelf).map((jar, index) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={`${shelf}-${index}`}
                      src={jar.src}
                      alt=""
                      className="sbx-fridge__jar"
                      style={{ left: `${jar.x}%`, animationDelay: `${index * 90}ms` }}
                    />
                  ))}
                </div>
              ))}
              <div className="sbx-fridge__crisper" />
              <div className="sbx-fridge__frost" />
            </div>

            <div className="sbx-fridge__door">
              <div className="sbx-fridge__door-front">
                <span className="sbx-fridge__badge" />
                <span className="sbx-fridge__handle" />
                <span className="sbx-fridge__sheen" />
              </div>
              <div className="sbx-fridge__door-back">
                <span className="sbx-fridge__door-rack sbx-fridge__door-rack--1" />
                <span className="sbx-fridge__door-rack sbx-fridge__door-rack--2" />
              </div>
            </div>
          </div>
          <div className="sbx-fridge__legs">
            <span />
            <span />
          </div>
          <div className="sbx-fridge__shadow" />
        </div>
        <div className="sbx-fridge__mist">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} style={{ animationDelay: `${index * 110}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
