"use client";

import { motion } from "framer-motion";

type Pt = { label: string; v: number };

export function AreaChart({
  data,
  height = 220,
}: {
  data: Pt[];
  height?: number;
}) {
  const w = 720;
  const h = height;
  const pad = { l: 36, r: 12, t: 16, b: 28 };
  const max = Math.max(...data.map((d) => d.v)) * 1.15;
  const stepX = (w - pad.l - pad.r) / (data.length - 1);
  const yFor = (v: number) =>
    pad.t + (1 - v / max) * (h - pad.t - pad.b);

  const points = data.map((d, i) => ({
    x: pad.l + i * stepX,
    y: yFor(d.v),
    v: d.v,
    label: d.label,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    h - pad.b
  } L ${points[0].x} ${h - pad.b} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3FD1C7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#3FD1C7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="areaLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5132B7" />
          <stop offset="50%" stopColor="#2B5BD7" />
          <stop offset="100%" stopColor="#3FD1C7" />
        </linearGradient>
      </defs>

      {/* Y grid */}
      {[0.25, 0.5, 0.75, 1].map((p) => (
        <line
          key={p}
          x1={pad.l}
          x2={w - pad.r}
          y1={pad.t + p * (h - pad.t - pad.b)}
          y2={pad.t + p * (h - pad.t - pad.b)}
          stroke="rgba(17,16,42,0.06)"
        />
      ))}

      <motion.path
        d={areaPath}
        fill="url(#areaFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke="url(#areaLine)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {points.map((p, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + i * 0.05 }}
        >
          <circle cx={p.x} cy={p.y} r="3.5" fill="#0B0A18" />
          <circle cx={p.x} cy={p.y} r="3.5" fill="url(#areaLine)" opacity="0.9" />
        </motion.g>
      ))}

      {points.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={h - 8}
          textAnchor="middle"
          className="fill-ink-400"
          fontSize="10"
          fontFamily="ui-monospace"
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
}

export function BarChart({ data, height = 200 }: { data: Pt[]; height?: number }) {
  const w = 720;
  const h = height;
  const pad = { l: 24, r: 12, t: 12, b: 28 };
  const max = Math.max(...data.map((d) => d.v)) * 1.1;
  const innerW = w - pad.l - pad.r;
  const barW = (innerW / data.length) * 0.55;
  const stepX = innerW / data.length;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3FD1C7" />
          <stop offset="100%" stopColor="#5132B7" />
        </linearGradient>
      </defs>
      {data.map((d, i) => {
        const barH = (d.v / max) * (h - pad.t - pad.b);
        const x = pad.l + i * stepX + (stepX - barW) / 2;
        const y = h - pad.b - barH;
        return (
          <g key={d.label}>
            <motion.rect
              initial={{ y: h - pad.b, height: 0, opacity: 0 }}
              animate={{ y, height: barH, opacity: 1 }}
              transition={{
                delay: 0.05 * i,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              x={x}
              width={barW}
              fill="url(#barFill)"
              rx="6"
            />
            <text
              x={x + barW / 2}
              y={h - 8}
              textAnchor="middle"
              className="fill-ink-400"
              fontSize="10"
              fontFamily="ui-monospace"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Donut({
  data,
  size = 180,
}: {
  data: { name: string; value: number }[];
  size?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = size / 2 - 18;
  const C = 2 * Math.PI * r;
  let offset = 0;
  const colors = ["#5132B7", "#2B5BD7", "#3FD1C7"];

  return (
    <div className="flex items-center gap-6">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-44 w-44">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(17,16,42,0.08)"
          strokeWidth="14"
        />
        {data.map((d, i) => {
          const len = (d.value / total) * C;
          const dash = `${len} ${C - len}`;
          const el = (
            <motion.circle
              key={d.name}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              initial={{ opacity: 0, strokeDasharray: `0 ${C}` }}
              animate={{ opacity: 1, strokeDasharray: dash }}
              transition={{
                delay: 0.2 + i * 0.18,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          );
          offset += len;
          return el;
        })}
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          className="fill-ink-100"
          fontSize="22"
          fontWeight="600"
        >
          {total}%
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          className="fill-ink-400"
          fontSize="10"
          fontFamily="ui-monospace"
        >
          DISTRIBUTION
        </text>
      </svg>
      <ul className="space-y-2 text-[12px]">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: colors[i % colors.length] }}
            />
            <span className="text-ink-200">{d.name}</span>
            <span className="text-ink-400">— {d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
