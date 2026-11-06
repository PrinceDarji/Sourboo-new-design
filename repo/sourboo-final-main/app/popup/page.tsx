import PersonalityPopupModal from '../components/popup/PersonalityPopupModal';
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
        width: '100vw',
        background: '#1E3514',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PersonalityPopupModal initialOpen={true} />
    </div>
  );
}