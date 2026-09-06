import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { RsvpRow } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await admin
    .from("rsvp")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = data as RsvpRow[];
  const summary = {
    total: rows.length,
    hadir: rows.filter((r) => r.attendance === "hadir").length,
    tidak: rows.filter((r) => r.attendance === "tidak").length,
    guests: rows.reduce(
      (acc, r) => acc + (r.attendance === "hadir" ? r.guest_count : 0),
      0
    ),
  };

  return NextResponse.json({ rows, summary });
}