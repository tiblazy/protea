/**
 * ECharts modular: só os tipos e componentes que as telas usam (PLANO §2).
 * Este módulo é carregado sob demanda pelo <EChart>, fora do bundle inicial.
 */
import * as echarts from "echarts/core";
import { BarChart, CustomChart, FunnelChart, GaugeChart, HeatmapChart, LineChart, PieChart } from "echarts/charts";
import {
  AriaComponent,
  CalendarComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import type { Theme } from "@/core/theme/prefs";
import { buildChartTheme } from "./themes";

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  FunnelChart,
  HeatmapChart,
  CustomChart,
  AriaComponent,
  CalendarComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  TooltipComponent,
  VisualMapComponent,
  LabelLayout,
  CanvasRenderer,
]);

/** (Re)registra o tema com os valores atuais das variáveis CSS e devolve o nome. */
export function registerThemeFromCss(theme: Theme): Theme {
  echarts.registerTheme(theme, buildChartTheme(theme));
  return theme;
}

export { echarts };
