import type { ReactNode } from 'react';

type HighlightProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Butter Curving / Rascal — short handwritten accents only.
 * Never wrap paragraphs, nav, buttons, or full headings.
 */
export default function Highlight({ children, className = '' }: HighlightProps) {
  return <span className={`sbx-highlight ${className}`.trim()}>{children}</span>;
}
