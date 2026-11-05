import Link from 'next/link';

export default function HomepageFooter() {
  return (
    <footer className="sb-social-footer" role="contentinfo">
      {/* Social Handle Header */}
      <h3 className="sb-social-handle">
        <a
          href="https://instagram.com/eatsourboo"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          *get to know @eatsourboo*
        </a>
      </h3>

      <p className="sb-social-motto">
        *Made for mouths that misbehave*
      </p>

      {/* Primary Navigation: HOME | OUR STORY | SHOP | JOIN US */}
      <nav className="sb-footer-nav-row" aria-label="Footer Primary Navigation">
        <Link href="/" className="sb-footer-nav-link">
          HOME
        </Link>
        <span style={{ color: '#FF6392' }}>|</span>
        <Link href="/about" className="sb-footer-nav-link">
          OUR STORY
        </Link>
        <span style={{ color: '#FF6392' }}>|</span>
        <Link href="/product" className="sb-footer-nav-link">
          SHOP
        </Link>
        <span style={{ color: '#FF6392' }}>|</span>
        <Link href="/join" className="sb-footer-nav-link">
          JOIN US
        </Link>
      </nav>

      {/* Legal Footer Links: TERMS & CONDITIONS | PRIVACY POLICY | REFUND POLICY | SHIPPING POLICY | CONTACT */}
      <nav className="sb-footer-legal-row" aria-label="Footer Legal Links">
        <Link href="/terms-and-conditions" className="sb-footer-legal-link">
          TERMS & CONDITIONS
        </Link>
        <span style={{ color: '#444' }}>|</span>
        <Link href="/privacy-policy" className="sb-footer-legal-link">
          PRIVACY POLICY
        </Link>
        <span style={{ color: '#444' }}>|</span>
        <Link href="/refund-policy" className="sb-footer-legal-link">
          REFUND POLICY
        </Link>
        <span style={{ color: '#444' }}>|</span>
        <Link href="/shipping-policy" className="sb-footer-legal-link">
          SHIPPING POLICY
        </Link>
        <span style={{ color: '#444' }}>|</span>
        <Link href="/contact" className="sb-footer-legal-link">
          CONTACT
        </Link>
      </nav>

      <div style={{ textAlign: 'center', marginTop: '24px', opacity: 0.5, fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} Sourboo Foods Pvt Ltd. Stay sour.
      </div>
    </footer>
  );
}
