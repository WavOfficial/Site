// Apple's iPhone 16 bezel (Ultramarine, from developer.apple.com/design/resources, App Store Marketing Artwork
// License) around a real screenshot or screen recording. The screen sits under the bezel's transparent hole.

// Hole in the original 1359×2736 PNG
const frame = { width: 1359, height: 2736, left: 90, top: 90, screenWidth: 1179, screenHeight: 2556 };
// The screen overflows the hole a little, hidden under the bezel, so no light seam shows at the edge
const bleed = 4;
const percent = (value: number, total: number) => `${((value / total) * 100).toFixed(3)}%`;

const screenBox = {
  left: percent(frame.left - bleed, frame.width),
  top: percent(frame.top - bleed, frame.height),
  width: percent(frame.screenWidth + 2 * bleed, frame.width),
  height: percent(frame.screenHeight + 2 * bleed, frame.height),
};

function Bezel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative drop-shadow-[0_40px_60px_rgb(0_0_0/0.55)]" style={{ aspectRatio: `${frame.width} / ${frame.height}` }}>
      <div className="absolute overflow-hidden bg-black" style={screenBox}>
        {children}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/iphone-16-ultramarine.png"
        alt=""
        aria-hidden
        width={794}
        height={1600}
        className="pointer-events-none relative block h-full w-full"
      />
    </div>
  );
}

export function DeviceImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <Bezel>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={738} height={1600} fetchPriority={priority ? "high" : "auto"} className="block h-full w-full object-cover" />
    </Bezel>
  );
}

export function DeviceVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  return (
    <Bezel>
      <video
        src={src}
        poster={poster}
        width={720}
        height={1560}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="block h-full w-full object-cover"
      />
      {/* While recording, the Dynamic Island grows and shows a red dot; this covers it under the bezel's island */}
      <div className="absolute top-[1.1%] left-1/2 h-[5%] w-[46%] -translate-x-1/2 rounded-full bg-black" />
    </Bezel>
  );
}
