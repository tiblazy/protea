import type {
  BarSeriesOption,
  CustomSeriesOption,
  FunnelSeriesOption,
  GaugeSeriesOption,
  HeatmapSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from "echarts/charts";
import type {
  CalendarComponentOption,
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
  VisualMapComponentOption,
} from "echarts/components";
import type { ComposeOption } from "echarts/core";

/** Opção do ECharts restrita ao que está registrado em echarts.ts. */
export type ChartOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | GaugeSeriesOption
  | FunnelSeriesOption
  | HeatmapSeriesOption
  | CustomSeriesOption
  | CalendarComponentOption
  | DatasetComponentOption
  | GridComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | VisualMapComponentOption
>;

/** Tabela alternativa (sr-only) com os mesmos dados do gráfico. */
export type ChartTable = {
  caption?: string;
  columns: readonly string[];
  rows: ReadonlyArray<ReadonlyArray<string | number>>;
};
