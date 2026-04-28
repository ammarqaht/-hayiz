import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-ink-950">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(50% 40% at 80% -10%, rgba(43,91,215,0.18), transparent 60%), radial-gradient(40% 35% at -10% 110%, rgba(81,50,183,0.18), transparent 60%)",
        }}
      />
      <Sidebar />
      <main className="relative min-w-0 flex-1 px-8 pb-16">{children}</main>
    </div>
  );
}
