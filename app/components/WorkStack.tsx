"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sticky-stack scroll moment for the work section (taste-skill 5.A pattern):
 * each card pins at the viewport top; the next card slides over it while the
 * pinned one scales down and dims. Driven by GSAP ScrollTrigger scrub —
 * no scroll listeners, no React state per frame.
 *
 * Collapses to a plain stacked grid on small screens and under
 * prefers-reduced-motion (gsap.matchMedia handles both).
 */
export function WorkStack({ cards }: { cards: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      // Never download GSAP on devices that can't use the effect: small
      // screens get a plain stacked grid and reduced-motion gets none of it.
      if (!window.matchMedia("(min-width: 921px) and (prefers-reduced-motion: no-preference)").matches) {
        return;
      }
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const host = ref.current;
      if (cancelled || !host) return;

      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia(host);
      mm.add(
        "(min-width: 921px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cardEls = gsap.utils.toArray<HTMLElement>(".work-stack-card");
          if (cardEls.length < 2) return;

          // CSS sticky does the pinning. Scale goes on the card; dimming goes
          // on a page-colored veil INSIDE the wrapper — the card itself stays
          // opaque, so the card behind never bleeds through the overlap.
          cardEls.forEach((card, i) => {
            if (i === cardEls.length - 1) return;
            gsap.to(card, {
              scale: 0.93,
              ease: "none",
              scrollTrigger: {
                trigger: cardEls[i + 1],
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });
            const veil = card.querySelector(".work-card-veil");
            if (veil) {
              gsap.to(veil, {
                opacity: 0.66,
                ease: "none",
                scrollTrigger: {
                  trigger: cardEls[i + 1],
                  start: "top bottom",
                  end: "top top",
                  scrub: true,
                },
              });
            }
          });
        },
      );

      cleanup = () => mm.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={ref} className="work-stack">
      {cards.map((card, i) => (
        <div key={i} className="work-stack-card">
          {card}
          <span className="work-card-veil" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}
