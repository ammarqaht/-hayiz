"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Badge } from "@/components/ui/Badge";
import { reservations } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";
import { Stagger, staggerItem } from "@/components/ui/AnimatedText";
import { Search } from "lucide-react";

const tabs = ["All", "Pending", "Confirmed", "Checked-in"];

const tone: Record<string, "success" | "info" | "warning"> = {
  confirmed: "success",
  "checked-in": "info",
  pending: "warning",
};

export default function ReservationsPage() {
  const [tab, setTab] = useState("All");

  const list = reservations.filter((r) =>
    tab === "All" ? true : r.status === tab.toLowerCase()
  );

  return (
    <>
      <Topbar
        title="Reservations"
        subtitle="Manage today and upcoming bookings."
      />

      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 text-[12px]">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative rounded-lg px-3 py-1.5 transition-colors",
                tab === t ? "text-white" : "text-ink-300 hover:text-white"
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
            placeholder="Search by name, ID…"
            className="h-10 w-[280px] rounded-xl border border-white/[0.06] bg-white/[0.03] pl-9 pr-3 text-[13px] text-white placeholder:text-ink-400 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-900/40">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr_0.8fr_0.8fr] border-b border-white/[0.06] px-6 py-3 text-[10px] font-mono uppercase tracking-wider text-ink-400">
          <div>Customer</div>
          <div>Seat</div>
          <div>Time</div>
          <div>Duration</div>
          <div>Status</div>
          <div className="text-right">Amount</div>
        </div>
        <Stagger className="divide-y divide-white/[0.04]" staggerChildren={0.04}>
          {list.map((r) => (
            <motion.div
              key={r.id}
              variants={staggerItem}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr_0.8fr_0.8fr] items-center px-6 py-3.5"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-brand-gradient text-[11px] font-semibold text-white">
                  {r.customer
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="text-[13px] font-medium">{r.customer}</p>
                  <p className="font-mono text-[11px] text-ink-400">{r.id}</p>
                </div>
              </div>
              <div className="text-[13px] text-ink-200">{r.seat}</div>
              <div className="text-[13px] text-ink-200">{r.time}</div>
              <div className="text-[13px] text-ink-200">{r.duration}</div>
              <div>
                <Badge tone={tone[r.status] ?? "neutral"}>{r.status}</Badge>
              </div>
              <div className="text-right text-[13px] font-medium">
                {formatCurrency(r.amount)}
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </>
  );
}
