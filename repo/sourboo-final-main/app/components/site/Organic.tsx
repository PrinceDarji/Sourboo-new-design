type WaveProps = {
  /** Fill colour of the wave (the colour of the neighbouring section). */
  fill: string;
  position: 'top' | 'bottom';
  variant?: 1 | 2 | 3;
  className?: string;
};

const WAVE_PATHS: Record<1 | 2 | 3, string> = {
  1: 'M0 64C112 30 214 86 362 70C520 53 606 8 776 24C934 38 1022 98 1176 84C1290 74 1370 40 1440 46V0H0Z',
  2: 'M0 38C140 74 262 92 402 62C548 30 652 12 812 40C968 68 1066 96 1214 70C1314 52 1386 30 1440 34V0H0Z',
  3: 'M0 52C96 70 196 34 318 40C470 48 548 96 712 88C870 80 942 22 1104 28C1238 34 1340 80 1440 66V0H0Z',
};

/** Organic divider used instead of straight section edges. */
export function Wave({ fill, position, variant = 1, className = '' }: WaveProps) {
  return (
    <svg
      className={`sbx-wave sbx-wave--${position} ${className}`}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={WAVE_PATHS[variant]} fill={fill} />
    </svg>
  );
}

/** Slightly wobbly marker stroke, sized by its parent. */
export function HandUnderline({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg className={`sbx-hand-underline ${className}`} viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path
        d="M4 15C42 9 78 7 118 10C152 12 176 17 214 14C244 12 270 7 296 9"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 20C70 16 120 17 168 19C206 21 244 18 278 15"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/** Loose hand-drawn arrow pointing down and to the right. */
export function HandArrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`sbx-hand-arrow ${className}`} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path
        d="M14 10C26 40 30 66 56 82C72 92 88 94 104 92"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M86 78C94 84 100 88 106 92C99 97 93 102 88 108" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
