'use client';

import IndiaLovesLines from './IndiaLovesLines';
import SectionThreeEyesSequence from './SectionThreeEyesSequence';

export default function AboutTongue() {
  return (
    <div className="sb-story-crave__visual">
      <div className="sb-story-crave__face">
        <div className="sb-story-crave__eyes">
          <SectionThreeEyesSequence className="sb-story-crave__eyes-img" />
        </div>
        <div className="about-tongue-position sb-story-crave__tongue">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about/section-three-tongue.svg"
            alt="Tongue illustration"
            className="sb-story-crave__art"
          />
          <IndiaLovesLines />
        </div>
      </div>
    </div>
  );
}
