import type { Theme } from "@/core/theme/prefs";

/**
 * Temas "protea" e "essencial" do ECharts, montados a partir das variáveis CSS do tema
 * ativo (o canvas não entende `var()`, então os valores são lidos já resolvidos).
 * Nenhuma cor nasce aqui: tudo vem de tokens.css / theme.css.
 *
 * Paleta de dados: `--chart-1…4` em theme.css. PROVISÓRIA até o aval (PLANO §9.4).
 * DS §6: no máximo 4 cores por gráfico, grade quase invisível, só na base.
 */
export const DATA_PALETTE_VARS = ["--chart-1", "--chart-2", "--chart-3", "--chart-4"] as const;

function readVars(names: readonly string[]): Record<string, string> {
  const style = getComputedStyle(document.documentElement);
  return Object.fromEntries(names.map((n) => [n, style.getPropertyValue(n).trim()]));
}

function ms(value: string, fallback: number): number {
  const n = Number.parseFloat(value);
  if (Number.isNaN(n)) return fallback;
  return value.endsWith("ms") ? n : n * 1000;
}

export function buildChartTheme(theme: Theme) {
  const v = readVars([
    ...DATA_PALETTE_VARS,
    "--tx",
    "--tx2",
    "--tx3",
    "--musgo",
    "--vidro-borda",
    "--f-ui",
    "--f-disp",
    "--f-mono",
    "--dur",
  ]);
  const axisLine = { show: true, lineStyle: { color: v["--vidro-borda"], width: 1 } };
  const label = { color: v["--tx3"], fontFamily: v["--f-ui"], fontSize: 11 };

  return {
    color: DATA_PALETTE_VARS.map((n) => v[n]),
    backgroundColor: "transparent",
    textStyle: { fontFamily: v["--f-ui"], color: v["--tx2"] },
    title: {
      textStyle: { fontFamily: v["--f-disp"], color: v["--tx"], fontWeight: theme === "protea" ? 600 : 700 },
      subtextStyle: { color: v["--tx2"] },
    },
    legend: { icon: "circle", itemWidth: 8, itemHeight: 8, textStyle: { color: v["--tx2"], fontSize: 11 } },
    tooltip: {
      backgroundColor: v["--musgo"],
      borderColor: v["--vidro-borda"],
      borderWidth: 1,
      padding: [8, 12],
      textStyle: { color: v["--tx"], fontFamily: v["--f-ui"], fontSize: 12 },
      extraCssText: "border-radius:12px;font-feature-settings:'tnum' 1;",
    },
    categoryAxis: {
      axisLine,
      axisTick: { show: false },
      axisLabel: label,
      splitLine: { show: false },
    },
    valueAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: label,
      splitLine: { show: false },
    },
    timeAxis: { axisLine, axisTick: { show: false }, axisLabel: label, splitLine: { show: false } },
    line: { smooth: true, symbol: "none", lineStyle: { width: 2 } },
    bar: { barMaxWidth: 18, itemStyle: { borderRadius: [6, 6, 0, 0] } },
    pie: { itemStyle: { borderWidth: 0 } },
    // revelação: base (barras) / esquerda (linhas), na duração do modo (DS §8)
    animationDuration: ms(v["--dur"], 700),
    animationEasing: "cubicOut",
  };
}
