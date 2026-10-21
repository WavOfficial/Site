# Wav site

The website for Wav, a music player for iPhone and Mac: home, pricing, privacy policy and support pages.

Built with Next.js 16 and Tailwind CSS 4, exported as a static site to `out/` and served on Cloudflare Workers static assets.

## Development

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
npx wrangler deploy
```

## Structure

- `app/`: pages (`page.tsx` home, `privacy/`, `support/`)
- `components/`: page chrome, the iPhone frame, the equalizer demo
- `lib/site.ts`: App Store link, support email, paid tier name
- `lib/equalizer.ts`: a port of the app's `Equalizer.swift`; keep them in sync
- `public/media/`: screenshots and the lyrics video

The App Store link comes from `NEXT_PUBLIC_APP_STORE_URL` (see `lib/site.ts`).

## License

The code is MIT licensed, see [LICENSE](LICENSE). The Wav name, icon, screenshots and video are not covered by it, and the iPhone frame is Apple artwork used under Apple's App Store Marketing Artwork License.
