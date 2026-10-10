"use client";

import { useEffect } from "react";

/**
 * Reveals [data-reveal] elements once their top edge is inside (or above) the
 * viewport. A scroll check — not an IntersectionObserver — so fast scrolls and
 * anchor jumps can never leave an element hidden. Content stays visible without
 * JavaScript (the hidden state only applies under html.js), and a CSS failsafe
 * animation reveals anything left after 3.5 s.
 */
export function RevealObserver() {
  useEffect(() => {
    const pending = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pending.forEach((el) => el.classList.add("is-in"));
      return;
    }
    let raf = 0;
    const check = () => {
      raf = 0;
      const limit = window.innerHeight * 0.94;
      // at the very bottom nothing further can scroll into range, so reveal what's left
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      for (const el of pending) {
        if (atEnd || el.getBoundingClientRect().top < limit) {
          el.classList.add("is-in");
          pending.delete(el);
        }
      }
      if (pending.size === 0) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
