"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, MapPin, X, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { getCafeById } from "@/lib/data";
import {
  formatDateRange,
  formatDayLabel,
  nextHalfHour,
  toLocalDatetimeInputValue,
} from "@/lib/utils";

type Props = {
  cafeId: string | null;
  onClose: () => void;
  onCreated: () => void;
};

const durations = [
  { label: "1h", value: 60 },
  { label: "2h", value: 120 },
  { label: "3h", value: 180 },
  { label: "4h", value: 240 },
];

export function ReserveDialog({ cafeId, onClose, onCreated }: Props) {
  const cafe = cafeId ? getCafeById(cafeId) : null;

  const [startInput, setStartInput] = useState(() =>
    toLocalDatetimeInputValue(nextHalfHour())
  );
  const [duration, setDuration] = useState(120);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset to a fresh default each time the dialog opens for a new cafe.
  useEffect(() => {
    if (cafeId) {
      setStartInput(toLocalDatetimeInputValue(nextHalfHour()));
      setDuration(120);
      setError(null);
    }
  }, [cafeId]);

  useEffect(() => {
    if (!cafeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cafeId, onClose]);

  const startDate = useMemo(() => new Date(startInput), [startInput]);

  async function handleConfirm() {
    if (!cafe) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cafeId: cafe.id,
          startAt: startDate.toISOString(),
          durationMinutes: duration,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Failed to reserve");
      }
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {cafe && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-ink-100/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reserve-dialog-title"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-ink-100/[0.10] bg-ink-950 p-6 shadow-glow-lg"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg text-ink-300 transition-colors hover:bg-ink-100/[0.05] hover:text-ink-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-teal">
              Confirm reservation
            </p>
            <h2
              id="reserve-dialog-title"
              className="mt-2 text-[22px] font-semibold tracking-[-0.01em] text-ink-100"
            >
              {cafe.name}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-300">
              <MapPin className="h-3.5 w-3.5" /> {cafe.area}
            </p>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-400">
                  <Calendar className="h-3 w-3" /> When
                </span>
                <input
                  type="datetime-local"
                  value={startInput}
                  onChange={(e) => setStartInput(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-ink-100/[0.08] bg-ink-100/[0.03] px-3.5 text-[13px] text-ink-100 focus:border-ink-100/20 focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
                />
                <span className="mt-1.5 block text-[11px] text-ink-400">
                  {formatDayLabel(startDate)} ·{" "}
                  {formatDateRange(startDate.toISOString(), duration)}
                </span>
              </label>

              <div>
                <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-400">
                  <Clock className="h-3 w-3" /> Duration
                </span>
                <div className="mt-1.5 grid grid-cols-4 gap-2">
                  {durations.map((d) => {
                    const active = d.value === duration;
                    return (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => setDuration(d.value)}
                        className={`relative h-11 rounded-xl border text-[13px] font-medium transition-colors ${
                          active
                            ? "border-transparent bg-brand-gradient text-white"
                            : "border-ink-100/[0.08] bg-ink-100/[0.02] text-ink-200 hover:border-ink-100/20 hover:text-ink-100"
                        }`}
                      >
                        {d.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[12px] text-red-600">
                {error}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-[13px] text-ink-300 transition-colors hover:bg-ink-100/[0.04] hover:text-ink-100"
              >
                Cancel
              </button>
              <Button
                size="md"
                onClick={handleConfirm}
                disabled={submitting}
              >
                <Check className="h-4 w-4" />
                {submitting ? "Reserving…" : "Confirm reservation"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
