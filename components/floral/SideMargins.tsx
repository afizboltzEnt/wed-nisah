import { RoseBloom, Leaf, Fern } from "./Flowers";

/**
 * Decorative florals filling the empty desktop gutters beside the centered
 * content column (which caps at max-w-[480px], see PageFrame). Hidden below
 * xl, where there isn't enough gutter width for this to read as intentional
 * rather than cramped.
 */
export default function SideMargins() {
  return (
    <div className="pointer-events-none fixed inset-y-0 z-0 hidden w-full xl:block" aria-hidden>
      <div className="absolute left-[max(0.5rem,calc(50vw-310px))] top-[12%] flex flex-col items-center gap-10 opacity-80">
        <Fern size={60} />
        <RoseBloom size={54} className="animate-float" />
        <Leaf size={28} />
        <RoseBloom size={38} style={{ animationDelay: "2s" }} className="animate-float" />
      </div>
      <div className="absolute left-[max(0.5rem,calc(50vw-310px))] top-[62%] flex flex-col items-center gap-8 opacity-70">
        <Leaf size={26} flip />
        <RoseBloom size={42} style={{ animationDelay: "0.8s" }} className="animate-float" />
      </div>

      <div className="absolute right-[max(0.5rem,calc(50vw-310px))] top-[18%] flex flex-col items-center gap-10 opacity-80">
        <Fern size={60} flip />
        <RoseBloom size={50} style={{ animationDelay: "1.4s" }} className="animate-float" />
        <Leaf size={28} flip />
      </div>
      <div className="absolute right-[max(0.5rem,calc(50vw-310px))] top-[66%] flex flex-col items-center gap-8 opacity-70">
        <RoseBloom size={40} className="animate-float" />
        <Leaf size={24} />
      </div>
    </div>
  );
}
