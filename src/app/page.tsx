import { T } from "@/core/i18n";

// Provisório até a fase 4 (overview). A moldura entra na fase 1 (shell).
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-6 p-10">
      <section className="glass tx-veio p-6">
        <p className="lbl">
          <T k="area.overview" /> · fase 0
        </p>
        <h1 className="titulo mt-3 text-5xl">
          <T k="area.overview" />
        </h1>
        <p className="mt-3 text-sm text-tx2">
          <T k="overview.tagline" />
        </p>
      </section>
    </main>
  );
}
