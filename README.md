# Protea

Meu espaço de trabalho único como dev freelancer: projetos e tarefas, notas, leads, financeiro, agenda com Calendly, foco e atividade num só lugar, para eu me preocupar com um app só.

O nome vem da protea, a flor (e da inspiração em Warframe). A mascote é um rosto original feito da flor, não a personagem do jogo.

## Onde está cada coisa

| Caminho | O que é |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Instruções que o Claude Code lê sozinho ao abrir o projeto: ordem de leitura e regras que não mudam |
| [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) | **Fonte da verdade visual**: cores, tipografia, vidro, texturas, Protea 3D, movimento, modos Orvalho/Seiva, escrita, checklist |
| [`docs/AREAS.md`](docs/AREAS.md) | Mapa das áreas com nomes, cores, rotas, subseções, conteúdo de cada tela e dados de exemplo |
| `design/marca/` | Logo: a protea-rei sem fundo (original e 256 px) |
| [`design/tokens/protea.css`](design/tokens/protea.css) | Tokens prontos para o código (variáveis CSS, vidro, texturas, status, keyframes, modos) |
| [`design/referencia/jardim.html`](design/referencia/jardim.html) | Tela de referência oficial (o dashboard), em HTML; o seletor do topo troca o tema |
| `design/referencia/jardim-protea.png` · `jardim-essencial.png` | A mesma tela nos dois temas |
| `design/marca/protea-holo.png` | A Protea (mascote holográfica, segue o mouse) |
| [`IDEIAS-E-ROADMAP.md`](IDEIAS-E-ROADMAP.md) | Motivações, backlog, integrações, sugestão técnica e pendências |
| `references/` | Imagens de referência (só inspiração, não copiar) |
| `telas-final/` | **As 21 telas finais (v4)**, uma por área + design system |
| `docs/arquivo/` | Briefings antigos |

## Nomes do projeto

Dois temas com o mesmo layout: **Protea** (o nosso, com nomes botânicos, mascote e texturas) e **Essencial** (profissional: paleta padrão zinco + azul, só Inter, nomes consolidados). O código usa sempre os nomes do Essencial.

| Protea | Essencial | | Protea | Essencial |
|---|---|---|---|---|
| Jardim | Visão geral | | **Orvalho** | Pomodoro |
| Estações | Agenda | | **Seiva** | Flow |
| Herbário | Notas | | | |
| Estufa | Projetos | | | |
| Sementeira | CRM | | | |
| Raízes | Dev | | | |
| Colheita | Financeiro | | | |
| Floração | Foco | | | |
| Anéis | Atividade | | | |

## Como trabalhar com o Claude Code

1. Abra esta pasta no Claude Code; ele lê o `CLAUDE.md` automaticamente.
2. Peça uma tela pelo nome da área ("crie a Estufa / Tarefas"). Ele segue o design system e a moldura do Jardim.
3. Para ajustes finos (animação, reposicionamento), cite a seção do design system ("ajuste a entrada dos cartões conforme §8").
4. Se uma regra mudar, mude **só** em `docs/DESIGN-SYSTEM.md` ou `design/tokens/protea.css`. O resto aponta para lá.

## Estado

- ✅ Cores v4 "Protea-rei noturna" (da logo) + vidro v3, aplicadas no Jardim, com o seletor Protea × Essencial.
- ✅ Protea holográfica no Jardim, seguindo o mouse.
- ✅ Todas as telas e o design system na v4 (`telas-final/`).
- ⏳ Código: stack sugerida em IDEIAS-E-ROADMAP §8 (Next.js + TypeScript + Postgres), ainda não decidida.
