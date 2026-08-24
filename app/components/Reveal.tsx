"use client";

import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper. Fails open by design:
 *  - Content is server-rendered fully visible.
 *  - Only when JS is alive AND the element starts below the viewport do we
 *    arm the hidden state, then IntersectionObserver reveals it on scroll.
 *  - If IO is missing, or the reveal never fires within 4s of arming,
 *    the element is forced visible. A hydration failure can never blank the page.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  accent,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  accent?: string;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    // Elements already on screen at mount stay untouched — no flash.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    setArmed(true);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);

    // Safety net: never leave content hidden because of a missed callback.
    const failsafe = window.setTimeout(() => {
      setVisible(true);
      io.disconnect();
    }, 4000 + delay);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [delay]);

  const accentStyle = accent ? ({ "--card-accent": `${accent}1f` } as CSSProperties) : undefined;

  return createElement(
    as,
    {
      ref,
      className: `reveal${armed && !visible ? " reveal-armed" : ""}${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`,
      style: { ...(accentStyle ?? {}), "--reveal-delay": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
