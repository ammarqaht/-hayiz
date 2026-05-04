import { NextResponse } from "next/server";
import { sql, type ReservationRow } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Owner-side view: every reservation at this café, regardless of user.
  const { rows } = await sql<ReservationRow>`
    select id, user_id, cafe_id, customer_name, start_at, duration_minutes, status, created_at
    from reservations
    where cafe_id = ${id}
    order by start_at asc
  `;
  return NextResponse.json({ reservations: rows });
}
