"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Stagger, staggerItem, FadeInUp } from "@/components/ui/AnimatedText";
import { Badge } from "@/components/ui/Badge";

const myReviews = [
  {
    cafe: "Elm & Grove",
    area: "Al Olaya",
    rating: 5,
    text:
      "Easily my favorite quiet spot in Riyadh. The window booth is unbeatable for deep work, and the pour-over rivals anything in the city.",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=400&q=80",
    date: "2 days ago",
  },
  {
    cafe: "Mira Roastery",
    area: "Al Hamra",
    rating: 4,
    text:
      "Beautiful roastery, fast Wi-Fi, only knock is that it gets lively after 4pm — would still recommend in the mornings.",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=400&q=80",
    date: "1 week ago",
  },
];

const pending = [
  {
    cafe: "North Pour",
    area: "Al Malqa",
    image:
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=400&q=80",
    when: "Yesterday · 4h session",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <Topbar
        title="Reviews"
        subtitle="Your voice helps the next remote worker pick the right spot."
      />

      <FadeInUp>
        <div className="mb-8 grid gap-3 md:grid-cols-3">
          {[
            { label: "Reviews", value: "24" },
            { label: "Avg rating", value: "4.7" },
            { label: "Helpful votes", value: "182" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5"
            >
              <p className="text-[11px] uppercase tracking-wider text-ink-400">
                {s.label}
              </p>
              <p className="mt-1 text-3xl font-semibold gradient-text">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </FadeInUp>

      {pending.length > 0 && (
        <>
          <h2 className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-400">
            Waiting for your review
          </h2>
          <div className="mb-10 grid gap-3 md:grid-cols-2">
            {pending.map((p) => (
              <motion.div
                key={p.cafe}
                whileHover={{ y: -2 }}
                className="ring-gradient relative flex items-center gap-4 overflow-hidden rounded-2xl bg-ink-900/40 p-4"
              >
                <Image
                  src={p.image}
                  width={64}
                  height={64}
                  alt={p.cafe}
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="text-[14px] font-semibold">{p.cafe}</p>
                  <p className="text-[12px] text-ink-300">
                    {p.area} · {p.when}
                  </p>
                </div>
                <button className="btn-gradient rounded-lg px-3.5 py-2 text-[12px] font-medium text-white">
                  Leave review
                </button>
              </motion.div>
            ))}
          </div>
        </>
      )}

      <h2 className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-400">
        Recently posted
      </h2>
      <Stagger className="grid gap-3">
        {myReviews.map((r) => (
          <motion.article
            key={r.cafe}
            variants={staggerItem}
            className="flex gap-5 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5"
          >
            <Image
              src={r.image}
              width={84}
              height={84}
              alt={r.cafe}
              className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-[15px] font-semibold">{r.cafe}</h3>
                  <p className="text-[12px] text-ink-400">
                    {r.area} · {r.date}
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < r.rating
                          ? "fill-amber-300 text-amber-300"
                          : "text-ink-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-200">
                {r.text}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Badge tone="info">Verified visit</Badge>
                <Badge>Helpful · 24</Badge>
              </div>
            </div>
          </motion.article>
        ))}
      </Stagger>
    </>
  );
}
