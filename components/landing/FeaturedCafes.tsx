"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Wifi, Users, MapPin } from "lucide-react";
import { featured } from "@/lib/data";
import { FadeInUp, Stagger, staggerItem } from "@/components/ui/AnimatedText";
import { Badge } from "@/components/ui/Badge";

export function FeaturedCafes() {
  return (
    <section id="cafes" className="relative py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] w-full max-w-5xl rounded-full bg-brand-radial opacity-50 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-6">
        <FadeInUp>
          <div className="mb-14 flex items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-brand-teal">
                Featured cafés
              </p>
              <h2 className="text-4xl font-semibold tracking-[-0.02em] text-balance md:text-5xl">
                Spaces that <span className="gradient-text">feel like home</span>{" "}
                — with the speed of an office.
              </h2>
            </div>
          </div>
        </FadeInUp>

        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <motion.article
              key={c.id}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-900/50 transition-shadow duration-500 hover:border-white/[0.14] hover:shadow-glow"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <div className="absolute left-3 top-3 flex gap-2">
                  {c.tags.slice(0, 2).map((t) => (
                    <Badge key={t} tone="brand">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="absolute right-3 top-3">
                  <div className="flex items-center gap-1 rounded-full border border-white/10 bg-ink-950/70 px-2.5 py-1 text-[12px] text-white backdrop-blur">
                    <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                    {c.rating}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.01em]">
                      {c.name}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-[12px] text-ink-300">
                      <MapPin className="h-3 w-3" />
                      {c.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-[15px] font-semibold text-white">
                      {c.pricePerHour}{" "}
                      <span className="text-[11px] font-normal text-ink-400">
                        SAR/hr
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 text-[12px] text-ink-300">
                  <span className="flex items-center gap-1.5">
                    <Wifi className="h-3.5 w-3.5 text-brand-teal" />
                    {c.wifi}
                  </span>
                  <span className="text-white/10">•</span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-brand-teal" />
                    {c.seatsAvailable} of {c.seatsTotal} seats
                  </span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${(c.seatsAvailable / c.seatsTotal) * 100}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-violet via-brand-blue to-brand-teal"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
