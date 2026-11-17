export type SocialProofSlide = {
  src: string;
  alt: string;
};

export type SocialProofQuote = {
  text: string;
  tone: 'lime' | 'lilac' | 'cream' | 'amber' | 'pink';
};

export type SocialProofContent = {
  title: string;
  instagramUrl: string;
  instagramLabel: string;
  handle: string;
  caption: string;
  slides: SocialProofSlide[];
  quotes: SocialProofQuote[];
};

/**
 * Testimonials and Instagram slides shown on the homepage.
 * Add a new quote or slide here — the section layout does not need to change.
 * Do not invent reviews; only add copy that already exists in Sourboo posts.
 */
export const SOCIAL_PROOF: SocialProofContent = {
  title: 'Your Internet Favourites and Their Moms Love It',
  instagramUrl: 'https://www.instagram.com/p/DcRE7dRDbcv/',
  instagramLabel: 'see the real post on Instagram ↗',
  handle: 'eatsourboo',
  caption:
    'From “I cannot stop eating these” to “the spicy ones are gone in a week” — we’ll take that as a very good sign.',
  slides: [
    {
      src: '/home/baddies/ig-dcre7d-1.webp',
      alt: 'Instagram slide: a plate with Side Eye Sour gherkins, captioned “The internet’s sour girls have spoken.”',
    },
    {
      src: '/home/baddies/ig-dcre7d-2.webp',
      alt: 'Instagram slide: a customer with a jar of Tamarin’ Tease and her message about the gherkins',
    },
    {
      src: '/home/baddies/ig-dcre7d-3.webp',
      alt: 'Instagram slide: a customer’s profile and direct messages about Sourboo',
    },
    {
      src: '/home/baddies/ig-dcre7d-4.webp',
      alt: 'Instagram slide: a customer selfie with her messages about the tamarind flavour',
    },
    {
      src: '/home/baddies/ig-dcre7d-5.webp',
      alt: 'Instagram slide: a customer with Sourboo jars and her messages',
    },
    {
      src: '/home/baddies/ig-dcre7d-6.webp',
      alt: 'Instagram slide: two friends with a Side Eye Sour jar, captioned “Everybody is obsessed! Go get yourself a jar!”',
    },
  ],
  quotes: [
    { text: 'addictive', tone: 'lime' },
    { text: 'super punchy & sour', tone: 'pink' },
    { text: '“I cannot stop eating these”', tone: 'cream' },
    { text: 'perfect spicy', tone: 'amber' },
    { text: '“the spicy ones are gone in a week”', tone: 'cream' },
    { text: 'instant fav', tone: 'pink' },
  ],
};
