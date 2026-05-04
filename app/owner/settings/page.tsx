"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { Button } from "@/components/ui/Button";
import { Stagger, staggerItem, FadeInUp } from "@/components/ui/AnimatedText";
import { cn } from "@/lib/utils";

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        on ? "bg-brand-gradient" : "bg-ink-100/10"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={cn(
          "absolute top-1 h-4 w-4 rounded-full bg-white shadow",
          on ? "right-1" : "left-1"
        )}
      />
    </button>
  );
}

export default function OwnerSettingsPage() {
  const [autoRelease, setAutoRelease] = useState(true);
  const [acceptWalkins, setAcceptWalkins] = useState(true);
  const [smartPricing, setSmartPricing] = useState(false);

  return (
    <>
      <Topbar
        title="Settings"
        subtitle="Run your café the way you want — HAYIZ adapts."
      />

      <Stagger className="grid gap-6">
        <motion.section
          variants={staggerItem}
          className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-6"
        >
          <h2 className="mb-5 text-[15px] font-semibold">Café profile</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Café name" value="Elm & Grove" />
            <Field label="District" value="Al Olaya, Riyadh" />
            <Field label="Manager" value="Maha Al-Sudairy" />
            <Field label="Contact" value="contact@elm-grove.sa" />
          </div>
        </motion.section>

        <motion.section
          variants={staggerItem}
          className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-6"
        >
          <h2 className="mb-5 text-[15px] font-semibold">Operations</h2>
          <div className="grid gap-3">
            <Row
              t="Auto-release no-shows"
              s="Free seats 15 minutes after a missed check-in."
              on={autoRelease}
              set={setAutoRelease}
            />
            <Row
              t="Accept walk-ins via HAYIZ"
              s="Allow nearby members to claim open seats instantly."
              on={acceptWalkins}
              set={setAcceptWalkins}
            />
            <Row
              t="Smart pricing"
              s="Auto-adjust prices ±15% based on demand."
              on={smartPricing}
              set={setSmartPricing}
            />
          </div>
        </motion.section>

        <motion.section
          variants={staggerItem}
          className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-6"
        >
          <h2 className="mb-5 text-[15px] font-semibold">Payouts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Bank" value="Riyad Bank" />
            <Field label="Account · IBAN" value="SA00 0000 0000 0000 0000 0000" />
            <Field label="Cycle" value="Weekly · Sunday" />
            <Field label="Currency" value="SAR" />
          </div>
        </motion.section>
      </Stagger>

      <FadeInUp delay={0.1}>
        <div className="mt-8 flex items-center justify-end gap-2">
          <Button variant="secondary">Discard</Button>
          <Button>Save changes</Button>
        </div>
      </FadeInUp>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-ink-400">
        {label}
      </span>
      <input
        defaultValue={value}
        className="mt-1.5 h-11 w-full rounded-xl border border-ink-100/[0.06] bg-ink-100/[0.03] px-3.5 text-[13px] text-ink-100 focus:border-ink-100/20 focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
      />
    </label>
  );
}

function Row({
  t,
  s,
  on,
  set,
}: {
  t: string;
  s: string;
  on: boolean;
  set: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-ink-100/[0.04] bg-ink-100/[0.02] p-4">
      <div>
        <p className="text-[14px] font-medium">{t}</p>
        <p className="mt-0.5 text-[12px] text-ink-300">{s}</p>
      </div>
      <Toggle on={on} onChange={set} />
    </div>
  );
}
