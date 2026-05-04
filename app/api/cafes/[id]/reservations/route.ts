import { NextResponse } from "next/server";
import { sql, CURRENT_USER_ID, type ReservationRow } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { rows } = await sql<ReservationRow>`
    select id, user_id, cafe_id, start_at, duration_minutes, status, created_at
    from reservations
    where cafe_id = ${id} and user_id = ${CURRENT_USER_ID}
    order by start_at asc
  `;
  return NextResponse.json({ reservations: rows });
}
