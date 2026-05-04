"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Wifi, X, ArrowUpRight, Plus, Minus } from "lucide-react";
import { cafes, type Cafe } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useReservations } from "@/components/booking/ReservationsProvider";
import Link from "next/link";

const districts = [
  { name: "Al Malqa", x: 0.32, y: 0.18 },
  { name: "Al Yasmin", x: 0.38, y: 0.12 },
  { name: "Al Nakheel", x: 0.62, y: 0.28 },
  { name: "Al Olaya", x: 0.42, y: 0.36 },
  { name: "Diplomatic Q.", x: 0.18, y: 0.32 },
  { name: "Al Hamra", x: 0.74, y: 0.4 },
  { name: "Al Sahafah", x: 0.28, y: 0.62 },
  { name: "King Fahd Rd", x: 0.5, y: 0.7 },
  { name: "King Abdullah", x: 0.56, y: 0.5 },
];

export function RiyadhMap() {
  const [selected, setSelected] = useState<Cafe | null>(null);
  const [zoom, setZoom] = useState(1);
  const { openReserve } = useReservations();

  return (
    <div className="relative h-[calc(100vh-180px)] overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/40">
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 50% 40%, rgba(43,91,215,0.18) 0%, transparent 60%), radial-gradient(50% 50% at 30% 70%, rgba(81,50,183,0.18) 0%, transparent 60%)",
        }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{ scale: zoom }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
      >
        <svg
          viewBox="0 0 1000 700"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="rdGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3A1F8C" stopOpacity="1" />
              <stop offset="50%" stopColor="#2B5BD7" stopOpacity="1" />
              <stop offset="100%" stopColor="#3FD1C7" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="rdGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3FD1C7" />
              <stop offset="100%" stopColor="#5132B7" />
            </linearGradient>
            <radialGradient id="pinGlow">
              <stop offset="0%" stopColor="#3FD1C7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3FD1C7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Subtle background blocks (city districts) */}
          {Array.from({ length: 60 }).map((_, i) => {
            const x = (i % 10) * 100 + 20;
            const y = Math.floor(i / 10) * 110 + 20;
            const w = 80 + ((i * 17) % 30);
            const h = 70 + ((i * 13) % 40);
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={w}
                height={h}
                rx="8"
                fill="rgba(17,16,42,0.025)"
                stroke="rgba(17,16,42,0.06)"
              />
            );
          })}

          {/* Major roads */}
          <motion.path
            d="M0 360 Q 250 340 500 380 T 1000 360"
            stroke="url(#rdGrad)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
          <motion.path
            d="M520 0 L 480 700"
            stroke="url(#rdGrad2)"
            strokeWidth="2"
            fill="none"
            strokeOpacity="0.7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.6, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.path
            d="M0 180 Q 400 220 700 160 T 1000 200"
            stroke="rgba(122,231,199,0.35)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.path
            d="M0 540 Q 350 500 650 540 T 1000 520"
            stroke="rgba(122,231,199,0.25)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.6 }}
          />

          {/* District labels */}
          {districts.map((d, i) => (
            <motion.text
              key={d.name}
              x={d.x * 1000}
              y={d.y * 700 - 36}
              textAnchor="middle"
              className="fill-ink-400 font-mono"
              fontSize="10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.05 }}
            >
              {d.name.toUpperCase()}
            </motion.text>
          ))}
        </svg>
      </motion.div>

      {/* Pins (positioned in HTML for easier interaction) */}
      <div className="absolute inset-0">
        {cafes.map((c, i) => (
          <Pin
            key={c.id}
            cafe={c}
            index={i}
            active={selected?.id === c.id}
            onClick={() => setSelected(c)}
          />
        ))}
      </div>

      {/* Top overlay info */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pointer-events-auto rounded-xl border border-ink-100/10 bg-ink-950/70 px-4 py-2.5 text-[12px] backdrop-blur"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-teal" />
            </span>
            <span className="text-ink-100">Live · Riyadh</span>
            <span className="text-ink-400">·</span>
            <span className="text-ink-300">{cafes.length} cafés open now</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pointer-events-auto flex flex-col gap-1.5 rounded-xl border border-ink-100/10 bg-ink-950/70 p-1.5 backdrop-blur"
        >
          <button
            onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-200 transition-colors hover:bg-ink-100/[0.06] hover:text-ink-100"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.85, z - 0.15))}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-200 transition-colors hover:bg-ink-100/[0.06] hover:text-ink-100"
          >
            <Minus className="h-4 w-4" />
          </button>
        </motion.div>
      </div>

      {/* Detail card */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="absolute bottom-5 left-1/2 w-[min(96%,640px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-ink-100/10 bg-ink-900/90 shadow-glow-lg backdrop-blur-xl"
          >
            <div className="flex">
              <div className="relative h-44 w-56 flex-shrink-0 overflow-hidden">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink-900/80" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[18px] font-semibold tracking-[-0.01em]">
                        {selected.name}
                      </h3>
                      <Badge tone="success" dot>
                        {selected.seatsAvailable} open
                      </Badge>
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-[12px] text-ink-300">
                      <MapPin className="h-3 w-3" />
                      {selected.area}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink-300 transition-colors hover:bg-ink-100/5 hover:text-ink-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[12px] text-ink-300">
                  <span className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                    {selected.rating}{" "}
                    <span className="text-ink-400">
                      ({selected.reviews})
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Wifi className="h-3.5 w-3.5 text-brand-teal" />
                    {selected.wifi}
                  </span>
                  <span>· {selected.noise} · {selected.pricePerHour} SAR/hr</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  {selected.amenities.slice(0, 3).map((a) => (
                    <Badge key={a}>{a}</Badge>
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-2 pt-2">
                  <Button size="sm" onClick={() => openReserve(selected.id)}>
                    Reserve seat <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                  <Link
                    href={`/dashboard/cafes/${selected.id}`}
                    className="glass-strong inline-flex h-9 items-center gap-2 rounded-xl border border-ink-100/10 px-3.5 text-[13px] text-ink-100 transition-colors hover:bg-ink-100/[0.06]"
                  >
                    View café
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Pin({
  cafe,
  index,
  active,
  onClick,
}: {
  cafe: Cafe;
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const sold = cafe.seatsAvailable === 0;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 0.6 + index * 0.07,
        type: "spring",
        stiffness: 360,
        damping: 22,
      }}
      whileHover={{ scale: 1.08 }}
      style={{
        left: `${cafe.x * 100}%`,
        top: `${cafe.y * 100}%`,
      }}
      className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
    >
      {/* Pulse ring */}
      {!sold && (
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-teal/30 blur-lg"
        />
      )}
      <span
        className={`relative grid h-10 w-10 place-items-center rounded-full text-[12px] font-semibold text-white transition-all ${
          sold
            ? "bg-ink-300 ring-2 ring-ink-100/10"
            : "bg-gradient-to-br from-brand-violet via-brand-blue to-brand-teal ring-2 ring-ink-100/30 shadow-[0_8px_30px_-6px_rgba(63,209,199,0.6)]"
        } ${active ? "scale-125" : ""}`}
      >
        {sold ? "—" : cafe.seatsAvailable}
        {!sold && (
          <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-brand-teal/40" />
        )}
      </span>

      {/* Hover label */}
      <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-ink-100/10 bg-ink-950/95 px-2 py-0.5 text-[10px] text-ink-100 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
        {cafe.name}
      </span>
    </motion.button>
  );
}
