"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function wheelPixels(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
  return event.deltaY;
}

export function useKineticJourney(anchors: number[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [settled, setSettled] = useState(true);
  const positionRef = useRef(anchors[0] ?? 0);
  const targetRef = useRef(anchors[0] ?? 0);
  const velocityRef = useRef(0);
  const lastInputRef = useRef(0);
  const pointerRef = useRef<{ id: number; y: number; time: number; samples: Array<{ y: number; time: number }> } | null>(null);
  const activeRef = useRef(0);
  const settledRef = useRef(true);
  const immediateRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const lastDiscreteWheelRef = useRef(0);

  const nearestIndex = useCallback((value: number) => {
    let best = 0;
    let distance = Number.POSITIVE_INFINITY;
    anchors.forEach((anchor, index) => {
      const next = Math.abs(anchor - value);
      if (next < distance) {
        best = index;
        distance = next;
      }
    });
    return best;
  }, [anchors]);

  const commitActive = useCallback((index: number) => {
    if (index !== activeRef.current) {
      activeRef.current = index;
      setActiveIndex(index);
    }
  }, []);

  const commitSettled = useCallback((value: boolean) => {
    if (value !== settledRef.current) {
      settledRef.current = value;
      setSettled(value);
    }
  }, []);

  const goToIndex = useCallback((index: number, immediate = false) => {
    const next = clamp(index, 0, anchors.length - 1);
    targetRef.current = anchors[next];
    lastInputRef.current = performance.now();
    immediateRef.current = immediate;
    if (immediate) {
      positionRef.current = anchors[next];
      velocityRef.current = 0;
      commitActive(next);
      commitSettled(true);
    } else {
      commitSettled(false);
    }
  }, [anchors, commitActive, commitSettled]);

  const setProgress = useCallback((value: number, immediate = false) => {
    const next = clamp(value);
    targetRef.current = next;
    lastInputRef.current = performance.now();
    immediateRef.current = immediate;
    if (immediate) {
      positionRef.current = next;
      velocityRef.current = 0;
      commitActive(nearestIndex(next));
      commitSettled(true);
    } else {
      commitSettled(false);
    }
  }, [commitActive, commitSettled, nearestIndex]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = query.matches;
      if (query.matches) {
        const index = nearestIndex(positionRef.current);
        targetRef.current = anchors[index];
        positionRef.current = anchors[index];
        velocityRef.current = 0;
        commitActive(index);
        commitSettled(true);
      }
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [anchors, commitActive, commitSettled, nearestIndex]);

  useEffect(() => {
    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(1 / 30, Math.max(1 / 240, (now - previous) / 1000));
      previous = now;

      if (reducedMotionRef.current) {
        positionRef.current = targetRef.current;
        velocityRef.current = 0;
        immediateRef.current = false;
      } else if (!immediateRef.current) {
        const omega = window.innerWidth < 700 ? 14 : 12;
        const x = positionRef.current;
        const v = velocityRef.current;
        const acceleration = omega * omega * (targetRef.current - x) - 2 * omega * v;
        const nextVelocity = clamp(v + acceleration * dt, -0.42, 0.42);
        const nextPosition = clamp(x + nextVelocity * dt);
        velocityRef.current = nextVelocity;
        positionRef.current = nextPosition;
      } else {
        immediateRef.current = false;
      }

      const closest = nearestIndex(positionRef.current);
      commitActive(closest);

      const idle = now - lastInputRef.current > 180;
      const closeToAnchor = Math.abs(positionRef.current - anchors[closest]) < 0.018;
      if (idle && Math.abs(targetRef.current - anchors[closest]) < 0.028) {
        targetRef.current = anchors[closest];
      }

      const isSettled = idle && closeToAnchor && Math.abs(velocityRef.current) < 0.012;
      commitSettled(isSettled);

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [anchors, commitActive, commitSettled, nearestIndex]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      const delta = clamp(wheelPixels(event), -120, 120);
      if (reducedMotionRef.current) {
        const now = performance.now();
        if (Math.abs(delta) > 6 && now - lastDiscreteWheelRef.current > 320) {
          lastDiscreteWheelRef.current = now;
          goToIndex(nearestIndex(positionRef.current) + Math.sign(delta), true);
        }
        return;
      }
      targetRef.current = clamp(targetRef.current + delta * 0.00072);
      lastInputRef.current = performance.now();
      commitSettled(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement | null)?.closest("a, button, input, textarea, select")) return;
      const current = nearestIndex(positionRef.current);
      if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goToIndex(current + 1);
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goToIndex(current - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goToIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToIndex(anchors.length - 1);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if ((event.target as HTMLElement | null)?.closest("a, button")) return;
      pointerRef.current = { id: event.pointerId, y: event.clientY, time: performance.now(), samples: [] };
      lastInputRef.current = performance.now();
      commitSettled(false);
    };

    const onPointerMove = (event: PointerEvent) => {
      const pointer = pointerRef.current;
      if (!pointer || pointer.id !== event.pointerId) return;
      const now = performance.now();
      const delta = pointer.y - event.clientY;
      if (reducedMotionRef.current) {
        pointer.samples.push({ y: event.clientY, time: now });
        if (pointer.samples.length > 8) pointer.samples.shift();
        pointer.y = event.clientY;
        pointer.time = now;
        return;
      }
      targetRef.current = clamp(targetRef.current + delta * 0.0011);
      pointer.samples.push({ y: event.clientY, time: now });
      if (pointer.samples.length > 6) pointer.samples.shift();
      pointer.y = event.clientY;
      pointer.time = now;
      lastInputRef.current = now;
    };

    const onPointerUp = (event: PointerEvent) => {
      const pointer = pointerRef.current;
      if (!pointer || pointer.id !== event.pointerId) return;
      const samples = pointer.samples;
      if (reducedMotionRef.current && samples.length > 1) {
        const first = samples[0];
        const last = samples[samples.length - 1];
        if (Math.abs(first.y - last.y) > 36) {
          goToIndex(nearestIndex(positionRef.current) + Math.sign(first.y - last.y), true);
        }
        pointerRef.current = null;
        return;
      }
      if (samples.length > 1) {
        const first = samples[0];
        const last = samples[samples.length - 1];
        const elapsed = Math.max(16, last.time - first.time);
        const release = clamp((first.y - last.y) / elapsed, -2, 2) * 0.022;
        targetRef.current = clamp(targetRef.current + release);
      }
      pointerRef.current = null;
      lastInputRef.current = performance.now();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [anchors.length, commitSettled, goToIndex, nearestIndex]);

  return {
    activeIndex,
    settled,
    positionRef,
    targetRef,
    velocityRef,
    goToIndex,
    setProgress,
  };
}
