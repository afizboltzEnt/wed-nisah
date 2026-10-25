"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import OpeningGate from "./OpeningGate";
import Particles from "./Particles";
import MusicPlayer from "./MusicPlayer";
import Cover from "./sections/Cover";
import Jemputan from "./sections/Jemputan";
import DateVenue from "./sections/DateVenue";
import Countdown from "./sections/Countdown";
import Programme from "./sections/Programme";
import RsvpForm from "./sections/RsvpForm";
import Contacts from "./sections/Contacts";
import Doa from "./sections/Doa";
import Closing from "./sections/Closing";

export default function Invitation() {
  const [opened, setOpened] = useState(false);

  // Lock document scroll while the gate is up. Cover and the sections below
  // stay mounted the whole time (SSR content + hero image preload), but
  // without this a guest could scroll the page behind the still-opaque
  // overlay and spend every section's one-shot whileInView reveal before
  // ever seeing it.
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <MotionConfig reducedMotion="user">
      <Particles />

      {/* inert while the gate is up: scroll is already locked above, but
          without this a guest could still Tab/swipe into the RSVP form and
          map links sitting behind the still-opaque overlay. */}
      <div inert={!opened}>
        <Cover opened={opened} />
        <main className="mx-auto flex max-w-[560px] flex-col gap-[72px] px-4 py-10">
          <Jemputan />
          <DateVenue />
          <Countdown />
          <Programme />
          <RsvpForm />
          <Contacts />
          <Doa />
          <Closing />
        </main>
      </div>

      {opened && <MusicPlayer />}

      <AnimatePresence>
        {!opened && <OpeningGate onOpen={() => setOpened(true)} />}
      </AnimatePresence>
    </MotionConfig>
  );
}
