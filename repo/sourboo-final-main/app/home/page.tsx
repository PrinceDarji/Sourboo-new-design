import Navbar from '../components/about/AboutNavbar';
import HeroLemonJuiceExperience from '../components/home/HeroLemonJuiceExperience';
import BrandVoiceMarquee from '../components/home/BrandVoiceMarquee';
import SnackCrunchIntro from '../components/home/SnackCrunchIntro';
import FlavourFaceOffArena from '../components/home/FlavourFaceOffArena';
import BooInTheWildGallery from '../components/home/BooInTheWildGallery';
import FavBaddiesReviews from '../components/home/FavBaddiesReviews';
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
      style={{ minHeight: '100vh', background: '#F8F6F0', overflowX: 'hidden' }}
    >
      {/* Navigation: HOME | OUR STORY | SHOP | JOIN US */}
      <Navbar />

      {/* Hero Banner / First Fold: the sourboo way, cravings comes first */}
      <HeroLemonJuiceExperience />

      {/* Brand Voice Recurring Lines Ticker */}
      <BrandVoiceMarquee />

      {/* Intro: YOUR OTHER SNACKS COULD NEVER */}
      <SnackCrunchIntro />

      {/* Flavour Face Off: SIDE EYE SOUR vs TAMARIN' TEASE */}
      <FlavourFaceOffArena />

      {/* The Boo in the Wild: Your jar called. It wants to be on everything */}
      <BooInTheWildGallery />

      {/* Your Internet Fav Baddies and Their Moms Love It ;) */}
      <FavBaddiesReviews />

      {/* Social Section and Footer */}
      <HomepageFooter />
    </main>
  );
}
