'use client';

import IndiaLovesLines from './IndiaLovesLines';
import SectionThreeEyesSequence from './SectionThreeEyesSequence';

export default function AboutTongue() {
  return (
    <section className="sb-story-tongue" aria-label="What India loves to taste">
      <p className="sb-story-line sb-story-line--center">different lives, same cravings</p>
      <div className="sb-story-tongue__stage">
        <SectionThreeEyesSequence />
        <div className="about-tongue-position sb-story-tongue__art-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about/section-three-tongue.svg"
            alt="Tongue illustration"
            className="sb-story-tongue__art"
          />
          <IndiaLovesLines />
        </div>
      </div>
      <p className="sb-story-line sb-story-line--center sb-story-tongue__after">
        Nothing worked for a desi palate that loves
      </p>
    </section>
  );
}
