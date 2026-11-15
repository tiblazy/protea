# Brief visual — Protea | Dashboard principal

## 1. O produto

Protea é um espaço de trabalho para projetos e negócios criativos. O dashboard deve ajudar a pessoa a entender rapidamente o estado do trabalho, das oportunidades comerciais, do dinheiro e da própria capacidade de foco. A metáfora da protea — uma flor que reúne muitas partes em uma estrutura forte — conecta as áreas sem transformar a interface em um jardim literal.

**Promessa visual:** visão clara do que está florescendo, do que precisa de atenção e do próximo passo.

**Personalidade:** inteligente, acolhedora, precisa, contemporânea e levemente orgânica. Deve equilibrar rigor analítico com humanidade. Evitar estética corporativa fria, aparência de game infantil e excesso de efeitos brilhantes.

## 2. O pedido desta etapa

Criar uma única imagem estática da aba **Dashboard**, tela principal do produto. O sistema completo terá várias abas, mas nenhuma outra tela deve ser desenhada nesta etapa. Não implementar funcionalidades: botões, filtros e navegação aparecem apenas como elementos visuais sem comportamento.

**Referência prioritária de motion e dados informativos:** [Dark Mode CRM Pipeline Dashboard UI Design — Pinterest](https://pin.it/1iTD5IOAv), vídeo curto atribuído a GRITVE. Consulte [`references/07-referencia-principal-animacoes.md`](references/07-referencia-principal-animacoes.md). Ela passa a ser a referência principal para imaginar como gráficos, KPIs e informações poderiam se revelar e responder visualmente numa etapa futura. Como o entregável atual é uma PNG, aplique a clareza, hierarquia e estados finais dos gráficos; não acrescente quadros, setas de movimento ou recursos que façam a tela parecer uma animação.

### Entrega visual

- Desktop, proporção 16:10, quadro de referência 1600 × 1000 px.
- Interface em português brasileiro.
- Aparência de produto SaaS real e pronto para uso, com hierarquia e leitura rápida.
- Mostrar a sidebar e o dashboard em uma composição única. Não usar mockup de notebook ou perspectiva inclinada.
- Densidade média: vários tipos de dado, com respiro suficiente para os números e gráficos serem lidos.
- Dados fictícios, mas internamente coerentes. Não sugerir integração real.

## 3. Direção de arte e identidade

### Conceito: “crescimento com estrutura”

Usar uma base escura sofisticada e acentos inspirados na flor protea. A interface deve remeter a uma estufa noturna contemporânea: fundo profundo e calmo, cartões ligeiramente mais claros, linhas finas, pequenas áreas de cor e um foco quente para ações e estados importantes. A referência Marathon (#03) inspira o cuidado com componentes, transparências e brilho controlado; a identidade final precisa ser mais editorial, menos esportiva e mais própria da Protea.

### Paleta sugerida

- Fundo geral: ameixa quase preta / carvão-violeta, por exemplo `#100F18`.
- Sidebar e superfícies elevadas: `#171622` e `#1D1B29`.
- Bordas: lavanda acinzentada com baixa opacidade, por exemplo `#343141`.
- Texto principal: marfim suave `#F5F1F4`; secundário: cinza-lavanda `#AAA5B5`.
- Cor central da marca: rosa protea / coral queimado, por exemplo `#E8869A`.
- Acento botânico: verde sálvia `#91B79A`.
- Acento de luz e métricas positivas: âmbar suave `#E7B970`.
- Azul frio pode aparecer discretamente em dados secundários, sem competir com o rosa.

Usar valores próximos como direção, não como obrigação de código. Reservar as cores mais vivas para dados, status e foco visual. Contraste de leitura acima de brilho decorativo.

### Formas e assinatura Protea

- Cartões com cantos arredondados moderados (12–16 px), sem “pílulas” em tudo.
- Contornos leves, sombras discretas e gradientes quase imperceptíveis.
- Recurso proprietário possível: pétalas geométricas em leque, roseta abstrata ou linhas radiais finas em ícone de marca, avatar de espaço ou detalhe de progresso.
- A flor deve surgir como detalhe gráfico e linguagem de crescimento, nunca como fundo ilustrado repetido.
- Elementos de foco podem evoluir como broto → pétalas → flor aberta. Nesta imagem, usar uma roseta minimalista ou pequena ilustração vetorial estilizada, sem pixel art.

### Tipografia

Sans-serif contemporânea e muito legível. Títulos curtos com peso semibold; números de KPI grandes e tabulares; texto auxiliar compacto mas legível. Usar no máximo duas famílias/pesos principais. Evitar fontes futuristas ou display esportiva.

## 4. Composição recomendada

Pensar a tela em três zonas: navegação fixa à esquerda, contexto e ação no topo, conteúdo analítico em uma grade de cartões.

### A. Sidebar (aprox. 220 px)

- Marca: símbolo de pétalas abstratas + **protea**.
- Navegação visual com Dashboard selecionado. Outras entradas podem indicar o alcance do produto sem criar telas: Projetos, Leads, Financeiro, Foco e Relatórios.
- Rodapé com avatar, nome curto e plano/workspace.
- Sidebar sóbria, ícones lineares consistentes e estado selecionado em rosa protea com fundo discreto.

### B. Cabeçalho principal

- Saudação: “Bom dia, Marina” (ou “Bom dia” + nome em uma linha).
- Título: **Visão geral**.
- Subtexto contextual: “Seu trabalho está ganhando forma.”
- Seletor visual de período “Esta semana” e data curta “10–16 nov, 2026”.
- Ação primária discreta: “+ Novo projeto”. Não precisa parecer funcional.
- Pequeno indicador de atualização ou status da semana, sem notificações fictícias alarmantes.

### C. Linha de indicadores principais

Quatro cartões pequenos, com ícone e comparação de período:

1. **Projetos ativos** — `8`, `+2 este mês`.
2. **Leads em conversa** — `24`, `+18%`.
3. **Receita prevista** — `R$ 18.450`, `+12,4%`.
4. **Foco na semana** — `12h 40min`, `+2h 10min`.

Ícones discretos. Não transformar toda métrica em gráfico dentro do cartão. Pequenos sparklines são aceitáveis em 1–2 cartões.

### D. Grade analítica (duas colunas com assimetria leve)

**Cartão maior: Ritmo dos projetos**

- Gráfico de barras agrupadas, semanas ou dias, comparando tarefas concluídas e planejadas.
- Intervalo semanal, legenda simples e valores com contraste legível.
- Exemplo: “Concluídas 32” e “Planejadas 40”, com progresso de `80%`.
- Evitar eixos pesados; mostrar grade sutil e tooltip estático opcional apenas se não poluir.

**Cartão: Funil de prospecção**

- Funil horizontal ou barras segmentadas, mais fácil de ler do que um gráfico de pizza.
- Etapas: Novos `42` → Contato `24` → Reunião `11` → Proposta `6`.
- Destaque para “6 propostas em andamento”. Representar leads como oportunidades, sem prometer conversão garantida.

**Cartão: Fluxo financeiro**

- Gráfico de área/linha leve ou barras agrupadas para entradas e saídas nos últimos seis meses.
- Números-resumo: “Recebido R$ 12.800”, “A receber R$ 8.250”, “A pagar R$ 3.640”.
- Saldo do período: `+ R$ 9.160` se incluir recebido e a receber menos a pagar; ou rotular claramente como saldo projetado.
- Não misturar caixa realizado com previsão sem distingui-los. Usar linha sólida para realizado e tracejada/tonalidade para previsto.

**Cartão: Foco que floresce**

- Indicador visual de progresso semanal, com roseta/proteia minimalista formada por pétalas ou anel segmentado.
- `12h 40min` de foco, `28` ciclos concluídos e meta semanal de `16h` (`79%`). Como 12h40/16h = 79%, manter consistência.
- Microtexto: “Seu melhor ritmo foi na quarta-feira”.
- Uma ação visual secundária: “Ver sessões”.

**Faixa inferior: Próximos passos**

Uma lista compacta de 3 itens, cada um com área, prazo e status. Exemplo:

- Projeto Aurora — revisar identidade — hoje, 16:00 — Em andamento.
- Estúdio Nativa — enviar proposta — hoje — Lead quente.
- Nota fiscal — receber de Casa Oliva — amanhã — A receber.

Isso conecta Kanban, CRM e financeiro a decisões práticas, sem tentar mostrar o sistema inteiro.

## 5. Pomodoro e Flow da Protea

No dashboard, apresentar foco como um resumo acolhedor e configurável, não como um cronômetro ativo. O sistema poderá oferecer dois modos complementares:

### Ciclo Protea (baseado em Pomodoro)

- Ciclo inicial sugerido: 25 min de foco + 5 min de pausa curta.
- Após 4 ciclos, sugerir uma pausa longa de 15–30 min.
- As durações devem ser ajustáveis pela pessoa; 25/5 é uma predefinição, não obrigação.
- Antes do ciclo, escolher uma tarefa ou projeto. Ao concluir, registrar uma sessão; pausa não conta como foco.
- Se uma sessão for interrompida, permitir marcar interrupção sem apagar o histórico. A interface não deve punir nem usar linguagem de culpa.
- Recompensas podem ser visuais e cumulativas: pétalas por sessões concluídas, flores por metas semanais e sementes para marcos de consistência. Não atrelar recompensa a dinheiro.

### Flow Protea (baseado em Flowtime)

- Iniciar foco sem duração rígida. Encerrar quando a pessoa sentir queda de concentração ou concluir a tarefa.
- Registrar duração real e convidar uma pausa proporcional ou escolhida livremente.
- Mostrar blocos de foco contínuos, duração média e períodos em que a pessoa costuma render melhor, sem inferir saúde ou produtividade absoluta.
- A pessoa pode alternar entre Ciclo Protea e Flow a qualquer momento.

### Linguagem de produto

- Nome visual recomendado para os modos: **Ciclo Protea** e **Flow**.
- Usar “sessões de foco”, “pausa”, “ritmo” e “consistência”. Evitar “quebrou sequência”, culpa, punições ou comparações competitivas.
- Para a PNG, mostrar apenas o resumo e a escolha visual entre os dois modos como pequenos chips/cards estáticos. Não simular contagem regressiva.

## 6. Referência principal de animações e informativos

O vídeo de CRM da GRITVE é a primeira referência a considerar ao definir a apresentação e o futuro movimento de informação. A tela reúne pipeline comercial, acompanhamento de campanhas, distribuição de receita e visualização em painel escuro — assuntos próximos ao contexto da Protea. A referência deve influenciar a **lógica de leitura** e o **comportamento futuro** dos dados; a Protea preserva sua identidade botânica, sua paleta e seus próprios componentes.

### Princípios de movimento para o futuro produto

- **Revelar o dado em sua ordem de leitura:** primeiro contexto e rótulo, depois valor; no gráfico, eixo/estrutura antes das séries.
- **Traçar linhas e áreas com progressão curta e suave**, para mostrar tendência sem atrasar a leitura.
- **Fazer barras crescerem do eixo base** e partes do funil aparecerem em sequência; destacar o estágio atual com cor ou brilho discreto.
- **Atualizar KPIs com contagem breve** quando houver mudança de período, preservando o valor estável para leitura.
- **Usar animação de entrada em cascata curta entre cartões**, sem fazer o dashboard inteiro esperar para ficar utilizável.
- **Dar feedback sutil a seleção de período, filtros e hover**: realce de borda, tooltip e transição de cor/posição pequena.
- **Manter os dados comparáveis durante a transição.** A escala do gráfico não deve saltar de forma enganosa, e o número final deve permanecer disponível.
- **Respeitar redução de movimento:** informação nunca depende da animação para ser entendida; oferecer transições reduzidas ou nenhuma transição.

Esses princípios são uma tradução de direção, não uma alegação de que cada efeito esteja presente no pin. A imagem solicitada nesta etapa mostra o estado final estático, com gráficos legíveis e sem indicadores de movimento.

## 7. Leitura das referências

| Ref. | O que aproveitar | O que traduzir para a Protea |
|---|---|---|
| [Pin principal — Dark Mode CRM Pipeline Dashboard UI Design](https://pin.it/1iTD5IOAv), nota em `references/07-referencia-principal-animacoes.md` | Referência prioritária para apresentação de dados de CRM em painel escuro e orientação de motion futuro para gráficos e indicadores. | Aproveitar a leitura progressiva de gráficos, métricas e estágios do pipeline. Manter animações curtas, informativas e opcionais; usar a identidade Protea e entregar agora apenas o estado estático. |
| `01-dashboard-chart-library.png` | Variedade de gráficos, indicadores e áreas bem delimitadas. | Limitar a quantidade visível e unificar cores e espaçamento. Dados de projeto, leads e dinheiro devem ter hierarquia clara. |
| `02-analytics-dashboards.png` | Sensação de central analítica escura, linhas temporais e módulos complementares. | Mais espaço em branco, menos neon e melhor leitura em português. |
| `03-marathon-design-system.png` | Coesão de componentes, estados, cartões, inputs e materiais translúcidos. | Usar apenas os princípios de sistema; remover linguagem esportiva e brilho excessivo. Adotar pétalas/roseta e paleta Protea. |
| `04-focus-colony-pomodoro-game.png` | Timer ligado a progresso tangível e sensação de mundo em crescimento. | Transformar colônia em flor/roseta abstrata, elegante e adulta. Foco é parte do dashboard, não jogo separado nesta imagem. |
| `05-pomodoro-method-rules.png` | Ciclos focados, pausas curtas e longa após quatro sessões, com orientações visíveis. | Tratar como padrão editável, não regra universal. Sintetizar; não incluir infográfico textual no dashboard. |
| `06-pomodoro-vs-flowtime.png` | Dois ritmos diferentes: blocos estruturados e foco flexível. | Oferecer Ciclo Protea e Flow no mesmo produto, com registros comparáveis e linguagem sem julgamento. |

## 8. Regras de qualidade da imagem

- A tela deve ser reconhecível como dashboard de gestão ao primeiro olhar.
- Priorizar títulos, números-chave e gráficos; o detalhe não pode virar ruído.
- Manter alinhamentos, espaçamentos e raios consistentes.
- Não usar imagens de banco, fotos de corredores, tomatinhos, formigas, criaturas, troféus genéricos ou dashboards financeiros de corretora.
- Não copiar logotipos ou composições das referências.
- Evitar tabelas longas, excesso de widgets, mais de quatro cores de gráfico simultâneas e textos ilegíveis.
- Valores monetários em reais brasileiros, com formatação correta.
- O destaque principal deve ser a sensação de clareza e progresso integrado; a marca Protea deve estar presente sem dominar a leitura.

## 9. Lista de verificação antes de entregar

- [ ] A imagem mostra apenas o dashboard principal, sem desenhar outras telas.
- [ ] O nome Protea está aplicado com uma assinatura visual própria.
- [ ] Kanban/projetos, leads, financeiro e foco aparecem em uma visão integrada.
- [ ] Pomodoro e Flow são apresentados como modos complementares e configuráveis.
- [ ] Os valores estão coerentes entre si e identificados como dados demonstrativos.
- [ ] A direção usa as referências sem copiá-las.
- [ ] O conteúdo em português permanece legível no tamanho final.
- [ ] A composição tem acabamento de produto real e não parece um template genérico.

