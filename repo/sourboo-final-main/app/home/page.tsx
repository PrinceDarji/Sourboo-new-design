import Navbar from '../components/about/AboutNavbar';
import SmegFridgeLoader from '../components/home/SmegFridgeLoader';
import NewHeroSensory from '../components/home/NewHeroSensory';
import BrandVoiceMarquee from '../components/home/BrandVoiceMarquee';
import FoodSensoryStory from '../components/home/FoodSensoryStory';
import FlavourFaceOffDual from '../components/home/FlavourFaceOffDual';
import MobileProductSwipe from '../components/home/MobileProductSwipe';
import PlayerGameExperience from '../components/home/PlayerGameExperience';
import BooInTheWildGallery from '../components/home/BooInTheWildGallery';
import InternetFavBaddies from '../components/home/InternetFavBaddies';
import HomepageFooter from '../components/home/HomepageFooter';
import type { Metadata } from 'next';

export const revalidate = 300;

const homeTitle = 'Sourboo | Made for Mouths That Misbehave';
const homeDescription =
  'India’s First Cult Sour Snack. Snackable pickled gherkins. Tangy, spicy, unapologetically crunchy. Deeply Fermented • Slightly Unhinged.';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: {
    absolute: homeTitle,
  },
  description: homeDescription,
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: '/',
  },
  twitter: {
    title: homeTitle,
    description: homeDescription,
  },
};

export default function HomePage() {
  return (
    <main
      className="sb-home-container"
      style={{ minHeight: '100vh', background: '#FFFFFF', overflowX: 'hidden' }}
    >
      {/* 1. Smeg Fridge Realistic Loading Animation (Door opens -> reveals chilled pickles -> dissolves) */}
      <SmegFridgeLoader />

      {/* 2. Playful Creative Navigation */}
      <Navbar />

      {/* 3. Hero Section (Food & human photography, wavy, no leaves, edgy buttons, exact copy) */}
      <NewHeroSensory />

      {/* 4. Brand Voice Recurring Lines Ticker */}
      <BrandVoiceMarquee />

      {/* 5. Food-First Sensory Storytelling (Lemon squeeze animation, moving eyes, tongue map, real food photos) */}
      <FoodSensoryStory />

      {/* 6. Flavour Face Off Dual Synergy (Exact copy, hover jar open & bursting ingredients) */}
      <FlavourFaceOffDual />

      {/* 7. Mobile-Only Product Experience (Swipe left/right cycling through one jar at a time) */}
      <MobileProductSwipe />

      {/* 8. Player 1 vs Player 2 Interactive Arcade Game (Interactive sliders, crunch test, no girls) */}
      <PlayerGameExperience />

      {/* 9. The Boo in the Wild (Natively straightened cards, zero clipping, organic borders) */}
      <BooInTheWildGallery />

      {/* 10. Realistic iPhone Mockup & Community Proof (Instagram reference post, customer DMs) */}
      <InternetFavBaddies />

      {/* 11. Consistent Site-Wide Footer */}
      <HomepageFooter />
    </main>
  );
}
