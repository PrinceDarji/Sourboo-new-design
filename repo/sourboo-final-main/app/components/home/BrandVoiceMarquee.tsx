export default function BrandVoiceMarquee() {
  const brandLines = [
    'Made for Mouths That Misbehave.',
    'MOUTHS THAT MISBEHAVE.',
    'India’s First Cult Sour Snack.',
    'Snackable pickled gherkins.',
    'Made to be bold. Made to be yours.',
    'Sour first snack, made for people who don’t eat quietly.',
    'Stay sour.',
    'Good taste looks like this.',
    'Snacks with personality.',
    'Deeply Fermented • Slightly Unhinged.',
  ];

  return (
    <div className="sb-brand-ticker" aria-label="Brand Voice Marquee">
      <div className="sb-ticker-inner">
        {brandLines.map((line, idx) => (
          <span key={`ticker-1-${idx}`}>
            {line} <span className="dot">•</span>
          </span>
        ))}
      </div>
      <div className="sb-ticker-inner" aria-hidden="true">
        {brandLines.map((line, idx) => (
          <span key={`ticker-2-${idx}`}>
            {line} <span className="dot">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
