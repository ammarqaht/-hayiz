import { sql } from "@vercel/postgres";

export { sql };

export type ReservationRow = {
  id: string;
  user_id: string;
  cafe_id: string;
  start_at: string;
  duration_minutes: number;
  status: "confirmed" | "pending" | "cancelled";
  created_at: string;
};

export const CURRENT_USER_ID = "me";
