"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ReserveDialog } from "./ReserveDialog";
import type { ReservationRow } from "@/lib/db";

type Ctx = {
  reservations: ReservationRow[];
  loading: boolean;
  refresh: () => Promise<void>;
  openReserve: (cafeId: string) => void;
  cancelReservation: (id: string) => Promise<boolean>;
};

const ReservationsContext = createContext<Ctx | null>(null);

export function useReservations() {
  const ctx = useContext(ReservationsContext);
  if (!ctx)
    throw new Error("useReservations must be used inside ReservationsProvider");
  return ctx;
}

export function ReservationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reservations, setReservations] = useState<ReservationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogCafeId, setDialogCafeId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/reservations", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { reservations: ReservationRow[] };
      setReservations(data.reservations ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const openReserve = useCallback((cafeId: string) => {
    setDialogCafeId(cafeId);
  }, []);

  const cancelReservation = useCallback(
    async (id: string) => {
      // Optimistic remove so the UI feels snappy.
      setReservations((prev) => prev.filter((r) => r.id !== id));
      const res = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
      if (!res.ok) {
        // Revert by refetching the truth.
        await refresh();
        return false;
      }
      return true;
    },
    [refresh]
  );

  const value = useMemo(
    () => ({
      reservations,
      loading,
      refresh,
      openReserve,
      cancelReservation,
    }),
    [reservations, loading, refresh, openReserve, cancelReservation]
  );

  return (
    <ReservationsContext.Provider value={value}>
      {children}
      <ReserveDialog
        cafeId={dialogCafeId}
        onClose={() => setDialogCafeId(null)}
        onCreated={async () => {
          await refresh();
          setDialogCafeId(null);
        }}
      />
    </ReservationsContext.Provider>
  );
}
