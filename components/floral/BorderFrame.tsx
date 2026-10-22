import { CornerFloral } from "./Flowers";

type Corner = "tl" | "tr" | "bl" | "br";

const POSITION: Record<Corner, string> = {
  tl: "left-0 top-0",
  tr: "right-0 top-0",
  bl: "left-0 bottom-0",
  br: "right-0 bottom-0",
};

type Props = {
  corners: Corner[];
};

/** Small, low-opacity floral sprigs for body sections — the light counterpart to Cover's dense hero frame. */
export default function BorderFrame({ corners }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {corners.map((corner) => (
        <CornerFloral
          key={corner}
          corner={corner}
          className={`absolute h-auto w-[56px] opacity-50 sm:w-[80px] sm:opacity-60 ${POSITION[corner]}`}
        />
      ))}
    </div>
  );
}
