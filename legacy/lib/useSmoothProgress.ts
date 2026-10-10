"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function normalizeWheelDelta(deltaY: number, deltaMode: number) {
  const pixels = deltaMode === 1 ? deltaY * 16 : deltaMode === 2 ? deltaY * window.innerHeight : deltaY;
  return Math.min(140, Math.max(-140, pixels));
}

export function useSmoothProgress(initial = 0, response = 6.5) {
  const [progress, setProgress] = useState(initial);
  const progressRef = useRef(initial);
  const targetRef = useRef(initial);
  const renderedRef = useRef(initial);

  useEffect(() => {
    let frame = 0;
    let previous = performance.now();

    const animate = (now: number) => {
      const delta = Math.min(0.05, Math.max(0.001, (now - previous) / 1000));
      previous = now;
      const current = progressRef.current;
      const target = targetRef.current;
      const next = Math.abs(target - current) < 0.00005
        ? target
        : current + (target - current) * (1 - Math.exp(-response * delta));

      progressRef.current = next;
      const reachedTarget = next === target && renderedRef.current !== target;
      if (Math.abs(next - renderedRef.current) > 0.00035 || reachedTarget) {
        renderedRef.current = next;
        setProgress(next);
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [response]);

  const goTo = useCallback((value: number, immediate = false) => {
    const next = clamp01(value);
    targetRef.current = next;
    if (immediate) {
      progressRef.current = next;
      renderedRef.current = next;
      setProgress(next);
    }
  }, []);

  const nudge = useCallback((amount: number) => {
    targetRef.current = clamp01(targetRef.current + amount);
  }, []);

  return { progress, progressRef, targetRef, goTo, nudge };
}
