"use client";

import { useEffect } from "react";

/**
 * Behaviour for the hero collage (renders nothing):
 *  - pointer parallax via CSS variables on .hero (rAF-throttled)
 *  - pauses the drift animation while the hero is off-screen
 */
export function CollageFX() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(([e]) => hero.classList.toggle("is-offscreen", !e.isIntersecting), { threshold: 0 });
    io.observe(hero);
    if (reduced) return () => io.disconnect();

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      hero.style.setProperty("--mx", x.toFixed(3));
      hero.style.setProperty("--my", y.toFixed(3));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      io.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
