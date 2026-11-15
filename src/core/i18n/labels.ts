import type { Theme } from "@/core/theme/prefs";

/**
 * Textos em par Protea / Essencial (docs/AREAS.md, tabela "Mapa" e "Outros pares",
 * e os rótulos de design/referencia/jardim.html).
 * A chave usa o nome consolidado, que não muda com o tema.
 * Texto que não muda de nome não entra aqui.
 */
export const labels = {
  // áreas
  "area.overview": { protea: "Jardim", essencial: "Visão geral" },
  "area.agenda": { protea: "Estações", essencial: "Agenda" },
  "area.notes": { protea: "Herbário", essencial: "Notas" },
  "area.projects": { protea: "Estufa", essencial: "Projetos" },
  "area.crm": { protea: "Sementeira", essencial: "CRM" },
  "area.dev": { protea: "Raízes", essencial: "Dev" },
  "area.finance": { protea: "Colheita", essencial: "Financeiro" },
  "area.focus": { protea: "Floração", essencial: "Foco" },
  "area.activity": { protea: "Anéis", essencial: "Atividade" },

  // linha de apoio do menu: só no Protea
  "areaHint.overview": { protea: "visão geral", essencial: "" },
  "areaHint.agenda": { protea: "agenda · Calendly", essencial: "" },
  "areaHint.notes": { protea: "notas e páginas", essencial: "" },
  "areaHint.projects": { protea: "projetos e tarefas", essencial: "" },
  "areaHint.crm": { protea: "leads e propostas", essencial: "" },
  "areaHint.dev": { protea: "código e sites", essencial: "" },
  "areaHint.finance": { protea: "financeiro", essencial: "" },
  "areaHint.focus": { protea: "foco · Orvalho e Seiva", essencial: "" },
  "areaHint.activity": { protea: "atividade", essencial: "" },

  // modos
  "mode.calm": { protea: "Orvalho", essencial: "Pomodoro" },
  "mode.flow": { protea: "Seiva", essencial: "Flow" },
  "mode.startCalm": { protea: "Iniciar Orvalho", essencial: "Iniciar Pomodoro" },
  "mode.startFlow": { protea: "Entrar em Seiva", essencial: "Iniciar Flow" },
  "mode.bestTime": {
    protea: "Seiva rende mais para você entre 10h e 12h.",
    essencial: "Flow rende mais para você entre 10h e 12h.",
  },

  // funil
  "crm.stage.new": { protea: "Sementes", essencial: "Novos" },

  // Jardim
  "overview.tagline": {
    protea: "Seu trabalho está ganhando forma.",
    essencial: "Tudo o que importa nesta semana.",
  },
  "overview.nextSteps.from": {
    protea: "Da Estufa, da Sementeira e da Colheita",
    essencial: "De projetos, CRM e financeiro",
  },
  "overview.taskRhythm": { protea: "Estufa · ritmo das tarefas", essencial: "Tarefas · ritmo da semana" },
  "overview.funnel": { protea: "Sementeira · funil", essencial: "CRM · funil" },
  "overview.cashFlow": { protea: "Colheita · fluxo de caixa", essencial: "Financeiro · fluxo de caixa" },
  "overview.focusWeek": { protea: "Floração · semana", essencial: "Foco · semana" },
  "overview.focusMode": { protea: "Floração · modo de foco", essencial: "Foco · modo" },
  "overview.activityWeeks": { protea: "Anéis · 20 semanas", essencial: "Atividade · 20 semanas" },
  "overview.mostTimeIn": { protea: " · mais tempo na Estufa", essencial: " · mais tempo em Projetos" },

  // seletor de tema
  "theme.protea": { protea: "Protea", essencial: "Protea" },
  "theme.essencial": { protea: "Essencial", essencial: "Essencial" },
} as const satisfies Record<string, Record<Theme, string>>;

export type LabelKey = keyof typeof labels;
