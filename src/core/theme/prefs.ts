/**
 * Preferências de aparência: tema, modo e movimento.
 * Fonte da verdade em tempo de execução: os atributos do <html>
 * (`data-theme`, `data-mode`, `data-motion`). O localStorage só lembra a escolha.
 * Este arquivo não usa APIs de navegador no topo, então serve ao servidor e ao cliente.
 */

export const THEMES = ["protea", "essencial"] as const;
export const MODES = ["orvalho", "seiva"] as const;
/** "system" segue o `prefers-reduced-motion`; "reduced" desliga a animação mesmo sem o sistema pedir. */
export const MOTIONS = ["system", "reduced"] as const;

export type Theme = (typeof THEMES)[number];
export type Mode = (typeof MODES)[number];
export type Motion = (typeof MOTIONS)[number];

export type Prefs = { theme: Theme; mode: Mode; motion: Motion };

export const DEFAULT_PREFS: Prefs = { theme: "protea", mode: "orvalho", motion: "system" };

export const STORAGE_KEYS = {
  theme: "protea:theme",
  mode: "protea:mode",
  motion: "protea:motion",
} as const;

export const ATTRS = {
  theme: "data-theme",
  mode: "data-mode",
  motion: "data-motion",
} as const;

/** Classe do DS (regra 6 de "Seiva sem cansar"): pausa as animações contínuas. */
export const PAUSED_CLASS = "pausado";

/** 90 min de uso contínuo pausam a ambientação (DS §8, regra 6). */
export const PAUSE_AFTER_MS = 90 * 60 * 1000;

const ALLOWED = { theme: THEMES, mode: MODES, motion: MOTIONS } as const;

export function isValid<K extends keyof Prefs>(key: K, value: unknown): value is Prefs[K] {
  return (ALLOWED[key] as readonly unknown[]).includes(value);
}

/**
 * Script inline e bloqueante: aplica as preferências salvas no <html> antes do primeiro
 * paint, para os temas e modos trocarem sem flash. Mantido pequeno e sem dependências.
 */
export function buildThemeScript(): string {
  const cfg = JSON.stringify({ keys: STORAGE_KEYS, attrs: ATTRS, allowed: ALLOWED, defaults: DEFAULT_PREFS });
  return `(function(){try{var c=${cfg},d=document.documentElement;for(var k in c.keys){var v=null;try{v=localStorage.getItem(c.keys[k])}catch(e){}if(c.allowed[k].indexOf(v)<0)v=c.defaults[k];d.setAttribute(c.attrs[k],v)}}catch(e){}})();`;
}
