"use client";

import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import type { ModelViewerProps, SpinHandle } from "./viewer/types";

/* eslint-disable @next/next/no-img-element -- static WebGL fallback frame, not a content image */

/**
 * Public model viewer. Renders a static fallback frame immediately
 * (SSR-safe), then lazily hydrates a three.js canvas only when:
 *  - the viewport is wide enough (no 3D on small phones),
 *  - WebGL is available,
 *  - reduced motion is off,
 * and the user has interacted with the page (or after 2.5s idle).
 */

const FALLBACKS: Record<string, string> = {
  vulcan: "/portfolio/media/vulcan-hero.webp",
  "ender3-2": "/portfolio/media/ender3-2/full-build.webp",
};

export function ModelViewer({
  url,
  projectKey,
  label,
  hudRight = "3D · interactive",
  className = "",
  style,
}: ModelViewerProps) {
  const [stage, setStage] = useState<"idle" | "loading" | "ready" | "failed">("idle");
  const [progress, setProgress] = useState(0);
  const [Scene, setScene] = useState<ComponentType<{
    url: string;
    spinRef: React.RefObject<SpinHandle>;
    onReady: () => void;
    onError: () => void;
  }> | null>(null);
  const spinRef = useRef<SpinHandle>({ active: true });
  const hostRef = useRef<HTMLDivElement>(null);

  // Pause auto-spin while the user is dragging.
  useEffect(() => {
    if (stage !== "ready") return;
    const host = hostRef.current;
    if (!host) return;
    const down = () => {
      spinRef.current.active = false;
    };
    let timer: number | undefined;
    const up = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        spinRef.current.active = true;
      }, 2600);
    };
    host.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      host.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.clearTimeout(timer);
    };
  }, [stage]);

  // Gate + lazy-load the heavy scene.
  useEffect(() => {
    if (stage !== "idle") return;

    const ok =
      window.matchMedia("(min-width: 700px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      (() => {
        try {
          const c = document.createElement("canvas");
          return !!(
            c.getContext("webgl") ||
            c.getContext("experimental-webgl")
          );
        } catch {
          return false;
        }
      })();

    if (!ok) {
      // One-shot capability gate evaluated at mount (viewport width,
      // reduced motion, WebGL). Runs once; cannot cascade.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStage("failed");
      return;
    }

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      import("./viewer/ViewerScene")
        .then((mod) => {
          if (cancelled) return;
          setScene(() => mod.default);
          setStage("loading");
        })
        .catch(() => setStage("failed"));
    };

    const t = window.setTimeout(start, 2500);
    const kick = () => {
      window.clearTimeout(t);
      start();
    };
    window.addEventListener("pointerdown", kick, { once: true });
    return () => {
      cancelled = true;
      window.clearTimeout(t);
      window.removeEventListener("pointerdown", kick);
    };
  }, [stage]);

  // Fake-but-honest progress while the chunk + GLB stream in.
  useEffect(() => {
    if (stage !== "loading") return;
    const iv = window.setInterval(() => {
      setProgress((p) => (p >= 92 ? 92 : p + Math.max(1, Math.round((92 - p) / 8))));
    }, 140);
    return () => window.clearInterval(iv);
  }, [stage]);

  const showCanvas = stage === "loading" || stage === "ready";

  return (
    <div
      ref={hostRef}
      className={`viewer-frame ${className}`.trim()}
      style={style as CSSProperties}
      data-stage={stage}
    >
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />

      <span className="viewer-hud viewer-hud-tl">{label}</span>
      <span className="viewer-hud viewer-hud-tr">
        {stage === "loading" ? `Loading ${progress}%` : hudRight}
        {stage === "ready" ? " · drag to orbit" : ""}
      </span>

      {showCanvas && Scene ? (
        <div className="viewer-canvas">
          <Scene
            url={url}
            spinRef={spinRef}
            onReady={() => setStage("ready")}
            onError={() => setStage("failed")}
          />
        </div>
      ) : null}

      {stage === "failed" ? (
        <figure className="viewer-fallback">
          {FALLBACKS[projectKey] ? (
            <img src={FALLBACKS[projectKey]} alt="" loading="lazy" decoding="async" />
          ) : null}
          <figcaption>{label}</figcaption>
          <span className="viewer-hint">static view</span>
        </figure>
      ) : (
        stage === "idle" && fallbackImage(projectKey)
      )}
    </div>
  );
}

function fallbackImage(projectKey: string): ReactNode {
  const src = FALLBACKS[projectKey];
  if (!src) return null;
  return (
    <figure className="viewer-fallback">
      <img src={src} alt="" loading="lazy" decoding="async" />
    </figure>
  );
}
