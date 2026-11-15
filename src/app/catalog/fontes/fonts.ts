/**
 * Candidatas da prova de fontes (PLANO §1, "Fontes fora do padrão").
 * Só para avaliação: a fonte escolhida entra depois por next/font/local, numa mudança do DS.
 *
 * Licenças conferidas em 15 nov 2026:
 * - Fontshare (Indian Type Foundry): ITF Free Font License — uso pessoal e comercial grátis,
 *   inclusive web; restringe redistribuir os arquivos. Por isso os .woff2 da prova ficam fora
 *   do Git (public/fonts/prova/ está no .gitignore). Confira o EULA que vem no .zip.
 * - Unbounded, Geist Mono e Commit Mono: SIL Open Font License 1.1.
 */

export type Candidate = {
  id: string;
  family: string;
  foundry: string;
  license: string;
  source: "fontshare" | "google" | "github";
  /** Arquivo esperado em public/fonts/prova/ (fontes que não vêm do next/font/google). */
  file?: string;
  download: string;
};

export const CANDIDATES: Candidate[] = [
  {
    id: "clash",
    family: "Clash Display",
    foundry: "Indian Type Foundry",
    license: "ITF Free Font License",
    source: "fontshare",
    file: "ClashDisplay-Variable.woff2",
    download: "https://www.fontshare.com/fonts/clash-display",
  },
  {
    id: "cabinet",
    family: "Cabinet Grotesk",
    foundry: "Indian Type Foundry",
    license: "ITF Free Font License",
    source: "fontshare",
    file: "CabinetGrotesk-Variable.woff2",
    download: "https://www.fontshare.com/fonts/cabinet-grotesk",
  },
  {
    id: "unbounded",
    family: "Unbounded",
    foundry: "NaN (estúdio)",
    license: "SIL OFL 1.1",
    source: "google",
    download: "https://fonts.google.com/specimen/Unbounded",
  },
  {
    id: "general",
    family: "General Sans",
    foundry: "Indian Type Foundry",
    license: "ITF Free Font License",
    source: "fontshare",
    file: "GeneralSans-Variable.woff2",
    download: "https://www.fontshare.com/fonts/general-sans",
  },
  {
    id: "satoshi",
    family: "Satoshi",
    foundry: "Indian Type Foundry",
    license: "ITF Free Font License",
    source: "fontshare",
    file: "Satoshi-Variable.woff2",
    download: "https://www.fontshare.com/fonts/satoshi",
  },
  {
    id: "switzer",
    family: "Switzer",
    foundry: "Indian Type Foundry",
    license: "ITF Free Font License",
    source: "fontshare",
    file: "Switzer-Variable.woff2",
    download: "https://www.fontshare.com/fonts/switzer",
  },
  {
    id: "commit",
    family: "Commit Mono",
    foundry: "Eigil Nikolajsen",
    license: "SIL OFL 1.1",
    source: "github",
    file: "CommitMono-Variable.woff2",
    download: "https://commitmono.com",
  },
  {
    id: "geistmono",
    family: "Geist Mono",
    foundry: "Vercel",
    license: "SIL OFL 1.1",
    source: "google",
    download: "https://vercel.com/font",
  },
];

/** Combinações a comparar, além da atual (Sora + Inter + JetBrains Mono). */
export const COMBOS = [
  { id: "a", disp: "clash", num: "clash", ui: "satoshi", mono: "commit" },
  { id: "b", disp: "cabinet", num: "general", ui: "general", mono: "geistmono" },
  { id: "c", disp: "unbounded", num: "general", ui: "switzer", mono: "geistmono" },
  { id: "d", disp: "clash", num: "clash", ui: "general", mono: "commit" },
] as const;
