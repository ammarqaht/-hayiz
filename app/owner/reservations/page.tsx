"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/ui/Badge";
import { getCafeById, PINNED_CAFE_ID } from "@/lib/data";
import {
  cn,
  formatCurrency,
  formatDateRange,
  formatDayLabel,
} from "@/lib/utils";
import { Stagger, staggerItem } from "@/components/ui/AnimatedText";
import { Search } from "lucide-react";
import type { ReservationRow } from "@/lib/db";

const tabs = ["All", "Pending", "Confirmed", "Checked-in"];

const tone: Record<string, "success" | "info" | "warning"> = {
  confirmed: "success",
  "checked-in": "info",
  pending: "warning",
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("") || "?";
}

export default function ReservationsPage() {
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");
  const [reservations, setReservations] = useState<ReservationRow[]>([]);
  const [loading, setLoading] = useState(true);

  const cafe = getCafeById(PINNED_CAFE_ID);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/cafes/${PINNED_CAFE_ID}/reservations`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { reservations: ReservationRow[] }) => {
        if (!cancelled) setReservations(data.reservations ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reservations.filter((r) => {
      const matchesTab =
        tab === "All" ? true : r.status === tab.toLowerCase();
      const matchesQuery =
        !q ||
        r.customer_name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });
  }, [reservations, tab, query]);

  return (
    <>
      <Topbar
        title="Reservations"
        subtitle={
          loading
            ? "Loading…"
            : `${reservations.length} booking${
                reservations.length === 1 ? "" : "s"
              } at ${cafe?.name ?? "your café"}.`
        }
      />

      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-xl border border-ink-100/[0.06] bg-ink-100/[0.02] p-1 text-[12px]">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative rounded-lg px-3 py-1.5 transition-colors",
                tab === t ? "text-white" : "text-ink-300 hover:text-ink-100"
              )}
            >
              {tab === t && (
                <motion.span
                  layoutId="ownerResTab"
                  className="absolute inset-0 rounded-lg bg-brand-gradient"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, ID…"
            className="h-10 w-[280px] rounded-xl border border-ink-100/[0.06] bg-ink-100/[0.03] pl-9 pr-3 text-[13px] text-ink-100 placeholder:text-ink-400 focus:border-ink-100/20 focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-900/40">
        <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.8fr] border-b border-ink-100/[0.06] px-6 py-3 text-[10px] font-mono uppercase tracking-wider text-ink-400">
          <div>Customer</div>
          <div>Time</div>
          <div>Duration</div>
          <div>Status</div>
          <div className="text-right">Amount</div>
        </div>
        {filtered.length === 0 && !loading ? (
          <div className="px-6 py-14 text-center text-[13px] text-ink-300">
            {reservations.length === 0
              ? "No reservations yet. Book one as a customer to see it here."
              : "No reservations match this filter."}
          </div>
        ) : (
          <Stagger
            className="divide-y divide-ink-100/[0.04]"
            staggerChildren={0.04}
          >
            {filtered.map((r) => {
              const hours = r.duration_minutes / 60;
              const amount = (cafe?.pricePerHour ?? 0) * hours;
              return (
                <motion.div
                  key={r.id}
                  variants={staggerItem}
                  whileHover={{ backgroundColor: "rgba(17,16,42,0.03)" }}
                  className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.8fr] items-center px-6 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-brand-gradient text-[11px] font-semibold text-white">
                      {initials(r.customer_name)}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium">
                        {r.customer_name}
                      </p>
                      <p className="font-mono text-[11px] text-ink-400">
                        {r.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-[13px] text-ink-200">
                    {formatDayLabel(new Date(r.start_at))} ·{" "}
                    {formatDateRange(r.start_at, r.duration_minutes)}
                  </div>
                  <div className="text-[13px] text-ink-200">
                    {hours % 1 === 0 ? `${hours}h` : `${hours.toFixed(1)}h`}
                  </div>
                  <div>
                    <Badge tone={tone[r.status] ?? "neutral"}>{r.status}</Badge>
                  </div>
                  <div className="text-right text-[13px] font-medium">
                    {formatCurrency(amount)}
                  </div>
                </motion.div>
              );
            })}
          </Stagger>
        )}
      </div>
    </>
  );
}
