import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Apple devices use San Francisco; everything else falls back to Inter
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", preload: false });

const title = "Wav: music for iPhone and Mac";
const description =
  "Wav plays any song with word-by-word lyrics, Slowed + Reverb and a 10-band EQ, offline downloads, and your library synced through iCloud.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://wav.pages.dev"),
  title,
  description,
  applicationName: "Wav",
  icons: { apple: "/apple-touch-icon.png" },
  openGraph: { title, description, images: ["/wav-icon.png"], type: "website" },
  twitter: { card: "summary", title, description, images: ["/wav-icon.png"] },
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black font-sans text-[17px] leading-[1.47] tracking-[-0.022em] text-ink">{children}</body>
    </html>
  );
}
