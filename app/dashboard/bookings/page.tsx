"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/ui/Badge";
import { Stagger, staggerItem } from "@/components/ui/AnimatedText";
import { useReservations } from "@/components/booking/ReservationsProvider";
import { getCafeById, PINNED_CAFE_ID } from "@/lib/data";
import {
  formatDateRange,
  formatDayLabel,
} from "@/lib/utils";
import { CalendarDays, Clock, MapPin, Plus, X } from "lucide-react";
import { useState } from "react";

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
  const { reservations, loading, openReserve, cancelReservation } =
    useReservations();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const now = Date.now();
  const upcoming = reservations.filter(
    (r) => new Date(r.start_at).getTime() + r.duration_minutes * 60_000 >= now
  );

  async function handleCancel(id: string, label: string) {
    if (!window.confirm(`Cancel your reservation at ${label}?`)) return;
    setCancellingId(id);
    await cancelReservation(id);
    setCancellingId(null);
  }

  return (
    <>
      <Topbar
        title="Your bookings"
        subtitle={
          loading
            ? "Loading…"
            : upcoming.length === 0
            ? "No upcoming sessions yet — reserve one to get started."
            : `${upcoming.length} session${
                upcoming.length === 1 ? "" : "s"
              } ahead.`
        }
      />

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[12px] font-medium uppercase tracking-[0.18em] text-ink-400">
          Upcoming
        </h2>
        <button
          onClick={() => openReserve(PINNED_CAFE_ID)}
          className="btn-gradient inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium text-white"
        >
          <Plus className="h-3.5 w-3.5" /> New reservation
        </button>
      </div>

      {upcoming.length === 0 && !loading ? (
        <div className="rounded-2xl border border-dashed border-ink-100/[0.10] bg-ink-100/[0.02] p-10 text-center">
          <p className="text-[14px] text-ink-300">
            You don&apos;t have any upcoming sessions yet.
          </p>
          <button
            onClick={() => openReserve(PINNED_CAFE_ID)}
            className="btn-gradient mt-4 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
          >
            <Plus className="h-3.5 w-3.5" /> Reserve a seat at Elm &amp; Grove
          </button>
        </div>
      ) : (
        <Stagger className="grid gap-3">
          {upcoming.map((b) => {
            const cafe = getCafeById(b.cafe_id);
            if (!cafe) return null;
            return (
              <motion.div
                key={b.id}
                variants={staggerItem}
                whileHover={{ y: -2 }}
                className="group flex items-center gap-5 rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-4 transition-all hover:border-ink-100/[0.14] hover:shadow-soft"
              >
                <Image
                  src={cafe.image}
                  alt={cafe.name}
                  width={84}
                  height={84}
                  className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/cafes/${cafe.id}`}
                      className="truncate text-[15px] font-semibold hover:underline"
                    >
                      {cafe.name}
                    </Link>
                    <Badge
                      tone={b.status === "confirmed" ? "success" : "warning"}
                    >
                      {b.status}
                    </Badge>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-ink-300">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDayLabel(new Date(b.start_at))}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {formatDateRange(b.start_at, b.duration_minutes)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {cafe.area}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/cafes/${cafe.id}`}
                    className="rounded-lg border border-ink-100/10 bg-ink-100/[0.03] px-3 py-1.5 text-[12px] text-ink-200 hover:text-ink-100"
                  >
                    View café
                  </Link>
                  <button
                    onClick={() => handleCancel(b.id, cafe.name)}
                    disabled={cancellingId === b.id}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/[0.06] px-3 py-1.5 text-[12px] font-medium text-red-600 transition-colors hover:bg-red-500/[0.12] disabled:opacity-60"
                  >
                    <X className="h-3.5 w-3.5" />
                    {cancellingId === b.id ? "Cancelling…" : "Cancel"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </Stagger>
      )}

      <h2 className="mb-3 mt-10 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-400">
        History
      </h2>
      <Stagger className="grid gap-3">
        {past.map((b, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="flex items-center gap-5 rounded-2xl border border-ink-100/[0.04] bg-ink-900/30 p-4 opacity-90"
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
            <button className="text-[12px] text-ink-300 hover:text-ink-100">
              Book again →
            </button>
          </motion.div>
        ))}
      </Stagger>
    </>
  );
}
