# Wav site

The website for Wav: home, privacy policy and support. Next.js 16 with a static export to `out/`.

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

- App Store link: set `NEXT_PUBLIC_APP_STORE_URL` (see `lib/site.ts`).
- The iPhone frame is Apple's iPhone 16 bezel from developer.apple.com/design/resources (App Store Marketing Artwork License).
- `lib/equalizer.ts` is a port of the app's `Equalizer.swift`; keep them in sync.
