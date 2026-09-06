"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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
import { FloralDivider } from "./floral/Flowers";

export default function Invitation() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Particles />
      <PageFrame>
        <Cover />
        <Bismillah />
        <InvitationMessage />
        <CenteredDivider />
        <Couple />
        <CenteredDivider />
        <Parents />
        <CenteredDivider />
        <DateVenue />
        <CenteredDivider />
        <RsvpForm />
        <CenteredDivider />
        <Doa />
        <Closing />
      </PageFrame>

      {opened && <MusicPlayer />}

      <AnimatePresence>
        {!opened && <EnvelopeOpener onOpen={() => setOpened(true)} />}
      </AnimatePresence>
    </>
  );
}

function CenteredDivider() {
  return (
    <div className="flex justify-center py-2">
      <FloralDivider size={190} />
    </div>
  );
}