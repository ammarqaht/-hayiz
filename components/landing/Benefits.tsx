"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Gauge, Clock, BadgeCheck, Heart, Zap } from "lucide-react";
import { FadeInUp, Stagger, staggerItem } from "@/components/ui/AnimatedText";
import { CountUp } from "@/components/ui/CountUp";

const items = [
  {
    icon: ShieldCheck,
    title: "Verified spaces",
    body:
      "Every café is reviewed by HAYIZ scouts — Wi-Fi tested, noise mapped, outlets counted.",
  },
  {
    icon: Gauge,
    title: "Real-time seats",
    body:
      "See exactly how many seats are open before you leave the house. No surprises.",
  },
  {
    icon: Clock,
    title: "Pay by the hour",
    body:
      "Reserve a seat without prepaying for the day. Stay 30 minutes or 5 hours.",
  },
  {
    icon: BadgeCheck,
    title: "Status & perks",
    body:
      "Earn HAYIZ status to unlock priority seats, free pour-overs and pop-up events.",
  },
  {
    icon: Heart,
    title: "Your favorites",
    body:
      "Save spots that match your taste. We surface them when you’re nearby.",
  },
  {
    icon: Zap,
    title: "One-tap check-in",
    body:
      "Walk in, tap to start your session, and the timer takes care of the rest.",
  },
];

const stats = [
  { v: 240, suf: "+", label: "Cafés in Riyadh" },
  { v: 18000, suf: "+", label: "Seats booked monthly" },
  { v: 4.82, dec: 2, label: "Avg. café rating" },
  { v: 92, suf: " mbps", label: "Avg. verified Wi-Fi" },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInUp>
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-brand-teal">
              Why HAYIZ
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.02em] text-balance md:text-5xl">
              Designed for the <span className="gradient-text">deep work</span>{" "}
              hours of your day.
            </h2>
          </div>
        </FadeInUp>

        <Stagger className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <motion.div
              key={it.title}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-6 transition-all duration-500 hover:border-ink-100/[0.12] hover:bg-ink-900/60"
            >
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-gradient opacity-[0.08] blur-2xl transition-opacity group-hover:opacity-25" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100/[0.04] ring-1 ring-ink-100/10">
                <it.icon className="h-5 w-5 text-brand-teal" />
              </div>
              <h3 className="relative mt-5 text-[17px] font-semibold">
                {it.title}
              </h3>
              <p className="relative mt-1.5 text-[13.5px] leading-relaxed text-ink-300">
                {it.body}
              </p>
            </motion.div>
          ))}
        </Stagger>

        <FadeInUp delay={0.1}>
          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-100/10 bg-ink-100/5 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="relative bg-ink-900/70 p-7 backdrop-blur"
              >
                <div className="text-3xl font-semibold tracking-tight md:text-4xl">
                  <CountUp
                    to={s.v}
                    decimals={s.dec ?? 0}
                    suffix={s.suf ?? ""}
                    className="gradient-text"
                  />
                </div>
                <div className="mt-1 text-[12px] uppercase tracking-wider text-ink-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
