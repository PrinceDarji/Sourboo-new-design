'use client';

import { clsx } from "clsx";
import { Fragment, useState } from "react";

type Run = {
  text: string;
  font?: "rascal" | "coolvetica" | "schoolbell";
  className?: string;
};

export function MixedFontHeading({
  runs,
  className,
}: {
  runs: Run[];
  className?: string;
}) {
  return (
    <h1 className={clsx("leading-[0.92] tracking-tight", className)}>
      {runs.map((r, i) => (
        <span
          key={i}
          className={clsx(
            r.font === "rascal" && "font-rascal",
            r.font === "coolvetica" && "font-coolvetica",
            r.font === "schoolbell" && "font-schoolbell",
            r.className
          )}
        >
          {r.text}
        </span>
      ))}
    </h1>
  );
}

/**
 * LayeredHighlightText:
 * Renders a bold main font (Coolvetica) with an unusual handwritten or sketch-style
 * font (Schoolbell / Rascal) sitting directly behind or overlapping selected words
 * like a hand-drawn shadow or highlight.
 * When hovered, reveals playful popup words or sour effects.
 */
export function LayeredHighlightText({
  mainWord,
  highlightWord,
  revealNote,
  className,
  highlightColor = "#E81B6D",
  shadowFont = "schoolbell",
}: {
  mainWord: string;
  highlightWord?: string;
  revealNote?: string;
  className?: string;
  highlightColor?: string;
  shadowFont?: "schoolbell" | "rascal";
}) {
  const [isHovered, setIsHovered] = useState(false);
  const shadowText = highlightWord || mainWord;

  return (
    <span
      className={clsx("sb-layered-text-wrap", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Underlying handwritten shadow / highlight */}
      <span
        className={clsx(
          "sb-layered-shadow",
          shadowFont === "schoolbell" ? "font-schoolbell" : "font-rascal"
        )}
        style={{ color: highlightColor }}
        aria-hidden="true"
      >
        {shadowText}
      </span>

      {/* Foreground Bold Text */}
      <span className="sb-layered-main font-coolvetica">
        {mainWord}
      </span>

      {/* Interactive Hover Reveal Tooltip */}
      {revealNote && isHovered && (
        <span className="sb-layered-reveal-pill font-schoolbell" role="status">
          {revealNote}
        </span>
      )}
    </span>
  );
}

type FontName = "rascal" | "coolvetica" | "schoolbell";
type TextTag = "h1" | "h2" | "h3" | "p" | "span";

type BaseMixedFontTextProps = {
  text: string;
  className?: string;
  as?: TextTag;
  baseFont?: FontName;
  accentFont?: FontName;
  baseClassName?: string;
  accentClassName?: string;
};

type DefaultPattern = {
  pattern?: undefined;
  startWith?: "base" | "accent";
};

type AlternatePattern = {
  pattern: "alternate";
  startWith?: "base" | "accent";
};

type EveryThirdPattern = {
  pattern: "everyThird";
  offset?: number;
};

type CustomPattern = {
  pattern: "custom";
  accentIndices: number[];
};

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type MixedFontTextProps = BaseMixedFontTextProps & (DefaultPattern | AlternatePattern | EveryThirdPattern | CustomPattern);
export type CoolRascalTextProps = DistributiveOmit<MixedFontTextProps, "baseFont" | "accentFont">;

function fontClass(font: FontName) {
  if (font === "rascal") return "font-rascal";
  if (font === "schoolbell") return "font-schoolbell";
  return "font-coolvetica";
}

function shouldUseAccent(
  glyphIndex: number,
  props: DefaultPattern | AlternatePattern | EveryThirdPattern | CustomPattern,
  customAccentSet: Set<number>
) {
  if (props.pattern === "custom") {
    return customAccentSet.has(glyphIndex);
  }

  if (props.pattern === "everyThird") {
    const offset = ((props.offset ?? 2) % 3 + 3) % 3;
    return glyphIndex % 3 === offset;
  }

  const startWith = props.startWith ?? "base";
  return startWith === "accent" ? glyphIndex % 2 === 0 : glyphIndex % 2 === 1;
}

export function MixedFontText({
  text,
  className,
  as = "span",
  baseFont = "coolvetica",
  accentFont = "rascal",
  baseClassName,
  accentClassName,
  ...patternProps
}: MixedFontTextProps) {
  const Component = as;
  let glyphIndex = -1;
  const customAccentSet = new Set(patternProps.pattern === "custom" ? patternProps.accentIndices : []);

  return (
    <Component className={className}>
      {Array.from(text).map((char, i) => {
        if (char === " ") return <Fragment key={`${i}-space`}> </Fragment>;
        glyphIndex += 1;
        const useAccent = shouldUseAccent(glyphIndex, patternProps, customAccentSet);

        return (
          <span
            key={`${i}-${char}`}
            className={clsx(
              useAccent ? fontClass(accentFont) : fontClass(baseFont),
              useAccent ? accentClassName : baseClassName
            )}
          >
            {char}
          </span>
        );
      })}
    </Component>
  );
}

export function CoolRascalText(props: CoolRascalTextProps) {
  return <MixedFontText {...props} baseFont="coolvetica" accentFont="rascal" />;
}
