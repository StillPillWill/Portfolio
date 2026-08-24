/**
 * Deterministic CSI-style waveform with a slow scan sweep. Path generation is
 * seeded (LCG), so the SVG markup is byte-identical between server render and
 * client hydration. The sweep is CSS-only and collapses under reduced motion.
 */

const W = 520;
const H = 56;
const MID = H / 2;

function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => ((s = (Math.imul(1664525, s) + 1013904223) >>> 0) / 4294967296);
}

function buildPath(seed: number, baseStep: number): string {
  const rand = lcg(seed);
  const parts: string[] = [];
  let y = MID;
  let burstLeft = 0;

  for (let x = 0; x <= W; ) {
    const step = baseStep * (0.75 + rand() * 0.5);

    if (burstLeft <= 0 && rand() < 0.09) {
      burstLeft = 3 + Math.floor(rand() * 7); // signal burst segment
    }

    const amp = burstLeft > 0 ? 16 : 5.5;
    y += (rand() - 0.5) * amp;
    y = Math.max(5, Math.min(H - 5, y));

    parts.push(`${x === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
    x += step;
    if (burstLeft > 0) burstLeft -= 1;
  }

  return parts.join(" ");
}

const PRIMARY = buildPath(20260822, 4.2);
const SECONDARY = buildPath(99173, 7.4);

export function Waveform({ className = "" }: { className?: string }) {
  return (
    <div className={`wave-block ${className}`.trim()}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Decorative channel-state information style waveform"
      >
        <line className="wave-baseline" x1="0" y1={MID} x2={W} y2={MID} />
        <path className="wave-line-secondary" d={SECONDARY} />
        <path className="wave-line" d={PRIMARY} />
      </svg>
      <span className="wave-sweep" aria-hidden="true" />
    </div>
  );
}
