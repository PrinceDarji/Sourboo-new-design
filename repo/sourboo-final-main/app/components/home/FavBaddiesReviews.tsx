'use client';

export default function FavBaddiesReviews() {
  const messages = [
    {
      author: 'Ananya K.',
      text: '“I literally finished the whole jar in 2 days. The brine is insane on toast!”',
      type: 'b-green',
    },
    {
      author: 'Rohan M.',
      text: '“Finally an Indian pickle brand that gets aesthetic snacking. Tamarind tease is god-tier.”',
      type: 'b-pink',
    },
    {
      author: 'Pooja S.',
      text: '“My boyfriend hates pickles and he stole half my jar. Sending you the breakup bill.”',
      type: 'b-white',
    },
    {
      author: 'Mira T.',
      text: '“My mom stole my Side Eye jar and hid it in her secret pantry stash 😭”',
      type: 'b-green',
    },
  ];

  return (
    <section className="sb-baddies-section" aria-label="Customer Reviews">
      <div className="sb-baddies-header">
        <h2 className="sb-baddies-title">
          Your Internet Fav Baddies and Their Moms Love It ;)
        </h2>
        <p className="sb-baddies-sub">
          visuals of real messages from people who tried sourboo
        </p>
      </div>

      <div className="sb-baddies-phone-container">
        <div className="sb-phone-frame">
          <div className="sb-phone-notch" />

          <div className="sb-messages-stack">
            {messages.map((msg, idx) => (
              <div
                key={`msg-${idx}`}
                className={`sb-bubble ${msg.type}`}
                style={{ animationDelay: `${idx * 0.25}s` }}
              >
                <p style={{ margin: 0 }}>{msg.text}</p>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    marginTop: '6px',
                    opacity: 0.7,
                  }}
                >
                  — {msg.author}
                </span>
              </div>
            ))}
          </div>

          <div className="sb-stars-cluster" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src="/reviewstars.svg"
                alt="Star"
                className="sb-star-icon"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <a
            href="https://www.instagram.com/p/DcRE7dRDbcv/?obrf=b214dm9qMWJ0ZXp0"
            target="_blank"
            rel="noopener noreferrer"
            className="font-schoolbell"
            style={{
              color: '#D7F557',
              fontSize: '1.2rem',
              textDecoration: 'underline',
            }}
          >
            see real messages on Instagram ↗
          </a>
        </div>
      </div>
    </section>
  );
}
