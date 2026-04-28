"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/ui/Badge";
import { Stagger, staggerItem } from "@/components/ui/AnimatedText";
import { upcomingBookings } from "@/lib/data";
import { CalendarDays, Clock, MapPin } from "lucide-react";

const past = [
  {
    cafe: "Atlas Coffee Co.",
    area: "King Abdullah Rd",
    date: "Apr 24 · Wed",
    time: "10:00 — 14:30",
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=400&q=80",
  },
  {
    cafe: "Mira Roastery",
    area: "Al Hamra",
    date: "Apr 21 · Sun",
    time: "09:00 — 12:00",
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=400&q=80",
  },
  {
    cafe: "Sand & Salt",
    area: "Al Yasmin",
    date: "Apr 18 · Thu",
    time: "13:00 — 17:00",
    status: "no-show",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80",
  },
];

export default function BookingsPage() {
  return (
    <>
      <Topbar
        title="Your bookings"
        subtitle="Three sessions ahead, eight in your history."
      />

      <h2 className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-400">
        Upcoming
      </h2>
      <Stagger className="grid gap-3">
        {upcomingBookings.map((b) => (
          <motion.div
            key={b.id}
            variants={staggerItem}
            whileHover={{ y: -2 }}
            className="group flex items-center gap-5 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-4 transition-all hover:border-white/[0.14] hover:shadow-soft"
          >
            <Image
              src={b.image}
              alt={b.cafe}
              width={84}
              height={84}
              className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-[15px] font-semibold">{b.cafe}</h3>
                <Badge tone={b.status === "confirmed" ? "success" : "warning"}>
                  {b.status}
                </Badge>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-ink-300">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {b.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {b.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {b.area} · {b.seat}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] text-ink-200 hover:text-white">
                Reschedule
              </button>
              <button className="btn-gradient rounded-lg px-3 py-1.5 text-[12px] font-medium text-white">
                Check in
              </button>
            </div>
          </motion.div>
        ))}
      </Stagger>

      <h2 className="mb-3 mt-10 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-400">
        History
      </h2>
      <Stagger className="grid gap-3">
        {past.map((b, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="flex items-center gap-5 rounded-2xl border border-white/[0.04] bg-ink-900/30 p-4 opacity-90"
          >
            <Image
              src={b.image}
              alt={b.cafe}
              width={64}
              height={64}
              className="h-16 w-16 flex-shrink-0 rounded-xl object-cover grayscale"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-[14px] font-medium">{b.cafe}</h3>
                <Badge tone={b.status === "completed" ? "info" : "warning"}>
                  {b.status}
                </Badge>
              </div>
              <p className="mt-1 text-[12px] text-ink-400">
                {b.date} · {b.time} · {b.area}
              </p>
            </div>
            <button className="text-[12px] text-ink-300 hover:text-white">
              Book again →
            </button>
          </motion.div>
        ))}
      </Stagger>
    </>
  );
}
