"use client";

import { useRef } from "react";
import { useCanvas } from "./useCanvas";

/**
 * Ender3-2 specimen: the 12 × 18 bilinear bed-leveling mesh the machine
 * probes, drawn in isometric 3D with exaggerated Z. On view, a probe sweeps
 * the grid point by point (as G29 does). Hover moves the nozzle and reads the
 * bilinear-interpolated Z under it; drag tilts the view.
 * The surface is an illustrative warp profile, not the machine's measured mesh.
 */

const NX = 12;
const NY = 18;
const BED_X = 585;
const BED_Y = 775;

// smooth plausible warp (mm): saddle + bowl + slight twist
function warp(u: number, v: number) {
  return (
    0.22 * Math.sin(u * Math.PI) * Math.sin(v * Math.PI * 0.9) -
    0.16 * (u - 0.5) * (v - 0.5) * 4 +
    0.08 * Math.cos(u * 5 + v * 3) -
    0.05
  );
}
const MESH: number[][] = Array.from({ length: NY }, (_, j) =>
  Array.from({ length: NX }, (_, i) => +warp(i / (NX - 1), j / (NY - 1)).toFixed(3)),
);

function bilinear(u: number, v: number) {
  const x = Math.max(0, Math.min(NX - 1.0001, u * (NX - 1)));
  const y = Math.max(0, Math.min(NY - 1.0001, v * (NY - 1)));
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = x - i;
  const fy = y - j;
  const a = MESH[j][i] * (1 - fx) + MESH[j][i + 1] * fx;
  const b = MESH[j + 1][i] * (1 - fx) + MESH[j + 1][i + 1] * fx;
  return a * (1 - fy) + b * fy;
}

function zColor(z: number, a = 1) {
  // -0.3..0.3 mm  -> cool cream to signal orange
  const c = Math.max(0, Math.min(1, (z + 0.3) / 0.6));
  const r = Math.round(120 + c * 135);
  const g = Math.round(130 + (1 - Math.abs(c - 0.5) * 2) * 40 - c * 40);
  const b = Math.round(150 - c * 110);
  return `rgba(${r},${g},${b},${a})`;
}

export function BedMesh({ className = "" }: { className?: string }) {
  const yaw = useRef(-0.62);
  const pitch = useRef(0.92);
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const probeStart = useRef<number | null>(null);
  const read = useRef<HTMLSpanElement>(null);
  const lastRead = useRef(0);
  const nozzle = useRef({ u: 0.5, v: 0.5 });

  const ref = useCanvas(
    ({ ctx, w, h, t, pointer, reduced }) => {
      ctx.clearRect(0, 0, w, h);
      if (probeStart.current === null) probeStart.current = t;

      // drag-to-tilt
      if (pointer.down && pointer.inside) {
        if (!drag.current) drag.current = { x: pointer.x, y: pointer.y, yaw: yaw.current, pitch: pitch.current };
        yaw.current = drag.current.yaw + (pointer.x - drag.current.x) * 0.008;
        pitch.current = Math.max(0.35, Math.min(1.35, drag.current.pitch + (pointer.y - drag.current.y) * 0.006));
      } else {
        drag.current = null;
        if (!pointer.inside && !reduced) yaw.current += Math.sin(t * 0.25) * 0.0009;
      }

      const scale = Math.min(w / 980, h / 860) * 0.78;
      const zx = 900; // z exaggeration (px per mm before scale)
      const cy = Math.cos(yaw.current);
      const sy = Math.sin(yaw.current);
      const cp = Math.cos(pitch.current);
      const sp = Math.sin(pitch.current);
      const ox = w / 2;
      const oy = h / 2 + h * 0.04;
      const proj = (u: number, v: number, z: number) => {
        const X = (u - 0.5) * BED_X;
        const Y = (v - 0.5) * BED_Y;
        const rx = X * cy - Y * sy;
        const ry = X * sy + Y * cy;
        return [ox + rx * scale, oy + ry * cp * scale - z * zx * sp * scale * 0.35, ry] as const;
      };

      // bed outline
      ctx.strokeStyle = "rgba(236,232,223,0.14)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]].forEach(([u, v], k) => {
        const [x, y] = proj(u, v, -0.35);
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // probing progress
      const total = NX * NY;
      const elapsed = (t - (probeStart.current ?? 0)) * 26;
      const probed = reduced ? total : Math.min(total, Math.floor(elapsed));
      const sweeping = probed < total;

      // mesh lines (draw in order of grid; serpentine probing like G29)
      const order = (k: number) => {
        const j = Math.floor(k / NX);
        const i = j % 2 === 0 ? k % NX : NX - 1 - (k % NX);
        return [i, j] as const;
      };
      const isProbed = (i: number, j: number) => {
        const k = j * NX + (j % 2 === 0 ? i : NX - 1 - i);
        return k < probed;
      };

      ctx.lineWidth = 1;
      for (let j = 0; j < NY; j++) {
        for (let i = 0; i < NX; i++) {
          if (!isProbed(i, j)) continue;
          const [x, y] = proj(i / (NX - 1), j / (NY - 1), MESH[j][i]);
          if (i + 1 < NX && isProbed(i + 1, j)) {
            const [x2, y2] = proj((i + 1) / (NX - 1), j / (NY - 1), MESH[j][i + 1]);
            ctx.strokeStyle = zColor((MESH[j][i] + MESH[j][i + 1]) / 2, 0.55);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
          if (j + 1 < NY && isProbed(i, j + 1)) {
            const [x2, y2] = proj(i / (NX - 1), (j + 1) / (NY - 1), MESH[j + 1][i]);
            ctx.strokeStyle = zColor((MESH[j][i] + MESH[j + 1][i]) / 2, 0.55);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
          ctx.fillStyle = zColor(MESH[j][i], 0.95);
          ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
        }
      }
      // unprobed points as faint dots on the flat plane
      ctx.fillStyle = "rgba(236,232,223,0.18)";
      for (let k = probed; k < total; k++) {
        const [i, j] = order(k);
        const [x, y] = proj(i / (NX - 1), j / (NY - 1), 0);
        ctx.fillRect(x - 1, y - 1, 2, 2);
      }

      // nozzle target: probe point while sweeping, else pointer (inverse-projected)
      let target = nozzle.current;
      if (sweeping) {
        const [i, j] = order(Math.min(total - 1, probed));
        target = { u: i / (NX - 1), v: j / (NY - 1) };
      } else if (pointer.inside && !pointer.down) {
        // inverse of the planar projection at z=0
        const px = (pointer.x - ox) / scale;
        const py = (pointer.y - oy) / (cp * scale);
        const X = px * cy + py * sy;
        const Y = -px * sy + py * cy;
        target = { u: Math.max(0, Math.min(1, X / BED_X + 0.5)), v: Math.max(0, Math.min(1, Y / BED_Y + 0.5)) };
      } else if (!pointer.inside) {
        target = { u: 0.5 + 0.35 * Math.sin(t * 0.31), v: 0.5 + 0.38 * Math.sin(t * 0.23 + 1) };
      }
      const n = nozzle.current;
      const ease = reduced ? 1 : sweeping ? 0.5 : 0.18;
      n.u += (target.u - n.u) * ease;
      n.v += (target.v - n.v) * ease;
      const z = bilinear(n.u, n.v);
      const [nx, ny] = proj(n.u, n.v, z);
      const bob = sweeping && !reduced ? Math.abs(Math.sin(t * 26 * Math.PI)) * 10 : 0;

      ctx.strokeStyle = "rgba(255,106,43,0.5)";
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(nx, ny - 64);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      ctx.setLineDash([]);
      // nozzle glyph
      ctx.fillStyle = "#ff6a2b";
      ctx.beginPath();
      ctx.moveTo(nx - 7, ny - 22 - bob);
      ctx.lineTo(nx + 7, ny - 22 - bob);
      ctx.lineTo(nx, ny - 8 - bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(nx, ny, 9, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,106,43,0.6)";
      ctx.stroke();

      if (read.current && t - lastRead.current > 0.08) {
        lastRead.current = t;
        const mmX = (n.u * BED_X).toFixed(0).padStart(3, " ");
        const mmY = (n.v * BED_Y).toFixed(0).padStart(3, " ");
        read.current.textContent = sweeping
          ? `G29 probing ${String(probed).padStart(3, " ")}/${total}   X${mmX} Y${mmY}   Z${z >= 0 ? "+" : "−"}${Math.abs(z).toFixed(3)}`
          : `X${mmX} Y${mmY}   Z offset ${z >= 0 ? "+" : "−"}${Math.abs(z).toFixed(3)} mm   (bilinear)`;
      }
    },
    { staticTime: 20 },
  );

  return (
    <div className={`fx fx-mesh ${className}`.trim()}>
      <canvas
        ref={ref}
        role="img"
        aria-label="Interactive 12 by 18 bed-leveling mesh; drag to tilt, hover to read interpolated height"
        onDoubleClick={() => (probeStart.current = null)}
      />
      <span className="fx-hud" ref={read} aria-hidden="true">
        X292 Y388   Z offset +0.000 mm
      </span>
      <span className="fx-note fx-note-corner" aria-hidden="true">
        12 × 18 points · drag to tilt · double-click to re-probe
      </span>
    </div>
  );
}
