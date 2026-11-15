import { T, labels, type LabelKey } from "@/core/i18n";
import { OnlyTheme } from "@/core/theme";
import { Button } from "@/shared/ui/button";
import { ChartDemo } from "./ChartDemo";
import { ToastDemo } from "./ToastDemo";

const BASE = ["breu", "turfa", "musgo", "linha", "borda", "tx", "tx2", "tx3"];
const FLOR = ["protea", "ponta", "ceu", "miolo", "prata", "urze", "folha", "liquen", "vermelhao", "vinho"];
const AREAS: { token: string; label: LabelKey }[] = [
  { token: "a-estacoes", label: "area.agenda" },
  { token: "a-herbario", label: "area.notes" },
  { token: "a-estufa", label: "area.projects" },
  { token: "a-sementeira", label: "area.crm" },
  { token: "a-raizes", label: "area.dev" },
  { token: "a-colheita", label: "area.finance" },
  { token: "a-floracao", label: "area.focus" },
];
const TEXTURES = ["tx-polen", "tx-veio", "tx-fibra", "tx-miolo", "tx-pelo", "tx-prata"] as const;

function Swatch({ token, children }: { token: string; children?: React.ReactNode }) {
  return (
    <li className="flex flex-col gap-2">
      <span
        className="h-12 rounded-btn border border-vidro-borda"
        style={{ background: `var(--${token})` }}
        aria-hidden
      />
      <span className="font-mono text-[11px] text-tx2">--{token}</span>
      {children && <span className="text-xs text-tx">{children}</span>}
    </li>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass p-6">
      <h2 className="lbl mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default function CatalogPage() {
  return (
    <main className="flex flex-col gap-6">
      <Section title="Cores · base">
        <ul className="grid grid-cols-4 gap-4 md:grid-cols-8">
          {BASE.map((t) => (
            <Swatch key={t} token={t} />
          ))}
        </ul>
      </Section>

      <Section title="Cores · flor">
        <ul className="grid grid-cols-5 gap-4 md:grid-cols-10">
          {FLOR.map((t) => (
            <Swatch key={t} token={t} />
          ))}
        </ul>
      </Section>

      <Section title="Cores · áreas">
        <ul className="grid grid-cols-4 gap-4 md:grid-cols-7">
          {AREAS.map((a) => (
            <Swatch key={a.token} token={a.token}>
              <T k={a.label} />
            </Swatch>
          ))}
        </ul>
      </Section>

      <Section title="Tipografia">
        <p className="lbl">
          <T k="area.overview" /> · semana 46
        </p>
        <p className="titulo mt-3">
          Boa tarde, <em>Tiburcio</em>
        </p>
        <p className="mt-3 text-sm text-tx2">
          <T k="overview.tagline" />
        </p>
        <div className="mt-6 flex flex-wrap items-end gap-10">
          <p className="num text-[44px] leading-none">
            12h40<span className="text-tx3"> / 16h</span>
          </p>
          <p className="num text-[32px] leading-none">R$ 18.450</p>
          <p className="font-mono text-[12px] text-tx3">PR #42 · checkout · Ctrl K</p>
        </div>
      </Section>

      <Section title="Vidro e texturas">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {TEXTURES.map((tx) => (
            <div key={tx} className={`glass glass-interactive ${tx} flex h-28 items-end p-4`}>
              <span className="font-mono text-[11px] text-tx2">.{tx}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-tx3">No Essencial as texturas somem; o vidro fica mais discreto.</p>
      </Section>

      <Section title="Textos em par">
        <ul className="grid gap-2 md:grid-cols-2">
          {(Object.keys(labels) as LabelKey[]).map((k) => (
            <li key={k} className="flex justify-between gap-4 border-b border-borda py-1.5 text-sm">
              <span className="font-mono text-[11px] text-tx3">{k}</span>
              <span>
                <T k={k} />
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Só num tema">
        <OnlyTheme theme="protea">
          <p className="text-sm">Aqui entra a mascote (só no Protea).</p>
        </OnlyTheme>
        <OnlyTheme theme="essencial">
          <p className="text-sm">Aqui entra o painel “Hoje” (só no Essencial).</p>
        </OnlyTheme>
      </Section>

      <Section title="Botão (shadcn, ainda sem o vestido Protea · fase 1)">
        <div className="flex flex-wrap gap-3">
          <Button>Novo projeto</Button>
          <Button variant="outline">Ver semana</Button>
          <Button variant="ghost">Cancelar</Button>
          <Button variant="destructive">Excluir</Button>
          <Button disabled>Indisponível</Button>
        </div>
      </Section>

      <Section title="Toasts (Sonner)">
        <ToastDemo />
      </Section>

      <Section title="Gráfico (EChart · paleta provisória)">
        <ChartDemo />
      </Section>
    </main>
  );
}
