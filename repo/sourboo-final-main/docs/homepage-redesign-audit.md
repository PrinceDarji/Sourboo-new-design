# Sourboo homepage redesign: audit and asset notes

This document records what was found before the November 2026 homepage redesign, what was kept, what was rebuilt, and which images still need to be supplied.

## 1. What the site looked like before the client feedback

Sources compared: the first committed snapshot of the live Next.js app (`b9919ad`), the intermediate "Snack Diary" redesign (`943950c`), the redesign the client reviewed (`358f08f` to `77a502d`), and the scraped live HTML (`/homepage.html`, `/_product.txt`).

| Area | Original live site (`b9919ad`) | Reviewed redesign (`77a502d`) |
| --- | --- | --- |
| Homepage order | Hero photo, two full-width product bands (packaging strips + brush CTAs), "sourboo made for people who eat with intent" intro with "read my rant →", poster pinboard, fresh ingredients strip, horizontal gallery, review phone, footer | Text hero with two jars and a VS badge, marquee, "YOUR OTHER SNACKS COULD NEVER", Flavour Face Off cards on a black band, poster carousel, fabricated review phone on dark green, black footer |
| Typography | Coolvetica + Rascal alternating per letter (`CoolRascalText`), Schoolbell for handwritten lines | Mostly Coolvetica caps, Rascal/Schoolbell used sparingly |
| Hero image | `home/hero-placeholder` (two hands holding pickle slices, warm amber light), boxed at 78vh | Removed from hero; reused small inside a polaroid card |
| Pickle jars | Shop grid: jar over a paint splash, Rascal flavour label (`lemon and chaat masala` / `imli`) fading in on hover, brush "buy now" hover swap | Static jars inside bordered cards |
| Tongue, eyes, lemon | About page only (`SectionThreeEyesSequence`, tongue art, `lemonsqueeze.gif`) | Same; lemon curtain used as a route transition |
| Navigation | Simple text nav + cart | Brutalist pill nav with quiz pill and bag |
| Cart | Slide-over drawer | Slide-over drawer with boxed quantity buttons |
| Footer | "get to know @sourboosnacks", stay sour, nav + legal links | Two different footers (`HomepageFooter` black, `SiteFooter` with fake WhatsApp number and wrong Instagram handle) |
| About page | Older layout | Rebuilt and approved by the client; left untouched |

Notes:
- The "Squeeze for Extra Nimbu! (0)" / "That Instant Sour Face" eyes section the client flagged does not exist anywhere in this repository's history, so there was nothing to delete; the redesign makes sure it does not come back.
- There was no Smeg fridge loader in code. The existing loader was a pink/yellow lemon curtain with text that replayed on every route change.
- There was no lid-opening jar interaction in code. The original interaction was the hover label + splash on the shop page.

## 2. Keep / redesign / remove

Keep:
- Approved About page body and its CSS (`app/about/page.tsx`, `app/sourboo-about.css`).
- Cart, discount code and checkout logic (`CartProvider`, `src/lib/cart`, `src/lib/checkout`).
- Coolvetica, Rascal and Schoolbell fonts, and the alternating `CoolRascalText` treatment.
- Original copy: hero lines, "sourboo made for people who eat with intent", "who like flavour loud and immediate", "food that fits into real moments", "read my rant →", the Player 1 / Player 2 prompts and meters from the original shop page, the live site's review bubbles.
- Product jar photography and the original jar hover label.

Redesign:
- Hero: full-bleed real photo with the exact supplied copy as one layered headline.
- Jar interaction: rebuilt as `InteractiveJar` (lid lifts, opening revealed, flavour-matched ingredients, original Rascal label), used on the homepage and the shop page.
- Player 1 vs Player 2: rebuilt as a taste game without the character illustrations.
- Internet Fav Baddies: real Instagram carousel images and real quotes inside an iPhone mockup.
- Navigation, cart drawer, footer, marquee, Join Us page, contact/legal templates.
- Loader: Smeg-style fridge that plays once and is skipped for returning visitors and reduced-motion users.

Remove:
- Fabricated reviews (named quotes on the homepage, the shop page review ribbon).
- Black bands and harsh black borders on the homepage.
- Leaf graphics on the homepage (`leaf-top.svg`, `leaf-mid.svg`, leaf sprigs in `splash-*.svg` are no longer used on the homepage).
- The VS framing between the two flavours.
- The per-route curtain transition with text.
- Invented Join Us copy and the placeholder WhatsApp number `wa.me/919999999999`.

## 3. Images: what is used and what is still needed

Real photography used:
- Hero: `public/home/hero-placeholder.JPEG`
- Food: `home/recipe-1.jpg`, `home/packagingbg.JPEG`, `home/recipe-2.webp`, `home/readmyrant.webp`, `product/catalog/side-eye-lifestyle.webp`, `product/catalog/tamarin-lifestyle.webp`
- People: `about/section-six-top-1/2/3.webp`, `about-cover.JPG`, `footer.JPEG`
- Social proof: `public/home/baddies/ig-dcre7d-1..6.webp`, the six slides of https://www.instagram.com/p/DcRE7dRDbcv/ (downloaded from the public embed; caption quotes are quoted verbatim).
- Lemon ingredient: `public/home/ingredients/lemon-wedge.png` (copied from the real lemon photo used for `apple-touch-icon.png`).

Placeholders that should be replaced with real studio cutouts (transparent PNG or WebP, at least 600 px on the long edge, soft natural shadow, shot on the same warm light as the jar photos). Drop them in with the same filenames and nothing else needs to change:

| File | Needed shot |
| --- | --- |
| `public/home/ingredients/tamarind-pod.svg` | Whole tamarind pod with one end cracked open showing pulp |
| `public/home/ingredients/red-chilli.svg` | Whole dried red chilli with stem |
| `public/home/ingredients/chaat-masala.svg` | A pinch / small mound of chaat masala powder |
| `public/home/ingredients/lemon-wedge.png` | A higher resolution lemon wedge (current file is 180 px) |

Photography that would strengthen the food story (no placeholder is rendered for these; the layout uses existing photos until they exist):
- Ingredient preparation: gherkins being sliced, lemon being cut, tamarind pulp, chaat masala being sprinkled.
- Close-up of someone mid-bite / puckering at a sour hit.
- Higher resolution landscape crop of the hero hands shot for ultra-wide screens.
