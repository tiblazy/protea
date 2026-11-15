import { existsSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties } from "react";
import { Geist_Mono, Unbounded } from "next/font/google";
import { T } from "@/core/i18n";
import { CANDIDATES, COMBOS, type Candidate } from "./fonts";

export const metadata = { title: "Prova de fontes" };

const unbounded = Unbounded({ subsets: ["latin"], weight: ["400", "600", "700"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

const GOOGLE: Record<string, string> = {
  unbounded: unbounded.style.fontFamily,
  geistmono: geistMono.style.fontFamily,
};

const PROVA_DIR = join(process.cwd(), "public", "fonts", "prova");

function status(c: Candidate) {
  if (c.source === "google") return { available: true, family: GOOGLE[c.id] };
  const available = !!c.files?.length && c.files.every((f) => existsSync(join(PROVA_DIR, f.name)));
  return { available, family: `"Prova ${c.family}"` };
}

const FORMAT: Record<string, string> = { woff2: "woff2", woff: "woff", otf: "opentype", ttf: "truetype" };

function fontFaces(): string {
  return CANDIDATES.filter((c) => status(c).available)
    .flatMap((c) =>
      (c.files ?? []).map((f) => {
        const format = FORMAT[f.name.split(".").pop() ?? ""] ?? "woff2";
        return `@font-face{font-family:"Prova ${c.family}";src:url("/fonts/prova/${f.name}") format("${format}");font-weight:${f.weight};font-display:swap}`;
      }),
    )
    .join("\n");
}

const byId = (id: string) => CANDIDATES.find((c) => c.id === id)!;

type Stack = { disp: string; num: string; ui: string; mono: string; label: string; missing: string[] };

const CURRENT: Stack = {
  label: "Atual · Sora + Inter + JetBrains Mono",
  disp: "var(--font-sora)",
  num: "var(--font-sora)",
  ui: "var(--font-inter)",
  mono: "var(--font-jetbrains)",
  missing: [],
};

function stackFor(combo: (typeof COMBOS)[number]): Stack {
  const parts = { disp: byId(combo.disp), num: byId(combo.num), ui: byId(combo.ui), mono: byId(combo.mono) };
  const fam = (c: Candidate, fallback: string) => `${status(c).family}, ${fallback}`;
  const missing = [...new Set(Object.values(parts).filter((c) => !status(c).available).map((c) => c.family))];
  return {
    label: `${combo.id.toUpperCase()} · ${parts.disp.family} + ${parts.ui.family} + ${parts.mono.family}`,
    disp: fam(parts.disp, "var(--font-sora)"),
    num: fam(parts.num, "var(--font-sora)"),
    ui: fam(parts.ui, "var(--font-inter)"),
    mono: fam(parts.mono, "var(--font-jetbrains)"),
    missing,
  };
}

/** Recorte do Jardim real: chip, título, frase, KPI, rótulo, texto e código. */
function Sample({ stack }: { stack: Stack }) {
  const style = { "--p-disp": stack.disp, "--p-num": stack.num, "--p-ui": stack.ui, "--p-mono": stack.mono } as CSSProperties;
  return (
    <article className="glass tx-veio flex flex-col gap-4 p-6" style={{ ...style, fontFamily: "var(--p-ui)" }}>
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="lbl">{stack.label}</h2>
        {stack.missing.length > 0 && (
          <span className="st urze">
            <i aria-hidden />
            Falta o arquivo: {stack.missing.join(", ")}
          </span>
        )}
      </header>
      <p className="chip w-fit">
        Boa tarde, Tiburcio Martins&nbsp;|&nbsp;
        <T k="area.overview" />
        &nbsp;· semana 46
      </p>
      <p
        className="text-[48px] leading-[.98] font-bold tracking-[.01em] uppercase"
        style={{ fontFamily: "var(--p-disp)" }}
      >
        <T k="area.overview" /> <span className="text-protea">da semana</span>
      </p>
      <p className="text-sm text-tx2">
        <T k="overview.tagline" /> Bom começo: 1 call e 5 tarefas hoje.
      </p>
      <div className="grid grid-cols-2 gap-4 border-t border-vidro-borda pt-4 md:grid-cols-4">
        {[
          ["Projetos ativos", "8", "+2 no mês"],
          ["Leads", "42", "18 novas"],
          ["Receita prevista", "R$ 18.450", "+12,4% vs out"],
          ["Valor da hora", "R$ 104", "+R$ 9"],
        ].map(([lbl, value, delta]) => (
          <div key={lbl}>
            <p className="lbl">{lbl}</p>
            <p className="mt-1 text-[32px] leading-none font-light" style={{ fontFamily: "var(--p-num)" }}>
              {value}
            </p>
            <p className="mt-1 text-xs text-folha-cl">{delta}</p>
          </div>
        ))}
      </div>
      <p className="text-[13.5px]">
        Revisar o PR do checkout da Aurora antes da call com a Estúdio Nativa às 11:00.
      </p>
      <p className="text-[12px] text-tx3" style={{ fontFamily: "var(--p-mono)" }}>
        PR #42 · feat/checkout · Ctrl K · 12h40 / 16h
      </p>
    </article>
  );
}

export default function FontProofPage() {
  return (
    <main className="flex flex-col gap-6">
      <style>{fontFaces()}</style>

      <section className="glass p-6">
        <h1 className="lbl mb-2">Prova de fontes · só para o tema Protea</h1>
        <p className="max-w-3xl text-sm text-tx2">
          O DS segue com Sora + Inter + JetBrains Mono até a escolha, e o Essencial continua só com Inter. Cada
          cartão força a sua combinação, para comparar lado a lado; troque o tema no topo para ver cores e vidro do
          Essencial. Fonte sem arquivo cai na atual e ganha o aviso “Falta o arquivo”.
        </p>
        <table className="mt-4 w-full text-left text-sm">
          <caption className="sr-only">Candidatas, licença e estado do arquivo</caption>
          <thead>
            <tr className="lbl">
              <th scope="col" className="py-2 font-semibold">Fonte</th>
              <th scope="col" className="py-2 font-semibold">Fundição</th>
              <th scope="col" className="py-2 font-semibold">Licença</th>
              <th scope="col" className="py-2 font-semibold">Arquivo</th>
            </tr>
          </thead>
          <tbody>
            {CANDIDATES.map((c) => {
              const s = status(c);
              return (
                <tr key={c.id} className="border-t border-borda">
                  <th scope="row" className="py-2 font-normal" style={{ fontFamily: s.available ? s.family : undefined }}>
                    {c.family}
                  </th>
                  <td className="py-2 text-tx2">{c.foundry}</td>
                  <td className="py-2 text-tx2">{c.license}</td>
                  <td className="py-2">
                    {s.available ? (
                      <span className="st folha">
                        <i aria-hidden />
                        {c.source === "google" ? "next/font" : "ok"}
                      </span>
                    ) : (
                      <span className="st urze">
                        <i aria-hidden />
                        falta {c.files?.map((f) => f.name).join(", ")}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <Sample stack={CURRENT} />
      {COMBOS.map((combo) => (
        <Sample key={combo.id} stack={stackFor(combo)} />
      ))}
    </main>
  );
}
