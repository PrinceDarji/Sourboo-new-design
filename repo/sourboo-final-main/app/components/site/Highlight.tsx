import type { ReactNode } from 'react';

type HighlightProps = {
  children: ReactNode;
  className?: string;
  tone?: 'lime' | 'lilac' | 'lemon' | 'amber';
};

/**
 * Coolvetica word with a Rascal shadow sitting behind it.
 * Never wrap paragraphs, nav, buttons, or full headings.
 */
export default function Highlight({ children, className = '', tone = 'lime' }: HighlightProps) {
  return (
    <span className={`sbx-layer ${className}`.trim()} data-tone={tone}>
      <span className="sbx-layer__hand" aria-hidden="true">
        {children}
      </span>
      <span className="sbx-layer__top">{children}</span>
    </span>
  );
}
