"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Plus, Star, Wifi, Volume2 } from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/ui/Badge";
import { useReservations } from "@/components/booking/ReservationsProvider";
import { getCafeById } from "@/lib/data";
import {
  formatDateRange,
  formatDayLabel,
} from "@/lib/utils";
import { notFound } from "next/navigation";

export default function CafePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const cafe = getCafeById(id);
  const { reservations, openReserve } = useReservations();

  const myUpcoming = useMemo(() => {
    if (!cafe) return [];
    const now = Date.now();
    return reservations.filter(
      (r) =>
        r.cafe_id === cafe.id &&
        new Date(r.start_at).getTime() + r.duration_minutes * 60_000 >= now
    );
  }, [cafe, reservations]);

  if (!cafe) return notFound();

  return (
    <>
      <Topbar title={cafe.name} subtitle={cafe.area} />

      <Link
        href="/dashboard/discover"
        className="mb-5 inline-flex items-center gap-1.5 text-[12px] text-ink-300 transition-colors hover:text-ink-100"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to discover
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/40"
      >
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <Image
            src={cafe.image}
            alt={cafe.name}
            fill
            sizes="(max-width:1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
            {cafe.tags.map((t) => (
              <Badge key={t} tone="brand">
                {t}
              </Badge>
            ))}
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-ink-100/10 bg-ink-950/70 px-2.5 py-1 text-[12px] text-ink-100 backdrop-blur">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {cafe.rating}{" "}
            <span className="text-ink-400">({cafe.reviews})</span>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h1 className="text-[26px] font-semibold tracking-[-0.01em]">
              {cafe.name}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-300">
              <MapPin className="h-3.5 w-3.5" /> {cafe.area}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-ink-300">
              <span className="flex items-center gap-1.5">
                <Wifi className="h-3.5 w-3.5 text-brand-teal" />
                {cafe.wifi} Wi-Fi
              </span>
              <span className="text-ink-100/20">·</span>
              <span className="flex items-center gap-1.5">
                <Volume2 className="h-3.5 w-3.5 text-brand-teal" />
                {cafe.noise}
              </span>
              <span className="text-ink-100/20">·</span>
              <span>
                {cafe.seatsAvailable} / {cafe.seatsTotal} seats open
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {cafe.amenities.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-ink-100/[0.08] bg-ink-100/[0.02] px-3 py-1 text-[11px] text-ink-200"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-stretch justify-between gap-4 rounded-xl border border-ink-100/[0.06] bg-ink-100/[0.02] p-5">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-ink-400">
                Price per hour
              </p>
              <p className="mt-1 text-[24px] font-semibold tracking-tight">
                {cafe.pricePerHour}{" "}
                <span className="text-[12px] font-normal text-ink-400">
                  SAR
                </span>
              </p>
            </div>
            <button
              onClick={() => openReserve(cafe.id)}
              className="btn-gradient inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium text-white"
            >
              <Plus className="h-4 w-4" /> Reserve a seat
            </button>
          </div>
        </div>
      </motion.div>

      <section className="mt-8">
        <h2 className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-400">
          Your bookings here
        </h2>
        {myUpcoming.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-100/[0.10] bg-ink-100/[0.02] p-8 text-center">
            <p className="text-[13px] text-ink-300">
              You don&apos;t have a reservation at {cafe.name} yet.
            </p>
            <button
              onClick={() => openReserve(cafe.id)}
              className="btn-gradient mt-4 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
            >
              <Plus className="h-3.5 w-3.5" /> Reserve a seat
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-ink-100/[0.04] overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/40">
            {myUpcoming.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <div>
                  <p className="text-[14px] font-medium">
                    {formatDayLabel(new Date(b.start_at))} ·{" "}
                    {formatDateRange(b.start_at, b.duration_minutes)}
                  </p>
                  <p className="text-[12px] text-ink-400">
                    {b.duration_minutes / 60}h · {b.status}
                  </p>
                </div>
                <Badge tone={b.status === "confirmed" ? "success" : "warning"}>
                  {b.status}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
