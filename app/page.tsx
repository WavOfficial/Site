import { Footer, Nav } from "@/components/Chrome";
import { DeviceImage, DeviceVideo } from "@/components/Device";
import Equalizer from "@/components/Equalizer";
import { appStoreUrl, plusName } from "@/lib/site";

// SoundPreset.all
const presets = ["Original", "Slowed", "Slowed + Reverb", "Sped Up", "Nightcore", "Lo-fi", "Bass Boost", "Vocal", "Concert Hall"];

const more = [
  { title: "Offline", body: "Download songs, albums and playlists. Offline Mode shows only what's on your phone." },
  { title: "Synced through iCloud", body: "Sign in with Apple and your likes, playlists and artists are on every device." },
  { title: "A real Mac app", body: "Sidebar, keyboard shortcuts, and drag songs straight into a playlist." },
  { title: "Your other devices", body: "Start a song on the Mac, skip it from your iPhone. Works nearby or through iCloud." },
  { title: "Covers that move", body: "Animated album covers in the player and on the lock screen, when the album has one." },
  { title: "Light or dark", body: "Pick one or follow the system. Now Playing always takes the colours of the song." },
];

const headline = ["Play", "anything.", "Make", "it", "sound", "like", "yours."];

// Each word is sung in time with its length, and the next one waits until it's done
const sung = headline.reduce<{ word: string; delay: number; duration: number }[]>((words, word) => {
  const previous = words.at(-1);
  const delay = previous ? previous.delay + previous.duration + 0.06 : 0.4;
  return [...words, { word, delay, duration: 0.16 + word.length * 0.055 }];
}, []);

const free = [
  "Search and play any song, with unlimited skips",
  "Word-by-word lyrics",
  "Presets like Slowed and Sped Up",
  "A few offline downloads",
  "iCloud sync, the Mac app and your other devices",
];

const plus = [
  "Every effect: speed, pitch, reverb rooms and the full EQ",
  "Unlimited offline downloads",
  "AI vocal remover, to sing over any song",
  "New features first",
];

const next = [
  { title: "Android", body: "Wav on Android phones, with the same library through your account." },
  { title: "Windows", body: "A Windows app is planned after Android." },
  { title: "Shared playlists", body: "Send a playlist to a friend and find playlists made by other Wav listeners." },
  { title: "Wav Loop", body: "Your year in music: the songs, artists and hours you played, made to share." },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-[linear-gradient(180deg,var(--color-field)_0%,var(--color-field-deep)_55%,#000_100%)]">
          <div className="mx-auto grid max-w-[1080px] items-center gap-16 px-5 pt-16 pb-24 md:grid-cols-[1fr_340px] md:pt-24 md:pb-20">
            <div>
              <h1 className="text-[52px] leading-[1.02] font-extrabold tracking-[-0.035em] sm:text-[76px] lg:text-[88px]">
                {sung.map(({ word, delay, duration }, i) => (
                  <span key={i}>
                    <span className="sung" style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}>
                      {word}
                    </span>{" "}
                  </span>
                ))}
              </h1>
              <p className="mt-7 max-w-[30em] text-[19px] text-secondary sm:text-[21px]">
                Wav is a music player for iPhone and Mac. Search any song, sing along word by word, and slow it down,
                speed it up or reshape it with the EQ.
              </p>
              <div id="download" className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a href={appStoreUrl} className="pill">
                  Download on the App Store
                </a>
                <p className="text-[14px] text-secondary">Free on iPhone and Mac</p>
              </div>
            </div>
            <div className="mx-auto w-[min(300px,78vw)] md:w-full">
              <DeviceImage src="/media/now-playing.jpg" alt="Wav's player showing Everlong by Foo Fighters, with the Slowed effect on" priority />
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto grid max-w-[1080px] items-center gap-16 px-5 pt-16 pb-28 md:grid-cols-[340px_1fr] md:gap-24 md:pt-20 md:pb-40">
          <div className="order-2 mx-auto w-[min(300px,78vw)] md:order-1 md:w-full">
            <DeviceVideo src="/media/lyrics.mp4" poster="/media/lyrics-poster.jpg" label="Lyrics lighting up word by word in Wav" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-[40px] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-[56px]">Sing every word.</h2>
            <p className="mt-6 max-w-[30em] text-[19px] text-secondary">
              Lyrics light up as they&apos;re sung, using real word timing when it exists. Tap a line to jump there.
              Arabic and Hebrew read right to left.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1080px] items-start gap-14 px-5 pb-28 md:grid-cols-[1fr_440px] md:gap-20 md:pb-40">
          <div className="min-w-0 md:pt-6">
            <h2 className="text-[40px] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-[56px]">Slowed + Reverb is one tap.</h2>
            <p className="mt-6 max-w-[30em] text-[19px] text-secondary">
              Change the speed and pitch, put the song in a room, and shape it with a 10-band EQ. Effects stay on for
              everything you play until you switch back to Original.
            </p>
            <ul className="mt-8 flex max-w-[30em] flex-wrap gap-2" aria-label="Presets">
              {presets.map((name) => (
                <li
                  key={name}
                  className={`rounded-full px-3.5 py-1.5 text-[14px] font-semibold ${
                    name === "Slowed + Reverb" ? "bg-white text-black" : "bg-white/12 text-white"
                  }`}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <Equalizer />
            <p className="mt-3 px-1 text-[13px] text-tertiary">This is the equalizer from the app. Try dragging a dot.</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1080px] px-5 pb-28 md:pb-40">
          <h2 className="text-[40px] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-[56px]">And the rest.</h2>
          <dl className="mt-10 border-t border-white/12">
            {more.map((item) => (
              <div key={item.title} className="grid gap-1 border-b border-white/12 py-6 md:grid-cols-[320px_1fr] md:items-baseline md:gap-10">
                <dt className="text-[21px] font-semibold tracking-[-0.02em]">{item.title}</dt>
                <dd className="max-w-[34em] text-secondary">{item.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="pricing" className="mx-auto max-w-[1080px] px-5 pb-28 md:pb-40">
          <h2 className="text-[40px] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-[56px]">Free to play.</h2>
          <p className="mt-6 max-w-[30em] text-[19px] text-secondary">
            Listening is free, with no limit on skips. {plusName} adds every effect, unlimited downloads and the vocal
            remover.
          </p>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="border-b border-white/12 pb-4 text-[24px] font-semibold tracking-[-0.02em]">Free</h3>
              <ul className="divide-y divide-white/12">
                {free.map((item) => (
                  <li key={item} className="py-4 text-white/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-baseline justify-between border-b border-wav pb-4 text-[24px] font-semibold tracking-[-0.02em]">
                {plusName}
                <span className="text-[14px] font-medium text-wav">Coming soon</span>
              </h3>
              <ul className="divide-y divide-white/12">
                <li className="py-4 text-white/85">Everything in Free</li>
                {plus.map((item) => (
                  <li key={item} className="py-4 text-white/85">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] text-secondary">Pay weekly, monthly or yearly, or once for life.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1080px] px-5 pb-28 md:pb-40">
          <h2 className="text-[40px] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-[56px]">On the way.</h2>
          <dl className="mt-10 border-t border-white/12">
            {next.map((item) => (
              <div key={item.title} className="grid gap-1 border-b border-white/12 py-6 md:grid-cols-[320px_1fr] md:items-baseline md:gap-10">
                <dt className="text-[21px] font-semibold tracking-[-0.02em]">{item.title}</dt>
                <dd className="max-w-[34em] text-secondary">{item.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="bg-[linear-gradient(0deg,var(--color-field)_0%,#000_100%)]">
          <div className="mx-auto flex max-w-[1080px] flex-col items-start gap-8 px-5 py-28 md:flex-row md:items-end md:justify-between md:py-36">
            <h2 className="text-[52px] leading-[1.02] font-extrabold tracking-[-0.035em] sm:text-[76px]">Press play.</h2>
            <a href={appStoreUrl} className="pill">
              Download on the App Store
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
