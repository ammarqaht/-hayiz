"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardList,
  Armchair,
  LineChart,
  Users,
  Megaphone,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/owner", label: "Overview", icon: LayoutDashboard },
  { href: "/owner/reservations", label: "Reservations", icon: ClipboardList },
  { href: "/owner/seats", label: "Seats", icon: Armchair },
  { href: "/owner/analytics", label: "Analytics", icon: LineChart },
  { href: "/owner/customers", label: "Customers", icon: Users },
  { href: "/owner/promotions", label: "Promotions", icon: Megaphone },
  { href: "/owner/settings", label: "Settings", icon: Settings },
];

export function OwnerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[252px] shrink-0 border-r border-ink-100/[0.06] bg-ink-950/70 px-4 py-6 backdrop-blur-xl md:flex md:flex-col">
      <div className="flex items-center gap-2 px-2">
        <Logo />
        <span className="rounded-md border border-ink-100/10 bg-ink-100/[0.04] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink-300">
          Owner
        </span>
      </div>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 px-2 text-[11px] text-ink-400 transition-colors hover:text-ink-200"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to homepage
      </Link>

      <nav className="mt-6 flex flex-1 flex-col gap-1">
        {links.map((l) => {
          const active =
            pathname === l.href ||
            (l.href !== "/owner" && pathname?.startsWith(l.href));
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] transition-colors",
                active
                  ? "text-ink-100"
                  : "text-ink-300 hover:bg-ink-100/[0.03] hover:text-ink-100"
              )}
            >
              {active && (
                <motion.span
                  layoutId="ownerSidebarActive"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                  }}
                  className="absolute inset-0 rounded-xl border border-ink-100/10 bg-ink-100/[0.04] shadow-[inset_0_1px_0_rgba(17,16,42,0.10)]"
                />
              )}
              <l.icon
                className={cn(
                  "relative h-4 w-4",
                  active ? "text-brand-teal" : "text-ink-300"
                )}
              />
              <span className="relative">{l.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="rounded-xl border border-ink-100/[0.06] bg-ink-900/60 p-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient text-[12px] font-semibold text-white">
            EG
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium">Elm &amp; Grove</p>
            <p className="truncate text-[11px] text-ink-400">Al Olaya</p>
          </div>
        </div>
      </div>

      <Link
        href="/dashboard"
        className="mt-3 rounded-xl border border-ink-100/[0.06] p-3 text-center text-[12px] text-ink-300 transition-colors hover:text-ink-100"
      >
        Switch to customer →
      </Link>
    </aside>
  );
}
