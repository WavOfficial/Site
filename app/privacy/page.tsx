import type { Metadata } from "next";
import Prose from "@/components/Prose";
import { supportEmail } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy · Wav" };

export default function Privacy() {
  return (
    <Prose title="Privacy Policy" updated="October 19, 2026">
      <p>
        Wav is made by one developer, Kilian Balaguer. Wav has no servers of its own, no ads, no analytics and no tracking.
        I never see what you listen to.
      </p>

      <h2>What stays on your device</h2>
      <p>
        Your library, liked songs, playlists, recently played, downloads, sound settings and caches are stored on your
        device. Deleting Wav deletes them.
      </p>

      <h2>iCloud and Sign in with Apple</h2>
      <p>
        If you sign in, Wav uses Sign in with Apple and stores your profile and library in your own private iCloud
        database, so it syncs between your devices. That data is held by Apple under your Apple Account and is not
        readable by me. You can use Wav without signing in, sign out at any time, or delete your account and its iCloud
        data from Settings in the app.
      </p>

      <h2>Services Wav connects to</h2>
      <p>
        To search and play music, show lyrics and find animated covers, Wav sends requests straight from your device to
        third-party online music and lyrics services. These requests contain only what&apos;s needed: your search, or a
        song&apos;s title, artist, album and length, plus, like any internet request, your IP address. Each service
        handles them under its own privacy policy. Wav never sends them your Apple Account, your name or your library.
      </p>

      <h2>Local network</h2>
      <p>
        Wav uses your local network only to find your own devices running Wav, so you can control playback between them.
        That connection is encrypted with a key tied to your Apple Account.
      </p>

      <h2>Children</h2>
      <p>Wav does not knowingly collect information from anyone, including children.</p>

      <h2>Changes and contact</h2>
      <p>
        If this policy changes, this page will be updated with a new date. Questions:{" "}
        <a className="link" href={`mailto:${supportEmail}`}>
          {supportEmail}
        </a>
        .
      </p>
    </Prose>
  );
}
