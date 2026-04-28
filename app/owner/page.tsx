"use client";

import { motion } from "framer-motion";
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
import { ownerOverview, reservations } from "@/lib/data";
import { AreaChart, BarChart, Donut } from "@/components/owner/Charts";
import { Badge } from "@/components/ui/Badge";

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
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5 transition-colors hover:border-white/[0.12]"
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
          <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-semibold">Weekly revenue</h3>
                <p className="text-[12px] text-ink-400">
                  Last 7 days · in SAR
                </p>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1 text-[11px] text-ink-300">
                {["7D", "30D", "QTR"].map((p, i) => (
                  <button
                    key={p}
                    className={`rounded-md px-2 py-1 transition-colors ${
                      i === 0
                        ? "bg-white/[0.07] text-white"
                        : "hover:text-white"
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
          <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-6">
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
          <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-6">
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
          <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
              <div>
                <h3 className="text-[15px] font-semibold">Live reservations</h3>
                <p className="text-[12px] text-ink-400">Updated in real-time</p>
              </div>
              <button className="text-[12px] text-ink-200 hover:text-white">
                View all <ArrowUpRight className="ml-1 inline h-3 w-3" />
              </button>
            </div>
            <ul className="divide-y divide-white/[0.04]">
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
                    {r.customer
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">
                      {r.customer}
                    </p>
                    <p className="truncate text-[11px] text-ink-400">
                      {r.time} · {r.seat} · {r.duration}
                    </p>
                  </div>
                  <Badge tone={toneByStatus[r.status] ?? "neutral"}>
                    {r.status}
                  </Badge>
                </motion.li>
              ))}
            </ul>
          </div>
        </FadeInUp>
      </div>
    </>
  );
}
