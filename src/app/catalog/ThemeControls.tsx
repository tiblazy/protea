"use client";

import type { ReactNode } from "react";
import { T } from "@/core/i18n";
import { useTheme, type Mode, type Motion, type Theme } from "@/core/theme";
import { cn } from "@/shared/lib/utils";

type Option<V extends string> = { value: V; label: ReactNode };

function Segmented<V extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: V;
  options: Option<V>[];
  onChange: (v: V) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-1 rounded-pill border border-vidro-borda p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "h-8 rounded-pill px-3 text-[10.5px] font-bold tracking-[.14em] uppercase text-tx2",
            "aria-pressed:bg-ponta/15 aria-pressed:text-ponta",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Troca tema, modo e movimento para conferir as 4 combinações + reduzido. */
export function ThemeControls() {
  const { theme, mode, motion, setTheme, setMode, setMotion, reducedMotion, paused } = useTheme();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Segmented<Theme>
        label="Tema"
        value={theme}
        onChange={setTheme}
        options={[
          { value: "protea", label: "Protea" },
          { value: "essencial", label: "Essencial" },
        ]}
      />
      <Segmented<Mode>
        label="Modo"
        value={mode}
        onChange={setMode}
        options={[
          { value: "orvalho", label: <T k="mode.calm" /> },
          { value: "seiva", label: <T k="mode.flow" /> },
        ]}
      />
      <Segmented<Motion>
        label="Movimento"
        value={motion}
        onChange={setMotion}
        options={[
          { value: "system", label: "Sistema" },
          { value: "reduced", label: "Reduzido" },
        ]}
      />
      <span className="text-xs text-tx3" aria-live="polite">
        {reducedMotion ? "sem animação" : "com animação"}
        {paused ? " · pausado" : ""}
      </span>
    </div>
  );
}
