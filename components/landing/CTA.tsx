"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FadeInUp } from "@/components/ui/AnimatedText";

export function CTA() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInUp>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/50 p-12 md:p-20">
            <motion.div
              aria-hidden
              animate={{
                background: [
                  "radial-gradient(60% 80% at 0% 100%, rgba(81,50,183,0.55), transparent 70%)",
                  "radial-gradient(60% 80% at 100% 0%, rgba(63,209,199,0.55), transparent 70%)",
                  "radial-gradient(60% 80% at 0% 100%, rgba(81,50,183,0.55), transparent 70%)",
                ],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
            <div className="relative max-w-2xl">
              <h2 className="text-4xl font-semibold tracking-[-0.02em] text-balance md:text-5xl">
                Your seat is waiting.{" "}
                <span className="gradient-text">Let’s find it.</span>
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-300">
                Join 18,000+ remote professionals who book through HAYIZ every
                month. No subscriptions. Pay only for the hours you sit.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/dashboard">
                  <Button size="lg">
                    Open the app <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/owner">
                  <Button size="lg" variant="secondary">
                    For café owners
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
