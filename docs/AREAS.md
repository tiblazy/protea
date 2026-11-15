# Protea — áreas, telas e conteúdo

Mapa de navegação e o que cada tela precisa mostrar. Visual em [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md). Motivações longas e backlog em [`../IDEIAS-E-ROADMAP.md`](../IDEIAS-E-ROADMAP.md).

## Mapa

Coluna **Essencial** = nome no tema profissional e também o nome usado no código e nas rotas.

| Ordem | Protea | Essencial | Cor | Rota | Subseções |
|---|---|---|---|---|---|
| 1 | **Jardim** | Visão geral | nácar | `/` | — |
| 2 | **Estações** | Agenda | rosa `#E8A38F` | `/agenda` | Semana · Mês · Regras do Calendly |
| 3 | **Herbário** | Notas | pérola `#C2B6B2` | `/notas` | Páginas · Favoritos · Bancos de dados |
| 4 | **Estufa** | Projetos | protea `#D9604C` | `/projetos` | Projetos · Tarefas (Quadro, Lista, Calendário, Linha do tempo) |
| 5 | **Sementeira** | CRM | sépala `#C8C267` | `/crm` | Funil de leads · Importar · exportar · Propostas |
| 6 | **Raízes** | Dev | caule `#B07B5E` | `/dev` | Sites · PRs e issues · Renovações · Cofre |
| 7 | **Colheita** | Financeiro | folha `#86A472` | `/financeiro` | Visão geral · Cobranças e impostos |
| 8 | **Floração** | Foco | miolo índigo `#8D97CF` | `/foco` | Orvalho · Seiva · Ambiente |
| 9 | **Anéis** | Atividade | carmim (escala) | `/atividade` | Ano · Hora × dia · Por área |
| — | Busca global | — | — | `Ctrl K` (sobreposição) | Ações · Resultados por área |

Outros pares de texto: Orvalho ↔ **Pomodoro** · Seiva ↔ **Flow** · Sementes (etapa do funil) ↔ **Novos** · "Entrar em Seiva" ↔ "Iniciar Flow" · "Seu trabalho está ganhando forma." ↔ "Tudo o que importa nesta semana.".

"Em destaque" não é área: fica recolhido no rodapé do menu com contador e abre uma lista ao clicar.
No tema Protea, cada item do menu mostra o nome botânico e, embaixo, a função (ex.: "Estufa / projetos e tarefas"). No Essencial, só o nome consolidado, com ícone comum (grade, calendário, documento, quadro, pessoas, código, carteira, relógio, pulso).

## Moldura comum a todas as telas

Igual ao Jardim ([`design/referencia/jardim.html`](../design/referencia/jardim.html)): menu lateral de vidro com o item da área ativo, barra do topo (busca `Ctrl K`, estado das integrações, período, botão principal da área), conteúdo em grade de cartões de vidro. Toda tela de área abre com um **banner** (título Sora em caixa alta com o nome da área ou da subseção, frase curta, 1 botão principal, fita de nácar) mais baixo que o do Jardim (140 px), seguido da faixa de métricas da área.

## Dados de exemplo (use estes, coerentes entre telas)

- Persona: **Tiburcio Martins**, dev freelancer, Fortaleza (UTC−3). Perfil: "Dev freelancer".
- Semana 46: **10–16 nov 2026**. Tarefas 32/40 (80%). Foco 12h40 de 16h (79%), melhor dia quarta, pico ter–qui 9h–11h; 28 ciclos Orvalho + 2 Seiva.
- Projetos ativos 8 (+2 no mês). Clientes: Aurora (e-commerce Next.js, PR #42 checkout), Estúdio Nativa (call de briefing hoje 11:00 via Calendly, proposta R$ 8.500 = 59h × R$ 140), Casa Oliva (R$ 3.200 a receber amanhã; escopo em risco → aditivo).
- Sementeira: 42 leads = 18 sementes novas + 24 em conversa (13 contato, 5 reunião, 6 proposta); propostas abertas R$ 32.600; fechados em nov R$ 14.200. No funil do Jardim: SEMENTES 42 · CONTATO 24 · REUNIÃO 11 · PROPOSTA 6.
- Colheita nov: recebido R$ 12.800 · a receber R$ 8.250 (3.200 + 3.450 + 1.600) · a pagar R$ 3.640 · saldo projetado + R$ 17.410 · receita prevista R$ 18.450 (+12,4% vs out) · valor da hora R$ 104 (+R$ 9) · faturado 2026 R$ 107.900 (acima do teto MEI de R$ 81 mil desde setembro).
- Raízes: manutenção recorrente R$ 680/mês com 2 clientes.

## Perfil e saudação

- Nome completo padrão: **Tiburcio Martins** (iniciais TM, avatar com anel bráctea). Campo opcional **slug** (apelido, sem `@`); quando existe, a saudação usa o slug e o perfil mostra `Dev freelancer · @slug`.
- A saudação do Jardim segue o horário local, com uma frase curta e gentil (nunca cobrança):

| Horário | Saudação | Frase |
|---|---|---|
| 5h–11h59 | Bom dia, {slug ou nome} | Bom começo: 1 call e 5 tarefas hoje. |
| 12h–17h59 | Boa tarde, {slug ou nome} | Boa hora de fechar as revisões. |
| 18h–23h59 | Boa noite, {slug ou nome} | Hora de desacelerar. Até amanhã. |
| 0h–4h59 | Boa noite, {slug ou nome} | Já é tarde. O resto pode esperar. |

No código, os números da frase vêm dos dados do dia (calls e tarefas reais); sem nada agendado, use "Dia livre na agenda. Bom para uma Seiva." (manhã) ou omita a frase.

## Por área

### Jardim — visão geral ✅ referência pronta
Saber em 10 segundos o que fazer agora. Banner com a Protea 3D · próximo compromisso (contagem regressiva) · anel de Floração da semana · faixa de métricas (projetos, leads, receita, valor da hora) · ritmo da Estufa (barras planejado × feito) · funil da Sementeira · fluxo da Colheita · próximos passos de várias áreas · cartão de modo Orvalho/Seiva · Anéis 20 semanas.

### Estações — agenda
Nunca marcar duas coisas no mesmo horário e proteger o foco. Semana com eventos do Google Agenda e do Calendly; blocos de Floração viram "ocupado" no Calendly; 15 min de folga após calls; máx. 2 calls/dia; calls só depois das 14h; registro "conflito evitado". Cada call nova cria ou atualiza o lead na Sementeira.

### Herbário — notas (estilo Notion)
Guardar processos, snippets, estudos e coisas pessoais junto do trabalho. Árvore de páginas, favoritos, bancos de dados; blocos (texto, título, checklist, código, tabela, destaque); menu "/" com blocos da Protea (tarefa, lead, snippet) abrindo para cima; menções com @; painel "Conectado a"; captura rápida `Ctrl Shift N`. Textura de pelo prateado nos cartões de página.

### Estufa — projetos e tarefas (substitui o ClickUp)
- **Projetos**: etapas ESCOPO → DEV → TESTES → DEPLOY, horas usadas × contratadas, valor real da hora, alerta "em risco", próxima tarefa.
- **Tarefas**: quadro com A fazer · Fazendo · Em revisão · Aguardando cliente · Concluído; prioridade, prazo, subtarefas, estimativa, modo sugerido (Orvalho/Seiva), "lembrar no WhatsApp". Tempo em "Aguardando cliente" pausa o relógio do projeto. Cartão de tarefa com faixa de fibra na cor da prioridade.

### Sementeira — leads e propostas (CRM)
- **Funil**: score 0–100, canais (WhatsApp, Instagram, site), nota e avaliações do Google Maps, origem do lead, "por que abordar".
- **Importar · exportar CSV**: etapas lidos 340 → válidos 319 → únicos 282 → novos 264 → no filtro 128. Deduplicação por telefone/WhatsApp normalizado, mesmo domínio, mesmo @, nome + endereço ≥ 90% iguais (mesmo lead vindo de CSVs ou scrapers diferentes). Filtros: dia da importação, categoria/nicho, cidade, tem WhatsApp, Instagram ativo, site (não tem / fraco / bom), nota 4,5+, 50+ avaliações, potencial de fechamento 70+.
- **Score** (calibrável): sem site ou site fraco +25 · nota 4,5+ com 50+ avaliações +20 · nicho que já fechou +20 · Instagram ativo + WhatsApp +20 · até 8 km +15 · sem resposta 2× −20.
- **Propostas**: escopo por itens com horas, margem 15%, hora alvo R$ 140, prévia do cliente, aceite e assinatura. No aceite: cria projeto na Estufa, cobrança do sinal na Colheita, onboarding, repositório em Raízes e kickoff em Estações.
- Atenção: LGPD em leads de scraper e regras do WhatsApp Business para a primeira mensagem.

### Raízes — código e sites (dev)
Sites dos clientes (uptime, desempenho, último deploy, domínio), PRs e issues, renovações a repassar, horas por repositório (commits + Floração), cofre de acessos (criptografia ponta a ponta; avaliar integrar com 1Password/Bitwarden em vez de criar do zero).

### Colheita — financeiro
- **Visão geral**: recebido, a receber, custos, imposto guardado, retirada (pró-labore), reserva em meses de custo de vida; fluxo de 12 meses + previsão de 90 dias; regra "cada R$ 100 que entra" (55 você · 25 reserva · 14 custos · 6 imposto); concentração por cliente; valor real da hora; faturamento × teto do MEI.
- **Cobranças e impostos**: NF, Pix/boleto/cartão, lembrete gentil no WhatsApp (3 dias antes, no dia, 3 depois), exportar para a contadora. DAS-MEI serviços R$ 86,05 (2026); acima do teto → Simples Nacional, ~6% estimado — confirmar com a contadora.

### Floração — foco
- **Orvalho**: ciclos 25 · 5 · ×4 ajustáveis, respiração guiada, interrupção registrada sem culpa.
- **Seiva**: sem relógio, contagem progressiva, média e recorde, pausa proporcional (1/5), captura de ideias, melhor horário ("Seiva rende mais entre 10h e 12h").
- **Ambiente**: regras do modo no app inteiro (ver DESIGN-SYSTEM §8) e pílula flutuante com o tempo em qualquer tela.

### Anéis — atividade
Ano inteiro estilo GitHub (anéis de crescimento da árvore), sequência atual/maior, dia mais forte; hora × dia; energia por área (Estufa 41%, Sementeira 22%, Floração 14%, Estações 14%, Colheita 9%); padrões ("propostas na terça de manhã respondem 2× mais"). Conta como atividade: tarefa concluída, lead movido, sessão de foco, commit, cobrança.

### Busca global — `Ctrl K`
Ações primeiro (entrar em Seiva, nova tarefa, lançar horas), depois resultados de todas as áreas; `Tab` filtra por área. Fundo: a tela atual desfocada, não um fundo escuro chapado.

## Estado das telas

Todas as telas estão na versão final v4 (vidro + cores Protea-rei + seletor Protea × Essencial + menu com nomes botânicos). Imagens em `telas-final/` (01 a 21); no canvas, página "Protea v4 · final", com o menu lateral navegável no Play.

| # | Tela | Arquivo no canvas |
|---|---|---|
| 01 | Jardim | `Main.dc.html` |
| 02 | Estações | `v4-Estacoes.dc.html` |
| 03 | Anéis | `v4-Aneis.dc.html` |
| 04 | Busca (Ctrl K) | `v4-Busca.dc.html` |
| 05–06 | Estufa · Projetos, Tarefas | `v4-Estufa-*.dc.html` |
| 07–09 | Sementeira · Funil, Importar, Propostas | `v4-Sementeira-*.dc.html` |
| 10–11 | Colheita · Visão geral, Cobranças | `v4-Colheita*.dc.html` |
| 12–14 | Floração · Orvalho, Seiva, Ambiente | `v4-Floracao-*.dc.html` |
| 15 | Herbário | `v4-Herbario.dc.html` |
| 16 | Raízes | `v4-Raizes.dc.html` |
| 17–21 | Design system: fundamentos, modos, componentes, comparação, cores | `v4-DS-*.dc.html`, `Paleta.dc.html` |

Ajustes finos que ficam para o código: animações de entrada (§8), estados vazios/carregando/erro, versão mobile, e o fundo desfocado real da Busca.
