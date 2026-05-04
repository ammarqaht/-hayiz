"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export function Card({
  className,
  hoverable = true,
  glow = false,
  ...props
}: HTMLMotionProps<"div"> & { hoverable?: boolean; glow?: boolean }) {
  return (
    <motion.div
      whileHover={
        hoverable
          ? {
              y: -4,
              transition: { type: "spring", stiffness: 280, damping: 22 },
            }
          : undefined
      }
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-ink-100/[0.06] bg-ink-800/40 backdrop-blur-md",
        "transition-shadow duration-300",
        hoverable && "hover:border-ink-100/[0.12] hover:shadow-glow",
        glow && "shadow-glow",
        className
      )}
      {...props}
    />
  );
}

export function CardGlowBorder() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(420px circle at var(--x,50%) var(--y,30%), rgba(63,209,199,0.18), transparent 50%)",
      }}
    />
  );
}
