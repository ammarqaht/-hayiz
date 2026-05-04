"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Wifi } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TypingHeadline, FadeInUp } from "@/components/ui/AnimatedText";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-32 noise">
      {/* Animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-brand-radial" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 grid-bg [mask-image:radial-gradient(60%_50%_at_50%_40%,#000_30%,transparent_75%)]"
        />
        <motion.div
          animate={{
            background: [
              "radial-gradient(40% 40% at 20% 30%, rgba(81,50,183,0.45), transparent 70%)",
              "radial-gradient(40% 40% at 70% 50%, rgba(43,91,215,0.45), transparent 70%)",
              "radial-gradient(40% 40% at 30% 70%, rgba(63,209,199,0.45), transparent 70%)",
              "radial-gradient(40% 40% at 20% 30%, rgba(81,50,183,0.45), transparent 70%)",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeInUp delay={0.1}>
          <div className="mx-auto mb-8 flex w-max items-center gap-2 rounded-full border border-ink-100/10 bg-ink-100/[0.04] px-3.5 py-1.5 text-[12px] text-ink-200 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-teal" />
            </span>
            Now live across Riyadh · 240+ cafés
          </div>
        </FadeInUp>

        <div className="mx-auto max-w-4xl text-center">
          <TypingHeadline
            text="Your next great workspace"
            className="text-5xl leading-[1.04] sm:text-6xl md:text-7xl"
          />
          <TypingHeadline
            text="is one tap away."
            delay={0.6}
            gradient
            className="text-5xl leading-[1.04] sm:text-6xl md:text-7xl"
          />

          <FadeInUp delay={1.1}>
            <p className="mx-auto mt-7 max-w-2xl text-balance text-[17px] leading-relaxed text-ink-300">
              HAYIZ helps remote professionals find, reserve, and check-in to
              the city&apos;s best cafés in seconds. Real-time availability,
              quiet zones, fast Wi-Fi — verified.
            </p>
          </FadeInUp>

          <FadeInUp delay={1.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/dashboard">
                <Button size="lg">
                  Find a workspace <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/owner">
                <Button size="lg" variant="outline">
                  List your café
                </Button>
              </Link>
            </div>
          </FadeInUp>

          <FadeInUp delay={1.5}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-ink-300">
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-brand-teal" />
                Live in 12 districts
              </span>
              <span className="flex items-center gap-2">
                <Wifi className="h-3.5 w-3.5 text-brand-teal" />
                Verified Wi-Fi speeds
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-brand-teal" />
                Curated by locals
              </span>
            </div>
          </FadeInUp>
        </div>

        {/* Hero preview: floating dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="absolute -inset-x-12 -top-10 -bottom-10 rounded-[40px] bg-gradient-to-r from-brand-violet/30 via-brand-blue/30 to-brand-teal/30 opacity-50 blur-3xl" />
          <div className="relative rounded-2xl border border-ink-100/10 bg-ink-900/70 p-2 shadow-glow-lg backdrop-blur-2xl">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
              <span className="ml-3 text-[11px] text-ink-400">
                hayiz.app/dashboard/map
              </span>
            </div>
            <div className="overflow-hidden rounded-xl bg-ink-950">
              <HeroMockup />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroMockup() {
  // tiny stylized preview for the hero
  return (
    <div className="grid h-[420px] grid-cols-12 gap-3 p-4">
      <div className="col-span-3 rounded-xl border border-ink-100/5 bg-ink-900/80 p-3">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-brand-gradient" />
          <div className="h-2.5 w-20 rounded bg-ink-100/10" />
        </div>
        <div className="space-y-1.5">
          {["Dashboard", "Map", "Discover", "Calendar", "Bookings"].map(
            (l, i) => (
              <div
                key={l}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${
                  i === 1
                    ? "bg-ink-100/[0.06] text-ink-100"
                    : "text-ink-300"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                {l}
              </div>
            )
          )}
        </div>
      </div>
      <div className="col-span-9 grid grid-rows-[auto_1fr] gap-3">
        <div className="grid grid-cols-3 gap-3">
          {["Live seats", "Avg Wi-Fi", "Avg rating"].map((s, i) => (
            <div
              key={s}
              className="rounded-xl border border-ink-100/5 bg-ink-900/80 p-3"
            >
              <div className="text-[10px] uppercase tracking-wider text-ink-400">
                {s}
              </div>
              <div className="mt-1 text-2xl font-semibold gradient-text">
                {["1,284", "92 mbps", "4.82"][i]}
              </div>
            </div>
          ))}
        </div>
        <div className="relative overflow-hidden rounded-xl border border-ink-100/5 bg-gradient-to-br from-ink-900 to-ink-950">
          <svg viewBox="0 0 600 240" className="h-full w-full">
            <defs>
              <linearGradient id="hl" x1="0" y1="0" x2="600" y2="0">
                <stop offset="0" stopColor="#5132B7" />
                <stop offset="0.5" stopColor="#2B5BD7" />
                <stop offset="1" stopColor="#3FD1C7" />
              </linearGradient>
            </defs>
            {/* roads */}
            {[40, 100, 160, 220].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="600"
                y2={y}
                stroke="rgba(17,16,42,0.06)"
              />
            ))}
            {[80, 200, 320, 440, 560].map((x) => (
              <line
                key={x}
                x1={x}
                y1="0"
                x2={x}
                y2="240"
                stroke="rgba(17,16,42,0.06)"
              />
            ))}
            {/* path */}
            <motion.path
              d="M40 200 C 140 120, 220 200, 320 90 S 520 60, 560 130"
              stroke="url(#hl)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: "easeInOut", delay: 1.8 }}
            />
            {/* pins */}
            {[
              { x: 120, y: 140, label: "8" },
              { x: 240, y: 90, label: "14" },
              { x: 360, y: 70, label: "3" },
              { x: 480, y: 110, label: "21" },
            ].map((p, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + i * 0.15, type: "spring" }}
              >
                <circle cx={p.x} cy={p.y} r="14" fill="url(#hl)" />
                <text
                  x={p.x}
                  y={p.y + 3}
                  fontSize="10"
                  textAnchor="middle"
                  fill="white"
                  fontWeight="600"
                >
                  {p.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
