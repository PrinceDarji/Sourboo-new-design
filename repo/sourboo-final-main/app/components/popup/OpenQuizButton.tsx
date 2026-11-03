'use client';

export default function OpenQuizButton({
  className = '',
  style,
  children = 'take quiz (get 5% off)',
}: {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-sourboo-quiz'));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
