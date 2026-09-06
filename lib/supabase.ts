import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://zbtozerufklismpxjvgj.supabase.co";

const getClient = () => {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY belum ditetapkan. Sila tetapkan dalam .env.local atau Vercel."
    );
  }
  const g = globalThis as { __wedSupabase?: SupabaseClient };
  if (!g.__wedSupabase) {
    g.__wedSupabase = createClient(supabaseUrl, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return g.__wedSupabase;
};

export const supabase = new Proxy(
  {} as SupabaseClient,
  {
    get(_, prop) {
      const client = getClient();
      const value = (client as unknown as Record<PropertyKey, unknown>)[prop];
      return typeof value === "function" ? value.bind(client) : value;
    },
  }
);

export type RsvpRow = {
  id: number;
  name: string;
  attendance: "hadir" | "tidak";
  guest_count: number;
  phone: string | null;
  message: string | null;
  created_at: string;
};

export type RsvpInsert = {
  name: string;
  attendance: "hadir" | "tidak";
  guest_count: number;
  phone?: string | null;
  message?: string | null;
};