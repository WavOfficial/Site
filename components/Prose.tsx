import { Footer, Nav } from "@/components/Chrome";

// Shared layout for the text pages (privacy, support)
export default function Prose({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[720px] px-5 pt-20 pb-28">
        <h1 className="text-[40px] leading-[1.1] font-semibold tracking-[-0.025em] sm:text-[56px]">{title}</h1>
        {updated && <p className="mt-3 text-[14px] text-secondary">Last updated {updated}</p>}
        <div className="mt-10 space-y-5 text-white/85 [&_h2]:pt-6 [&_h2]:text-[24px] [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
