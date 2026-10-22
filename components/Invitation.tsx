"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import EnvelopeOpener from "./EnvelopeOpener";
import Particles from "./Particles";
import MusicPlayer from "./MusicPlayer";
import PageFrame from "./PageFrame";
import Cover from "./sections/Cover";
import Bismillah from "./sections/Bismillah";
import InvitationMessage from "./sections/InvitationMessage";
import Couple from "./sections/Couple";
import Parents from "./sections/Parents";
import Countdown from "./sections/Countdown";
import DateVenue from "./sections/DateVenue";
import RsvpForm from "./sections/RsvpForm";
import Doa from "./sections/Doa";
import Closing from "./sections/Closing";
import SectionDivider from "./floral/SectionDivider";
import SideMargins from "./floral/SideMargins";

export default function Invitation() {
  const [opened, setOpened] = useState(false);

  // Lock document scroll while the gate is up. Cover/PageFrame stay mounted the
  // whole time (SSR content + hero image preload), but without this a guest
  // could scroll the page behind the still-opaque overlay and spend every
  // section's one-shot whileInView reveal before ever seeing it.
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <MotionConfig reducedMotion="user">
      <Particles />
      <SideMargins />

      {/* inert while the gate is up: scroll is already locked above, but
          without this a guest could still Tab/swipe into the RSVP form and
          map links sitting behind the still-opaque overlay. */}
      <div inert={!opened}>
        <Cover opened={opened} />
        <PageFrame>
          <Bismillah />
          <InvitationMessage />
          <SectionDivider />
          <Couple />
          <SectionDivider />
          <Parents />
          <SectionDivider />
          <Countdown />
          <SectionDivider />
          <DateVenue />
          <SectionDivider />
          <RsvpForm />
          <SectionDivider />
          <Doa />
          <Closing />
        </PageFrame>
      </div>

      {opened && <MusicPlayer />}

      <AnimatePresence>
        {!opened && <EnvelopeOpener onOpen={() => setOpened(true)} />}
      </AnimatePresence>
    </MotionConfig>
  );
}
