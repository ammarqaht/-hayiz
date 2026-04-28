import { Topbar } from "@/components/dashboard/Topbar";
import { RiyadhMap } from "@/components/dashboard/RiyadhMap";

export default function MapPage() {
  return (
    <>
      <Topbar
        title="Map · Riyadh"
        subtitle="Real-time seat availability across 240+ cafés."
      />
      <RiyadhMap />
    </>
  );
}
