"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Magnetic CTA: the button leans toward the cursor while it is anywhere in
 * the host zone, then springs back on leave. Pure transform writes in a rAF
 * loop — no React state, no layout work. Disabled for reduced motion and
 * coarse pointers (touch).
 */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const zoneRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const inner = innerRef.current;
    if (!zone || !inner) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      inner.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span ref={zoneRef} className="magnetic-zone">
      <span ref={innerRef} className="magnetic-inner">
        {children}
      </span>
    </span>
  );
}
