# Protea — ideias, decisões e roadmap

> Documento vivo. Reúne tudo o que foi pensado até aqui: o que já tem tela no canvas, por que existe, o que pode melhorar e o que ainda precisa ser analisado antes de virar código.
> Última atualização: 15 nov 2026.

**Canvas de design (privado):** https://claude.ai/artifact/8XjykxuVgqCjUYGkb4WW4Y
**PNGs:** `telas-final/` (21 telas finais v4, 1600 × 1000, exportadas em 2×)

---

> **Atualização 15 nov 2026 — identidade v3.** Visual e nomes oficiais agora estão em [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) e [`docs/AREAS.md`](docs/AREAS.md); em conflito, eles valem.
> Nomes novos: Dashboard → **Jardim** · Agenda → **Estações** · Caderno → **Herbário** · Projetos/Tarefas → **Estufa** · CRM → **Sementeira** · Oficina → **Raízes** · Financeiro → **Colheita** · Foco → **Floração** · Atividade → **Anéis**. Modos: Ciclo Protea → **Orvalho**, Flow → **Seiva**.
> A paleta e o `protea.css` citados na seção 4 foram substituídos por `design/tokens/protea.css`. Este arquivo segue valendo para motivações, backlog, integrações e pendências.

## 1. A ideia central

**Um só lugar.** Você é dev freelancer e hoje o trabalho está espalhado: ClickUp para tarefas, Notion para notas, planilha para leads, banco e planilha para dinheiro, Calendly para agenda, GitHub/Vercel para código, app de Pomodoro para foco. A Protea junta tudo isso num espaço só, onde **uma ação numa área mexe nas outras** (lead aceita proposta → projeto, tarefas, cobrança, página de onboarding e repositório são criados).

Princípios que guiaram as telas:

1. **Conectar antes de acumular.** Toda tela mostra "de onde veio" e "para onde vai" (ex.: painel *Conectado a* no Caderno, *Quando ela aceitar* nas Propostas).
2. **Feito para uma pessoa só.** Nada de responsáveis, times ou permissões. Coluna "Aguardando cliente", valor real da hora, retirada, reserva e impostos guardados são cidadãos de primeira classe.
3. **Foco sem culpa.** Interrupção não apaga histórico, pausa é sugerida e não imposta, nada de "você quebrou a sequência".
4. **Cor só com significado.** Cada área tem uma cor; o gradiente de marca aparece só na ação principal.
5. **Dados coerentes.** Os números de exemplo batem entre telas (ver seção 9).

---

## 2. Sobre o nome

O nome **Protea** vem da sua inspiração no Warframe. Essa origem fica registrada aqui como motivação pessoal do projeto.

**Decisão de design:** a identidade visual, o logo, as ilustrações e os nomes das funções **não usam a personagem** nem elementos dela, porque ela é propriedade da Digital Extremes. O visual usa a **flor protea** (que também dá nome à personagem), o que permite publicar, vender ou abrir o código no futuro sem risco de marca.

**A analisar:** uma direção visual alternativa "tecno-orgânica" **original** (flor + engenharia: linhas técnicas, módulos encaixáveis, brilho de circuito), sem semelhança com a personagem. Pode conviver com a identidade atual como um tema.

---

## 3. Mapa do canvas (17 telas)

| # | Tela | O que resolve |
|---|------|---------------|
| 01 | Identidade | Paleta com papéis, tipografia, componentes, escala de calor |
| 02 | Dashboard | Visão do dia: próximo compromisso, KPIs, ritmo, funil, caixa, modo de foco, ritmo de 20 semanas |
| 03 | Atividade | Mapa de calor anual (estilo GitHub), por hora e por área, padrões que funcionam |
| 04 | Foco · Ciclo Protea | Pomodoro calmo, animado (respiração 4s/6s) |
| 05 | Foco · Flow | Flowtime turbinado, animado (partículas, fita líquida, brilho) |
| 06 | Agenda | Semana com foco + calls do Calendly sem conflito |
| 07 | Modo ambiente | Regras de como o app inteiro muda em cada modo |
| 08 | Estufa · Projetos | Horas usadas × contratadas, valor real da hora, risco |
| 09 | Estufa · Tarefas | Quadro estilo ClickUp, modo de foco sugerido por tarefa |
| 10 | CRM · Funil | Pipeline com score, canais, nota do Maps |
| 11 | CRM · Importar/exportar CSV | Validação, deduplicação, filtros de prospecção |
| 12 | CRM · Proposta | Escopo estimado pelo histórico + automações no aceite |
| 13 | Financeiro · Visão geral | Fluxo 12 meses + 90 dias, regra dos R$ 100, teto MEI |
| 14 | Financeiro · Cobranças | Cobranças, NF, lembrete gentil, impostos e reserva |
| 15 | Caderno | Notion: páginas, blocos, banco embutido, menu "/" |
| 16 | Busca global | Ctrl K em tudo + ações + integrações |
| 17 | Oficina | Sites dos clientes, PRs, renovações, horas por repo, cofre |

---

## 4. Identidade (design system)

**Fundo:** Noite `#0C0A14`, superfícies de vidro (4–11% de branco, blur 22px, borda 15%).
**Marca:** gradiente **Bráctea** `#FFC9D6 → #EE8FA8 → #B48CF0` — só na ação principal e num destaque por tela.

| Cor | Hex | Papel |
|-----|-----|-------|
| Rosa Protea | `#EE8FA8` | Estufa (projetos e tarefas) |
| Orquídea | `#B48CF0` | CRM · saídas nos gráficos |
| Folha | `#8FC7A6` | Financeiro · entradas · concluído · Ciclo |
| Pólen | `#F2BE78` | Foco · atenção · Flow |
| Orvalho | `#8DB7F0` | Agenda · "fazendo" · informação |
| Marfim | `#E9E2D8` | Caderno |
| Seiva | `#6FD0C2` | Oficina |
| Espinho | `#F2727F` | Atraso, erro, duplicado — nunca decorativo |

Gradientes de modo: **Calma** (sálvia → orvalho) e **Turbo** (pólen → rosa).
Tipografia: **Sora** (títulos em caixa alta, números finos/pesados), **Inter** (interface), **JetBrains Mono** (código).
Regras: máximo de 4 cores por gráfico; rótulos em caixa alta espaçada; tudo respeita `prefers-reduced-motion`.

Arquivo: `protea.css` no canvas concentra tokens e componentes (vidro, chips, status, menu, mapa de calor).

**Melhorias a analisar**
- [ ] Publicar como artefato "Design System" separado e usar nas próximas telas.
- [ ] Tema claro (estufa de dia) — hoje só existe o escuro.
- [ ] Checar contraste AA de todos os rótulos de 9,5–10,5px sobre vidro.
- [ ] Ciclo e Flow ainda têm CSS próprio; migrar para `protea.css` + classes `.app.calma` / `.app.turbo`.

---

## 5. Áreas — o que existe, por quê, e o que melhorar

### Dashboard
**Por quê:** abrir o app e saber em 10 segundos o que fazer agora.
- Protea 3D animada (pétalas em CSS 3D girando), próximo compromisso do Calendly, valor da hora, mapa de calor curto, seletor Ciclo/Flow.
- **Melhorias:** dashboard configurável (arrastar cartões); estado "modo ativo" com a pílula flutuante; versão mobile; resumo da manhã ("3 coisas para hoje").

### Agenda (Calendly + Google Agenda)
**Por quê:** nunca marcar duas coisas no mesmo horário e proteger os blocos de foco.
- Blocos de foco bloqueiam o Calendly; intervalo de 15 min após calls; máx. 2 calls/dia; calls só depois das 14h; "conflito evitado" registrado.
- **A analisar:** como o Calendly lê a disponibilidade (normalmente pela agenda conectada — os blocos da Protea precisam virar eventos "ocupado" no Google Agenda). Cada call nova cria/atualiza o lead.
- **Melhorias:** planejamento da semana arrastando tarefas para a agenda; tempo de deslocamento para reuniões presenciais.

### Estufa — Projetos e Tarefas
**Por quê:** substituir o ClickUp com o que importa para um freelancer.
- Projetos: etapas Escopo → Dev → Testes → Deploy, horas usadas × contratadas, valor real da hora, alerta "em risco", próxima tarefa.
- Tarefas: colunas A fazer · Fazendo · Em revisão · **Aguardando cliente** · Concluído; prioridade, prazo, subtarefas, estimativa, modo de foco sugerido; "lembrar no WhatsApp".
- **Ideia:** o tempo "aguardando cliente" pausa o relógio do projeto (protege seu prazo).
- **Nome da área (opções):** Estufa (usado), Ateliê, Canteiro, Jardim, Produção.
- **Melhorias:** visão Lista, Calendário e Linha do tempo (só desenhado o Quadro); dependências entre tarefas; modelos de projeto (site institucional, e-commerce, manutenção).

### CRM — Leads, Propostas, Importação
**Por quê:** prospectar com método e não perder lead em planilha.
- Funil: Novos 18 · Contato 13 · Reunião 5 · Proposta 6 · Fechado; score 0–100; canais (WhatsApp/Instagram/site); nota e avaliações do Maps; origem do lead.
- Importar CSV: 340 lidos → 319 válidos → 282 únicos → 264 novos → 128 no filtro.
  - Deduplicação: mesmo telefone/WhatsApp normalizado, mesmo domínio, mesmo @, nome + endereço 90% iguais.
  - Filtros: data de importação, nicho, cidade, WhatsApp, Instagram ativo, site (não tem / fraco), nota 4,5+, 50+ avaliações, potencial 70+.
  - Coluna "por que abordar" (sinal de oportunidade).
- Score (a calibrar): sem site/site fraco +25 · nota 4,5+ com 50+ avaliações +20 · nicho que já fechou +20 · Instagram ativo + WhatsApp +20 · até 8 km +15 · sem resposta 2× −20.
- Propostas: escopo por itens com horas, margem de 15%, hora alvo R$ 140, prévia do cliente, aceite e assinatura; no aceite cria projeto, cobrança do sinal, página de onboarding, repositório e kickoff.
- **Regras prontas para o código:** [`docs/regras/LEADS.md`](docs/regras/LEADS.md) — campos novos do lead (horário de funcionamento, movimento por hora, presença digital, decisor, toques, LGPD), complementos do score, catálogo de sinais, **melhor horário de envio** (horário e movimento do lead, movimento do nicho, histórico de respostas, feriados e agenda da Tiburcio), cadência D0/D+3/D+7 e envio manual assistido no WhatsApp.
- **Melhorias:** sequências de follow-up; templates de mensagem por nicho; aprender o score com os seus fechamentos reais; mapa dos leads; rastrear abertura da proposta.
- **A analisar (importante):** LGPD na prospecção a partir de scrapers (base legal, opção de sair, retenção dos dados); políticas do WhatsApp Business para a primeira mensagem; termos de uso das ferramentas de scraping.

### Financeiro
**Por quê:** freelancer não tem RH nem contador interno; o app precisa pensar por você.
- Recebido, a receber, custos, imposto guardado, retirada (pró-labore), reserva em meses de custo de vida.
- Fluxo de 12 meses + previsão de 90 dias; regra "cada R$ 100 que entra" (55 você · 25 reserva/caixa · 14 custos · 6 imposto); concentração por cliente; valor real da hora; faturamento × teto do MEI.
- Cobranças com NF, Pix/boleto/cartão, lembrete gentil por WhatsApp (3 dias antes, no dia, 3 depois), exportar para a contadora.
- **Fatos usados (conferir de tempos em tempos):** teto do MEI R$ 81 mil/ano; DAS-MEI serviços R$ 86,05 (2026). Acima do teto → Simples Nacional; a alíquota de 6% é estimativa — **confirmar com contadora**.
- **Melhorias:** separar PF/PJ; conciliação via Open Finance; metas de faturamento; simulador "se eu fechar a proposta X"; recibos e contratos anexados.

### Foco — Ciclo Protea e Flow
**Por quê:** dois ritmos para dois tipos de trabalho.
- Ciclo (Pomodoro) 25/5, longa após 4, tudo ajustável; respiração guiada; interrupção registrada sem culpa.
- Flow (Flowtime) sem relógio, contagem progressiva, média e recorde, pausa proporcional (1/5), captura de ideias, horário em que você rende mais.
- **Melhorias:** tarefa sugerida para o modo ("isto pede Flow"); som opcional; integração com commits (detectar fluxo pela atividade no Git).

### Modo ambiente
**Por quê:** o modo de foco deve ser sentido no app inteiro, não só na tela do timer.
- Calmo: 600–800 ms, luz que respira, só o essencial, avisos agrupados para a pausa.
- Flow: 150–250 ms, molas, partículas, fita líquida, avisos silenciados, Calendly bloqueado.
- Pílula flutuante com o tempo em qualquer tela.
- **Implementação sugerida:** atributo `data-mode="calma|flow"` no `<html>` trocando tokens CSS (`--accent`, `--dur`, `--ease`) + camada de fundo animada; sempre desligar com `prefers-reduced-motion`.

### Atividade (mapa de calor)
**Por quê:** saber quando e onde você rende — e usar isso para planejar.
- Ano inteiro (estilo GitHub), sequência atual/maior, dia mais forte; hora × dia; energia por área (Estufa 41%, CRM 22%, Foco 14%, Agenda 14%, Financeiro 9%); padrões ("propostas na terça de manhã respondem 2× mais").
- **A analisar:** o que conta como "atividade" e o peso de cada coisa (tarefa concluída, lead movido, sessão de foco, commit, cobrança).

### Caderno (Notion)
**Por quê:** guardar processos, snippets, estudos e coisas pessoais no mesmo lugar do trabalho.
- Árvore de páginas, favoritos, bancos de dados; blocos (texto, título, checklist, código, tabela, callout); menu "/" com blocos da Protea (tarefa, lead, snippet); menções com @; painel *Conectado a*; captura rápida (Ctrl Shift N).
- **Nome (opções):** Caderno (usado), Herbário, Sementeira, Raiz.
- **Melhorias:** modelos (onboarding, checklist de deploy, proposta padrão, pós-entrega); versões da página; exportar para Markdown; links bidirecionais; editor colaborativo com o cliente em páginas específicas.

### Busca global (Ctrl K)
**Por quê:** se tudo está num lugar, achar precisa ser instantâneo.
- Ações primeiro (iniciar Flow, nova tarefa, lançar horas), depois resultados de todas as áreas, filtro por área com Tab.
- **Melhorias:** busca por linguagem natural ("quanto a Aurora me deve?"); histórico de comandos; atalhos personalizáveis.

### Oficina (dev)
**Por quê:** o lado técnico do freelancer também vira dinheiro e risco.
- Sites dos clientes (uptime, desempenho, último deploy, domínio), PRs e issues, renovações para repassar ao cliente, horas por repositório (commits + foco), cofre de acessos.
- **Ideia de receita:** manutenção mensal recorrente (hoje R$ 680/mês com 2 clientes) e oferta automática para quem não tem plano.
- **A analisar (segurança):** cofre com criptografia ponta a ponta, senha mestra, nunca guardar segredo em texto puro; avaliar integrar com um gerenciador existente (1Password/Bitwarden) em vez de criar um do zero.

---

## 6. Ideias ainda sem tela (backlog)

| Ideia | Motivação | Prioridade sugerida |
|-------|-----------|---------------------|
| **Portal do cliente** | Cliente vê progresso, prévias, aprova, envia arquivos e paga num link só dele. Menos WhatsApp, menos "como está?" | Alta |
| **Timesheet faturável** | Horas do Foco + commits viram relatório e cobrança por hora | Alta |
| **Contratos e aditivos** | Modelos com assinatura; aditivo nasce quando o escopo cresce (ver Casa Oliva em risco) | Alta |
| **Inbox de feedback** | Cliente marca bug na prévia → issue no GitHub + tarefa na Estufa | Média |
| **Planos de manutenção** | Receita recorrente, renovação e cobrança automáticas | Média |
| **Limite de horas por semana** | Alerta de sobrecarga sem culpa; sugere recusar/adiar | Média |
| **Captura rápida global** | Atalho de qualquer lugar (até fora do app) para o Caderno | Média |
| **Resumo semanal** | Toda sexta: o que entregou, quanto ganhou, como foi o foco | Média |
| **Metas e trimestre** | Objetivos (faturamento, portfólio, estudo) ligados às áreas | Baixa |
| **Modo offline / PWA** | Usar no celular e sem internet | Baixa |
| **Tema tecno-orgânico original** | Alternativa visual mais "tech" sem usar personagem | A avaliar |

---

## 7. Integrações previstas

GitHub · Vercel/Netlify · Calendly · Google Agenda · WhatsApp Business · Conta PJ (Open Finance) · Emissor de NF de serviço · Monitor de uptime · Scrapers (Apify, Outscraper) e CSV · PageSpeed Insights (desempenho do site do lead) · calendário de feriados (nacional, CE, Fortaleza).

O movimento por hora ("Popular Times") não vem da API oficial do Google Places, só de scrapers; tratar como opcional e instável (ver regras/LEADS.md §10).

**A analisar:** custo e limites de cada API; quais têm webhooks (evita ficar consultando); o que fazer quando uma integração cai (a Protea precisa funcionar sem elas).

---

## 8. Sugestão técnica (para discutir, não decidido)

- **App:** Next.js (App Router) + TypeScript; você já usa no dia a dia de cliente.
- **Dados:** Postgres (Supabase ou Neon) com tabelas por área e uma tabela de **eventos** (base do mapa de calor e das automações).
- **Automações:** fila de jobs para webhooks (aceite de proposta, pagamento, deploy).
- **Editor do Caderno:** avaliar editores em blocos prontos (ex.: TipTap/BlockNote) em vez de criar do zero.
- **Busca:** índice full-text do Postgres no começo; vetorial depois, se quiser busca em linguagem natural.
- **Design:** `protea.css` vira tokens (CSS variables) + componentes.

---

## 9. Dados de exemplo (para manter coerência)

- Persona: Tiburcio Martins, dev freelancer, Fortaleza.
- Semana: 10–16 nov 2026 · tarefas 32/40 (80%) · foco 12h40 de 16h (79%) · 28 ciclos + 2 Flow.
- Funil: 42 leads = 18 novos + 24 em conversa (13 contato + 5 reunião + 6 proposta); propostas R$ 32.600; fechados nov R$ 14.200.
- Financeiro nov: recebido R$ 12.800 · a receber R$ 8.250 (3.200 + 3.450 + 1.600) · a pagar R$ 3.640 (290 + 2.582 + 768) · saldo projetado R$ 17.410 · faturado 2026 R$ 107.900.
- Proposta Nativa: 51h + 15% = 59h × R$ 140 → R$ 8.500.

---

## 10. Pendências conhecidas no design

- [ ] Ciclo e Flow com CSS próprio (migrar para `protea.css`).
- [ ] Cobranças: "Notas fiscais 7/8" deveria considerar a 2ª parcela da Aurora.
- [ ] Busca: fundo "fantasma" está escuro demais; mostrar o dashboard real borrado.
- [ ] Dashboard: últimas células do mapa de 20 semanas marcadas como futuras.
- [ ] Caderno: menu "/" cobre o bloco de código (ok para o protótipo, revisar).
- [ ] Faltam versões mobile e tema claro.
- [ ] Faltam estados vazios, de carregamento e de erro.

---

## 11. Próximos passos sugeridos

1. Revisar este documento e marcar o que entra no MVP.
2. MVP sugerido: Estufa (tarefas) + Caderno + Foco + Agenda/Calendly — é o que você usa todo dia.
3. Segunda fase: CRM + Propostas + Financeiro básico.
4. Terceira fase: Oficina, Atividade, Portal do cliente, automações completas.
