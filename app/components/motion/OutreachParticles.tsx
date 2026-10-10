"use client";

import { useRef } from "react";
import { useCanvas } from "./useCanvas";

/**
 * Team 3598 specimen: 4,452 particles — one for each student reached by the
 * team's documented outreach. They settle into the team number; the pointer
 * pushes them away and they spring home. Click scatters everything.
 */

const COUNT = 4452;

type Field = {
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  hx: Float32Array;
  hy: Float32Array;
  hue: Uint8Array;
};

function sampleTargets(w: number, h: number, text: string): [number, number][] {
  const c = document.createElement("canvas");
  const S = 2; // sample at half res for speed
  c.width = Math.max(1, Math.round(w / S));
  c.height = Math.max(1, Math.round(h / S));
  const x = c.getContext("2d");
  if (!x) return [];
  const size = Math.min(c.width / (text.length * 0.78), c.height * 0.78);
  x.fillStyle = "#fff";
  x.font = `600 ${size}px "Geist", "Helvetica Neue", Arial, sans-serif`;
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillText(text, c.width / 2, c.height / 2 + size * 0.04);
  const data = x.getImageData(0, 0, c.width, c.height).data;
  const pts: [number, number][] = [];
  for (let yy = 0; yy < c.height; yy++)
    for (let xx = 0; xx < c.width; xx++) if (data[(yy * c.width + xx) * 4 + 3] > 128) pts.push([xx * S, yy * S]);
  return pts;
}

export function OutreachParticles({ className = "" }: { className?: string }) {
  const field = useRef<Field | null>(null);
  const kick = useRef(0);

  const build = (w: number, h: number) => {
    const pts = sampleTargets(w, h, "3598");
    if (pts.length === 0) return;
    const f: Field = field.current ?? {
      x: new Float32Array(COUNT),
      y: new Float32Array(COUNT),
      vx: new Float32Array(COUNT),
      vy: new Float32Array(COUNT),
      hx: new Float32Array(COUNT),
      hy: new Float32Array(COUNT),
      hue: new Uint8Array(COUNT),
    };
    const fresh = !field.current;
    for (let i = 0; i < COUNT; i++) {
      const p = pts[Math.floor((i / COUNT) * pts.length + Math.random() * 3) % pts.length];
      f.hx[i] = p[0] + (Math.random() - 0.5) * 1.6;
      f.hy[i] = p[1] + (Math.random() - 0.5) * 1.6;
      if (fresh) {
        f.x[i] = Math.random() * w;
        f.y[i] = Math.random() * h;
        f.hue[i] = Math.random() < 0.12 ? 1 : 0;
      }
    }
    field.current = f;
  };

  const ref = useCanvas(
    ({ ctx, w, h, t, pointer, reduced }) => {
      const f = field.current;
      ctx.clearRect(0, 0, w, h);
      if (!f) return;
      const R = Math.max(60, Math.min(w, h) * 0.16);
      const R2 = R * R;
      const px = pointer.inside ? pointer.x : -1e4;
      const py = pointer.inside ? pointer.y : -1e4;
      const scatter = kick.current;
      kick.current = 0;

      ctx.fillStyle = "rgba(236,232,223,0.78)";
      const accent: number[] = [];
      for (let i = 0; i < COUNT; i++) {
        if (reduced) {
          f.x[i] = f.hx[i];
          f.y[i] = f.hy[i];
        } else {
          let ax = (f.hx[i] - f.x[i]) * 0.022;
          let ay = (f.hy[i] - f.y[i]) * 0.022;
          const dx = f.x[i] - px;
          const dy = f.y[i] - py;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / R) * 3.2;
            ax += (dx / d) * force;
            ay += (dy / d) * force;
          }
          if (scatter) {
            const a = Math.random() * Math.PI * 2;
            const s = 6 + Math.random() * 14;
            f.vx[i] += Math.cos(a) * s;
            f.vy[i] += Math.sin(a) * s;
          }
          // tiny breathing so the settled shape shimmers
          ax += Math.sin(t * 1.3 + i) * 0.015;
          f.vx[i] = (f.vx[i] + ax) * 0.86;
          f.vy[i] = (f.vy[i] + ay) * 0.86;
          f.x[i] += f.vx[i];
          f.y[i] += f.vy[i];
        }
        if (f.hue[i]) accent.push(i);
        else ctx.fillRect(f.x[i], f.y[i], 1.6, 1.6);
      }
      ctx.fillStyle = "#ff6a2b";
      for (const i of accent) ctx.fillRect(f.x[i], f.y[i], 1.8, 1.8);
    },
    {
      staticTime: 0,
      onResize: (w, h) => {
        build(w, h);
        // re-sample once the display font is ready so the glyphs match the page type
        document.fonts?.ready.then(() => build(w, h));
      },
      onPointerDown: () => {
        kick.current = 1;
      },
    },
  );

  return (
    <div className={`fx fx-particles ${className}`.trim()}>
      <canvas
        ref={ref}
        role="img"
        aria-label="4,452 particles forming the number 3598, one per student reached through outreach. Move the pointer to push them; click to scatter."
      />
      <span className="fx-note fx-note-corner" aria-hidden="true">
        4,452 points · one per student reached · click to scatter
      </span>
    </div>
  );
}
