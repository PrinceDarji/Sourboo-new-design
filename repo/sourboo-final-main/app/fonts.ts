import localFont from "next/font/local";

// Brand fonts from the supplied zip: Coolvetica (5 cuts), Rascal, Schoolbell.
// Satoshi is no longer part of the site type system.

export const coolvetica = localFont({
  src: [
    { path: "assets/fonts/brand/Coolvetica-Rg.otf", weight: "400", style: "normal" },
    { path: "assets/fonts/brand/Coolvetica-Rg-It.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-coolvetica",
  display: "swap",
});

export const coolveticaCond = localFont({
  src: [{ path: "assets/fonts/brand/Coolvetica-Rg-Cond.otf", weight: "400", style: "normal" }],
  variable: "--font-coolvetica-cond",
  display: "swap",
});

export const coolveticaCram = localFont({
  src: [{ path: "assets/fonts/brand/Coolvetica-Rg-Cram.otf", weight: "400", style: "normal" }],
  variable: "--font-coolvetica-cram",
  display: "swap",
});

export const coolveticaHeavy = localFont({
  src: [{ path: "assets/fonts/brand/Coolvetica-Hv-Comp.otf", weight: "400", style: "normal" }],
  variable: "--font-coolvetica-heavy",
  display: "swap",
});

export const rascal = localFont({
  src: [{ path: "assets/fonts/brand/Rascal.ttf", weight: "400", style: "normal" }],
  variable: "--font-rascal",
  display: "swap",
});

export const schoolbell = localFont({
  src: [{ path: "assets/fonts/brand/Schoolbell-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-schoolbell",
  display: "swap",
});
