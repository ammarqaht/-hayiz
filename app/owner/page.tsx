"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Coins,
  CalendarCheck2,
  Users2,
  Star,
  TrendingUp,
} from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import { CountUp } from "@/components/ui/CountUp";
import { Stagger, staggerItem, FadeInUp } from "@/components/ui/AnimatedText";
import { ownerOverview, getCafeById, PINNED_CAFE_ID } from "@/lib/data";
import { AreaChart, BarChart, Donut } from "@/components/owner/Charts";
import { Badge } from "@/components/ui/Badge";
import { formatDayLabel, formatDateRange } from "@/lib/utils";
import type { ReservationRow } from "@/lib/db";

const stats = [
  {
    label: "Today’s revenue",
    value: ownerOverview.todayRevenue,
    prefix: "SAR ",
    icon: Coins,
    delta: "+18%",
  },
  {
    label: "Bookings today",
    value: ownerOverview.todayBookings,
    icon: CalendarCheck2,
    delta: "+9%",
  },
  {
    label: "Occupancy",
    value: ownerOverview.occupancy,
    suffix: "%",
    icon: Users2,
    delta: "+5%",
  },
  {
    label: "Avg rating",
    value: ownerOverview.avgRating,
    decimals: 2,
    icon: Star,
    delta: "+0.1",
  },
];

const toneByStatus: Record<string, "success" | "info" | "warning"> = {
  confirmed: "success",
  "checked-in": "info",
  pending: "warning",
};

export default function OwnerOverviewPage() {
  const cafe = getCafeById(PINNED_CAFE_ID);
  const [reservations, setReservations] = useState<ReservationRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/cafes/${PINNED_CAFE_ID}/reservations`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { reservations: ReservationRow[] }) => {
        if (!cancelled) setReservations(data.reservations ?? []);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Topbar
        title="Welcome back, Elm & Grove"
        subtitle="Today is looking strong — 47 bookings, 78% occupancy by 4pm."
      />

      <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={staggerItem}
            className="group relative overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-5 transition-colors hover:border-ink-100/[0.12]"
          >
            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-brand-gradient opacity-[0.08] blur-2xl transition-opacity group-hover:opacity-30" />
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-ink-400">
                {s.label}
              </span>
              <s.icon className="h-4 w-4 text-brand-teal" />
            </div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">
              <CountUp
                to={s.value}
                prefix={s.prefix ?? ""}
                suffix={s.suffix ?? ""}
                decimals={s.decimals ?? 0}
              />
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              {s.delta} vs last week
            </div>
          </motion.div>
        ))}
      </Stagger>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <FadeInUp>
          <div className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-semibold">Weekly revenue</h3>
                <p className="text-[12px] text-ink-400">
                  Last 7 days · in SAR
                </p>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-ink-100/10 bg-ink-100/[0.03] p-1 text-[11px] text-ink-300">
                {["7D", "30D", "QTR"].map((p, i) => (
                  <button
                    key={p}
                    className={`rounded-md px-2 py-1 transition-colors ${
                      i === 0
                        ? "bg-ink-100/[0.07] text-ink-100"
                        : "hover:text-ink-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 h-[260px]">
              <AreaChart
                data={ownerOverview.weeklyRevenue.map((d) => ({
                  label: d.d,
                  v: d.v,
                }))}
              />
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-6">
            <h3 className="text-[15px] font-semibold">Booking channels</h3>
            <p className="text-[12px] text-ink-400">Where today’s bookings came from</p>
            <div className="mt-6">
              <Donut data={ownerOverview.channels} />
            </div>
          </div>
        </FadeInUp>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <FadeInUp>
          <div className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-6">
            <h3 className="text-[15px] font-semibold">Hourly occupancy</h3>
            <p className="text-[12px] text-ink-400">Today · % seats filled</p>
            <div className="mt-5 h-[230px]">
              <BarChart
                data={ownerOverview.hourlyOccupancy.map((d) => ({
                  label: d.h,
                  v: d.v,
                }))}
              />
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40">
            <div className="flex items-center justify-between border-b border-ink-100/[0.06] px-6 py-5">
              <div>
                <h3 className="text-[15px] font-semibold">Live reservations</h3>
                <p className="text-[12px] text-ink-400">Updated in real-time</p>
              </div>
              <Link
                href="/owner/reservations"
                className="text-[12px] text-ink-200 hover:text-ink-100"
              >
                View all <ArrowUpRight className="ml-1 inline h-3 w-3" />
              </Link>
            </div>
            {reservations.length === 0 ? (
              <div className="px-6 py-10 text-center text-[13px] text-ink-300">
                No reservations yet at {cafe?.name ?? "your café"}.
              </div>
            ) : (
              <ul className="divide-y divide-ink-100/[0.04]">
                {reservations.slice(0, 5).map((r, i) => (
                  <motion.li
                    key={r.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    className="flex items-center gap-3 px-6 py-3.5"
                  >
                    <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-brand-gradient text-[11px] font-semibold text-white">
                      {(r.customer_name
                        .split(" ")
                        .filter(Boolean)
                        .map((n) => n[0]?.toUpperCase() ?? "")
                        .slice(0, 2)
                        .join("")) || "?"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium">
                        {r.customer_name}
                      </p>
                      <p className="truncate text-[11px] text-ink-400">
                        {formatDayLabel(new Date(r.start_at))} ·{" "}
                        {formatDateRange(r.start_at, r.duration_minutes)}
                      </p>
                    </div>
                    <Badge tone={toneByStatus[r.status] ?? "neutral"}>
                      {r.status}
                    </Badge>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </FadeInUp>
      </div>
    </>
  );
}
