"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { FadeInUp } from "@/components/ui/AnimatedText";

type Seat = {
  id: string;
  zone: "Quiet" | "Window" | "Booth" | "Counter";
  status: "available" | "occupied" | "reserved" | "offline";
};

const initial: Seat[] = Array.from({ length: 24 }).map((_, i) => {
  const zones: Seat["zone"][] = ["Quiet", "Window", "Booth", "Counter"];
  const statuses: Seat["status"][] = [
    "available",
    "available",
    "occupied",
    "reserved",
    "offline",
    "available",
  ];
  return {
    id: `S-${(i + 1).toString().padStart(2, "0")}`,
    zone: zones[i % zones.length],
    status: statuses[(i * 3) % statuses.length],
  };
});

const statusColor: Record<Seat["status"], string> = {
  available:
    "bg-emerald-400/10 border-emerald-400/30 text-emerald-300 hover:bg-emerald-400/15",
  occupied:
    "bg-rose-400/10 border-rose-400/30 text-rose-300",
  reserved:
    "bg-amber-400/10 border-amber-400/30 text-amber-300",
  offline:
    "bg-ink-700/40 border-white/10 text-ink-400",
};

const statusDot: Record<Seat["status"], string> = {
  available: "bg-emerald-400",
  occupied: "bg-rose-400",
  reserved: "bg-amber-400",
  offline: "bg-ink-500",
};

export default function SeatsPage() {
  const [seats, setSeats] = useState(initial);

  const cycle = (id: string) => {
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const order: Seat["status"][] = [
          "available",
          "reserved",
          "occupied",
          "offline",
        ];
        const idx = order.indexOf(s.status);
        return { ...s, status: order[(idx + 1) % order.length] };
      })
    );
  };

  const counts = seats.reduce(
    (acc, s) => ({ ...acc, [s.status]: (acc[s.status] || 0) + 1 }),
    {} as Record<Seat["status"], number>
  );

  return (
    <>
      <Topbar
        title="Seats"
        subtitle="Toggle seat status, configure zones, and keep your floor real-time."
      />

      <FadeInUp>
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {(["available", "reserved", "occupied", "offline"] as const).map(
            (k) => (
              <div
                key={k}
                className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5"
              >
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-400">
                  <span
                    className={cn("h-1.5 w-1.5 rounded-full", statusDot[k])}
                  />
                  {k}
                </div>
                <p className="mt-1 text-3xl font-semibold gradient-text">
                  {counts[k] ?? 0}
                </p>
                <p className="text-[11px] text-ink-400">
                  of {seats.length} total
                </p>
              </div>
            )
          )}
        </div>
      </FadeInUp>

      <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-semibold">Floor plan</h3>
            <p className="text-[12px] text-ink-400">
              Click a seat to cycle its status.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-ink-300">
            {(
              ["available", "reserved", "occupied", "offline"] as const
            ).map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className={cn("h-1.5 w-1.5 rounded-full", statusDot[s])} />
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 md:grid-cols-6 lg:grid-cols-8">
          {seats.map((s, i) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.02 * i,
                type: "spring",
                stiffness: 300,
                damping: 22,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => cycle(s.id)}
              className={cn(
                "group relative aspect-square rounded-2xl border p-3 text-left transition-colors",
                statusColor[s.status]
              )}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-400">
                {s.zone}
              </span>
              <p className="mt-1 text-[15px] font-semibold text-white">
                {s.id}
              </p>
              <span
                className={cn(
                  "absolute bottom-2.5 right-2.5 h-2 w-2 rounded-full",
                  statusDot[s.status]
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-2.5 right-2.5 h-2 w-2 animate-ping rounded-full opacity-50",
                  statusDot[s.status]
                )}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <FadeInUp delay={0.1}>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-semibold">Auto-release</h3>
              <Badge tone="success" dot>
                Active
              </Badge>
            </div>
            <p className="mt-1.5 text-[12px] text-ink-300">
              No-show seats are released automatically after 15 minutes.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-semibold">Quiet hours</h3>
              <Badge>09:00 — 13:00</Badge>
            </div>
            <p className="mt-1.5 text-[12px] text-ink-300">
              Quiet zone seats are prioritized during this window.
            </p>
          </div>
        </div>
      </FadeInUp>
    </>
  );
}
