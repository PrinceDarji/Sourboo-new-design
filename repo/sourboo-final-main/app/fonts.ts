import localFont from "next/font/local";

export const rascal = localFont({
  src: [{ path: "assets/fonts/rascal.ttf", weight: "400", style: "normal" }],
  variable: "--font-rascal",
  display: "swap",
});

export const coolvetica = localFont({
  src: [{ path: "assets/fonts/coolvetica.ttf", weight: "400", style: "normal" }],
  variable: "--font-coolvetica",
  display: "swap",
});

export const satoshi = localFont({
  src: [
    { path: "assets/fonts/Satoshi-Regular.ttf", weight: "400", style: "normal" },
    { path: "assets/fonts/Satoshi-Medium.ttf", weight: "500", style: "normal" },
    { path: "assets/fonts/Satoshi-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const schoolbell = localFont({
  src: [{ path: "assets/fonts/Schoolbell-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-schoolbell",
  display: "swap",
});