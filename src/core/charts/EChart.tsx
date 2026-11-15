"use client";

import { useEffect, useRef, useState } from "react";
import { getSnapshot } from "@/core/theme/store";
import { useTheme } from "@/core/theme/ThemeProvider";
import { cn } from "@/shared/lib/utils";
import type { ChartOption, ChartTable } from "./types";

type EChartsLib = typeof import("./echarts");
type ChartInstance = ReturnType<EChartsLib["echarts"]["init"]>;

type EChartProps = {
  option: ChartOption;
  /** Obrigatório: o que o gráfico mostra, em uma frase. */
  ariaLabel: string;
  /** Obrigatório: os mesmos dados em tabela, lida por leitores de tela. */
  table: ChartTable;
  height?: number | string;
  /** Padrões (decal) sobre as séries, para não depender só da cor. */
  decal?: boolean;
  className?: string;
};

/**
 * Wrapper acessível do ECharts (PLANO §1 e §4):
 * - `ariaLabel` e `table` obrigatórios; a tabela fica em `sr-only`;
 * - ECharts carregado sob demanda, só no cliente;
 * - tema lido das variáveis CSS e trocado ao vivo com o tema/modo;
 * - revela uma vez; sem animação com movimento reduzido.
 */
export function EChart({ option, ariaLabel, table, height = 240, decal = false, className }: EChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const libRef = useRef<EChartsLib | null>(null);
  const chartRef = useRef<ChartInstance | null>(null);
  const revealed = useRef(false);
  const [ready, setReady] = useState(false);
  const { theme, mode, reducedMotion } = useTheme();

  useEffect(() => {
    let cancelled = false;
    let observer: ResizeObserver | undefined;
    import("./echarts").then((lib) => {
      const el = ref.current;
      if (cancelled || !el) return;
      libRef.current = lib;
      // O tema entra já no init: o setTheme do ECharts não age antes do primeiro setOption.
      const initial = lib.registerThemeFromCss(getSnapshot().theme);
      chartRef.current = lib.echarts.init(el, initial, { renderer: "canvas" });
      observer = new ResizeObserver(() => chartRef.current?.resize());
      observer.observe(el);
      setReady(true);
    });
    return () => {
      cancelled = true;
      observer?.disconnect();
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, []);

  // Tema do gráfico segue o tema e o modo (as variáveis CSS já mudaram no <html>).
  useEffect(() => {
    const lib = libRef.current;
    const chart = chartRef.current;
    if (!ready || !lib || !chart) return;
    chart.setTheme(lib.registerThemeFromCss(theme));
  }, [ready, theme, mode]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!ready || !chart) return;
    const animate = !reducedMotion && !revealed.current && option.animation !== false;
    chart.setOption(
      {
        ...option,
        animation: animate,
        aria: { enabled: decal, label: { enabled: false }, decal: { show: decal } },
      },
      { notMerge: true },
    );
    revealed.current = true;
  }, [ready, option, reducedMotion, decal, theme]);

  return (
    <figure className={cn("relative m-0", className)}>
      <div
        ref={ref}
        role="img"
        aria-label={ariaLabel}
        aria-busy={!ready}
        tabIndex={0}
        className="w-full rounded-item outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ height }}
      />
      <table className="sr-only">
        {table.caption && <caption>{table.caption}</caption>}
        <thead>
          <tr>
            {table.columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={j}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
