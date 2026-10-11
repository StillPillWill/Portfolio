"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import type { ModelViewerProps, SpinHandle } from "./viewer/types";

/* eslint-disable @next/next/no-img-element -- static fallback frame for the WebGL viewer */

/**
 * Interactive GLB viewer. Server-renders a still render of the model, then
 * swaps in a three.js canvas once the frame scrolls near the viewport — only on
 * screens ≥ 700 px wide with WebGL and without reduced-motion. The page scroll
 * wheel is never captured (zoom is disabled); drag rotates.
 */

type SceneProps = {
  url: string;
  rotation?: [number, number, number];
  spinRef: React.RefObject<SpinHandle>;
  onReady: () => void;
  onError: () => void;
};

export function ModelViewer({ url, still, rotation, label, className = "" }: ModelViewerProps) {
  const [stage, setStage] = useState<"idle" | "loading" | "ready" | "static">("idle");
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null);
  const spinRef = useRef<SpinHandle>({ active: true });
  const hostRef = useRef<HTMLDivElement>(null);

  // Pause auto-spin while dragging.
  useEffect(() => {
    if (stage !== "ready") return;
    const host = hostRef.current;
    if (!host) return;
    let timer: number | undefined;
    const down = () => {
      spinRef.current.active = false;
      window.clearTimeout(timer);
    };
    const up = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => (spinRef.current.active = true), 2400);
    };
    host.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      host.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.clearTimeout(timer);
    };
  }, [stage]);

  // Capability gate + load when near viewport.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || stage !== "idle") return;
    const capable =
      window.matchMedia("(min-width: 700px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      (() => {
        try {
          return !!document.createElement("canvas").getContext("webgl2");
        } catch {
          return false;
        }
      })();
    if (!capable) {
      // one-shot capability decision at mount
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStage("static");
      return;
    }
    let cancelled = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        import("./viewer/ViewerScene")
          .then((mod) => {
            if (cancelled) return;
            setScene(() => mod.default);
            setStage("loading");
          })
          .catch(() => !cancelled && setStage("static"));
      },
      { rootMargin: "200px" },
    );
    io.observe(host);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [stage]);

  const fallback = still;

  return (
    <div ref={hostRef} className={`viewer ${className}`.trim()} data-stage={stage}>
      {(stage === "loading" || stage === "ready") && Scene ? (
        <div className="viewer-canvas">
          <Scene
            url={url}
            rotation={rotation}
            spinRef={spinRef}
            onReady={() => setStage("ready")}
            onError={() => setStage("static")}
          />
        </div>
      ) : null}
      {stage !== "ready" && fallback ? (
        <img className="viewer-still" src={fallback} alt={label} decoding="async" />
      ) : null}
      <div className="viewer-hud" aria-hidden={stage !== "ready"}>
        <span>{label}</span>
        <span>
          {stage === "ready" ? "Drag to rotate" : stage === "loading" ? "Loading model…" : stage === "static" ? "CAD render" : ""}
        </span>
      </div>
    </div>
  );
}
