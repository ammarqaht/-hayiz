"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import { cn } from "@/lib/utils";

const events: Record<string, { cafe: string; time: string; tone: string }[]> = {
  "2026-04-28": [
    { cafe: "Elm & Grove", time: "14:00 — 17:00", tone: "violet" },
  ],
  "2026-04-30": [
    { cafe: "North Pour", time: "09:30 — 13:00", tone: "blue" },
  ],
  "2026-05-03": [
    { cafe: "Mira Roastery", time: "10:00 — 12:00", tone: "teal" },
  ],
  "2026-05-07": [
    { cafe: "Atlas Coffee", time: "15:00 — 18:00", tone: "violet" },
  ],
};

const tones: Record<string, string> = {
  violet: "from-brand-violet/40 to-brand-violet/10 ring-brand-violet/40",
  blue: "from-brand-blue/40 to-brand-blue/10 ring-brand-blue/40",
  teal: "from-brand-teal/40 to-brand-teal/10 ring-brand-teal/40",
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function CalendarPage() {
  const [view, setView] = useState(new Date(2026, 3, 1)); // April 2026
  const [selected, setSelected] = useState<string | null>("2026-04-28");

  const year = view.getFullYear();
  const month = view.getMonth();
  const monthName = view.toLocaleString("en-US", { month: "long" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const change = (delta: number) =>
    setView(new Date(year, month + delta, 1));

  return (
    <>
      <Topbar
        title="Calendar"
        subtitle="A focused view of your week."
      />

      <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40">
        <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => change(-1)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-ink-200 transition-colors hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => change(1)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-ink-200 transition-colors hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <h2 className="ml-2 text-[18px] font-semibold">
              {monthName}{" "}
              <span className="text-ink-400">{year}</span>
            </h2>
          </div>
          <button className="btn-gradient inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[12px] font-medium text-white">
            <Plus className="h-3.5 w-3.5" /> New session
          </button>
        </div>

        <div className="grid grid-cols-7 border-b border-white/[0.04] text-[11px] font-mono uppercase tracking-wider text-ink-400">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="px-3 py-2.5">
              {d}
            </div>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${year}-${month}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-7 grid-rows-6"
          >
            {cells.map((d, i) => {
              const key = d
                ? `${year}-${pad(month + 1)}-${pad(d)}`
                : `e-${i}`;
              const ev = d ? events[key] : undefined;
              const isSelected = d && key === selected;
              return (
                <motion.button
                  key={key}
                  onClick={() => d && setSelected(key)}
                  whileHover={d ? { scale: 1.02 } : undefined}
                  className={cn(
                    "relative h-28 border-b border-r border-white/[0.04] p-2 text-left transition-colors",
                    !d && "bg-ink-950/30",
                    d && "hover:bg-white/[0.03]",
                    isSelected && "bg-white/[0.05]"
                  )}
                >
                  {d && (
                    <>
                      <span
                        className={cn(
                          "inline-flex h-6 w-6 items-center justify-center rounded-full text-[12px]",
                          isSelected
                            ? "bg-brand-gradient font-semibold text-white"
                            : "text-ink-200"
                        )}
                      >
                        {d}
                      </span>
                      <div className="mt-2 space-y-1">
                        {ev?.map((e, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.04 * idx + 0.2 }}
                            className={cn(
                              "rounded-md bg-gradient-to-br p-1.5 text-[10px] leading-tight ring-1",
                              tones[e.tone]
                            )}
                          >
                            <p className="font-medium text-white">{e.cafe}</p>
                            <p className="text-ink-200">{e.time}</p>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
