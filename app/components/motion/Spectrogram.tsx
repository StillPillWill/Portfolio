"use client";

import { useRef } from "react";
import { useCanvas } from "./useCanvas";

/**
 * CSI specimen: a scrolling waterfall of subcarrier amplitude over time.
 * Speech is modelled as syllable-shaped bursts with formant bands; hovering
 * moves the formant band and pressing makes it louder. A simple energy VAD is
 * shown underneath. This is an illustrative simulation, labelled as such.
 */

const ROWS = 52;
const COL = 3;

function color(v: number) {
  // ink -> ember -> signal -> cream
  const c = Math.max(0, Math.min(1, v));
  const r = Math.round(18 + c * 237);
  const g = Math.round(16 + Math.pow(c, 1.6) * 210);
  const b = Math.round(13 + Math.pow(c, 3) * 190);
  return `rgb(${r},${g},${b})`;
}

const SEED = Array.from({ length: ROWS }, (_, i) => (Math.sin(i * 12.9898) * 43758.5453) % 1);

function column(
  c: CanvasRenderingContext2D,
  x: number,
  t: number,
  H: number,
  loud: boolean,
  focus: number,
  driven = false,
) {
  const rowH = H / ROWS;
  // syllable envelope: bursts ~4 Hz, phrases every few seconds
  const phrase = driven ? 1 : Math.max(0, Math.sin(t * 0.9) * 1.4 - 0.2);
  const syll = Math.pow(Math.max(0, Math.sin(t * 13.5) * Math.sin(t * 4.1 + 1)), 0.6);
  const env = Math.min(1, phrase) * syll * (loud ? 1.35 : 1);
  let sum = 0;
  for (let r = 0; r < ROWS; r++) {
    const y = r / (ROWS - 1);
    const f1 = Math.exp(-((y - focus) ** 2) / 0.004);
    const f2 = Math.exp(-((y - focus - 0.22) ** 2) / 0.003) * 0.6;
    const f3 = Math.exp(-((y - focus + 0.18) ** 2) / 0.002) * 0.35;
    const noise = 0.05 + 0.06 * Math.abs(Math.sin(t * 7 + SEED[r] * 40));
    const v = noise + env * (f1 + f2 + f3) * 0.95;
    sum += env * (f1 + f2 + f3);
    c.fillStyle = color(v);
    c.fillRect(x, r * rowH, COL, Math.ceil(rowH));
  }
  return sum / 3;
}

export function Spectrogram({ className = "" }: { className?: string }) {
  const buffer = useRef<HTMLCanvasElement | null>(null);
  const acc = useRef(0);
  const vadEl = useRef<HTMLSpanElement>(null);
  const meter = useRef<HTMLSpanElement>(null);
  const vadState = useRef("");

  const ref = useCanvas(
    ({ ctx, w, h, t, dt, pointer, reduced }) => {
      if (!buffer.current) buffer.current = document.createElement("canvas");
      const buf = buffer.current;
      const bctx = buf.getContext("2d");
      if (!bctx) return;
      const plotH = h;
      if (buf.width !== Math.round(w) || buf.height !== Math.round(plotH)) {
        buf.width = Math.round(w);
        buf.height = Math.round(plotH);
        bctx.fillStyle = color(0.04);
        bctx.fillRect(0, 0, buf.width, buf.height);
        // prefill so the static/first frame is not empty
        for (let x = 0; x < buf.width; x += COL) column(bctx, x, t - (buf.width - x) / 120, buf.height, false, 0.5);
      }

      const hovering = pointer.inside && t - pointer.lastMove < 4;
      const focus = hovering ? Math.max(0, Math.min(1, pointer.y / plotH)) : 0.35 + 0.15 * Math.sin(t * 0.4);

      acc.current += reduced ? 0 : dt * 120;
      let energy = 0;
      while (acc.current >= COL) {
        acc.current -= COL;
        bctx.drawImage(buf, -COL, 0);
        energy = column(bctx, buf.width - COL, t, buf.height, hovering ? pointer.down : false, focus, hovering);
      }
      if (reduced) energy = column(bctx, buf.width - COL, t, buf.height, false, focus, hovering);

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(buf, 0, 0, w, plotH);

      // focus marker
      ctx.strokeStyle = "rgba(236,232,223,0.25)";
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(0, focus * plotH);
      ctx.lineTo(w, focus * plotH);
      ctx.stroke();
      ctx.setLineDash([]);

      if (energy > 0) {
        const speech = energy > 0.24;
        const state = speech ? "speech" : "silence";
        if (vadEl.current && state !== vadState.current) {
          vadState.current = state;
          vadEl.current.textContent = state;
          vadEl.current.dataset.on = speech ? "1" : "0";
        }
        if (meter.current) meter.current.style.transform = `scaleX(${Math.min(1, energy * 1.6).toFixed(3)})`;
      }
    },
    { staticTime: 3.1 },
  );

  return (
    <div className={`fx fx-spectro ${className}`.trim()}>
      <div className="fx-spectro-plot">
        <canvas ref={ref} role="img" aria-label="Animated illustration of speech energy appearing across Wi-Fi subcarriers over time" />
        <span className="fx-axis fx-axis-y" aria-hidden="true">subcarrier</span>
        <span className="fx-axis fx-axis-x" aria-hidden="true">time →</span>
      </div>
      <div className="fx-spectro-foot" aria-hidden="true">
        <span>VAD</span>
        <span className="fx-vad" ref={vadEl} data-on="0">silence</span>
        <span className="fx-meter"><span ref={meter} /></span>
        <span className="fx-note">hover to move the formant · press to speak louder</span>
      </div>
    </div>
  );
}
