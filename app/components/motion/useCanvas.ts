"use client";

import { useEffect, useRef } from "react";

export type Pointer = {
  x: number;
  y: number;
  inside: boolean;
  down: boolean;
  /** seconds (loop clock) of the last pointer movement; -Infinity if never */
  lastMove: number;
};

export type Frame = {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  t: number;
  dt: number;
  pointer: Pointer;
  reduced: boolean;
};

type Options = {
  onResize?: (w: number, h: number) => void;
  onPointerDown?: (p: Pointer, t: number) => void;
  /** time to draw for the static reduced-motion frame */
  staticTime?: number;
};

/**
 * Canvas render loop shared by every graphic on the site.
 * - DPR-aware sizing via ResizeObserver
 * - runs only while on-screen and the tab is visible
 * - prefers-reduced-motion: draws a single static frame (redrawn on resize / pointer)
 * - exposes data-frames on the canvas so automated checks can see the loop is alive
 */
export function useCanvas(draw: (f: Frame) => void, options: Options = {}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  const optsRef = useRef(options);

  useEffect(() => {
    drawRef.current = draw;
    optsRef.current = options;
  });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer: Pointer = { x: -1e4, y: -1e4, inside: false, down: false, lastMove: -Infinity };
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let t = optsRef.current.staticTime ?? 0;
    let frames = 0;
    let onScreen = false;

    const render = (dt: number) => {
      if (w === 0 || h === 0) return;
      const t0 = performance.now();
      drawRef.current({ ctx, w, h, t, dt, pointer, reduced });
      frames += 1;
      canvas.dataset.frames = String(frames);
      // exponential moving average of draw cost (ms) — lets automated checks verify the frame budget
      const cost = performance.now() - t0;
      canvas.dataset.ms = (Number(canvas.dataset.ms || cost) * 0.9 + cost * 0.1).toFixed(2);
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      t += dt;
      render(dt);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduced || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => (onScreen && !document.hidden ? start() : stop());

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      optsRef.current.onResize?.(w, h);
      render(0);
    };

    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onMove = (e: PointerEvent) => {
      toLocal(e);
      pointer.inside = true;
      pointer.lastMove = t;
      if (reduced) render(0);
    };
    const onLeave = () => {
      pointer.inside = false;
      pointer.down = false;
      if (reduced) render(0);
    };
    const onDown = (e: PointerEvent) => {
      toLocal(e);
      pointer.inside = true;
      pointer.down = true;
      pointer.lastMove = t;
      optsRef.current.onPointerDown?.(pointer, t);
      if (reduced) render(0);
    };
    const onUp = () => {
      pointer.down = false;
      // touch has no hover: release the pointer so idle animation resumes
      if (reduced) render(0);
    };
    const onCancel = () => onLeave();

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointercancel", onCancel);
    window.addEventListener("pointerup", onUp);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    canvas.dataset.ready = "1";

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return ref;
}

/** Read a CSS custom property from :root, with fallback (SSR-safe). */
export function cssVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}
