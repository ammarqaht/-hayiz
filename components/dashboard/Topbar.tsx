"use client";

import { motion } from "framer-motion";
import { Bell, Search } from "lucide-react";

export function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="sticky top-0 z-40 -mx-8 mb-8 border-b border-white/[0.06] bg-ink-950/60 px-8 py-5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-6">
        <div className="min-w-0">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="truncate text-[22px] font-semibold tracking-[-0.01em]"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-0.5 text-[13px] text-ink-300"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              placeholder="Search cafés, areas, amenities…"
              className="h-10 w-[320px] rounded-xl border border-white/[0.06] bg-white/[0.03] pl-9 pr-3 text-[13px] text-white placeholder:text-ink-400 transition-all focus:w-[400px] focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
            />
          </div>
          <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-ink-200 transition-colors hover:text-white">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-brand-teal shadow-[0_0_8px_rgba(63,209,199,0.8)]" />
          </button>
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] py-1.5 pl-1.5 pr-3.5">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand-gradient text-[11px] font-semibold text-white">
              AS
            </div>
            <div className="hidden text-left md:block">
              <p className="text-[12px] font-medium leading-tight">
                Ammar Salem
              </p>
              <p className="text-[10px] leading-tight text-ink-400">
                HAYIZ Member
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
