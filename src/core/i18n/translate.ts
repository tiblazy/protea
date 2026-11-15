import type { Theme } from "@/core/theme/prefs";
import { labels, type LabelKey } from "./labels";

/** Texto da chave no tema pedido. Função pura: serve ao servidor, ao cliente e aos testes. */
export function t(key: LabelKey, theme: Theme): string {
  return labels[key][theme];
}
