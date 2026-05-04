"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Wifi, MapPin, Volume2, Search, SlidersHorizontal } from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import { cafes } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Stagger, staggerItem } from "@/components/ui/AnimatedText";
import { useReservations } from "@/components/booking/ReservationsProvider";
import { cn } from "@/lib/utils";

const filters = ["All", "Quiet", "Meeting", "Late night", "Roastery", "Bakery", "Affordable", "Premium"];

export default function DiscoverPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const { openReserve } = useReservations();

  const list = cafes.filter((c) => {
    const matchesFilter =
      filter === "All" || c.tags.includes(filter) || c.tags.includes(filter as never);
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || c.name.toLowerCase().includes(q) || c.area.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  return (
    <>
      <Topbar
        title="Discover cafés"
        subtitle="Hand-picked, verified workspaces across the city."
      />

      <div className="sticky top-[88px] z-30 -mx-8 mb-6 border-y border-ink-100/[0.06] bg-ink-950/70 px-8 py-4 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, district or amenity"
              className="h-10 w-full rounded-xl border border-ink-100/[0.06] bg-ink-100/[0.03] pl-9 pr-3 text-[13px] text-ink-100 placeholder:text-ink-400 focus:border-ink-100/20 focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
            />
          </div>
          <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-ink-100/[0.06] bg-ink-100/[0.03] px-3 text-[13px] text-ink-200 hover:text-ink-100">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative rounded-full border px-3.5 py-1.5 text-[12px] transition-colors",
                filter === f
                  ? "border-transparent text-white"
                  : "border-ink-100/[0.06] text-ink-300 hover:border-ink-100/20 hover:text-ink-100"
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="discoverFilter"
                  className="absolute inset-0 rounded-full bg-brand-gradient"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>
      </div>

      <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => (
          <motion.article
            key={c.id}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group relative overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/50 transition-shadow duration-300 hover:border-ink-100/[0.14] hover:shadow-glow"
          >
            <div className="relative h-52 overflow-hidden">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div className="absolute left-3 top-3 flex gap-2">
                {c.tags.slice(0, 2).map((t) => (
                  <Badge key={t} tone="brand">
                    {t}
                  </Badge>
                ))}
              </div>
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-ink-100/10 bg-ink-950/70 px-2.5 py-1 text-[12px] text-ink-100 backdrop-blur">
                <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                {c.rating}
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <Link
                    href={`/dashboard/cafes/${c.id}`}
                    className="text-[18px] font-semibold tracking-[-0.01em] hover:underline"
                  >
                    {c.name}
                  </Link>
                  <p className="mt-0.5 flex items-center gap-1 text-[12px] text-ink-200">
                    <MapPin className="h-3 w-3" />
                    {c.area}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-semibold">
                    {c.pricePerHour}
                    <span className="text-[10px] font-normal text-ink-300">
                      {" "}SAR/hr
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3 text-[12px] text-ink-300">
                <span className="flex items-center gap-1.5">
                  <Wifi className="h-3.5 w-3.5 text-brand-teal" />
                  {c.wifi}
                </span>
                <span className="text-ink-100/10">•</span>
                <span className="flex items-center gap-1.5">
                  <Volume2 className="h-3.5 w-3.5 text-brand-teal" />
                  {c.noise}
                </span>
                <span className="text-ink-100/10">•</span>
                <span>
                  {c.seatsAvailable}/{c.seatsTotal} seats
                </span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink-100/5">
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
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-1.5">
                  {c.amenities.slice(0, 2).map((a) => (
                    <Badge key={a}>{a}</Badge>
                  ))}
                </div>
                <button
                  onClick={() => openReserve(c.id)}
                  className="text-[12px] font-medium text-ink-200 transition-colors hover:text-ink-100"
                >
                  Reserve →
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </Stagger>
    </>
  );
}
