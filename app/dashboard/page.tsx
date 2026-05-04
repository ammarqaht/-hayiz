"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Coffee,
  Clock,
  Sparkles,
  TrendingUp,
  Map as MapIcon,
  Wifi,
} from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import { CountUp } from "@/components/ui/CountUp";
import { Badge } from "@/components/ui/Badge";
import { Stagger, staggerItem, FadeInUp } from "@/components/ui/AnimatedText";
import { useReservations } from "@/components/booking/ReservationsProvider";
import {
  featured,
  getCafeById,
  PINNED_CAFE_ID,
} from "@/lib/data";
import { formatDateRange, formatDayLabel } from "@/lib/utils";

const stats = [
  { label: "Hours focused", value: 28, suf: "h", icon: Clock },
  { label: "Cafés visited", value: 12, icon: Coffee },
  { label: "Avg Wi-Fi", value: 92, suf: " mbps", icon: Wifi },
  { label: "HAYIZ score", value: 4.9, dec: 1, icon: Sparkles },
];

export default function CustomerDashboardPage() {
  const { reservations, openReserve } = useReservations();
  const pinnedCafe = getCafeById(PINNED_CAFE_ID);
  const now = Date.now();
  const upcoming = reservations.filter(
    (r) => new Date(r.start_at).getTime() + r.duration_minutes * 60_000 >= now
  );

  return (
    <>
      <Topbar
        title="Good afternoon, Ammar"
        subtitle={
          upcoming.length === 0
            ? "Reserve your first seat to get started."
            : `${upcoming.length} session${
                upcoming.length === 1 ? "" : "s"
              } ahead — ${pinnedCafe?.name ?? ""} is your favorite.`
        }
      />

      {/* Hero card */}
      <FadeInUp>
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/50">
          <motion.div
            aria-hidden
            animate={{
              background: [
                "radial-gradient(60% 70% at 0% 0%, rgba(81,50,183,0.45), transparent 60%)",
                "radial-gradient(60% 70% at 100% 100%, rgba(63,209,199,0.45), transparent 60%)",
                "radial-gradient(60% 70% at 0% 0%, rgba(81,50,183,0.45), transparent 60%)",
              ],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          />
          <div className="relative grid gap-8 p-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <Badge tone="brand" dot>
                Your favorite
              </Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.01em] md:text-4xl">
                Reserve at{" "}
                <span className="gradient-text">
                  {pinnedCafe?.name ?? "Elm & Grove"}
                </span>{" "}
                —{" "}
                <span className="text-ink-200">
                  {pinnedCafe?.seatsAvailable ?? 8} quiet seats open now.
                </span>
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-300">
                {pinnedCafe?.area ?? "Al Olaya"} · ★ {pinnedCafe?.rating ?? 4.9}{" "}
                · {pinnedCafe?.amenities.slice(0, 3).join(" · ")}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openReserve(PINNED_CAFE_ID)}
                  className="btn-gradient inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-medium text-white"
                >
                  Reserve a seat <ArrowUpRight className="h-4 w-4" />
                </button>
                <Link
                  href={`/dashboard/cafes/${PINNED_CAFE_ID}`}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-ink-100/10 bg-ink-100/[0.03] px-5 text-sm text-ink-100 transition-colors hover:bg-ink-100/[0.06]"
                >
                  <MapIcon className="h-4 w-4 text-brand-teal" />
                  View café
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-ink-100/10">
              <Image
                src={
                  pinnedCafe?.image ??
                  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80"
                }
                alt={pinnedCafe?.name ?? "Elm & Grove"}
                width={900}
                height={600}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 rounded-lg border border-ink-100/10 bg-ink-950/70 px-3 py-1.5 text-[12px] text-ink-100 backdrop-blur">
                {pinnedCafe?.seatsAvailable ?? 8} /{" "}
                {pinnedCafe?.seatsTotal ?? 24} seats
              </div>
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* Stats */}
      <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={staggerItem}
            className="group relative overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-5 transition-colors hover:border-ink-100/[0.12]"
          >
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-gradient opacity-[0.08] blur-2xl transition-opacity group-hover:opacity-25" />
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-ink-400">
                {s.label}
              </span>
              <s.icon className="h-4 w-4 text-brand-teal" />
            </div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">
              <CountUp
                to={s.value}
                decimals={s.dec ?? 0}
                suffix={s.suf ?? ""}
              />
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +12% this week
            </div>
          </motion.div>
        ))}
      </Stagger>

      {/* Two columns */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <FadeInUp>
          <div className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40">
            <div className="flex items-center justify-between border-b border-ink-100/[0.06] px-6 py-5">
              <div>
                <h3 className="text-[15px] font-semibold">Upcoming sessions</h3>
                <p className="text-[12px] text-ink-400">
                  {upcoming.length === 0
                    ? "Nothing scheduled yet"
                    : `${upcoming.length} confirmed`}
                </p>
              </div>
              <Link
                href="/dashboard/bookings"
                className="text-[12px] text-ink-200 hover:text-ink-100"
              >
                View all →
              </Link>
            </div>
            {upcoming.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-[13px] text-ink-300">
                  Book a seat at {pinnedCafe?.name ?? "your café"} and it&apos;ll
                  show up here.
                </p>
                <button
                  onClick={() => openReserve(PINNED_CAFE_ID)}
                  className="btn-gradient mt-4 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[12px] font-medium text-white"
                >
                  Reserve a seat
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-ink-100/[0.04]">
                {upcoming.slice(0, 4).map((b, i) => {
                  const cafe = getCafeById(b.cafe_id);
                  if (!cafe) return null;
                  return (
                    <motion.li
                      key={b.id}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * i, duration: 0.5 }}
                      className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-ink-100/[0.02]"
                    >
                      <Image
                        src={cafe.image}
                        width={56}
                        height={56}
                        alt={cafe.name}
                        className="h-14 w-14 flex-shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/cafes/${cafe.id}`}
                            className="truncate text-[14px] font-medium hover:underline"
                          >
                            {cafe.name}
                          </Link>
                          <Badge
                            tone={
                              b.status === "confirmed" ? "success" : "warning"
                            }
                          >
                            {b.status}
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-[12px] text-ink-300">
                          {formatDayLabel(new Date(b.start_at))} ·{" "}
                          {formatDateRange(b.start_at, b.duration_minutes)} ·{" "}
                          {cafe.area}
                        </p>
                      </div>
                      <Link
                        href={`/dashboard/cafes/${cafe.id}`}
                        className="rounded-lg border border-ink-100/10 bg-ink-100/[0.03] px-3 py-1.5 text-[12px] text-ink-200 opacity-0 transition-all group-hover:opacity-100 hover:text-ink-100"
                      >
                        Manage
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            )}
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40">
            <div className="border-b border-ink-100/[0.06] px-6 py-5">
              <h3 className="text-[15px] font-semibold">For you, today</h3>
              <p className="text-[12px] text-ink-400">
                Picked from your favorite areas
              </p>
            </div>
            <ul className="divide-y divide-ink-100/[0.04]">
              {featured.slice(0, 4).map((c, i) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i, duration: 0.45 }}
                  className="group flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-ink-100/[0.02]"
                >
                  <Image
                    src={c.image}
                    width={44}
                    height={44}
                    alt={c.name}
                    className="h-11 w-11 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/dashboard/cafes/${c.id}`}
                      className="block truncate text-[13px] font-medium hover:underline"
                    >
                      {c.name}
                    </Link>
                    <p className="truncate text-[11px] text-ink-300">
                      {c.area} · {c.seatsAvailable} seats · ★ {c.rating}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/cafes/${c.id}`}
                    aria-label={`View ${c.name}`}
                  >
                    <ArrowUpRight className="h-4 w-4 text-ink-400 transition-colors group-hover:text-brand-teal" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </FadeInUp>
      </div>
    </>
  );
}
