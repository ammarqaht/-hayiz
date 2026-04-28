import { cn } from "@/lib/utils";

type Tone = "neutral" | "success" | "warning" | "info" | "brand";

const tones: Record<Tone, string> = {
  neutral: "bg-white/5 text-ink-200 border-white/10",
  success: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  warning: "bg-amber-400/10 text-amber-300 border-amber-400/20",
  info: "bg-sky-400/10 text-sky-300 border-sky-400/20",
  brand:
    "bg-gradient-to-r from-brand-violet/20 via-brand-blue/20 to-brand-teal/20 text-ink-100 border-white/10",
};

export function Badge({
  children,
  tone = "neutral",
  className,
  dot = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        tones[tone],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
