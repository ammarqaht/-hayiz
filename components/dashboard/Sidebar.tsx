"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  Compass,
  CalendarDays,
  BookMarked,
  Star,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/map", label: "Map view", icon: Map },
  { href: "/dashboard/discover", label: "Discover", icon: Compass },
  { href: "/dashboard/bookings", label: "Bookings", icon: BookMarked },
  { href: "/dashboard/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/dashboard/reviews", label: "Reviews", icon: Star },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[252px] shrink-0 border-r border-white/[0.06] bg-ink-950/70 px-4 py-6 backdrop-blur-xl md:flex md:flex-col">
      <div className="px-2">
        <Logo />
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
            (l.href !== "/dashboard" && pathname?.startsWith(l.href));
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] transition-colors",
                active
                  ? "text-white"
                  : "text-ink-300 hover:bg-white/[0.03] hover:text-white"
              )}
            >
              {active && (
                <motion.span
                  layoutId="dashSidebarActive"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                  }}
                  className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
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

      <Link
        href="/owner"
        className="ring-gradient relative overflow-hidden rounded-xl p-4 text-[12px] text-ink-200 transition-colors hover:text-white"
      >
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-gradient opacity-20 blur-xl" />
        <p className="relative font-medium text-white">Run a café?</p>
        <p className="relative mt-1 leading-relaxed text-ink-300">
          Switch to the owner workspace and fill empty seats.
        </p>
      </Link>
    </aside>
  );
}
