"use client";

import { useCallback, useEffect, useState } from "react";
import type { RsvpRow } from "@/lib/supabase";

type Summary = {
  total: number;
  hadir: number;
  tidak: number;
  guests: number;
};

type State =
  | { status: "locked" }
  | { status: "wrong" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | {
      status: "ready";
      rows: RsvpRow[];
      summary: Summary;
    };

const inputCls =
  "w-full rounded-lg border border-gold/40 bg-cream px-4 py-3 font-display text-base text-burgundy-deep placeholder:text-sage-light/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [state, setState] = useState<State>({ status: "locked" });

  const lock = () => setState({ status: "locked" });

  const fetchRsvps = useCallback(
    async (token: string) => {
      setState({ status: "loading" });
      const res = await fetch("/api/admin/rsvps", {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        setState({ status: "wrong" });
        return;
      }
      const body = await res.json();
      if (!res.ok) {
        setState({
          status: "error",
          message: body?.error ?? "Tidak dapat memuatkan senarai",
        });
        return;
      }
      setState({ status: "ready", rows: body.rows, summary: body.summary });
    },
    []
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("rsvp_admin") ?? "";
    if (saved) void fetchRsvps(saved);
  }, [fetchRsvps]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    window.localStorage.setItem("rsvp_admin", password);
    void fetchRsvps(password);
  };

  const logout = () => {
    window.localStorage.removeItem("rsvp_admin");
    setPassword("");
    lock();
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(120%_120%_at_50%_30%,#fbf6ec_0%,#e9dcc3_55%,#cdb18a_100%)] px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl text-burgundy">
              Senarai RSVP — Dani &amp; Anisah
            </h1>
            <p className="mt-1 font-display text-sm text-sage">
              Halaman khas untuk keluarga sahaja.
            </p>
          </div>
          {state.status === "ready" && (
            <button
              onClick={logout}
              className="rounded-full border border-gold px-4 py-2 font-display text-sm text-gold-deep transition hover:bg-gold hover:text-cream"
            >
              Log keluar
            </button>
          )}
        </header>

        {(state.status === "locked" || state.status === "wrong") && (
          <form
            onSubmit={submit}
            className="mx-auto mt-12 max-w-sm rounded-2xl border border-gold/40 bg-paper p-8 shadow-card"
          >
            <h2 className="font-serif text-xl text-burgundy">
              Kata laluan
            </h2>
            {state.status === "wrong" && (
              <p className="mt-2 font-display text-sm text-burgundy">
                Kata laluan salah. Sila cuba lagi.
              </p>
            )}
            <input
              type="password"
              className={`${inputCls} mt-4`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata laluan"
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-burgundy py-3 font-display text-base text-gold-soft transition hover:bg-burgundy-deep"
            >
              Seterusnya
            </button>
          </form>
        )}

        {state.status === "loading" && (
          <p className="mt-16 text-center font-display text-sage">
            Memuatkan senarai…
          </p>
        )}

        {state.status === "error" && (
          <div className="mt-12 rounded-xl border border-rose/50 bg-rose/10 p-6 text-center font-display text-burgundy">
            {state.message}
          </div>
        )}

        {state.status === "ready" && (
          <>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Jumlah", state.summary.total],
                ["Hadir", state.summary.hadir],
                ["Tidak", state.summary.tidak],
                ["Tetamu", state.summary.guests],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-gold/40 bg-paper p-4 text-center shadow-sm"
                >
                  <p className="font-serif text-3xl text-gold-foil">{value}</p>
                  <p className="mt-1 font-display text-sm text-sage">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {state.rows.length === 0 && (
                <p className="rounded-xl border border-gold/40 bg-paper p-6 text-center font-display text-sage">
                  Belum ada sebarang RSVP.
                </p>
              )}
              {state.rows.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-gold/30 bg-paper/90 p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-display text-base font-semibold text-burgundy">
                      {r.name}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 font-display text-xs tracking-wide ${
                        r.attendance === "hadir"
                          ? "bg-sage/15 text-sage"
                          : "bg-rose/15 text-burgundy"
                      }`}
                    >
                      {r.attendance === "hadir"
                        ? `Hadir (${r.guest_count} org)`
                        : "Tidak hadir"}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-display text-sm text-sage">
                    <span>
                      {new Date(r.created_at).toLocaleString("ms-MY", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    {r.phone && (
                      <a
                        href={`tel:${r.phone.replace(/[- ]/g, "")}`}
                        className="text-gold-deep underline-offset-4 hover:underline"
                      >
                        {r.phone}
                      </a>
                    )}
                  </div>
                  {r.message && (
                    <p className="mt-2 rounded-lg bg-cream/70 px-3 py-2 font-display text-sm italic text-sage">
                      &ldquo;{r.message}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}