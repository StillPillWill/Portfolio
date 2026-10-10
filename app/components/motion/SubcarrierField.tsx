"use client";

import { useRef } from "react";
import { useCanvas, type Pointer } from "./useCanvas";

/**
 * Hero graphic: a stack of OFDM subcarrier traces. The pointer acts as an
 * acoustic source — traces near it pick up a phase disturbance that falls off
 * with distance, the way vibration couples into a Wi-Fi channel. Click/tap
 * launches a pulse that propagates outward. When idle, a phantom source drifts
 * across the field so the piece is alive on touch devices too.
 */

type Pulse = { x: number; y: number; t0: number };

const LINES = 34;
const STEP = 5;

export function SubcarrierField({ className = "" }: { className?: string }) {
  const pulses = useRef<Pulse[]>([]);
  const hud = useRef<HTMLSpanElement>(null);
  const lastHud = useRef(0);
  const nextAuto = useRef(1.2);

  const source = (p: Pointer, t: number, w: number, h: number) => {
    const idle = !p.inside || t - p.lastMove > 3.5;
    if (!idle) return { x: p.x, y: p.y, gain: 1, idle };
    // phantom source on a slow lissajous
    return {
      x: w * (0.62 + 0.26 * Math.sin(t * 0.23)),
      y: h * (0.5 + 0.32 * Math.sin(t * 0.37 + 1.3)),
      gain: 0.75,
      idle,
    };
  };

  const ref = useCanvas(
    ({ ctx, w, h, t, pointer }) => {
      ctx.clearRect(0, 0, w, h);
      const src = source(pointer, t, w, h);

      // auto pulses while idle
      if (src.idle && t > nextAuto.current) {
        pulses.current.push({ x: src.x, y: src.y, t0: t });
        nextAuto.current = t + 2.4 + Math.random() * 1.6;
      }
      pulses.current = pulses.current.filter((p) => t - p.t0 < 3.2);

      const top = h * 0.08;
      const gap = (h * 0.84) / (LINES - 1);
      const R = Math.max(140, Math.min(w, h) * 0.34);
      const speed = Math.max(w, h) * 0.42;
      let hudLine = -1;
      let hudPhase = 0;
      let best = Infinity;

      for (let i = 0; i < LINES; i++) {
        const y0 = top + i * gap;
        const k = 0.006 + (i % 7) * 0.0009;
        const phase0 = i * 1.37;
        let energy = 0;
        ctx.beginPath();
        for (let x = 0; x <= w + STEP; x += STEP) {
          // carrier ripple — tiny, always present
          let dy = Math.sin(x * k + t * 0.9 + phase0) * 1.1;
          // continuous "voice" coupling from the source
          const dx = x - src.x;
          const dyS = y0 - src.y;
          const d = Math.sqrt(dx * dx + dyS * dyS);
          const fall = Math.exp(-d / R) * src.gain;
          const voice = Math.sin(d * 0.045 - t * 5.2) * (0.6 + 0.4 * Math.sin(t * 1.7 + i * 0.3));
          dy += voice * fall * gap * 0.9;
          // propagating pulses
          for (const p of pulses.current) {
            const age = t - p.t0;
            const pd = Math.hypot(x - p.x, y0 - p.y);
            const front = pd - age * speed;
            const env = Math.exp(-(front * front) / 900) * Math.exp(-age * 1.1);
            dy += Math.sin(front * 0.08) * env * gap * 1.6;
          }
          energy += Math.abs(dy);
          if (x === 0) ctx.moveTo(x, y0 + dy);
          else ctx.lineTo(x, y0 + dy);
        }
        const e = Math.min(1, energy / ((w / STEP) * gap * 0.22));
        ctx.lineWidth = 1 + e * 0.6;
        ctx.strokeStyle = e > 0.08 ? `rgba(255, 106, 43, ${0.18 + e * 0.75})` : `rgba(236, 232, 223, 0.13)`;
        ctx.stroke();

        const dLine = Math.abs(y0 - src.y);
        if (dLine < best) {
          best = dLine;
          hudLine = i;
          hudPhase = Math.sin(dLine * 0.045 - t * 5.2) * Math.exp(-dLine / R) * src.gain * 0.9;
        }
      }

      // source marker
      ctx.beginPath();
      ctx.arc(src.x, src.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 106, 43, 0.95)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(src.x, src.y, 14 + Math.sin(t * 5.2) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 106, 43, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (hud.current && t - lastHud.current > 0.12) {
        lastHud.current = t;
        const sc = String(hudLine * 2 - 33).padStart(3, " ");
        hud.current.textContent = `subcarrier ${sc}   Δφ ${hudPhase >= 0 ? "+" : "−"}${Math.abs(hudPhase).toFixed(2)} rad   ${src.idle ? "idle source" : "pointer source"}`;
      }
    },
    {
      staticTime: 2.2,
      onPointerDown: (p, t) => {
        pulses.current.push({ x: p.x, y: p.y, t0: t });
        if (pulses.current.length > 6) pulses.current.shift();
      },
    },
  );

  return (
    <div className={`fx fx-field ${className}`.trim()}>
      <canvas ref={ref} aria-hidden="true" />
      <span className="fx-hud" ref={hud} aria-hidden="true">
        subcarrier −33   Δφ +0.00 rad
      </span>
    </div>
  );
}
