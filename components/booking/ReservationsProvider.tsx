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

  const value = useMemo(
    () => ({ reservations, loading, refresh, openReserve }),
    [reservations, loading, refresh, openReserve]
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
