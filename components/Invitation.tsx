"use client";

import { useState } from "react";
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
import DateVenue from "./sections/DateVenue";
import RsvpForm from "./sections/RsvpForm";
import Doa from "./sections/Doa";
import Closing from "./sections/Closing";
import SectionDivider from "./floral/SectionDivider";

export default function Invitation() {
  const [opened, setOpened] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <Particles />

      {/* Mounted only once the envelope opens, so Cover's reveal fires for the guest
          instead of completing invisibly behind the gate (see ledger). */}
      {opened && (
        <>
          <Cover />
          <PageFrame>
            <Bismillah />
            <InvitationMessage />
            <SectionDivider />
            <Couple />
            <SectionDivider />
            <Parents />
            <SectionDivider />
            <DateVenue />
            <SectionDivider />
            <RsvpForm />
            <SectionDivider />
            <Doa />
            <Closing />
          </PageFrame>
          <MusicPlayer />
        </>
      )}

      <AnimatePresence>
        {!opened && <EnvelopeOpener onOpen={() => setOpened(true)} />}
      </AnimatePresence>
    </MotionConfig>
  );
}
