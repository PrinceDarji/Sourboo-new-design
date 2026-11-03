import PersonalityPopupModal from '../components/popup/PersonalityPopupModal';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flavour Personality Quiz | Sourboo',
  description: 'Take the Sourboo flavour quiz to find your sour personality and claim a 5% discount on your stash.',
};

export default function PopupPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#2F4918',
        padding: '20px',
      }}
    >
      <PersonalityPopupModal initialOpen={true} />

      <div style={{ textAlign: 'center', color: '#FFF' }}>
        <h1 className="font-coolvetica" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
          the sourboo personality quiz
        </h1>
        <p className="font-schoolbell" style={{ fontSize: '1.4rem', color: '#D7F557', marginBottom: '24px' }}>
          find your flavour match & get 5% off
        </p>
        <Link
          href="/"
          className="sb-cta-btn font-coolvetica"
          style={{ background: '#FF6392', color: '#FFF' }}
        >
          ← back to home
        </Link>
      </div>
    </div>
  );
}
