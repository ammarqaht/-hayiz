import { OwnerSidebar } from "@/components/owner/Sidebar";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-ink-950">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(40% 35% at 90% -10%, rgba(63,209,199,0.16), transparent 60%), radial-gradient(40% 35% at -10% 110%, rgba(43,91,215,0.18), transparent 60%)",
        }}
      />
      <OwnerSidebar />
      <main className="relative min-w-0 flex-1 px-8 pb-16">{children}</main>
    </div>
  );
}
