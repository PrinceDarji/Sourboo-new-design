'use client';

import { useState } from 'react';

interface ReviewMessage {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  text: string;
  tag: string;
  stars: number;
}

const REAL_REVIEWS: ReviewMessage[] = [
  {
    id: 'rev-1',
    author: 'Ananya K.',
    handle: '@ananyak_eats',
    avatar: '🍋',
    text: '“I literally finished the whole jar in 2 days. The brine is insane on sourdough toast!”',
    tag: 'Verified Baddie',
    stars: 5,
  },
  {
    id: 'rev-2',
    author: 'Rohan & Mira',
    handle: '@rohan_m',
    avatar: '🥒',
    text: '“Finally an Indian pickle brand that gets aesthetic snacking. Tamarind tease is god-tier.”',
    tag: 'Jar Stashers',
    stars: 5,
  },
  {
    id: 'rev-3',
    author: 'Pooja S.',
    handle: '@poojasnacks',
    avatar: '🔥',
    text: '“My boyfriend hates pickles and he stole half my jar. Sending you the breakup bill.”',
    tag: 'Side Eye Addict',
    stars: 5,
  },
  {
    id: 'rev-4',
    author: 'Tanvi M.',
    handle: '@tanvi.moms',
    avatar: '✨',
    text: '“My mom stole my Side Eye jar and hid it in her secret pantry stash 😭 She never shares!”',
    tag: 'Mom Approved',
    stars: 5,
  },
];

export default function InternetFavBaddies() {
  const [isPhoneExpanded, setIsPhoneExpanded] = useState(false);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  return (
    <section className="sb-baddies-real-section" aria-label="Customer Reviews and Social Proof">
      <div className="sb-baddies-wrapper">
        {/* Section Header */}
        <div className="sb-baddies-header text-center">
          <span className="sb-baddies-tag font-schoolbell">
            REAL COMMUNITY PROOF
          </span>
          <h2 className="sb-baddies-title font-coolvetica">
            Your Internet Fav Baddies and Their Moms Love It ;)
          </h2>
          <p className="sb-baddies-subtitle font-schoolbell">
            visuals of real messages from people who tried sourboo
          </p>
        </div>

        {/* Real iPhone Mockup Showcase Stage */}
        <div className="sb-iphone-stage-container">
          {/* REALISTIC IPHONE MOCKUP */}
          <div
            className={`sb-real-iphone ${isPhoneExpanded ? 'is-expanded' : ''}`}
            onMouseEnter={() => setIsPhoneExpanded(true)}
            onMouseLeave={() => setIsPhoneExpanded(false)}
            onClick={() => setIsPhoneExpanded(!isPhoneExpanded)}
          >
            {/* iPhone Hardware Outer Frame (Titanium Bezel) */}
            <div className="sb-iphone-chassis">
              {/* Dynamic Island */}
              <div className="sb-iphone-island">
                <span className="sb-island-camera" />
                <span className="sb-island-sensor" />
              </div>

              {/* Glossy Glass Reflection */}
              <div className="sb-iphone-glass-glare" aria-hidden="true" />

              {/* iPhone Screen Content */}
              <div className="sb-iphone-screen">
                {/* Social Bar */}
                <div className="sb-iphone-status-bar">
                  <span className="sb-status-time font-coolvetica">9:41</span>
                  <div className="sb-status-icons">
                    <span className="sb-icon-signal">📶</span>
                    <span className="sb-icon-wifi">🛜</span>
                    <span className="sb-icon-battery">🔋</span>
                  </div>
                </div>

                {/* Instagram Chat Header */}
                <div className="sb-iphone-app-header">
                  <div className="sb-app-user-row">
                    <div className="sb-app-avatar font-schoolbell">🥒</div>
                    <div className="sb-app-names">
                      <span className="sb-app-handle font-coolvetica">@eatsourboo</span>
                      <span className="sb-app-badge font-schoolbell">Direct Messages</span>
                    </div>
                  </div>
                </div>

                {/* Real Photo Card Feed Inside Phone */}
                <div className="sb-iphone-feed">
                  {/* Photo 1 with hover expansion */}
                  <div className="sb-iphone-photo-post">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/about/section-six-top-1.webp"
                      alt="Customer tasting Sourboo pickles"
                      className="sb-iphone-post-img"
                    />
                    <div className="sb-post-overlay-tag font-schoolbell">
                      tap or hover to open photos
                    </div>
                  </div>

                  {/* Active DM Bubble */}
                  <div className="sb-iphone-dm-bubble">
                    <p className="sb-dm-text font-schoolbell">
                      {REAL_REVIEWS[activeReviewIdx].text}
                    </p>
                    <span className="sb-dm-meta font-coolvetica">
                      {REAL_REVIEWS[activeReviewIdx].author} • {REAL_REVIEWS[activeReviewIdx].tag}
                    </span>
                  </div>
                </div>

                {/* Home Indicator Bar */}
                <div className="sb-iphone-home-bar" />
              </div>
            </div>
          </div>

          {/* Fanned Out Real Customer Photo Cards when Phone is Hovered / Clicked */}
          <div className="sb-fanned-photos-grid">
            {REAL_REVIEWS.map((rev, idx) => (
              <div
                key={rev.id}
                className={`sb-review-polaroid-card card-${idx} ${activeReviewIdx === idx ? 'is-selected' : ''}`}
                onClick={() => setActiveReviewIdx(idx)}
                onMouseEnter={() => setActiveReviewIdx(idx)}
              >
                <div className="sb-card-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="sb-star-gold">★</span>
                  ))}
                </div>
                <p className="sb-card-text font-schoolbell">
                  {rev.text}
                </p>
                <div className="sb-card-author-row">
                  <span className="sb-author-name font-coolvetica">{rev.author}</span>
                  <span className="sb-author-handle font-schoolbell">{rev.handle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Instagram Reference Link */}
        <div className="sb-baddies-ig-link-row text-center">
          <a
            href="https://www.instagram.com/p/DcRE7dRDbcv/?utm_source=ig_web_copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="sb-baddies-ig-button font-schoolbell"
          >
            <span>📸 View real community posts on @eatsourboo ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
