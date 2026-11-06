'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/app/components/cart/CartProvider';

const POPUP_SEEN_KEY = 'sourboo_popup_seen';
const POPUP_DISMISSED_KEY = 'sourboo_popup_dismissed';
const COUPON_CODE = 'SOURBABE05';

function checkIsDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return (
      localStorage.getItem(POPUP_DISMISSED_KEY) === '1' ||
      sessionStorage.getItem(POPUP_DISMISSED_KEY) === '1' ||
      localStorage.getItem(POPUP_SEEN_KEY) === '1' ||
      sessionStorage.getItem(POPUP_SEEN_KEY) === '1'
    );
  } catch {
    return false;
  }
}

function persistDismissed(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(POPUP_DISMISSED_KEY, '1');
    sessionStorage.setItem(POPUP_DISMISSED_KEY, '1');
    localStorage.setItem(POPUP_SEEN_KEY, '1');
    sessionStorage.setItem(POPUP_SEEN_KEY, '1');
  } catch {}
}

const OPTIONS = [
  { label: 'Sour & Savage →', personality: 'Sour & Savage', key: 'savage' },
  { label: 'Sweet but Psycho →', personality: 'Sweet but Psycho', key: 'psycho' },
  { label: 'Spicy Drama →', personality: 'Spicy Drama', key: 'drama' },
  { label: 'Lowkey Tangy →', personality: 'Lowkey Tangy', key: 'tangy' },
];

export default function PersonalityPopupModal({ initialOpen = false }: { initialOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [screen, setScreen] = useState<1 | 2 | 3>(1);
  const [chosenPersonality, setChosenPersonality] = useState<string>('Sour & Savage');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const pathname = usePathname();
  const { applyDiscountCode } = useCart();

  const openModal = useCallback(() => {
    setIsOpen(true);
    setScreen(1);
    setFormError('');
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    persistDismissed();
    if (pathname === '/popup') {
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  }, [pathname]);

  // Listen for custom trigger event
  useEffect(() => {
    const handleOpen = () => openModal();
    window.addEventListener('open-sourboo-quiz', handleOpen);
    return () => window.removeEventListener('open-sourboo-quiz', handleOpen);
  }, [openModal]);

  // Auto-show on homepage after 5s ONLY if never dismissed before
  useEffect(() => {
    if (initialOpen) return;
    if (pathname !== '/' && pathname !== '/home') return;

    if (checkIsDismissed()) return;

    const timer = setTimeout(() => {
      if (!checkIsDismissed()) {
        setIsOpen(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [pathname, initialOpen]);

  // Prevent background scroll when open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, closeModal]);

  const handleSelectOption = (personality: string) => {
    setChosenPersonality(personality);
    setScreen(2);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setFormError('Please enter a valid email address');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 8) {
      setFormError('Please enter a valid phone number (at least 8 digits)');
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('/api/popup-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim(),
          selectedOptionLabel: chosenPersonality,
          sourcePath: pathname || '/',
        }),
      });
    } catch {
      // Continue even if logging fails
    } finally {
      setIsSubmitting(false);
    }

    // Apply discount code to user's cart
    applyDiscountCode(COUPON_CODE);
    setScreen(3);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      setCopied(true);
    }
    applyDiscountCode(COUPON_CODE);
  };

  if (!isOpen) return null;

  return (
    <div
      id="LandingPersonalityPopup"
      className="sb-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Personality Quiz"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="sb-popup-inner">
        <button
          type="button"
          onClick={closeModal}
          className="sb-modal-close-btn sb-close-popup-trigger"
          aria-label="Close popup"
        >
          ×
        </button>

        {/* SCREEN 1: Quiz Choices */}
        {screen === 1 && (
          <div id="PopupScreen1">
            <h2 className="sb-popup-h1">
              <span className="font-coolvetica text-pink">What </span>
              <span className="font-schoolbell text-pink">kind of sour are you?</span>
            </h2>
            <p className="sb-popup-subheading">Be honest</p>
            <div className="sb-popup-options-grid">
              {OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSelectOption(opt.personality)}
                  className={`sb-popup-option-btn sb-choice-${opt.key}`}
                  data-personality={opt.personality}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#26140A',
                    color: '#26140A',
                    boxShadow: '3.5px 3.5px 0px #26140A',
                  }}
                >
                  <span
                    className="sb-popup-option-text"
                    style={{
                      color: '#26140A',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      letterSpacing: '0.01em',
                      fontFamily: 'Coolvetica, sans-serif',
                    }}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="sb-popup-text-exit sb-close-popup-trigger font-schoolbell"
              style={{
                display: 'block',
                margin: '0 auto',
                background: 'none',
                border: 'none',
                color: 'var(--sb-text-muted)',
                fontSize: '1rem',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              No thanks, take me to the website
            </button>
          </div>
        )}

        {/* SCREEN 2: Lead Form */}
        {screen === 2 && (
          <div id="PopupScreen2">
            <h2 id="PopupChosenHeading" className="sb-popup-h1 font-coolvetica text-pink">
              You&apos;re {chosenPersonality}
            </h2>
            <p
              className="font-schoolbell text-pink"
              style={{
                fontSize: 'clamp(20px, 3.5vw, 32px)',
                textAlign: 'center',
                margin: '6px 0',
              }}
            >
              Take 5% off. You&apos;ve earned it
            </p>
            <p
              className="font-schoolbell"
              style={{
                fontSize: '1.15rem',
                color: 'var(--sb-text-charcoal)',
                textAlign: 'center',
                marginBottom: '18px',
              }}
            >
              Where should we send it?
            </p>
            <form id="PopupLeadForm" className="sb-coupon-form" onSubmit={handleFormSubmit} noValidate>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '10px',
                }}
              >
                <input
                  type="email"
                  id="PopupEmailInput"
                  placeholder="Your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="sb-pill-input"
                  autoComplete="email"
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: '9999px',
                    border: '2px solid var(--sb-green-dark)',
                    fontFamily: 'Coolvetica, sans-serif',
                    fontSize: '1rem',
                  }}
                />
                <input
                  type="tel"
                  id="PopupPhoneInput"
                  placeholder="Your phone number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="sb-pill-input"
                  autoComplete="tel"
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: '9999px',
                    border: '2px solid var(--sb-green-dark)',
                    fontFamily: 'Coolvetica, sans-serif',
                    fontSize: '1rem',
                  }}
                />
              </div>
              {formError && (
                <p
                  id="PopupFormError"
                  style={{
                    color: '#B4232B',
                    fontFamily: 'Schoolbell, cursive',
                    margin: '4px 0 8px',
                    textAlign: 'center',
                    fontSize: '1rem',
                  }}
                >
                  {formError}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="sb-unlock-cta font-schoolbell"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '14px',
                  background: 'var(--sb-pink)',
                  color: '#FFFFFF',
                  border: '2px solid var(--sb-green-dark)',
                  borderRadius: '9999px',
                  fontSize: '1.3rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '3px 3px 0px var(--sb-green-dark)',
                }}
              >
                <span>{isSubmitting ? 'Unlocking...' : 'Unlock my 5%'}</span>
              </button>
              <p
                className="font-schoolbell"
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--sb-text-muted)',
                  textAlign: 'center',
                  marginTop: '10px',
                }}
              >
                No spam, just sour things :)
              </p>
            </form>
            <button
              type="button"
              onClick={closeModal}
              className="sb-popup-text-exit sb-close-popup-trigger font-schoolbell"
              style={{
                display: 'block',
                margin: '12px auto 0',
                background: 'none',
                border: 'none',
                color: 'var(--sb-text-muted)',
                fontSize: '1rem',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              No thanks, take me to the website
            </button>
          </div>
        )}

        {/* SCREEN 3: Coupon Reveal */}
        {screen === 3 && (
          <div id="PopupScreen3">
            <h2 className="sb-popup-h1 font-coolvetica text-pink">You are in!</h2>
            <p
              className="font-schoolbell text-pink"
              style={{
                fontSize: 'clamp(18px, 3vw, 24px)',
                textAlign: 'center',
                margin: '10px 0 20px',
              }}
            >
              Copy the code and use it at checkout to get 5% off your cart total.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
              <button
                type="button"
                id="PopupCopyBtn"
                onClick={handleCopyCode}
                className="sb-code-copy-pill"
                aria-label="Copy coupon code"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  background: 'var(--sb-yellow)',
                  border: '2px solid var(--sb-green-dark)',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  boxShadow: '3px 3px 0px var(--sb-green-dark)',
                }}
              >
                <span
                  id="PopupCodeDisplay"
                  className="font-coolvetica"
                  style={{ fontSize: '1.4rem', color: 'var(--sb-green-dark)', fontWeight: 'bold' }}
                >
                  {COUPON_CODE}
                </span>
                <span
                  id="PopupCopyText"
                  className="sb-btn-coupon-badge font-schoolbell"
                  style={{
                    background: copied ? '#632D10' : 'var(--sb-pink)',
                    color: '#FFFFFF',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.95rem',
                  }}
                >
                  {copied ? 'COPIED!' : 'COPY'}
                </span>
              </button>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="sb-unlock-cta sb-close-popup-trigger font-schoolbell"
              style={{
                display: 'block',
                width: '100%',
                maxWidth: '360px',
                margin: '16px auto 0',
                padding: '12px',
                background: 'var(--sb-lime-btn)',
                color: 'var(--sb-green-dark)',
                border: '2px solid var(--sb-green-dark)',
                borderRadius: '9999px',
                fontSize: '1.25rem',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '3px 3px 0px var(--sb-green-dark)',
              }}
            >
              <span>Start shopping with 5% off →</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
