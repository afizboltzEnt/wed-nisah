"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { StaggerGroup, StaggerItem } from "../Stagger";
import SectionDivider from "../floral/SectionDivider";
import { supabase } from "@/lib/supabase";
import type { RsvpInsert } from "@/lib/supabase";
import { fadeUp, scaleIn, withStagger } from "@/lib/motion";

// scaleIn, but staggering its own variant children, so the form fields
// cascade together with this card's scroll-triggered reveal instead of on mount.
const cardStagger = withStagger(scaleIn, 0.08);

const heading =
  "font-caps text-[0.95rem] font-normal uppercase tracking-[0.3em] text-ink";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak" | "">("");
  const [guestCount, setGuestCount] = useState(1);
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
      guest_count: guestCount,
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
    <section
      className="flex flex-col items-center gap-5 text-center"
      id="rsvp"
      aria-labelledby="rsvp-heading"
    >
      <h2 id="rsvp-heading" className={heading}>
        RSVP
      </h2>
      <SectionDivider />
      <p className="font-display-italic italic text-ink-2">
        Sila sahkan kehadiran anda sebelum{" "}
        <span className="not-italic text-[0.7rem] uppercase tracking-[0.2em] text-stationery-gold">
          20 Disember 2026
        </span>
      </p>

      <StaggerGroup className="flex w-full flex-col items-center">
        <StaggerItem variants={cardStagger} className="w-full">
          {state === "done" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="event w-full"
            >
              <p className="font-display-italic text-xl text-ink">
                Terima kasih, {name.trim()}!
              </p>
              <p className="text-sm text-ink-2">
                Maklumat anda telah kami terima.{" "}
                {attendance === "hadir"
                  ? "Alhamdulillah, selamat datang."
                  : "Kami faham. Doa restu anda amat kami hargai."}
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={submit}
              className="flex w-full flex-col gap-[22px] text-left"
            >
              {state === "error" && (
                <p className="rsvp-err">
                  Maaf, terdapat ralat. Sila cuba semula.
                </p>
              )}
              <motion.div variants={fadeUp}>
                <label className="rsvp-field-label" htmlFor="rsvp-name">
                  Nama anda
                </label>
                <input
                  id="rsvp-name"
                  className="rsvp-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama penuh"
                  required
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <span className="rsvp-field-label">Kehadiran</span>
                <div className="flex flex-wrap gap-2.5">
                  {(
                    [
                      ["hadir", "Insya-Allah, Hadir"],
                      ["tidak", "Maaf, Tidak Dapat Hadir"],
                    ] as const
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAttendance(val)}
                      data-selected={attendance === val}
                      className="rsvp-choice"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-5">
                <div>
                  <span className="rsvp-field-label">Bilangan tetamu</span>
                  <div className="rsvp-stepper">
                    <button
                      type="button"
                      aria-label="Kurangkan bilangan tetamu"
                      onClick={() => setGuestCount((n) => Math.max(1, n - 1))}
                    >
                      −
                    </button>
                    <output>{guestCount}</output>
                    <button
                      type="button"
                      aria-label="Tambah bilangan tetamu"
                      onClick={() => setGuestCount((n) => Math.min(20, n + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label className="rsvp-field-label" htmlFor="rsvp-phone">
                    No. telefon{" "}
                    <span className="text-ink-2/60">(opsional)</span>
                  </label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    className="rsvp-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="012-3456789"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="rsvp-field-label" htmlFor="rsvp-message">
                  Ucapan &amp; doa{" "}
                  <span className="text-ink-2/60">(opsional)</span>
                </label>
                <textarea
                  id="rsvp-message"
                  className="rsvp-input"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Semoga bahagia hingga ke syurga…"
                />
              </motion.div>

              <motion.button
                variants={fadeUp}
                type="submit"
                disabled={state === "loading"}
                className="btn solid self-center px-7 py-[15px] disabled:opacity-60"
              >
                {state === "loading" ? "Menghantar…" : "Hantar & Sahkan"}
              </motion.button>
            </form>
          )}
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
