import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeControls } from "./ThemeControls";

export const metadata: Metadata = { title: "Catálogo", robots: { index: false } };

// Catálogo de desenvolvimento: não existe em produção.
export default function CatalogLayout({ children }: LayoutProps<"/catalog">) {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 p-6 md:p-10">
      <header className="glass flex flex-wrap items-center justify-between gap-4 px-5 py-4">
        <nav aria-label="Catálogo" className="flex items-center gap-5">
          <span className="font-disp text-sm font-semibold tracking-[.26em] uppercase">Protea · catálogo</span>
          <Link href="/catalog" className="lbl hover:text-tx">
            Fundamentos
          </Link>
          <Link href="/catalog/fontes" className="lbl hover:text-tx">
            Prova de fontes
          </Link>
        </nav>
        <ThemeControls />
      </header>
      {children}
    </div>
  );
}
