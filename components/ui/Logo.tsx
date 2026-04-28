import { cn } from "@/lib/utils";

/**
 * HAYIZ · hub brandmark.
 * Renders the Arabic glyph "حيز" with the brand gradient and a subtle
 * "hub" sub-wordmark flanked by two divider lines.
 *
 * Variants:
 *   - "stacked"  : full lockup (glyph + hub) — for hero / splash
 *   - "inline"   : compact horizontal — for navbars / sidebars
 *   - "mark"     : icon only — for avatars / favicons
 */
export function Logo({
  className,
  variant = "inline",
  size,
}: {
  className?: string;
  variant?: "stacked" | "inline" | "mark";
  size?: number;
}) {
  if (variant === "stacked") {
    const h = size ?? 96;
    return (
      <svg
        viewBox="0 0 260 140"
        className={cn(className)}
        style={{ height: h, width: "auto" }}
        aria-label="HAYIZ hub"
        role="img"
      >
        <defs>
          <linearGradient id="hayizGrad" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#3A1F8C" />
            <stop offset="55%" stopColor="#2B5BD7" />
            <stop offset="100%" stopColor="#3FD1C7" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="62"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, 'SF Arabic', 'Segoe UI', sans-serif"
          fontWeight="700"
          fontSize="80"
          fill="url(#hayizGrad)"
          direction="rtl"
        >
          حيز
        </text>
        <line
          x1="40"
          x2="100"
          y1="105"
          y2="105"
          stroke="url(#hayizGrad)"
          strokeWidth="1"
          opacity="0.7"
        />
        <line
          x1="160"
          x2="220"
          y1="105"
          y2="105"
          stroke="url(#hayizGrad)"
          strokeWidth="1"
          opacity="0.7"
        />
        <text
          x="50%"
          y="112"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="400"
          fontSize="22"
          letterSpacing="3"
          fill="#1FA0CF"
        >
          hub
        </text>
      </svg>
    );
  }

  if (variant === "mark") {
    const h = size ?? 32;
    return (
      <svg
        viewBox="0 0 64 64"
        className={cn(className)}
        style={{ height: h, width: h }}
        aria-label="HAYIZ"
        role="img"
      >
        <defs>
          <linearGradient id="hayizMark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3A1F8C" />
            <stop offset="55%" stopColor="#2B5BD7" />
            <stop offset="100%" stopColor="#3FD1C7" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="#0B0A18" />
        <text
          x="32"
          y="44"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, 'SF Arabic', 'Segoe UI', sans-serif"
          fontWeight="700"
          fontSize="36"
          fill="url(#hayizMark)"
          direction="rtl"
        >
          حيز
        </text>
      </svg>
    );
  }

  // inline (default)
  const h = size ?? 34;
  return (
    <div
      className={cn("flex items-center gap-2.5", className)}
      aria-label="HAYIZ hub"
    >
      <svg
        viewBox="0 0 110 56"
        style={{ height: h, width: "auto" }}
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hayizInline" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#3A1F8C" />
            <stop offset="55%" stopColor="#2B5BD7" />
            <stop offset="100%" stopColor="#3FD1C7" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="32"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, 'SF Arabic', 'Segoe UI', sans-serif"
          fontWeight="700"
          fontSize="34"
          fill="url(#hayizInline)"
          direction="rtl"
        >
          حيز
        </text>
        <line
          x1="14"
          x2="38"
          y1="48"
          y2="48"
          stroke="url(#hayizInline)"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <line
          x1="72"
          x2="96"
          y1="48"
          y2="48"
          stroke="url(#hayizInline)"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <text
          x="50%"
          y="52"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="400"
          fontSize="9"
          letterSpacing="2"
          fill="#1FA0CF"
        >
          hub
        </text>
      </svg>
    </div>
  );
}
