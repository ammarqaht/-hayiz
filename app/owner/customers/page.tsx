"use client";

import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { Stagger, staggerItem, FadeInUp } from "@/components/ui/AnimatedText";
import { Badge } from "@/components/ui/Badge";
import { CountUp } from "@/components/ui/CountUp";
import { Heart, Repeat, UserPlus, Users } from "lucide-react";

const customers = [
  {
    name: "Layla Al-Mutairi",
    visits: 28,
    spend: 1860,
    last: "Today",
    favoriteSeat: "Window · 2",
    tier: "Loyal",
  },
  {
    name: "Omar Saeed",
    visits: 19,
    spend: 1240,
    last: "Yesterday",
    favoriteSeat: "Quiet · 4",
    tier: "Loyal",
  },
  {
    name: "Sara Al-Harbi",
    visits: 12,
    spend: 820,
    last: "3 days ago",
    favoriteSeat: "Booth · A",
    tier: "Regular",
  },
  {
    name: "Faisal Tariq",
    visits: 6,
    spend: 410,
    last: "1 week ago",
    favoriteSeat: "Counter · 7",
    tier: "Regular",
  },
  {
    name: "Noura Bin Saleh",
    visits: 2,
    spend: 130,
    last: "2 weeks ago",
    favoriteSeat: "Quiet · 9",
    tier: "New",
  },
];

const stats = [
  { label: "Total customers", value: 1284, icon: Users },
  { label: "New this month", value: 142, icon: UserPlus },
  { label: "Repeat rate", value: 64, suffix: "%", icon: Repeat },
  { label: "Avg loyalty", value: 4.8, decimals: 1, icon: Heart },
];

const tierTone: Record<string, "brand" | "info" | "neutral"> = {
  Loyal: "brand",
  Regular: "info",
  New: "neutral",
};

export default function CustomersPage() {
  return (
    <>
      <Topbar
        title="Customer insights"
        subtitle="Who keeps coming back, what they love, and what they spend."
      />

      <Stagger className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={staggerItem}
            className="relative overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-5"
          >
            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-brand-gradient opacity-[0.08] blur-2xl" />
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-ink-400">
                {s.label}
              </span>
              <s.icon className="h-4 w-4 text-brand-teal" />
            </div>
            <p className="mt-1.5 text-3xl font-semibold tracking-tight">
              <CountUp
                to={s.value}
                suffix={s.suffix ?? ""}
                decimals={s.decimals ?? 0}
              />
            </p>
          </motion.div>
        ))}
      </Stagger>

      <FadeInUp>
        <div className="overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/40">
          <div className="grid grid-cols-[1.6fr_0.7fr_0.9fr_1fr_1fr_0.8fr] border-b border-ink-100/[0.06] px-6 py-3 text-[10px] font-mono uppercase tracking-wider text-ink-400">
            <div>Customer</div>
            <div>Visits</div>
            <div className="text-right">Spend</div>
            <div>Favorite seat</div>
            <div>Last visit</div>
            <div>Tier</div>
          </div>
          <Stagger className="divide-y divide-ink-100/[0.04]" staggerChildren={0.05}>
            {customers.map((c) => (
              <motion.div
                key={c.name}
                variants={staggerItem}
                className="grid grid-cols-[1.6fr_0.7fr_0.9fr_1fr_1fr_0.8fr] items-center px-6 py-3.5 transition-colors hover:bg-ink-100/[0.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient text-[11px] font-semibold text-white">
                    {c.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <p className="text-[13px] font-medium">{c.name}</p>
                </div>
                <div className="text-[13px] text-ink-200">{c.visits}</div>
                <div className="text-right text-[13px] font-medium">
                  SAR {c.spend.toLocaleString()}
                </div>
                <div className="text-[13px] text-ink-200">{c.favoriteSeat}</div>
                <div className="text-[13px] text-ink-300">{c.last}</div>
                <div>
                  <Badge tone={tierTone[c.tier]}>{c.tier}</Badge>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </FadeInUp>
    </>
  );
}
