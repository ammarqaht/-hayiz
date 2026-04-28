import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const cols = [
  {
    title: "Product",
    links: [
      ["Discover", "/dashboard/discover"],
      ["Map", "/dashboard/map"],
      ["For owners", "/owner"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "#"],
      ["Press", "#"],
      ["Careers", "#"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Blog", "#"],
      ["Help center", "#"],
      ["Status", "#"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-5">
        <div className="col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink-300">
            HAYIZ — workspace booking for the curious, the focused and the
            caffeinated.
          </p>
          <p className="mt-6 text-[12px] text-ink-400">
            Made in Riyadh · © {new Date().getFullYear()} HAYIZ
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
              {c.title}
            </p>
            <ul className="space-y-2">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[13px] text-ink-200 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
