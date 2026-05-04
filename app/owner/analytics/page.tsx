"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { AreaChart, BarChart, Donut } from "@/components/owner/Charts";
import { CountUp } from "@/components/ui/CountUp";
import { FadeInUp, Stagger, staggerItem } from "@/components/ui/AnimatedText";
import { ownerOverview } from "@/lib/data";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const ranges = ["7D", "30D", "90D", "YTD"];

const kpis = [
  { label: "Revenue", value: 38420, prefix: "SAR ", delta: 18.4, up: true },
  { label: "Bookings", value: 482, delta: 12.1, up: true },
  { label: "Avg session", value: 2.6, suffix: "h", decimals: 1, delta: -3.2, up: false },
  { label: "Repeat rate", value: 64, suffix: "%", delta: 6.8, up: true },
];

const top = [
  { name: "Window booth · 2", v: 92 },
  { name: "Quiet · 4", v: 78 },
  { name: "Booth · A", v: 64 },
  { name: "Counter · 7", v: 58 },
  { name: "Quiet · 9", v: 49 },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState("30D");

  return (
    <>
      <Topbar
        title="Analytics"
        subtitle="Understand demand, revenue, and how customers actually use your space."
      />

      <div className="mb-5 inline-flex items-center gap-1 rounded-xl border border-ink-100/[0.06] bg-ink-100/[0.02] p-1 text-[12px]">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={cn(
              "relative rounded-lg px-3 py-1.5 transition-colors",
              range === r ? "text-white" : "text-ink-300 hover:text-ink-100"
            )}
          >
            {range === r && (
              <motion.span
                layoutId="analyticsRange"
                className="absolute inset-0 rounded-lg bg-brand-gradient"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{r}</span>
          </button>
        ))}
      </div>

      <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {kpis.map((k) => (
          <motion.div
            key={k.label}
            variants={staggerItem}
            className="relative overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-5"
          >
            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-brand-gradient opacity-[0.08] blur-2xl" />
            <p className="text-[11px] uppercase tracking-wider text-ink-400">
              {k.label}
            </p>
            <p className="mt-1.5 text-3xl font-semibold tracking-tight">
              <CountUp
                to={k.value}
                prefix={k.prefix ?? ""}
                suffix={k.suffix ?? ""}
                decimals={k.decimals ?? 0}
              />
            </p>
            <div
              className={cn(
                "mt-2 flex items-center gap-1 text-[11px]",
                k.up ? "text-emerald-300" : "text-rose-300"
              )}
            >
              {k.up ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {Math.abs(k.delta)}% vs prev period
            </div>
          </motion.div>
        ))}
      </Stagger>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <FadeInUp>
          <div className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-semibold">Revenue trend</h3>
                <p className="text-[12px] text-ink-400">SAR per day</p>
              </div>
            </div>
            <div className="mt-5 h-[280px]">
              <AreaChart
                data={ownerOverview.weeklyRevenue.map((d) => ({
                  label: d.d,
                  v: d.v,
                }))}
                height={280}
              />
            </div>
          </div>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-6">
            <h3 className="text-[15px] font-semibold">Channel split</h3>
            <p className="text-[12px] text-ink-400">Bookings by source</p>
            <div className="mt-6">
              <Donut data={ownerOverview.channels} />
            </div>
          </div>
        </FadeInUp>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <FadeInUp>
          <div className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-6">
            <h3 className="text-[15px] font-semibold">Hourly occupancy</h3>
            <p className="text-[12px] text-ink-400">% seats filled today</p>
            <div className="mt-5 h-[230px]">
              <BarChart
                data={ownerOverview.hourlyOccupancy.map((d) => ({
                  label: d.h,
                  v: d.v,
                }))}
                height={230}
              />
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-6">
            <h3 className="text-[15px] font-semibold">Top seats</h3>
            <p className="text-[12px] text-ink-400">Bookings this period</p>
            <ul className="mt-5 space-y-3">
              {top.map((t, i) => (
                <li key={t.name}>
                  <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                    <span className="text-ink-200">{t.name}</span>
                    <span className="font-mono text-ink-400">{t.v}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-ink-100/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.v}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.08 * i,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-violet via-brand-blue to-brand-teal"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeInUp>
      </div>
    </>
  );
}
