# Protea — instruções para o Claude Code

Protea é o espaço de trabalho único de uma dev freelancer: projetos e tarefas, notas, leads, financeiro, agenda com Calendly, foco e atividade. Projeto pessoal; o dono é o usuário e único cliente do produto.

## Antes de criar ou mudar qualquer tela

1. Leia [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) inteiro. É a fonte da verdade visual: cores, tipografia, vidro, texturas, a Protea 3D, movimento e os dois modos.
2. Leia a seção da área em [`docs/AREAS.md`](docs/AREAS.md): nome, cor, subseções, conteúdo e dados de exemplo.
3. Abra a tela da área em `telas-final/` (versão final de cada tela) e a referência interativa [`design/referencia/jardim.html`](design/referencia/jardim.html). Toda tela nova herda dela a moldura, o menu, a barra do topo e o tratamento dos cartões.
4. Use os tokens de [`design/tokens/protea.css`](design/tokens/protea.css). Uma cor, raio, duração ou sombra que não esteja ali vira token primeiro, depois é usada.
5. No código, siga [`docs/PLANO-FRONTEND.md`](docs/PLANO-FRONTEND.md): estrutura por feature, limites entre módulos, ordem das fases e o processo de construção de cada tela.

## Regras que não mudam

- **Dois temas, uma interface**: o seletor no topo troca entre **Protea** (nomes botânicos, mascote, texturas da flor) e **Essencial** (mesmo layout e componentes, mas com paleta padrão zinco + azul, só Inter, nomes consolidados, ícones comuns e sem mascote nem texturas; ver DESIGN-SYSTEM §10). Cores sempre por variável, para o tema trocar só os valores. Todo texto visível que muda de nome vem em par (ver tabela em AREAS.md). Toda tela nova nasce com os dois temas.
- **Nomes no código**: rotas, componentes e chaves usam os nomes consolidados, que não mudam com o tema (`/projetos/tarefas`, `mode="flow"`, `theme="protea" | "essencial"`). O nome botânico é só rótulo de interface.
- **Linguagem visual**: vidro escuro com borda de luz, títulos em Sora caixa alta espaçada, números finos, anéis com brilho, faixa de métricas com ícone em cima, fita bráctea. No Protea, cores da paleta Protea-rei noturna (tirada da logo); cada área tem a sua cor de papel em cada tema.
- **Seiva nunca cansa**: siga as 7 regras de "Seiva sem cansar" em DESIGN-SYSTEM. `prefers-reduced-motion` desliga toda animação nos dois modos.
- **Textura**: cartões levam o pontilhado de pólen; cartões de destaque podem levar veio, fibra ou miolo. Textura é sutil (opacidade ≤ 0,18).
- **Texto**: português do Brasil, frases curtas, tom gentil e sem culpa. Dados de exemplo coerentes com AREAS.md, sem lorem ipsum.
- **Acessibilidade**: contraste AA para todo texto; status sempre com ponto + texto, nunca só cor; gráficos com `aria-label`.
- **Personagem**: a Protea é o rosto holográfico em `design/marca/protea-holo.png`, que segue o mouse (ver DESIGN-SYSTEM §7). Mantenha-a isolada num componente próprio. Não copie personagens, marcas ou arte de terceiros, nem das imagens em `references/`.

## Marca

A logo é a protea-rei em `design/marca/protea-logo.png` (sem fundo). A ilustração original está em `references/08-protea-rei-logo.png`.

## O que está superado (não use como base visual)

- `docs/arquivo/DASHBOARD_BRIEF.md`: briefing inicial, já incorporado.

## Ideias, backlog e decisões em aberto

[`IDEIAS-E-ROADMAP.md`](IDEIAS-E-ROADMAP.md) guarda motivações por área, backlog, integrações, sugestão técnica e pendências. Consulte quando a tarefa tocar uma funcionalidade nova ou uma integração.
