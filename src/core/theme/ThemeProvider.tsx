"use client";

import { createContext, use, useCallback, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { PAUSE_AFTER_MS, PAUSED_CLASS, type Mode, type Motion, type Prefs, type Theme } from "./prefs";
import { applyFromStorage, getServerSnapshot, getSnapshot, setPref, subscribe } from "./store";

type ThemeContextValue = Prefs & {
  setTheme: (theme: Theme) => void;
  setMode: (mode: Mode) => void;
  setMotion: (motion: Motion) => void;
  /** Verdadeiro se o sistema ou o app pedem para reduzir movimento. Gráficos e mascote leem daqui. */
  reducedMotion: boolean;
  /** Ambientação pausada: janela fora de foco ou 90 min seguidos (regra 6). */
  paused: boolean;
  /** Retoma a ambientação depois da pausa dos 90 min. */
  resume: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
const getReducedServer = () => false;

function subscribeFocus(onChange: () => void) {
  window.addEventListener("focus", onChange);
  window.addEventListener("blur", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.removeEventListener("focus", onChange);
    window.removeEventListener("blur", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}
const getFocused = () => document.visibilityState === "visible" && document.hasFocus();
const getFocusedServer = () => true;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const prefs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const systemReduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);
  const focused = useSyncExternalStore(subscribeFocus, getFocused, getFocusedServer);

  // Relógio dos 90 min: recomeça ao trocar de modo ou ao retomar.
  const [cycle, setCycle] = useState(0);
  const [expiredCycle, setExpiredCycle] = useState<number | null>(null);
  const expired = expiredCycle === cycle;

  useEffect(() => {
    const id = window.setTimeout(() => setExpiredCycle(cycle), PAUSE_AFTER_MS);
    return () => window.clearTimeout(id);
  }, [cycle, prefs.mode]);

  const paused = !focused || expired;

  useEffect(() => {
    document.documentElement.classList.toggle(PAUSED_CLASS, paused);
  }, [paused]);

  // Mesma escolha em todas as abas abertas.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => applyFromStorage(e.key, e.newValue);
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const resume = useCallback(() => setCycle((c) => c + 1), []);
  const setMode = useCallback((mode: Mode) => {
    setPref("mode", mode);
    setCycle((c) => c + 1);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      ...prefs,
      setTheme: (theme) => setPref("theme", theme),
      setMode,
      setMotion: (motion) => setPref("motion", motion),
      reducedMotion: systemReduced || prefs.motion === "reduced",
      paused,
      resume,
    }),
    [prefs, setMode, systemReduced, paused, resume],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme(): ThemeContextValue {
  const ctx = use(ThemeContext);
  if (!ctx) throw new Error("useTheme precisa estar dentro de <ThemeProvider>.");
  return ctx;
}
