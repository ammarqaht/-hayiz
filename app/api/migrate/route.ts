import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  await sql`
    create table if not exists reservations (
      id text primary key,
      user_id text not null default 'me',
      cafe_id text not null,
      start_at timestamptz not null,
      duration_minutes int not null,
      status text not null default 'confirmed',
      created_at timestamptz not null default now()
    )
  `;
  await sql`create index if not exists reservations_user_idx on reservations(user_id, start_at)`;
  await sql`create index if not exists reservations_cafe_idx on reservations(cafe_id, start_at)`;
  return NextResponse.json({ ok: true });
}
