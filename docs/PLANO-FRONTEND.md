# Protea — plano do front-end por feature

> Escopo deste plano: **só a parte visual** — como o código das telas se organiza, como as features se dividem e em que ordem e com que processo cada uma é construída. Backend, banco, autenticação e integrações reais ficam fora; aqui toda feature roda com dados de exemplo (AREAS.md) atrás de uma porta que o backend vai ocupar depois.
>
> Fontes que este plano **não repete** (e que continuam valendo): [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) (visual), [`AREAS.md`](AREAS.md) (conteúdo e dados), [`../design/tokens/protea.css`](../design/tokens/protea.css) (valores), [`../telas-final/`](../telas-final/) (alvo de cada tela).
>
> Criado em 15 nov 2026 · branch `planejamento/features-visuais`.

## 1. Decisões de base

| Tema | Decisão | Por quê | Estado |
|---|---|---|---|
| Framework | **Next.js (App Router) + TypeScript estrito** | Sugerido no ROADMAP §8; é a stack do dia a dia; rotas por arquivo casam com o mapa de áreas | **a confirmar** |
| Gerenciador | pnpm | lockfile rápido e estrito | a confirmar junto |
| Estilo | **CSS Modules + tokens globais** (`protea.css` vira `src/core/theme/tokens.css`) | Os tokens já são variáveis CSS e os dois temas trocam só valores; Modules dão escopo por componente sem traduzir o design system para outra linguagem. Tailwind v4 (`@theme` lendo as variáveis) foi considerado: ganha velocidade, mas duplica a fonte dos tokens e polui o JSX com as classes longas do vidro | proposta |
| Gráficos | **Apache ECharts** (`echarts` + import modular), com dois temas registrados: `protea` e `essencial`, cores lidas das variáveis CSS | Decisão já tomada; brilho, degradê, funil, medidor e mapa de calor prontos | decidido |
| Primitivas acessíveis | **Radix UI** (Dialog, Popover, Tooltip, Tabs, ToggleGroup) + **cmdk** para a Busca `Ctrl K` | Foco, teclado e ARIA prontos; sem estilo próprio, então o vidro é nosso | proposta |
| Ícones | **Conjunto próprio em SVG** (botânicos, traço 1,6–1,7) + **Lucide** para o tema Essencial | DESIGN-SYSTEM §4/§10: ícones de área são botânicos no Protea e comuns no Essencial | proposta |
| Movimento | **CSS primeiro** (keyframes e durações dos tokens). **Motion** só onde CSS não resolve (layout do quadro, entrada de listas com saída) | KISS; os dois modos já trocam `--dur`/`--ease` por atributo | proposta |
| Arrastar e soltar | **dnd-kit**, só quando chegar o Quadro da Estufa | acessível por teclado | decidir na feature |
| Editor do Herbário | BlockNote ou TipTap, avaliados na feature | não criar editor do zero (ROADMAP §8) | decidir na feature |
| Textos e pares de nome | Dicionário tipado próprio, `t('area.projects')` → par Protea/Essencial | Só pt-BR; uma lib de i18n seria peso para um problema de dois temas | proposta |
| Fontes | `next/font` com Sora, Inter e JetBrains Mono | sem salto de layout, sem CDN | proposta |
| Testes visuais | **Playwright** com capturas por tela nas 4 combinações (2 temas × 2 modos) + reduzir movimento; axe para contraste/ARIA | trava regressão visual e acessibilidade | proposta |
| Catálogo de componentes | Rota interna `/_catalog` (só em dev) mostrando cada peça nos 2 temas × 2 modos | Mais simples que Storybook para um projeto de uma pessoa; dá para trocar depois | proposta |

Regra de dependências: antes de adicionar qualquer lib nova numa feature, comparar com o que já está no projeto e com a API nativa (skill arq-fend-modular, "Escolha de bibliotecas").

## 2. Estrutura de pastas

Nomes de código em inglês e com os nomes consolidados (CLAUDE.md): `projects`, nunca `estufa`. O nome botânico só existe no dicionário de textos.

```text
src/
  app/                              rotas finas: lêem params e compõem a tela da feature
    layout.tsx                      <html data-theme data-mode>, fontes, AppShell
    page.tsx                        → features/overview
    agenda/page.tsx                 → features/agenda
    notas/page.tsx                  → features/notes
    projetos/page.tsx               → features/projects (ProjectsScreen)
    projetos/tarefas/page.tsx       → features/projects (TasksScreen)
    crm/…  dev/…  financeiro/…  foco/…  atividade/…
    _catalog/page.tsx               catálogo (só dev)

  core/                             infraestrutura visual compartilhada; não conhece features
    theme/
      tokens.css                    hoje design/tokens/protea.css (mesma fonte, movida)
      textures.css                  pólen, veio, fibra, miolo, pelo, prata
      ThemeProvider.tsx             data-theme + data-mode + .pausado; cookie p/ não piscar
      useTheme.ts  useMode.ts  useReducedMotion.ts
    i18n/
      labels.ts                     pares { protea, essencial } por chave
      t.ts                          t(key) lê o tema atual
    shell/
      AppShell.tsx                  fundo com florações + Sidebar + Topbar + <main>
      Sidebar.tsx  Topbar.tsx  ThemeSwitch.tsx  Highlights.tsx ("Em destaque")
      nav.ts                        lista de áreas (rota, ícone, cor, chave de texto)
    charts/
      EChart.tsx                    wrapper client-only, lazy, aria-label obrigatório
      themes.ts                     registra "protea" e "essencial" a partir das variáveis

  shared/ui/                        peças genéricas reutilizadas; nunca importam de features
    Glass.tsx  Banner.tsx  Ribbon.tsx  Pill.tsx  IconButton.tsx  Chip.tsx  Status.tsx
    MetricStrip.tsx  ProgressRing.tsx  Heatmap.tsx  FunnelRow.tsx  NextStepItem.tsx
    ModeSelector.tsx  EmptyState.tsx  Skeleton.tsx  ErrorState.tsx
    icons/  botanical/*.tsx  common/ (reexporta Lucide)

  features/
    mascot/        a Protea holográfica (isolada, CLAUDE.md)
    overview/      Jardim / Visão geral
    agenda/        Estações
    notes/         Herbário
    projects/      Estufa: projetos e tarefas
    crm/           Sementeira: funil, importar, propostas
    dev/           Raízes
    finance/       Colheita: visão geral, cobranças
    focus/         Floração: Orvalho, Seiva, Ambiente (+ pílula flutuante)
    activity/      Anéis
    search/        Busca global Ctrl K
```

Dentro de cada feature:

```text
features/<feature>/
  index.ts           API pública: telas + widgets que outras features podem usar
  domain/            tipos e regras puras (ex.: projectRisk, leadScore, splitIncome) + testes
  data/
    fixtures.ts      dados de exemplo de AREAS.md (fonte única por feature)
    repository.ts    interface + implementação com fixtures; o backend troca só isto
  ui/
    <Feature>Screen.tsx      tela completa
    widgets/                 cartões que o Jardim ou a Busca consomem
    components/              peças internas
    *.module.css
  labels.ts          (opcional) chaves de texto da feature, somadas ao dicionário
```

### Limites entre módulos

- `app/` → `features/*` (via `index.ts`) → `shared/ui` + `core/`. `shared` e `core` **nunca** importam de `features`.
- **Jardim é compositor**: `overview` importa widgets públicos das outras features (`projects` exporta `TaskRhythmCard`, `crm` exporta `FunnelCard`, `finance` exporta `CashFlowCard`…). Nenhuma feature importa de `overview`. Assim cada cartão do Jardim mora com a área dona dos dados e muda junto com ela.
- **Modo é do core, timer é da Floração**: `data-mode` e as regras "Seiva sem cansar" (2 animações contínuas, `.pausado` após 90 min ou janela fora de foco, reduzir movimento) ficam em `core/theme`. A feature `focus` é dona do timer e chama `setMode()`. A pílula flutuante é exportada por `focus` e montada pelo `AppShell` através de um slot, para o core não importar a feature.
- **Busca recebe, não busca**: cada feature exporta `searchProvider` (ações + resultados) pelo `index.ts`; `app/layout` monta a lista e entrega à `search`. A Busca não conhece as áreas.
- **Mascote isolada**: `features/mascot` exporta só `<ProteaHolo />`; quem o usa (banner do Jardim, estados vazios, Floração) renderiza dentro de `<OnlyTheme theme="protea">`.
- Lint de fronteiras com `eslint-plugin-boundaries` (ou regra `no-restricted-imports`) desde a fase 0, para o limite não depender de memória.

### Dois temas sem duplicar tela

- Cor sempre por variável; nenhum hex em `.module.css` fora de `core/theme`. Um lint (stylelint `color-no-hex` fora de `core/theme`) garante isso.
- Peças só do Protea: `<OnlyTheme theme="protea">` (equivalente às classes `.so-protea`/`.so-essencial` do jardim.html).
- Texto que muda de nome: sempre `t('…')`. Texto que não muda: literal em pt-BR.
- Ícone por área: `nav.ts` guarda `{ botanical, common }` e o `Sidebar` escolhe pelo tema.

## 3. Componentes base (inventário tirado do jardim.html e das telas)

| Componente | Origem no DS | Notas |
|---|---|---|
| `Glass` | §5 `.g` | variantes `pad`, `inner`; prop `texture="veio|fibra|miolo|pelo"` (ignorada no Essencial) |
| `Banner` | §6 | `size="hero"` (Jardim) ou `"area"` (140 px); slots: chip de contexto, título, frase, ações, arte à direita |
| `Ribbon` | §6 fita bráctea | anima só no Seiva |
| `Pill` / `IconButton` | §6 botões | `variant="primary|secondary"`; um primário por tela (revisão, não código) |
| `Chip`, `Status` | §2 status, §6 chips | `Status` exige `label` (nunca só cor) |
| `MetricStrip` | §6 faixa de métricas | 4 colunas, ícone em cima, número com contagem de 600 ms |
| `ProgressRing` | §6 anel | SVG próprio (leve); ECharts só se precisar de tooltip |
| `Heatmap` | §6 Anéis | escala por variável; células futuras vazias |
| `FunnelRow`, `NextStepItem`, `ModeSelector` | §6 | |
| `EChart` | §6 gráficos | ≤ 4 cores, grade só na base, previsto tracejado, `aria-label` obrigatório na prop |
| `EmptyState`, `Skeleton`, `ErrorState` | AREAS "ajustes finos" | toda tela tem os três; o vazio pode trazer a Protea |

Componente nasce dentro da feature que o usa. Sobe para `shared/ui` quando a **segunda** feature precisar dele (YAGNI). Os da tabela acima já nascem em `shared` porque aparecem em várias telas finais.

## 4. Divisão em features e ordem de construção

Cada linha é uma branch `feat/<nome>` e um PR. A ordem coloca primeiro o que as outras dependem e depois o uso diário (MVP do ROADMAP §11).

| Fase | Feature (código) | Tela(s) alvo | Entrega visual | Depende de |
|---|---|---|---|---|
| 0 | `foundation` | 17–21 (DS) | Projeto Next criado, tokens movidos, fontes, `ThemeProvider` (tema + modo + reduzir movimento + `.pausado`), dicionário `t()`, temas ECharts, lint de fronteiras e de hex, Playwright configurado, `/_catalog` vazio | — |
| 1 | `shell` + `shared/ui` | 01 (moldura), 18–19 | `AppShell` com fundo, menu (nomes botânicos/consolidados, ponto da cor, "Em destaque" recolhido, perfil), topo (busca falsa, integrações, período, botão da área, seletor de tema); todos os componentes da §3 no catálogo, nos 2 temas × 2 modos | 0 |
| 2 | `mascot` | 01 | `<ProteaHolo />` seguindo o mouse (§7), parada com reduzir movimento, laço rAF que para sozinho | 1 |
| 3 | `overview` (Jardim) | 01 | Tela idêntica a `jardim.html`/`jardim-protea.png`/`jardim-essencial.png`. Cria os widgets **dentro das features donas** (`projects`, `crm`, `finance`, `focus`, `activity`, `agenda`) já com fixtures. Saudação por horário + slug | 1, 2 |
| 4 | `focus` | 12, 13, 14 | Orvalho, Seiva, Ambiente; timer visual (estado local), troca de modo no app inteiro, pílula flutuante, as 7 regras "Seiva sem cansar" | 3 |
| 5 | `projects` | 05, 06 | Projetos (etapas, horas, risco) e Tarefas: Quadro primeiro; Lista, Calendário e Linha do tempo como sub-PRs | 3 |
| 6 | `notes` | 15 | Árvore, favoritos, editor em blocos (lib escolhida aqui), menu "/" para cima, painel "Conectado a" | 1 |
| 7 | `agenda` | 02 | Semana e mês, eventos de foco × calls, regras do Calendly (só visual), "conflito evitado" | 3 |
| 8 | `search` | 04 | `Ctrl K` com cmdk, ações primeiro, `Tab` filtra área, fundo = tela atual desfocada; providers das features 4–7 | 4–7 |
| 9 | `crm` | 07, 08, 09 | Funil, Importar (etapas 340→128, filtros), Propostas | 3 |
| 10 | `finance` | 10, 11 | Visão geral (fluxo 12 m + 90 d, regra dos R$ 100, teto MEI), Cobranças e impostos | 3 |
| 11 | `dev` | 16 | Sites, PRs, renovações, horas por repo, cofre (só visual, sem segredos reais) | 3 |
| 12 | `activity` | 03 | Ano, hora × dia, por área, padrões | 3 |
| 13 | `responsive` (transversal) | — | versão mobile da moldura e das telas do MVP | 1–8 |

Fases 6, 7, 9–12 não dependem entre si e podem andar em paralelo depois da fase 3. Telas com várias subseções viram sub-PRs da mesma feature (`feat/projects-board`, `feat/projects-list`…).

## 5. Processo de construção de uma feature

Mesmo roteiro para todas. O PR só abre com o checklist completo.

1. **Ler** — seção da área em AREAS.md, DESIGN-SYSTEM inteiro (CLAUDE.md pede), a PNG em `telas-final/` e o `jardim.html`.
2. **Inventariar** — listar cada bloco da tela e marcar: reutiliza de `shared/ui` · novo interno · candidato a `shared` (só se outra feature já usa). Token que falta vira token em `core/theme/tokens.css` **antes** de ser usado.
3. **Dados** — escrever `data/fixtures.ts` com os números de AREAS.md (coerentes com as outras telas) e o `repository.ts` que os entrega. A UI lê só do repositório.
4. **Regras puras** — o que é cálculo (risco do projeto, score do lead, divisão dos R$ 100, valor da hora) vai para `domain/` com teste unitário (Vitest). A UI só mostra.
5. **Montar a tela** — de fora para dentro: banner → faixa de métricas → grade de cartões → detalhes. Comparar com a PNG lado a lado a cada bloco.
6. **Variações** — conferir os 2 temas × 2 modos, reduzir movimento, e os estados vazio, carregando e erro.
7. **Verificar** — `typecheck`, `lint` (fronteiras e hex), `test`, `build`, Playwright (capturas das 4 combinações + axe). Capturas novas aprovadas viram a linha de base.
8. **Checklist DS §11** colado no PR, item a item, com as capturas.
9. **Revisão** — revisar o diff (limites, duplicação, contraste, um botão principal) antes do merge.

### Definição de pronto (por tela)

- [ ] Bate com a PNG final nos dois temas (diferenças intencionais anotadas no PR).
- [ ] Moldura do Jardim; nome da área certo no menu, no chip de contexto e no título (par Protea/Essencial).
- [ ] Cor da área dominante; ≤ 4 cores por gráfico; um botão principal.
- [ ] Textura sutil (≤ 0,18) só no Protea.
- [ ] Orvalho e Seiva corretos; nada se move com reduzir movimento; no Seiva, ≤ 2 animações contínuas.
- [ ] Contraste AA; status com ponto + texto; gráficos com `aria-label`; navegação por teclado.
- [ ] Estados vazio, carregando e erro.
- [ ] Nenhum import fora das fronteiras; nenhum hex fora de `core/theme`.
- [ ] Dados batendo com AREAS.md.

## 6. Git e branches

- `main` recebe só o que está pronto. Esta fase visual integra em **`develop`** (criada a partir de `main` + `design/visual-inicial` na fase 0).
- Uma branch por feature: `feat/<feature>` (ou `feat/<feature>-<subseção>`), a partir de `develop`, PR de volta para `develop`.
- Refatoração (ex.: subir componente para `shared`) em commit ou PR separado da mudança visual.
- Commits pequenos, mensagem no imperativo em pt-BR.

## 7. Decisões em aberto

1. **Confirmar a stack** (Next.js + TS + pnpm). Tudo acima assume isso; trocar de framework muda §2, não a divisão de features.
2. **Paleta de dados dos gráficos**: a memória de projeto fala na paleta "vinho" de 14 nov; o DESIGN-SYSTEM v4 usa as cores da Protea-rei. Proposta: os temas ECharts leem as cores de área do DS v4; confirmar.
3. **CSS Modules × Tailwind v4** (§1). Proposta: Modules.
4. **Catálogo próprio × Storybook** (§1). Proposta: catálogo próprio.
5. Quando mobile entra (hoje fase 13) e se o tema claro entra no plano.
