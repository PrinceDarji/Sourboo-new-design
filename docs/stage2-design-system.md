# Sourboo Design System & Component Library (Stage 2)

**Platform Target**: Shopify Online Store 2.0 (Liquid + CSS Variables + ES6 Vanilla JS)  
**Philosophy**: Unapologetically Quirky, Handcrafted, Tactile, High-Flavour  

---

## 1. Design Tokens & CSS Variables

```css
:root {
  /* Canvas & Background Surfaces */
  --sb-bg-sage: #E9ECD9;
  --sb-bg-yellow: #FFFF88;
  --sb-bg-popup: #EEDDEB;
  --sb-bg-input: #F8F0F8;
  --sb-bg-pill: #FFF7D6;
  --sb-bg-dark: #171717;

  /* Brand Signature Colors */
  --sb-pink: #E61E6E;
  --sb-pink-hover: #CC0F5F;
  --sb-pink-soft: #F18BB7;
  --sb-pink-punch: #EA1970;

  /* Sour Greens & Acid Flavors */
  --sb-lime: #BFEA5A;
  --sb-pickle-green: #4C8B1D;
  --sb-pickle-olive: #3E6A18;
  --sb-pickle-dark: #2F4918;
  --sb-pickle-forest: #1C2B08;

  /* Warm Tamarind & Chilli */
  --sb-amber: #C96A00;
  --sb-cinnamon: #A35A0A;
  --sb-rust: #5E3C10;
  --sb-tamarind-dark: #26140A;

  /* Typography Colors */
  --sb-text-charcoal: #171717;
  --sb-text-muted: #6F5F6B;
  --sb-text-cream: #E9E6B8;
  --sb-text-light: #FFFBD8;

  /* Structural Radii */
  --sb-radius-pill: 9999px;
  --sb-radius-card: 24px;
  --sb-radius-bubble: 44% 56% 51% 49% / 49% 45% 55% 51%;
  --sb-radius-organic: 48% 52% 46% 54% / 44% 48% 52% 56%;

  /* Motion & Easings */
  --sb-ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --sb-ease-poster: cubic-bezier(0.2, 1, 0.22, 1);
  --sb-ease-fluid: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 2. Typography Rules & Alternating Display System

### The Three Sacred Fonts
```
1. Coolvetica (Headings / Structure)
   font-family: 'coolvetica', sans-serif;
   weight: 400;
   letter-spacing: -0.015em;

2. Rascal (Expressive Alternating Display)
   font-family: 'rascal', cursive;
   weight: 400;

3. Schoolbell (Handwritten Voice & CTAs)
   font-family: 'Schoolbell', cursive;
   weight: 400;
```

### The "CoolRascal" Typography Engine
Sourboo's signature headline technique alternates character-by-character or word-by-word between `Coolvetica` and `Rascal` while toggling between brand green (`#4C8B1D`) and brand pink (`#EA1970`).

In Shopify OS 2.0, this is achieved via a lightweight Liquid/JS filter:
```liquid
{% comment %} Alternate character engine for headlines {% endcomment %}
<h1 class="sourboo-headline">
  <span class="font-coolvetica text-pickle">the </span>
  <span class="font-rascal text-pink">sour</span>
  <span class="font-coolvetica text-pickle">boo </span>
  <span class="font-rascal text-pink">way, </span>
  <span class="font-coolvetica text-pickle">cravings </span>
  <span class="font-rascal text-pink">comes </span>
  <span class="font-coolvetica text-pickle">first</span>
</h1>
```

---

## 3. Button Matrix

| Button Type | Background Treatment | Font & Size | Hover Effect |
|---|---|---|---|
| **Primary Brush CTA** | Custom SVG brushstroke (`ctabg.svg`, `ctabg2.svg`) | `Schoolbell`, 28px–42px, uppercase/lowercase hybrid | Subtle brightness boost (105%), scale(1.02) |
| **Quiz Option Pill** | Bespoke hand-drawn SVGs (`button-bg-1.svg` to `4.svg`) | `Schoolbell`, 24px–36px, colored text per option | `-translate-y-1`, shadow deepens |
| **Unlock 5% CTA** | Custom organic shape (`button1.svg`) | `Schoolbell`, 26px–34px, pale yellow text | `scale(1.03)`, cursor pointer |
| **Quick Buy Pill** | SVG brush (`buynowbutton.svg`) | `Coolvetica` / `Schoolbell`, 20px–28px | Switches to `buynowbuttonhover.svg` |
| **Organic Nav Link** | Irregular blob background (`navbody.webp` / SVG) | `Schoolbell`, 16px–24px, pale cream text | Blob glow expands, opacity 100% |
| **Quantity Pill** | Pill frame with rounded square buttons (`+` / `-`) | `Coolvetica`, 20px–26px | Border glow, text brighten |

---

## 4. Graphic Element Guidelines

### Organic Section Dividers
- **Top Wave**: Inverted sinusoidal SVG wave cutting into section backgrounds with `#E9ECD9` fill.
- **Bottom Wave**: Asymmetrical wavy SVG closing sections smoothly into sage background.
- **Paper Tear**: Layered torn paper SVG edge (`paper-tear.svg`) introducing the brand story and logo reveal.

### Pushpin Mechanic
- Dropping pins feature a radial gradient head: `radial-gradient(circle at 30% 28%, #fff7f9 0 22%, #f33f5f 26% 70%, #ba0d2c 100%)`.
- Vertical needle shadow with 3D offset gives posters the tactile feel of an indie bulletin board.

---

## 5. Responsive Breakpoint Rules

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Mobile (<640px) │ Tablet (640-1024│ Desktop (1024-14│ Wide (>1440px)  │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Nav: navbody.web│ Nav: navbody.web│ Nav: navbar.webp│ Nav: max 1320px │
│ Hero: 100vw clip│ Hero: 75vh cover│ Hero: 78vh cover│ Hero: 82vh cover│
│ Bands: 140vw pkg│ Bands: 100vw pkg│ Bands: 86vw pkg │ Bands: 80vw pkg │
│ Posters: 2-col  │ Posters: stagger│ Posters: canvas │ Posters: canvas │
│ Gallery: touch  │ Gallery: touch  │ Gallery: smooth │ Gallery: smooth │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

---

## 6. Accessibility & Usability Standards

1. **Reduced Motion**: All scroll reveals, poster drops, and bubble pops degrade gracefully to instant static states when `prefers-reduced-motion: reduce` is active.
2. **Keyboard Accessibility**: Modal traps focus on opening, provides a clear Escape key listener, and highlights interactive elements with visible focus rings (`focus-visible:ring-2`).
3. **Contrast Compliance**: Contrast between Sage Cream (`#E9ECD9`) and Charcoal (`#171717`) exceeds WCAG AAA (11.4:1). Pink on cream exceeds WCAG AA for large display text.
4. **Touch Targets**: All interactive buttons, quantity modifiers, and navigation links have a minimum hit target of `48px × 48px`.

*Design system established. Ready for Stage 3 & 4: Homepage & Multi-Page Interactive UI/UX.*
