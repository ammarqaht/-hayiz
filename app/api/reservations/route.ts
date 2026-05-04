import { NextResponse } from "next/server";
import { sql, CURRENT_USER_ID, type ReservationRow } from "@/lib/db";
import { getCafeById } from "@/lib/data";

export async function GET() {
  const { rows } = await sql<ReservationRow>`
    select id, user_id, cafe_id, customer_name, start_at, duration_minutes, status, created_at
    from reservations
    where user_id = ${CURRENT_USER_ID}
    order by start_at asc
  `;
  return NextResponse.json({ reservations: rows });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const { cafeId, startAt, durationMinutes, customerName } = body as {
    cafeId?: string;
    startAt?: string;
    durationMinutes?: number;
    customerName?: string;
  };

  if (!cafeId || !startAt || !durationMinutes) {
    return NextResponse.json(
      { error: "cafeId, startAt, durationMinutes are required" },
      { status: 400 }
    );
  }

  const trimmedName = (customerName ?? "").trim();
  if (!trimmedName) {
    return NextResponse.json(
      { error: "customerName is required" },
      { status: 400 }
    );
  }

  if (!getCafeById(cafeId)) {
    return NextResponse.json({ error: "unknown cafe" }, { status: 404 });
  }

  const startDate = new Date(startAt);
  if (Number.isNaN(startDate.getTime())) {
    return NextResponse.json({ error: "invalid startAt" }, { status: 400 });
  }

  const id = `bk_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 7)}`;

  const { rows } = await sql<ReservationRow>`
    insert into reservations (id, user_id, cafe_id, customer_name, start_at, duration_minutes, status)
    values (${id}, ${CURRENT_USER_ID}, ${cafeId}, ${trimmedName}, ${startDate.toISOString()}, ${durationMinutes}, 'confirmed')
    returning id, user_id, cafe_id, customer_name, start_at, duration_minutes, status, created_at
  `;

  return NextResponse.json({ reservation: rows[0] }, { status: 201 });
}
