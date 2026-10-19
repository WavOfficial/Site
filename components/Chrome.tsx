import Image from "next/image";
import Link from "next/link";
import { appStoreUrl } from "@/lib/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <nav className="mx-auto flex h-12 max-w-[1080px] items-center justify-between px-5 text-[13px]">
        <Link href="/" className="flex items-center gap-2 text-[17px] font-semibold">
          <Image src="/wav-icon.png" alt="" width={26} height={26} className="rounded-[7px]" />
          Wav
        </Link>
        <div className="flex items-center gap-6 text-ink/80">
          <Link href="/#features" className="hidden hover:text-white sm:block">
            Features
          </Link>
          <Link href="/#pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/support" className="hover:text-white">
            Support
          </Link>
          <a href={appStoreUrl} className="rounded-full bg-wav px-3 py-1 font-medium text-white hover:bg-wav-deep">
            Get Wav
          </a>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 text-[12px] text-secondary">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Kilian Balaguer. Wav is made in Marrakech.</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-ink">
            Privacy Policy
          </Link>
          <Link href="/support" className="hover:text-ink">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
