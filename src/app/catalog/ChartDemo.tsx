"use client";

import { EChart, type ChartOption } from "@/core/charts";

// Ritmo da semana 46 (10–16 nov): tarefas planejadas × feitas. Total 32/40 (AREAS.md).
const DAYS = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"];
const PLANNED = [7, 8, 8, 7, 6, 2, 2];
const DONE = [6, 7, 8, 6, 4, 1, 0];

const option: ChartOption = {
  grid: { left: 8, right: 8, top: 24, bottom: 8, containLabel: true },
  legend: { top: 0, right: 0 },
  tooltip: { trigger: "axis" },
  xAxis: { type: "category", data: DAYS },
  yAxis: { type: "value" },
  series: [
    { name: "Planejadas", type: "bar", data: PLANNED },
    { name: "Feitas", type: "bar", data: DONE },
  ],
};

export function ChartDemo() {
  return (
    <EChart
      option={option}
      ariaLabel="Tarefas planejadas e feitas por dia na semana 46: 32 de 40 concluídas."
      table={{
        caption: "Tarefas por dia, semana 46",
        columns: ["Dia", "Planejadas", "Feitas"],
        rows: DAYS.map((d, i) => [d, PLANNED[i], DONE[i]]),
      }}
      height={240}
    />
  );
}
