"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../Reveal";
import { supabase } from "@/lib/supabase";
import type { RsvpInsert } from "@/lib/supabase";

const inputCls =
  "w-full rounded-lg border border-gold/40 bg-cream/70 px-4 py-3 font-display text-sm font-light text-burgundy-deep placeholder:text-sage-light/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak" | "">("");
  const [guestCount, setGuestCount] = useState("1");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance) return;
    setState("loading");
    const payload: RsvpInsert = {
      name: name.trim(),
      attendance,
      guest_count: Math.min(
        20,
        Math.max(1, parseInt(guestCount, 10) || 1)
      ),
      phone: phone.trim() || null,
      message: message.trim() || null,
    };
    const { error } = await supabase.from("rsvp").insert(payload);
    if (error) {
      setState("error");
    } else {
      setState("done");
    }
  };

  return (
    <section className="flex flex-col items-center py-10 text-center">
      <Reveal>
        <p className="font-serif text-2xl text-burgundy-deep">
          Kehadiran (RSVP)
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-2 font-cormorant text-base italic text-sage">
          Sila sahkan kehadiran anda sebelum&nbsp;
          <span className="font-display text-[0.7rem] font-normal uppercase tracking-[0.2em] text-gold-deep not-italic">
            20 Disember 2026
          </span>
        </p>
      </Reveal>

      <Reveal delay={0.2} className="mt-6 w-full">
        {state === "done" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-gold/50 bg-cream/80 px-6 py-8"
          >
            <div className="text-4xl">🌷</div>
            <p className="mt-3 font-serif text-xl text-burgundy-deep">
              Terima kasih, {name.trim()}!
            </p>
            <p className="mt-2 font-display text-sm font-light text-sage">
              Maklumat anda telah kami terima.{" "}
              {attendance === "hadir"
                ? "Alhamdulillah, selamat datang."
                : "Kami faham. Doa restu anda amat kami hargai."}
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={submit}
            className="space-y-4 rounded-xl border border-gold/40 bg-cream/60 p-6 text-left shadow-sm"
          >
            {state === "error" && (
              <p className="rounded-lg bg-rose/15 px-4 py-2 font-display text-sm text-burgundy">
                Maaf, terdapat ralat. Sila cuba semula.
              </p>
            )}
            <div>
              <label className="mb-1.5 block font-display text-[0.7rem] font-light uppercase tracking-[0.25em] text-sage">
                Nama anda
              </label>
              <input
                className={inputCls}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama penuh"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block font-display text-[0.7rem] font-light uppercase tracking-[0.25em] text-sage">
                Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  ["hadir", "Insya-Allah, Hadir"],
                  ["tidak", "Maaf, Tidak Dapat Hadir"],
                ] as const).map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAttendance(val)}
                    className={`rounded-lg border px-3 py-3 font-display text-xs font-normal uppercase tracking-[0.12em] transition active:scale-95 ${
                      attendance === val
                        ? "border-gold bg-burgundy text-gold-soft shadow"
                        : "border-gold/40 bg-cream/80 text-sage hover:border-gold"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block font-display text-[0.7rem] font-light uppercase tracking-[0.25em] text-sage">
                  Bilangan tetamu
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  className={inputCls}
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block font-display text-[0.7rem] font-light uppercase tracking-[0.25em] text-sage">
                  No. telefon <span className="text-sage-light/60">(opsional)</span>
                </label>
                <input
                  type="tel"
                  className={inputCls}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="012-3456789"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block font-display text-[0.7rem] font-light uppercase tracking-[0.25em] text-sage">
                Ucapan &amp; doa <span className="text-sage-light/60">(opsional)</span>
              </label>
              <textarea
                className={inputCls}
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Semoga bahagia hingga ke syurga…"
              />
            </div>

            <button
              type="submit"
              disabled={state === "loading"}
              className="w-full rounded-full bg-burgundy-deep py-3.5 font-display text-sm font-light uppercase tracking-[0.2em] text-gold-soft shadow-md transition hover:bg-burgundy active:scale-[0.98] disabled:opacity-60"
            >
              {state === "loading" ? "Menghantar…" : "Hantar & Sahkan ✦"}
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}