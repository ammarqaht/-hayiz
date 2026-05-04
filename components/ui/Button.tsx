"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "btn-gradient text-white shadow-[0_8px_28px_-12px_rgba(63,209,199,0.55)] hover:shadow-[0_18px_50px_-12px_rgba(43,91,215,0.6)]",
  secondary:
    "glass-strong text-ink-100 hover:bg-ink-100/[0.06] border border-ink-100/10",
  ghost: "text-ink-200 hover:text-ink-100 hover:bg-ink-100/5",
  outline:
    "ring-gradient text-ink-100 bg-transparent hover:bg-ink-100/[0.04]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium",
          "transition-colors duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 focus-visible:ring-offset-0",
          "disabled:opacity-50 disabled:pointer-events-none",
          sizes[size],
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
