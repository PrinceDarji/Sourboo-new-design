import Navbar from '../components/about/AboutNavbar';
import SiteFooter from '../components/SiteFooter';
import FridgeLoader from '../components/site/FridgeLoader';
import Marquee from '../components/site/Marquee';
import HomeHero from '../components/home/HomeHero';
import CravingsIntro from '../components/home/CravingsIntro';
import InTheJar from '../components/home/InTheJar';
import GoodTasteMoments from '../components/home/GoodTasteMoments';
import FlavourDuo from '../components/home/FlavourDuo';
import TasteGame from '../components/home/TasteGame';
import FavBaddiesReviews from '../components/home/FavBaddiesReviews';
import '../sourboo-home.css';
import type { Metadata } from 'next';

export const revalidate = 300;

const homeTitle = 'Sourboo | Made for Mouths That Misbehave';
const homeDescription =
  'India’s First Cult Sour Snack. Snackable pickled gherkins made to be bold, made to be yours. Deeply Fermented • Slightly Unhinged.';

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
    <main className="sbx-home">
      <FridgeLoader />
      <Navbar />
      <HomeHero />
      <Marquee label="Sourboo brand lines" tone="lilac" duration={46} tilt={-1.2} className="sbx-home__marquee" />
      <CravingsIntro />
      <InTheJar />
      <GoodTasteMoments />
      <FlavourDuo />
      <TasteGame />
      <FavBaddiesReviews />
      <SiteFooter />
    </main>
  );
}
