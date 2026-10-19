import type { Metadata } from "next";
import Prose from "@/components/Prose";
import { supportEmail } from "@/lib/site";

export const metadata: Metadata = { title: "Support · Wav" };

const faq = [
  {
    q: "A song won't play or keeps stopping.",
    a: "Try another network. Some Wi-Fi networks get rate-limited by the music service; switching to mobile data usually fixes it right away.",
  },
  {
    q: "My library isn't syncing.",
    a: "Make sure you're signed in to iCloud on the device and that iCloud Drive is on. Open Settings in Wav to see the sync status next to your profile picture.",
  },
  {
    q: "How do I listen offline?",
    a: "Tap ••• on a song, album or playlist and choose Download. Turn on Offline Mode in Settings to only show what's downloaded.",
  },
  {
    q: "Where are Slowed + Reverb and the EQ?",
    a: "In the player, tap ••• and open Sound & Effects. Presets stay on for every song until you switch back to Original.",
  },
  {
    q: "How do I control Wav on another device?",
    a: "Sign in on both devices. Tap the speakers button in the player, or Playback ▸ Your Devices on the Mac.",
  },
  {
    q: "How do I delete my account?",
    a: "Settings ▸ your profile ▸ Delete Account. This removes your profile and synced library from iCloud.",
  },
];

export default function Support() {
  return (
    <Prose title="Support">
      <p>
        Something not working, or an idea for Wav? Email{" "}
        <a className="link" href={`mailto:${supportEmail}`}>
          {supportEmail}
        </a>{" "}
        and include your device and what you were playing.
      </p>
      {faq.map(({ q, a }) => (
        <div key={q}>
          <h2>{q}</h2>
          <p className="mt-2">{a}</p>
        </div>
      ))}
    </Prose>
  );
}
