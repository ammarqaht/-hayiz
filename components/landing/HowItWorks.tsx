"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck2, Coffee } from "lucide-react";
import { FadeInUp, Stagger, staggerItem } from "@/components/ui/AnimatedText";

const steps = [
  {
    icon: Search,
    title: "Discover",
    body:
      "Browse hand-picked cafés near you with verified Wi-Fi, noise level and seat availability — updated live.",
  },
  {
    icon: CalendarCheck2,
    title: "Book in seconds",
    body:
      "Pick your seat, choose your hours, and lock it in. Pay later — only for the time you actually use.",
  },
  {
    icon: Coffee,
    title: "Walk in & work",
    body:
      "Skip the line with a one-tap check-in. Your seat is waiting, with your usual order ready to go.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInUp>
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-brand-teal">
              How it works
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.02em] text-balance md:text-5xl">
              From craving caffeine to{" "}
              <span className="gradient-text">deep focus</span>, in under a
              minute.
            </h2>
          </div>
        </FadeInUp>

        <Stagger className="grid gap-4 md:grid-cols-3" staggerChildren={0.12}>
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-7 transition-all duration-500 hover:border-ink-100/[0.14]"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-gradient opacity-[0.12] blur-2xl transition-opacity duration-500 group-hover:opacity-30" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100/[0.04] ring-1 ring-ink-100/10">
                  <s.icon className="h-5 w-5 text-brand-teal" />
                </div>
                <span className="text-[12px] font-mono text-ink-400">
                  0{i + 1}
                </span>
              </div>
              <h3 className="relative mt-6 text-2xl font-semibold tracking-[-0.01em]">
                {s.title}
              </h3>
              <p className="relative mt-2 text-[14px] leading-relaxed text-ink-300">
                {s.body}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
