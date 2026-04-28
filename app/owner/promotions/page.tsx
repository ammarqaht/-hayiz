"use client";

import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeInUp, Stagger, staggerItem } from "@/components/ui/AnimatedText";
import { Plus, Sparkles, Clock, Users, TrendingUp } from "lucide-react";

const active = [
  {
    title: "Morning focus 9–12",
    sub: "20% off bookings before noon, weekdays.",
    redemptions: 142,
    revenue: 2840,
    days: "Mon — Thu",
    tone: "violet" as const,
  },
  {
    title: "Loyal member perk",
    sub: "Free pour-over on every 5th visit.",
    redemptions: 64,
    revenue: 0,
    days: "Always",
    tone: "blue" as const,
  },
  {
    title: "Bring a friend",
    sub: "Both members get 1 hour free when booking together.",
    redemptions: 38,
    revenue: 720,
    days: "Always",
    tone: "teal" as const,
  },
];

const tones = {
  violet: "from-brand-violet/30 to-brand-violet/0 border-brand-violet/30",
  blue: "from-brand-blue/30 to-brand-blue/0 border-brand-blue/30",
  teal: "from-brand-teal/30 to-brand-teal/0 border-brand-teal/30",
};

export default function PromotionsPage() {
  return (
    <>
      <Topbar
        title="Promotions"
        subtitle="Fill quiet hours and reward your most loyal customers."
      />

      <FadeInUp>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[12px] font-medium uppercase tracking-[0.18em] text-ink-400">
            Active campaigns
          </h2>
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            New promotion
          </Button>
        </div>
      </FadeInUp>

      <Stagger className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {active.map((p) => (
          <motion.div
            key={p.title}
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 ${tones[p.tone]}`}
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gradient opacity-20 blur-3xl" />
            <div className="relative flex items-center justify-between">
              <Sparkles className="h-4 w-4 text-brand-teal" />
              <Badge tone="success" dot>
                Live
              </Badge>
            </div>
            <h3 className="relative mt-4 text-[18px] font-semibold tracking-[-0.01em]">
              {p.title}
            </h3>
            <p className="relative mt-1 text-[13px] text-ink-300">{p.sub}</p>
            <div className="relative mt-5 grid grid-cols-3 gap-3 text-[12px]">
              <div>
                <p className="text-ink-400">Uses</p>
                <p className="mt-0.5 text-[15px] font-semibold">
                  {p.redemptions}
                </p>
              </div>
              <div>
                <p className="text-ink-400">Revenue</p>
                <p className="mt-0.5 text-[15px] font-semibold">
                  SAR {p.revenue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-ink-400">Active</p>
                <p className="mt-0.5 text-[12px]">{p.days}</p>
              </div>
            </div>
            <div className="relative mt-5 flex items-center gap-2">
              <button className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[12px] text-ink-200 transition-colors hover:text-white">
                Edit
              </button>
              <button className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[12px] text-ink-300 transition-colors hover:text-white">
                Pause
              </button>
            </div>
          </motion.div>
        ))}
      </Stagger>

      <FadeInUp delay={0.1}>
        <div className="mt-10 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-6">
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-400">
            <Sparkles className="h-3 w-3 text-brand-teal" />
            HAYIZ suggestions
          </div>
          <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.01em]">
            Three ways to lift Tuesday revenue by ~22%.
          </h3>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              {
                icon: Clock,
                t: "Late night focus",
                s: "Open hot-desks 8pm–11pm with 30% off — based on demand patterns.",
              },
              {
                icon: Users,
                t: "Group of 3+",
                s: "Discount group bookings on slow days to refill booths.",
              },
              {
                icon: TrendingUp,
                t: "Surge pricing for peaks",
                s: "Fri 4–6pm runs hot — try a 10% premium on prime seats.",
              },
            ].map((s) => (
              <div
                key={s.t}
                className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-4"
              >
                <s.icon className="h-4 w-4 text-brand-teal" />
                <p className="mt-2 text-[14px] font-medium">{s.t}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-300">
                  {s.s}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeInUp>
    </>
  );
}
