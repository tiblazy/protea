import type { ReactNode } from "react";
import type { Theme } from "./prefs";

/**
 * Mostra o conteúdo só em um tema. Usa as classes `.so-protea` / `.so-essencial` do DS,
 * então funciona em componente de servidor e não pisca na hidratação.
 * `display: contents` evita que o invólucro mexa no layout.
 */
export function OnlyTheme({ theme, children }: { theme: Theme; children: ReactNode }) {
  return (
    <div className={theme === "protea" ? "so-protea contents" : "so-essencial contents"}>{children}</div>
  );
}
