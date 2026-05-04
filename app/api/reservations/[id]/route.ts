import { NextResponse } from "next/server";
import { sql, CURRENT_USER_ID } from "@/lib/db";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { rowCount } = await sql`
    delete from reservations
    where id = ${id} and user_id = ${CURRENT_USER_ID}
  `;
  if (!rowCount) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
