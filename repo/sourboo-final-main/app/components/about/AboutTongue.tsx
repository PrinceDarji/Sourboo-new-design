'use client';

import IndiaLovesLines from './IndiaLovesLines';
import SectionThreeEyesSequence from './SectionThreeEyesSequence';

export default function AboutTongue() {
  return (
    <section className="sb-story-crave" aria-labelledby="sb-story-crave-title">
      <div className="sb-story-split">
        <div className="sb-story-crave__copy">
          <p className="sb-story-kicker sb-story-kicker--lime">Same cravings</p>
          <h2 id="sb-story-crave-title">different lives, same cravings</h2>
          <p className="sb-story-crave__after">
            Nothing worked for a desi palate that loves
          </p>
        </div>
        <div className="sb-story-crave__visual">
          <div className="sb-story-crave__eyes">
            <SectionThreeEyesSequence />
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
    </section>
  );
}
