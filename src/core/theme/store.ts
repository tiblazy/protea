import { ATTRS, DEFAULT_PREFS, isValid, STORAGE_KEYS, type Prefs } from "./prefs";

/**
 * Loja mínima sobre os atributos do <html>. Quem escreve é `setPref`; quem lê é
 * `useSyncExternalStore`, que no servidor e na hidratação usa `DEFAULT_PREFS`
 * e logo depois o valor real (já aplicado pelo script inline, sem flash visual).
 */

let cache: Prefs = DEFAULT_PREFS;
let cacheKey = "";

function readFromDom(): Prefs {
  const el = document.documentElement;
  const theme = el.getAttribute(ATTRS.theme);
  const mode = el.getAttribute(ATTRS.mode);
  const motion = el.getAttribute(ATTRS.motion);
  return {
    theme: isValid("theme", theme) ? theme : DEFAULT_PREFS.theme,
    mode: isValid("mode", mode) ? mode : DEFAULT_PREFS.mode,
    motion: isValid("motion", motion) ? motion : DEFAULT_PREFS.motion,
  };
}

export function getSnapshot(): Prefs {
  const next = readFromDom();
  const key = `${next.theme}|${next.mode}|${next.motion}`;
  if (key !== cacheKey) {
    cacheKey = key;
    cache = next;
  }
  return cache;
}

export function getServerSnapshot(): Prefs {
  return DEFAULT_PREFS;
}

export function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: Object.values(ATTRS),
  });
  return () => observer.disconnect();
}

export function setPref<K extends keyof Prefs>(key: K, value: Prefs[K]): void {
  if (!isValid(key, value)) return;
  document.documentElement.setAttribute(ATTRS[key], value);
  try {
    localStorage.setItem(STORAGE_KEYS[key], value);
  } catch {
    // Sem armazenamento (aba privada, bloqueio): a escolha vale só nesta visita.
  }
}

/** Aplica no <html> uma mudança feita em outra aba. */
export function applyFromStorage(storageKey: string | null, value: string | null): void {
  for (const key of Object.keys(STORAGE_KEYS) as (keyof Prefs)[]) {
    if (STORAGE_KEYS[key] !== storageKey) continue;
    const next = isValid(key, value) ? value : DEFAULT_PREFS[key];
    document.documentElement.setAttribute(ATTRS[key], next);
  }
}
