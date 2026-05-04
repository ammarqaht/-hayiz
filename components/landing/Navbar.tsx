"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "#how", label: "How it works" },
  { href: "#cafes", label: "Cafés" },
  { href: "#benefits", label: "Benefits" },
  { href: "/owner", label: "For café owners" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(250,250,253,0)", "rgba(250,250,253,0.78)"]
  );
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(14px)"]);
  const border = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(17,16,42,0.10)"]
  );

  return (
    <motion.header
      style={{
        backgroundColor: bg,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        borderColor: border,
      }}
      className="fixed top-0 z-50 w-full border-b"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-lg px-3.5 py-2 text-[13px] text-ink-200 transition-colors hover:text-ink-100"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="hidden rounded-lg px-3 py-2 text-[13px] text-ink-200 transition-colors hover:text-ink-100 md:inline-block"
          >
            Sign in
          </Link>
          <Link href="/dashboard">
            <Button size="sm">
              Open app <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
