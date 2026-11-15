# Protea — design system (v4 · cores "Protea-rei noturna" · vidro v3)

> **Dois temas.** §1–§9 descrevem o tema **Protea**. O tema **Essencial** usa o mesmo layout, componentes e movimento, com paleta e tipografia padrão: ver §10.

Fonte da verdade visual. A tela de referência é [`design/referencia/jardim.html`](../design/referencia/jardim.html); os valores abaixo estão em [`design/tokens/protea.css`](../design/tokens/protea.css). Quando houver conflito entre um PNG antigo e este documento, vale este documento.

## 1. Ideia

Uma estufa noturna de fynbos (o bioma da protea) vista através de vidro. Três fontes se juntam:

| Fonte | O que pegamos | Onde aparece |
|---|---|---|
| Marathon (ref. 03) | painéis de vidro, borda de luz, fita líquida cromada, títulos largos em caixa alta espaçada, números finos, anéis com brilho, faixa de métricas com ícone em cima, chips, conquista em hexágono | moldura de todas as telas |
| A flor protea | brácteas em leque, miolo granulado, pelos prateados, folhas de sálvia | cores, texturas, ícones, a Protea 3D |
| Pomodoro × Flowtime (ref. 04–06) | dois ritmos de trabalho com progressão visual | modos Orvalho e Seiva |
| Dashboards analíticos (ref. 01, 02, 07) | densidade média, gráficos legíveis, valor em destaque só no ponto atual | gráficos e KPIs |

Personalidade: precisa, acolhedora, contemporânea, levemente orgânica. Nunca: neon, gradiente rosa-lilás de "IA builder", game infantil, brilho em texto corrido.

## 2. Cores — "Protea-rei noturna" (v4)

Paleta tirada da protea-rei da logo ([`design/marca/protea-logo.png`](../design/marca/protea-logo.png)): brácteas carmim e coral, miolo pérola com centro índigo, sépalas verde-amareladas, folhas oliva, caule castanho, tudo sobre tinta escura. Os **nomes dos tokens continuam os mesmos** da v3 (o código não muda); só os valores mudaram. A paleta Fynbos anterior está superada.

### Base (fundo e texto)

| Token | Hex | De onde vem | Uso |
|---|---|---|---|
| `--breu` | `#0F0D0B` | tinta do contorno | fundo da página |
| `--turfa` | `#181512` | | superfície sólida |
| `--musgo` | `#24201B` | | menus, popovers |
| `--linha` | `#3A332C` | | bordas de campos e chips |
| `--borda` | `#2C2721` | | bordas discretas |
| `--tx` | `#EDE6E3` | pérola do miolo | texto principal (14,8:1) |
| `--tx2` | `#C2B6B2` | sombra do miolo | texto secundário (9,2:1) |
| `--tx3` | `#9C8D81` | taupe do miolo | texto terciário, mínimo (5,7:1) |

Fundo da aplicação: gradiente `#14110E → #0B0908` com florações radiais baixas: coral no topo, índigo à direita, oliva embaixo à esquerda, pérola embaixo.

### Cores da flor e papéis por área

| Token | Hex | Parte da flor | Área / papel | Contraste na turfa |
|---|---|---|---|---|
| `--protea` | `#D9604C` | bráctea | marca, ação principal, **Estufa** | 5,0 |
| `--ponta` | `#F2C4B5` | ponta clara da bráctea | selecionado, foco do teclado, texto claro da Estufa | 11,6 |
| `--ceu` | `#E8A38F` | rosa da bráctea | **Estações** | 8,7 |
| `--miolo` | `#8D97CF` | centro índigo | **Floração**, conquistas | 6,5 |
| `--prata` / `--perola` | `#C2B6B2` / `#EDE6E3` | miolo pérola | **Herbário**, ícones | 9,2 / 14,8 |
| `--urze` / `--sepala` | `#C8C267` | sépala | **Sementeira** | 9,8 |
| `--liquen` / `--caule` | `#B07B5E` | caule | **Raízes** | 5,1 |
| `--folha` | `#86A472` | folha (clareada para tela escura) | **Colheita**, sucesso, Orvalho | 6,6 |
| `--vinho` | `#7F251C` | sombra da bráctea | só decoração: gradientes, fim de escala | — |
| `--vermelhao` | `#F0524F` | — | erro e atraso, só isso (sempre com texto) | 5,2 |

Versões claras para texto colorido sobre vidro: Estufa `#F2C4B5` · Estações `#F6D6CC` · Floração `#D3D8F0` · Sementeira `#E6E3B5` · Raízes `#E7CDBF` · Colheita `#D5E2CB` · erro `#FBD3D0`.

Regras:
- Cada área usa a sua cor no ponto do menu, no rótulo do cartão (versão clara) e no gráfico principal. Uma tela tem uma cor dominante (a da área) e no máximo três outras.
- Coral (`--protea`) e erro (`--vermelhao`) são parentes: erro sempre leva ícone ou texto, nunca só a cor.
- Status: fundo da cor a 14%, borda a 40%, texto na versão clara, ponto na cor cheia (`.st.*` nos tokens).

### Gradiente "bráctea" (antigo nácar)

`#EDE6E3 → #E8A38F → #D9604C → #9E3324 → #8D97CF` (pérola → rosa → coral → vinho → toque de miolo). Usado em: fita do banner, anel de destaque, borda da mascote. Versão curta para botão principal e título: `#F2C4B5 → #D9604C → #B23F2E`, texto do botão `#1E0A06`. No máximo 2 por tela.

### Mapa de calor (Anéis)

`#3A1712 · #6B2419 · #A63F2F · #D9604C` (o último com brilho). Futuro vazio.

### Marca

A logo é a protea-rei ilustrada, sem fundo: `design/marca/protea-logo.png` (original) e `protea-logo-256.png` (interface). Uso: menu lateral (30 × 38 px), tela de carregamento, favicon recortado só na flor. Vale para o tema Protea e para os dois modos; no Essencial, a logo também aparece, mas as cores da interface seguem o §10.

## 3. Tipografia

| Papel | Fonte | Detalhe |
|---|---|---|
| Títulos de tela | Sora 700 | CAIXA ALTA, 48–56 px, entrelinha .98, segunda palavra pode levar o gradiente curto |
| Números grandes (KPI, timer) | Sora 200–300 | 22–44 px, `tnum`, separador `:` a 45% de opacidade |
| Rótulos (`.lbl`) | Inter 600 | 10,5 px, caixa alta, espaçamento .16em, cor `--tx2` |
| Itens do menu | Inter 600 | 11 px caixa alta .13em + linha de apoio 9,5 px em `--tx3` |
| Texto de interface | Inter 400–600 | 12–14 px |
| Código, IDs, atalhos | JetBrains Mono | 10,5–13 px |

Nunca mais de três pesos visíveis por cartão. Bricolage Grotesque saiu do sistema.

## 4. Espaço, grade e forma

- Base 4: 4 ícone↔texto · 8 chips · 12 linhas de lista · 16 padding pequeno · 20 entre cartões · 24 respiro interno · 40 margem de documento.
- Quadro de referência 1600 × 1000. Menu lateral 236 px (moldura 20 px). Conteúdo com padding 20 px, cartões a 20 px uns dos outros.
- Raios: 8 chips · 12 botões quadrados e campos · 16 itens de lista e menu · 22 cartões de vidro · pílula (altura/2) para botões de ação · círculo para avatar e botões de ícone.
- Ícones de traço 1,6–1,7, pontas arredondadas, 16 e 20 px, cor prata ou a cor da área. Ícones das áreas são botânicos (broto, sementes, raízes, anéis…), ver jardim.html.

## 5. Superfícies

### Vidro (`.g`) — padrão de todo cartão
- Fundo `linear-gradient(140deg, rgba(255,255,255,.10), .03 45%, .055)`.
- Borda 1 px `rgba(255,255,255,.15)` + luz interna no topo `inset 0 1px 0 rgba(255,255,255,.26)`.
- Sombra `0 24px 60px rgba(0,0,0,.45)`; `backdrop-filter: blur(22px) saturate(140%)`; raio 22.
- Pontilhado de pólen por cima (`:after`, pontos de .7 px a cada 5 px, 5% de opacidade).
- Hierarquia: página (fundo com florações) → vidro → vidro interno (`rgba(0,0,0,.22)` para campos e trilhos) → item ativo (gradiente coral a 26%→8% + filete de 3 px).

### Texturas da flor (só Protea)
| Classe | Lembra | Onde |
|---|---|---|
| `.tx-polen` | pó do miolo | todos os cartões (já no `.g`) |
| `.tx-veio` | anéis/veios de folha | banner da tela, cartão de modo, Orvalho |
| `.tx-fibra` | fibra da bráctea | barras de gráfico, botão principal, faixa de tarefa |
| `.tx-miolo` | grãos do centro da flor | conquistas, Floração |
| `.tx-pelo` | pelos prateados da bráctea | avatares, Herbário |
| `.tx-prata` | brilho da folha prateada | divisores especiais |

Textura nunca passa de 18% de opacidade e nunca fica atrás de texto pequeno com contraste no limite.

## 6. Componentes

- **Menu lateral** (vidro): logo PROTEA (Sora 600, espaçamento .26em) com a flor; itens de 42 px com nome botânico em cima e função embaixo; ponto da cor da área à direita; item ativo com gradiente coral e filete. "Em destaque" fica recolhido (contador) e só abre ao clicar. Perfil no rodapé com anel nácar no avatar.
- **Barra do topo** (vidro, pílula de 52 px): busca "Buscar em tudo…" com `Ctrl K`, estado das integrações com ponto verde pulsante, período, botão principal da área, botão de menu circular.
- **Banner da tela**: cartão grande com veio, chip de contexto ("Boa tarde, Tiburcio Martins | Jardim · semana 46"), título Sora caixa alta, frase curta em rótulo, um botão principal + um secundário, fita bráctea atravessando a base, Protea 3D à direita.
- **Botões**: principal = pílula 38–42 px com nácar curto, texto escuro `#2A1512`, caixa alta .14em, seta →; secundário = pílula com borda branca 26%; botão de ícone = círculo 38 px. Um único principal por tela (o do banner pode repetir a ação do topo só no Jardim).
- **Faixa de métricas**: 4 colunas separadas por fios; ícone da área em cima (21 px), rótulo, número Sora 300, variação em sálvia clara.
- **Anel de progresso**: trilho branco 10%, arco nácar ou cor da área com `drop-shadow` da mesma cor; número Sora 300 no centro.
- **Linha de funil**: número em círculo, rótulo caixa alta, barra fina, valor Sora 600, taxa. Etapa atual com gradiente coral→urze.
- **Item de próximo passo**: ícone da área em quadrado de vidro, título 13,5 px, tags, status à direita.
- **Chips de filtro**: 26–28 px; ativo em `--ponta` a 14%.
- **Seletor de modo**: dois botões grandes ORVALHO / SEIVA com linha de apoio; ativo em vidro claro com contorno da cor do modo.
- **Mapa de calor (Anéis)**: células 13 px, raio 3, escala carmim `#3A1712 · #6B2419 · #A63F2F · #D9604C` (o último com brilho). Futuro vazio.
- **Gráficos**: no máximo 4 cores; grade quase invisível (`rgba(255,255,255,.14)` só na base); previsto tracejado; valor em destaque só no ponto atual; barras com fibra e o melhor dia com brilho.

## 7. A Protea (mascote · só Protea)

Rosto holográfico em malha de arame, recolorido com a paleta do projeto por mapa de luz: sombras em vinho `#7F251C`, meios-tons em bráctea `#D9604C` e rosa `#E8A38F`, linhas mais claras em ponta/pérola, e o brilho dos olhos puxado para o miolo índigo `#8D97CF`. Arquivo: [`design/marca/protea-holo.png`](../design/marca/protea-holo.png) (fundo transparente). Originais em `references/10-protea-holograma.png` (rosto) e `references/09-protea-armadura.png` (corpo, para o futuro).
- **Olha para o mouse, sem sair do lugar**: a posição é fixa. O corpo/cabeça gira em 3D na direção do cursor (até ±24° na horizontal e ±12° na vertical, mola `lerp` 0,08) e os dois olhos — brilhos índigo/pérola sobrepostos à imagem — deslizam até 4 px na mesma direção (mola 0,18, mais rápidos que a cabeça). Ao sair o mouse, volta a olhar para a frente. Só `transform` via `requestAnimationFrame`; o laço para sozinho.
- Em repouso, o brilho respira (opacidade .86 → 1 em 6 s).
- "Reduzir movimento" a deixa parada.
- Sombra de luz coral suave (`drop-shadow` `rgba(217,96,76,.4)`).
- Aparece no banner do Jardim, em telas vazias, na Floração e no carregamento. No tema Essencial, não aparece.

## 8. Movimento e modos

Atributo único no `<html>`: `data-mode="orvalho" | "seiva"`. Os tokens de duração, curva e intensidade trocam por ele.

| | **Orvalho** (calmo · em ciclos) | **Seiva** (flow · sem relógio) |
|---|---|---|
| Técnica | Pomodoro 25 · 5 · ×4 (ajustável) | Flowtime, contagem progressiva, pausa = 1/5 |
| Sensação | textura, leveza, respiração | volume, profundidade, energia |
| Duração / curva | 700 ms, `cubic-bezier(.4,0,.2,1)` | 220 ms, `cubic-bezier(.2,.8,.2,1.12)` (mola leve) |
| Contínuas | só a respiração do núcleo (10 s) | núcleo pulsa (3,2 s) + ponto em órbita (16 s) + fita corre (3,5 s) |
| Cor | sálvia `--folha`, vidro fosco, veio | coral e miolo, vidro mais claro, orbe 3D com borda nácar |
| Números | Sora 200 | Sora 800 no timer |
| Avisos | agrupados para a pausa | silenciados; Calendly bloqueado |
| App inteiro | animações de entrada lentas, sem partículas | hover com mola, até 6 partículas lentas, fita nas bordas do banner |

### Seiva sem cansar — regras fixas
1. No máximo 2 animações contínuas por tela.
2. Nada repete em menos de 3 s. Nada pisca.
3. Até 6 partículas, lentas e translúcidas.
4. Brilho só no núcleo. Textos e cartões ficam parados.
5. Sem movimento ao rolar a página nem atrás de texto.
6. Depois de 90 min, ou com a janela fora de foco, a animação para sozinha.
7. "Reduzir movimento" do sistema desliga tudo, nos dois modos.

### Movimento geral (qualquer modo)
- Entrada de cartões: sobe 8 px + opacidade, escalonado em 40 ms, só na primeira visita da sessão.
- Gráficos se revelam da base (barras) ou da esquerda (linhas) uma vez; números contam até o valor em 600 ms.
- Hover em cartão: borda clareia para 22% — o cartão não se move.
- Troca de modo: transição de 1,2 s nas cores e nas florações do fundo.

## 9. Escrita

- Português do Brasil, frases curtas, verbo no começo dos botões ("Iniciar Orvalho", "Novo projeto").
- Gentil e sem culpa: "Pausa curta. A tarefa espera por você." — e não "Você quebrou sua sequência!".
- Rótulos em caixa alta só via CSS (`text-transform`), nunca digitados em maiúsculas.
- Datas `10–16 nov`, moeda `R$ 18.450`, horas `12h40`.

## 10. Temas: Protea × Essencial

Seletor no topo (pílula dupla, `PROTEA | ESSENCIAL`): ativo do Protea em gradiente blush→coral; ativo do Essencial em marfim. No código: `<html data-theme="protea" | "essencial">`, independente de `data-mode`.

**Protea** é a identidade deste documento (§1–§9). **Essencial** é um tema de produto padrão, sóbrio e familiar: mesmo layout, grade, componentes, vidro e movimento, mas com paleta e tipografia comuns e sem nada da flor.

| | Protea | Essencial |
|---|---|---|
| Nomes | botânicos + função embaixo | consolidados: Visão geral, Agenda, Notas, Projetos, CRM, Dev, Financeiro, Foco, Atividade; Pomodoro e Flow |
| Fundo | tinta escura com florações coral, índigo e oliva | zinco `#111318 → #0A0B0E` com um único brilho azul no topo |
| Texto | pérola `#EDE6E3` · `#C2B6B2` · `#9C8D81` | zinco `#F4F4F5` · `#A1A1AA` · `#71717A` |
| Cor de ação | bráctea curta (rosa→coral→carmim), texto escuro | azul `#3B82F6` sólido, texto branco |
| Selecionado / foco | ponta `#F2C4B5` | azul claro `#93C5FD` |
| Cores das áreas | Protea-rei (§2) | Agenda `#38BDF8` · Notas `#A1A1AA` · Projetos `#3B82F6` · CRM `#818CF8` · Dev `#2DD4BF` · Financeiro `#34D399` · Foco `#F59E0B` |
| Sucesso / atenção / erro | folha · sépala · vermelhão | `#34D399` · `#F59E0B` · `#EF4444` |
| Mapa de calor | escala coral | escala azul `#172554 · #1E3A8A · #2563EB · #3B82F6` |
| Tipografia | Sora (títulos em caixa alta, números finos) + Inter | só Inter; título em caixa normal ("Visão geral", 700, −0,025em); números Inter 500 |
| Vidro | mais claro, borda 15%, pólen por cima | mais discreto, borda 10%, sem textura |
| Ícones do menu | botânicos | comuns (grade, calendário, documento, quadro, pessoas, código, carteira, relógio, pulso) |
| Mascote | sim, no banner | não; no lugar, painel "Hoje" com os próximos 3 itens |
| Texturas da flor | sim | não |
| Fita do banner | nácar | azul, 45% de opacidade |

Implementação: as cores das telas são **variáveis**, nunca hex soltos; o tema só troca os valores (ver `design/tokens/protea.css`). Cada texto que muda é um par de chaves de tradução (`t('area.projetos')` → "Estufa" ou "Projetos"); peças só do Protea recebem uma condição de tema, nunca uma tela duplicada.

## 11. Checklist antes de entregar uma tela

- [ ] Moldura igual ao Jardim (menu, topo, vidro, fundo com florações).
- [ ] Nome botânico da área no menu ativo, no chip de contexto e no título.
- [ ] Cor da área como dominante; ≤ 4 cores por gráfico.
- [ ] Um botão principal.
- [ ] Textura sutil presente; nada de fundo liso.
- [ ] Funciona nos dois modos, nos dois temas e com movimento reduzido.
- [ ] Contraste AA; status com texto; `aria-label` nos gráficos.
- [ ] Dados batendo com AREAS.md.
