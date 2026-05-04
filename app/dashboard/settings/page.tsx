"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { Stagger, staggerItem, FadeInUp } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
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

export default function SettingsPage() {
  const [prefs, setPrefs] = useState({
    quiet: true,
    notifications: true,
    nearby: true,
    weekly: false,
  });

  const sections = [
    {
      title: "Profile",
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name" value="Ammar Salem" />
          <Field label="Email" value="ammarqaht@gmail.com" />
          <Field label="Phone" value="+966 5•• ••• 4421" />
          <Field label="City" value="Riyadh" />
        </div>
      ),
    },
    {
      title: "Workspace preferences",
      content: (
        <div className="grid gap-3">
          <PrefRow
            title="Prefer quiet zones"
            sub="Surface cafés with silent or calm noise levels first."
            on={prefs.quiet}
            onChange={(v) => setPrefs({ ...prefs, quiet: v })}
          />
          <PrefRow
            title="Push notifications"
            sub="Reminders, check-ins and rare deals."
            on={prefs.notifications}
            onChange={(v) => setPrefs({ ...prefs, notifications: v })}
          />
          <PrefRow
            title="Suggest nearby cafés"
            sub="Use location to surface options 10 min from you."
            on={prefs.nearby}
            onChange={(v) => setPrefs({ ...prefs, nearby: v })}
          />
          <PrefRow
            title="Weekly digest email"
            sub="A short summary of your focus week."
            on={prefs.weekly}
            onChange={(v) => setPrefs({ ...prefs, weekly: v })}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Topbar
        title="Settings"
        subtitle="Tune HAYIZ to match how you work."
      />

      <Stagger className="grid gap-6">
        {sections.map((s) => (
          <motion.section
            key={s.title}
            variants={staggerItem}
            className="rounded-2xl border border-ink-100/[0.06] bg-ink-900/40 p-6"
          >
            <h2 className="mb-5 text-[15px] font-semibold">{s.title}</h2>
            {s.content}
          </motion.section>
        ))}
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

function PrefRow({
  title,
  sub,
  on,
  onChange,
}: {
  title: string;
  sub: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-ink-100/[0.04] bg-ink-100/[0.02] p-4">
      <div>
        <p className="text-[14px] font-medium">{title}</p>
        <p className="mt-0.5 text-[12px] text-ink-300">{sub}</p>
      </div>
      <Toggle on={on} onChange={onChange} />
    </div>
  );
}
