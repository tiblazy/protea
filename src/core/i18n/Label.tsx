import { labels, type LabelKey } from "./labels";

/**
 * Texto visível em par, sem flash: renderiza as duas versões e o CSS do tema
 * (`.so-protea` / `.so-essencial`) esconde a outra, inclusive dos leitores de tela.
 * Funciona em componente de servidor. Para atributos (aria-label, title, placeholder),
 * use `useT()` no cliente.
 */
export function T({ k }: { k: LabelKey }) {
  const pair = labels[k];
  if (pair.protea === pair.essencial) return <>{pair.protea}</>;
  return (
    <>
      {pair.protea && <span className="so-protea">{pair.protea}</span>}
      {pair.essencial && <span className="so-essencial">{pair.essencial}</span>}
    </>
  );
}
