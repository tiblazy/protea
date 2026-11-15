# Protea — plano do front-end por feature (v2)

## Contexto

As 21 telas finais v4 (`telas-final/`), o design system (`docs/DESIGN-SYSTEM.md`), as áreas (`docs/AREAS.md`), os tokens (`design/tokens/protea.css`) e a referência `design/referencia/jardim.html` estão prontos. A construção agora vai **por feature**, uma área por vez. Este plano cobre **só a parte visual**:

- as decisões de stack de interface;
- a divisão em features;
- o processo de construção de cada uma;
- o padrão profissional de carregamento e UX.

Backend e integrações ficam de fora. As telas usam os dados de exemplo do AREAS.md por meio de um `repository.ts` que o backend troca depois. **Páginas e design system não mudam.** Onde as skills sugerem algo que tocaria o DS, isso aparece como proposta em aberto (§9).

Revisado com as skills `arq-fend-modular` (módulos e limites), `ui-ux-pro-max` (UX, estados, Next.js, shadcn) e `emil-design-eng` (polimento, movimento, feedback).

Aprovado em 15 nov 2026 · branch `planejamento/features-visuais`. Substitui a v1.

---

## 1. Decisões e motivos

### Por que CSS Modules e não Tailwind? → **Mudou: Tailwind v4**
Na v1 escolhi CSS Modules para não ter duas fontes de tokens. O Tailwind v4 resolve isso com `@theme inline`, que só **aponta** para as variáveis existentes (`--color-estufa: var(--a-estufa)`), sem copiar valores. Assim o `protea.css` continua sendo a fonte única, e cada tema continua trocando só valores. Além disso, o shadcn exige Tailwind. Nova decisão:
- `tokens.css` (hoje `protea.css`, valores intactos) + `@theme inline` mapeando cores, raios, fontes e durações;
- vidro, texturas e rótulos viram `@utility glass`, `@utility tx-veio`, `@utility lbl`… para o JSX não repetir 10 classes;
- `tailwind-merge` + `cva` para as variantes (`Pill primary/secondary`, `Glass texture=`);
- lint `no-arbitrary-values` para cores: nada de `bg-[#D9604C]`.

### Existe gerador de gráficos mais completo e melhor? → **Fica o ECharts (você confirmou)**
| Lib | Completo | Visual / a11y | Licença | Veredito |
|---|---|---|---|---|
| **ECharts** | o mais completo entre os grátis: funil, medidor, calendário de calor, sankey, séries custom, brilho e degradê | ótimo visual; a11y fica por nossa conta | Apache-2.0 | **escolhido** |
| Highcharts | equivalente | melhor módulo de acessibilidade | pago para uso comercial (~US$ 185–366/dev/ano) | descartado pelo custo e pelo risco se virar produto |
| AG Charts | bom na Community; o avançado é pago | bom | MIT / Enterprise US$ 499 | menos tipos grátis |
| Recharts (shadcn charts) | sem calendário de calor, medidor ou funil nativos | integra com shadcn | MIT | insuficiente para as 21 telas |

A acessibilidade que o Highcharts daria pronta entra no nosso wrapper `EChart`: `aria-label` obrigatório, tabela alternativa oculta (`<table class="sr-only">`), dica de foco por teclado e decal para não depender só da cor.

### Radix UI vs shadcn → **shadcn/ui sobre Base UI**
Não são concorrentes, são camadas:
- **Radix** e **Base UI** são *primitivas* sem estilo: foco, teclado, ARIA, posicionamento.
- **shadcn/ui** é uma coleção de componentes **copiados para o repositório** (o código é nosso), feitos com Tailwind sobre uma dessas primitivas.

Por que shadcn:
- traz Dialog, Popover, Tooltip, Tabs, Select, Command (`Ctrl K`), Sonner (toasts), Skeleton, Calendar, Sheet e Chart já acessíveis;
- como o código fica no repositório, vestimos tudo com o vidro Protea sem brigar com a lib.

Por que Base UI em vez de Radix:
- desde jul/2026 é o padrão do shadcn para projetos novos;
- está na 1.x estável e em manutenção ativa;
- todos os componentes existem para as duas bases, então dá para trocar.

Isso precisa ser conferido na doc oficial durante a fase 0. Se aparecer alguma incompatibilidade, `init -b radix` mantém o Radix sem mudar o plano.

Os MCPs `shadcn` e `radix-ui` (já conectados) ajudam a buscar componentes e exemplos. Magic UI e Aceternity ficam **fora**, porque os efeitos deles brigam com as regras de "Seiva sem cansar" e de poluição visual.

### Fontes fora do padrão → **proposta autoral, sem mexer no DS agora**
O DS segue com Sora + Inter + JetBrains Mono até você aprovar uma troca. O plano inclui uma **prova de fontes** na fase 0: uma página `/_catalog/fontes` que mostra o Jardim real com cada combinação, nos 2 temas. Candidatas, todas de fundições independentes e com licença livre para uso comercial (a licença de cada uma é conferida antes da prova):

| Papel no DS | Hoje | Candidatas autorais |
|---|---|---|
| Títulos (caixa alta, espaçado) | Sora 700 | **Clash Display** · **Cabinet Grotesk** (Fontshare, ITF) · **Unbounded** |
| Números finos (KPI, timer) | Sora 200–300 | **Clash Display** Extralight · **General Sans** Light |
| Interface | Inter | **Satoshi** · **General Sans** · **Switzer** (Fontshare) |
| Código | JetBrains Mono | **Commit Mono** · **Geist Mono** |

- O **Essencial continua "só Inter"** (DS §10). A troca vale só para o tema Protea.
- As fontes são servidas por `next/font/local`, com os arquivos `.woff2` no repositório, sem CDN.
- Se uma combinação for aprovada, ela vira uma mudança separada no DS (§3 Tipografia), feita só por você.

### Playwright → **só no fim de cada feature**
Sai do passo a passo. Durante a construção, a conferência é visual, comparando com a PNG no navegador do app. O Playwright roda **uma vez, no fechamento da feature**: gera as capturas nas 4 combinações + movimento reduzido, roda o axe e vira a linha de base dela.

### Faltou skeleton, loading e UX profissional → **nova §5**

---

## 2. Stack de interface (consolidada)

| Camada | Escolha |
|---|---|
| App | Next.js (App Router) + TypeScript estrito + pnpm (**a confirmar**, §9) |
| Estilo | Tailwind v4 + `@theme inline` sobre `tokens.css` + `cva` + `tailwind-merge` |
| Componentes | shadcn/ui (base: Base UI) vestidos com o vidro Protea |
| Gráficos | Apache ECharts (import modular, temas `protea`/`essencial` lidos das variáveis) |
| Busca `Ctrl K` | shadcn `Command` (cmdk) |
| Toasts | Sonner (via shadcn) |
| Movimento | CSS e WAAPI primeiro; **Motion** só para listas que entram e saem, layout do quadro e a mola da mascote |
| Arrastar | dnd-kit (fase da Estufa) |
| Editor do Herbário | BlockNote ou TipTap, escolhido na fase do Herbário |
| Ícones | SVG botânicos próprios (Protea) + Lucide (Essencial) |
| Textos em par | dicionário tipado `t('area.projects')` |
| Testes | Vitest (regras puras) durante a feature; Playwright + axe no fechamento |

## 3. Estrutura e limites entre módulos

```text
src/
  app/            rotas finas + loading.tsx / error.tsx / not-found.tsx por área; /_catalog (só dev)
  core/           theme/ (tokens.css, utilities.css, ThemeProvider: tema + modo + movimento reduzido + .pausado)
                  i18n/ (labels, t) · shell/ (AppShell, Sidebar, Topbar, ThemeSwitch, nav.ts)
                  charts/ (EChart, themes) · feedback/ (Toaster, ErrorBoundary)
  shared/ui/      shadcn vestidos (button, dialog, popover, tooltip, tabs, command, sheet, skeleton…)
                  + peças Protea: Glass, Banner, Ribbon, MetricStrip, ProgressRing, Heatmap,
                    FunnelRow, NextStepItem, ModeSelector, EmptyState, ErrorState, AnimatedNumber
  features/       mascot overview agenda notes projects crm dev finance focus activity search
    <feature>/    index.ts · domain/ (regras + testes) · data/ (fixtures + repository)
                  ui/ (Screen, widgets/, components/, skeletons/)
```

- O sentido das dependências é `app` → `features` (só pelo `index.ts`) → `shared` + `core`. `shared` e `core` nunca importam `features`. Isso é garantido por `eslint-plugin-boundaries`.
- **O Jardim só compõe**: ele importa os widgets públicos das áreas (`TaskRhythmCard` de `projects`, `FunnelCard` de `crm`…), e ninguém importa o Jardim.
- **Cada widget exporta o seu skeleton** (`FunnelCard.Skeleton`), para o carregamento ter sempre a forma do conteúdo.
- O **modo** fica no `core`, e o **timer** fica em `focus`, que chama `setMode()`. A pílula flutuante entra pelo slot do `AppShell`.
- A **Busca** recebe um `searchProvider` de cada feature. A **mascote** fica isolada em `features/mascot` e é renderizada dentro de `<OnlyTheme theme="protea">`.
- Um componente nasce dentro da feature. Ele sobe para `shared` quando a segunda feature precisa dele.

## 4. Componentes base

| Componente | Base | Detalhe |
|---|---|---|
| `Glass` | `@utility glass` | `texture=veio\|fibra\|miolo\|pelo` (some no Essencial), estado `interactive` com borda a 22% no hover |
| `Banner` | próprio | `hero` / `area` (140 px) |
| `Button` / `Pill` | shadcn button + cva | `primary` (nácar curto) · `secondary` · `icon`; pressionar = `scale(.97)` em 140 ms |
| `Chip`, `Status` | shadcn badge | `Status` exige `label` |
| `Dialog`, `Sheet`, `Popover`, `Tooltip`, `Tabs`, `Select` | shadcn/Base UI | vidro `--musgo`; popover cresce a partir do gatilho |
| `MetricStrip`, `AnimatedNumber` | próprio | conta até o valor em 600 ms (DS §8), só na primeira visita |
| `ProgressRing`, `Heatmap`, `FunnelRow`, `NextStepItem`, `ModeSelector` | SVG/CSS próprios | |
| `EChart` | ECharts | `aria-label` obrigatório, tabela `sr-only`, revelação única |
| `Skeleton` | shadcn skeleton | vidro interno + brilho lento; parado com movimento reduzido |
| `EmptyState`, `ErrorState` | próprio | §5 |

## 5. Carregamento, estados e UX profissional (nova)

### 5.1 Carregamento
- **`loading.tsx` por rota** com o esqueleto da tela inteira: moldura real, banner e grade com a geometria final. Nada pula quando o conteúdo chega (CLS < 0,1).
- **`<Suspense>` por cartão**: cada widget carrega sozinho e mostra o próprio `Skeleton` com as medidas dele. A tela aparece aos poucos, não tudo de uma vez.
- **Sem piscar**: o skeleton só aparece se a espera passar de ~150 ms e, quando aparece, fica pelo menos ~300 ms. Espera curta não mostra nada; espera longa (> 4 s) mostra uma linha de status ("Buscando as cobranças…").
- **Brilho do skeleton**: varredura lenta (1,6 s, linear) na cor do vidro, nunca branca. Com movimento reduzido fica estático. No modo Seiva, o skeleton não conta como animação contínua, porque some quando o conteúdo chega.
- **Acessibilidade**: `aria-busy="true"` no contêiner e um texto `sr-only` "Carregando {área}".
- **Gráficos**: o skeleton do gráfico tem a silhueta do tipo (barras, linha, anel) e o ECharts é carregado sob demanda (`dynamic`, `ssr:false`).
- **Troca de área**: o menu muda de ativo na hora, e o conteúdo entra com o skeleton da rota. Sem tela branca e sem spinner central.

### 5.2 Vazio, erro e offline
- **Vazio** (`EmptyState`): uma frase gentil + uma ação. No Protea, a mascote aparece pequena. Exemplos: "Nenhuma tarefa por aqui. Que tal planejar a semana?" → **Nova tarefa**. O vazio por filtro é diferente do vazio real: "Nada com esses filtros" → **Limpar filtros**.
- **Erro** (`error.tsx` por área + `ErrorBoundary` por cartão): um cartão com erro não derruba a tela. Mostra a mensagem em linguagem simples, o botão **Tentar de novo** e `role="alert"`. Tom sem culpa: "Não deu para carregar as cobranças agora."
- **Integração fora** (Calendly, GitHub…): o ponto da barra do topo fica âmbar com texto. Os cartões mostram o último dado conhecido com "atualizado há 2 h". A Protea funciona sem as integrações (ROADMAP §7).
- **404** com a moldura e a mascote, e link para o Jardim.

### 5.3 Feedback de ação
- **Toasts (Sonner)**: canto inferior direito, 4 s, pausam com a aba oculta, entram e saem pelo mesmo lado.
- **Desfazer em vez de confirmar**: arquivar ou excluir mostra um toast "Tarefa arquivada · Desfazer". Diálogo de confirmação só para o que não volta.
- **Otimista**: mover cartão, marcar tarefa ou mudar etapa do lead reflete na hora e reverte com toast se falhar.
- **Botões**: estado `loading` sem mudar de largura (texto vira "Salvando…" com um spinner de 14 px); desabilitado com motivo no tooltip.
- **Formulários**: rótulo visível, erro abaixo do campo ligado por `aria-describedby`, validação ao sair do campo e foco no primeiro erro ao enviar.

### 5.4 Interação e movimento (polimento)
- **Ações de teclado não animam**: `Ctrl K` abre e fecha sem transição, porque é usado dezenas de vezes por dia.
- **Durações por tipo**: pressionar 100–160 ms · tooltip 125–200 ms · popover e select 150–250 ms · modal e sheet 200–300 ms. A saída é mais rápida que a entrada. As curvas fortes de ease-out ficam como tokens novos (proposta §9). O `--dur` do modo (700/220 ms) continua para as entradas e a ambientação, como manda o DS.
- **Tooltips**: o primeiro tem atraso; os seguintes abrem na hora.
- **Hover só com mouse** (`@media (hover:hover) and (pointer:fine)`). No toque, o feedback é o `:active`.
- **Só `transform` e `opacity`** em animação. `transition: all` é proibido. Transições (interrompíveis) para a UI e keyframes só para a ambientação.
- **Entrada escalonada** de 40 ms (DS §8), só na primeira visita, sem bloquear clique.
- **A mascote** segue o mouse com mola. É decorativa, então para com movimento reduzido e com a janela fora de foco.

### 5.5 Navegação e densidade
- **Teclado em tudo**: foco visível com a `--ponta` e atalhos (`Ctrl K`, `Ctrl Shift N`, `G` + letra para ir a uma área), listados em `?`.
- **URL como estado**: filtros, aba, visão do quadro e período ficam na query (`?visao=lista&periodo=semana`). Recarregar e voltar mantêm a tela.
- **Números**: `tnum`, moeda e datas no padrão do DS §9, sempre pelos mesmos formatadores (`shared/format`).
- **Alvos de clique** ≥ 32 px no desktop e ≥ 44 px no mobile. Ícones sozinhos têm `aria-label` e tooltip.

## 6. Features e ordem de construção

Cada fase tem a sua branch `feat/<nome>`, criada a partir da `main`. Regras de Git (também no CLAUDE.md):
- nunca commitar na `main`;
- a feature só entra na `main` no fim, depois da avaliação e aprovação da dona do projeto;
- push só na branch da própria feature.

| Fase | Feature | Telas | Entrega | Depende |
|---|---|---|---|---|
| 0 | `foundation` | 17–21 | Next + Tailwind v4 + shadcn (Base UI), tokens via `@theme inline`, utilities de vidro e texturas, ThemeProvider, `t()`, temas ECharts, lints, Sonner, `/_catalog` + **prova de fontes** | — |
| 1 | `shell` + `shared/ui` | 01, 18–19 | Moldura completa e todos os componentes da §4 com estados (hover, foco, pressionado, carregando, desabilitado) no catálogo, nos 2 temas × 2 modos | 0 |
| 2 | `states` | — | Kit da §5: `loading.tsx`/`error.tsx` modelo, Skeleton, EmptyState, ErrorState, toasts, regra anti-piscar, `AnimatedNumber` | 1 |
| 3 | `mascot` | 01 | Protea holográfica (DS §7) | 1 |
| 4 | `overview` (Jardim) | 01 | Tela igual à referência nos 2 temas; widgets criados nas features donas, cada um com skeleton e erro | 2, 3 |
| 5 | `focus` | 12–14 | Orvalho, Seiva, Ambiente, troca de modo global, pílula flutuante | 4 |
| 6 | `projects` | 05–06 | Projetos + Quadro (dnd-kit, otimista, desfazer); depois Lista, Calendário e Linha do tempo | 4 |
| 7 | `notes` | 15 | Árvore, editor em blocos, menu "/" | 2 |
| 8 | `agenda` | 02 | Semana/mês, foco × calls, Calendly (visual) | 4 |
| 9 | `search` | 04 | `Ctrl K` sem animação, ações primeiro, `Tab` por área, fundo desfocado | 5–8 |
| 10–13 | `crm`, `finance`, `dev`, `activity` | 07–11, 16, 03 | Telas restantes (podem rodar em paralelo) | 4 |
| 14 | `responsive` | — | Mobile da moldura e do MVP | 1–9 |

## 7. Processo de construção de cada feature

1. **Ler**: a seção da área no AREAS.md, o DESIGN-SYSTEM, a PNG em `telas-final/` e o `jardim.html`.
2. **Inventariar**: separar o que reaproveita de `shared/ui` ou do shadcn, o que é novo e interno, e o que é candidato a `shared`. Token que falte é criado antes de ser usado.
3. **Dados**: `fixtures.ts` com os números do AREAS.md + `repository.ts` com latência simulada configurável, para exercitar os skeletons e os erros.
4. **Regras puras** em `domain/`, com teste em Vitest.
5. **Montar a tela** de fora para dentro (banner → métricas → cartões → detalhes), comparando com a PNG no navegador a cada bloco.
6. **Estados**: o skeleton de cada cartão e da rota, vazio, vazio por filtro, erro por cartão, carregando em botões e otimista onde houver edição.
7. **Variações**: 2 temas × 2 modos, movimento reduzido e teclado.
8. **Fechamento (uma vez)**: typecheck, lint, test, build, depois **Playwright** (capturas das 4 combinações + reduzido + axe), que viram a linha de base.
9. **PR** com o checklist do DS §11 + o checklist da §8, as capturas e a revisão do diff.

## 8. Definição de pronto (por tela)

- [ ] Bate com a PNG nos 2 temas; moldura do Jardim; nome certo da área no par Protea/Essencial.
- [ ] Cor da área dominante; até 4 cores por gráfico; um botão principal; textura só no Protea (≤ 0,18).
- [ ] Skeleton com a forma do conteúdo, sem piscar e sem salto de layout; `aria-busy`.
- [ ] Vazio, vazio por filtro e erro por cartão com "Tentar de novo"; toasts e desfazer onde houver ação.
- [ ] Orvalho e Seiva corretos; movimento reduzido para tudo; atalhos de teclado sem animação; só `transform`/`opacity`.
- [ ] Contraste AA; status com ponto + texto; gráficos com `aria-label` + tabela; foco visível.
- [ ] Sem import fora das fronteiras; sem cor solta; dados batendo com o AREAS.md.

## 9. Decisões em aberto (nenhuma altera páginas ou DS agora)

1. **Confirmar a stack**: Next.js + TypeScript + pnpm.
2. **Fontes autorais**: escolher na prova da fase 0. Se aprovada, a troca no DS §3 vira uma mudança separada.
3. **Tokens de interação** (`--dur-press 140ms`, `--dur-pop 200ms`, `--ease-out-forte`): são valores novos que não substituem os do DS e precisam do seu aval antes de entrar em `tokens.css`.
4. **Paleta de dados dos gráficos**: a memória antiga cita a paleta "vinho"; a proposta é usar as cores de área do DS v4.
5. Quando entram o mobile (fase 14) e o tema claro.

Fontes consultadas: [estado do charting em 2026 (ApexCharts)](https://apexcharts.com/blog/state-of-javascript-charting-2026) · [alternativas ao Highcharts 2026](https://lightningchart.com/blog/7-best-highcharts-alternatives-in-2026-faster-cheaper-and-more-capable/) · [shadcn: Radix → Base UI](https://blog.openreplay.com/shadcn-ui-radix-base-ui-switch/) · [shadcn vs Base UI vs Radix 2026](https://www.pkgpulse.com/guides/shadcn-ui-vs-base-ui-vs-radix-components-2026)
