# Sementeira — regras de negócio dos leads

> Fonte da verdade das **regras** do CRM (o que é um lead, de onde vem cada dado, como se calcula score, sinais e horário de envio). O visual continua em [`../DESIGN-SYSTEM.md`](../DESIGN-SYSTEM.md) e o conteúdo das telas em [`../AREAS.md`](../AREAS.md).
> Objetivo: quem for implementar não precisa decidir regra nenhuma, só codar o que está aqui. Onde algo ainda é palpite, está marcado **[calibrar]**; onde depende de decisão da Tiburcio, **[decidir]**.
> Última atualização: 15 nov 2026.

## 1. Princípios

1. **Todo dado tem origem e data.** Cada campo guarda `fonte` (csv, outscraper, apify, google_places, manual, calendly, whatsapp, derivado) e `atualizado_em`. Dado sem origem não entra no score.
2. **Dado ausente ≠ dado ruim.** Campo vazio vale 0 no score, nunca negativo, salvo quando a regra diz o contrário.
3. **Derivado se recalcula, não se edita.** Score, sinais, janela de envio e próxima ação são calculados; a Tiburcio pode **fixar** um valor manual (`manual_override`), que vence até ela soltar.
4. **Sugestão, não automação cega.** A Protea sugere quando e o que enviar; a primeira mensagem sai com um clique da Tiburcio (ver §7).
5. **Fuso do lead.** Todo horário de envio é calculado no fuso do lead (`timezone`, padrão `America/Fortaleza`) e mostrado nos dois fusos se forem diferentes.

## 2. Campos do lead

Legenda da coluna **Obr.**: ● obrigatório para o lead existir · ○ opcional. Coluna **Atualiza**: quando o dado é renovado.

### 2.1 Identidade

| Campo (código) | Tipo | Obr. | Fonte | Atualiza | Notas |
|---|---|---|---|---|---|
| `id` | uuid | ● | derivado | — | |
| `nome` | texto | ● | csv/scraper/manual | importação | Nome como aparece no Maps |
| `nome_normalizado` | texto | ● | derivado | sempre | minúsculas, sem acento, sem "ltda/me/eireli", sem pontuação; usado na deduplicação |
| `nicho` | enum | ● | derivado | importação | categoria do Maps mapeada para a lista de nichos da Protea (§2.9) |
| `categorias_maps` | texto[] | ○ | scraper | 30 dias | primária + secundárias, como vieram |
| `cnpj` | texto | ○ | manual/enriquecimento | 90 dias | se existir, vira chave forte de deduplicação |
| `porte_estimado` | enum `micro·pequeno·medio` | ○ | derivado | 30 dias | ver regra em §2.8 |
| `eh_rede` | bool | ○ | derivado | 30 dias | mesmo nome normalizado ou mesmo domínio em ≥ 3 endereços → `true` (rede costuma decidir fora da loja) |
| `place_id` | texto | ○ | scraper/google_places | — | chave forte de deduplicação |

### 2.2 Contato e canais

| Campo | Tipo | Obr. | Fonte | Notas |
|---|---|---|---|---|
| `telefone_e164` | texto | ○ | csv/scraper | normalizado `+55DDDNÚMERO`; celular BR = 11 dígitos após o 55 começando com 9 |
| `tem_whatsapp` | enum `sim·nao·desconhecido` | ● | derivado/manual | `sim` se link wa.me no site/Instagram, botão no perfil do Maps ou confirmação manual. Telefone fixo → `nao` |
| `whatsapp_e164` | texto | ○ | derivado | pode ser diferente do telefone do Maps |
| `email` | texto | ○ | site/manual | só e-mail comercial visível publicamente |
| `instagram` | texto | ○ | site/scraper | `@` normalizado, sem URL |
| `decisor_nome` · `decisor_papel` | texto · enum `dono·gerente·marketing·recepcao·desconhecido` | ○ | manual/call | preenchido na conversa; papel `recepcao` reduz peso de "respondeu" (quem respondeu não decide) |
| `canal_preferido` | enum `whatsapp·instagram·email·telefone·presencial` | ○ | derivado | o canal por onde o lead **respondeu** mais rápido; vence a ordem padrão |

Ordem padrão de canal para o primeiro contato: **WhatsApp** (se `tem_whatsapp = sim`) → **Instagram DM** (se perfil ativo) → **e-mail** → **ligação**.

### 2.3 Google Maps

| Campo | Tipo | Fonte | Atualiza | Notas |
|---|---|---|---|---|
| `maps_nota` | 1,0–5,0 | scraper/places | 30 dias | |
| `maps_avaliacoes` | int | scraper/places | 30 dias | |
| `maps_avaliacoes_90d` | int | derivado | 30 dias | avaliações nos últimos 90 dias; mede se o negócio está vivo |
| `maps_ultima_avaliacao_em` | data | scraper | 30 dias | |
| `maps_responde_avaliacoes` | % 0–100 | derivado | 30 dias | % das últimas 20 avaliações com resposta do dono; dono que responde é dono presente no digital |
| `maps_status` | enum `operando·fechado_temp·fechado` | scraper/places | 7 dias antes de qualquer envio | `fechado*` bloqueia envio |
| `maps_fotos` | int | scraper | 30 dias | |
| `maps_faixa_preco` | texto | scraper | 30 dias | ajuda a estimar ticket |
| `horario_funcionamento` | JSON (§5.1) | scraper/places | 30 dias | **base da janela de envio** |
| `movimento_por_hora` | JSON 7×24, 0–100 (§5.1) | scraper (Outscraper `popular_times`, Apify) | 30 dias | não existe na API oficial do Google; fonte instável, sempre opcional |
| `lat` · `lng` · `bairro` · `cidade` · `uf` | — | scraper | importação | |
| `distancia_km` | número | derivado | importação | distância em linha reta até a base da Tiburcio (Fortaleza) |
| `timezone` | IANA | derivado | importação | pela `uf`/coordenada; padrão `America/Fortaleza` |

### 2.4 Presença digital

| Campo | Tipo | Fonte | Notas |
|---|---|---|---|
| `site_url` | url | scraper/manual | |
| `site_status` | enum `nao_tem·fora_do_ar·fraco·ok·bom` | derivado | regra em §2.8 |
| `site_https` | bool | verificação | |
| `site_mobile` | bool | verificação | viewport + sem rolagem horizontal |
| `site_desempenho` | 0–100 | PageSpeed (mobile) | **[decidir]** usar a API do PageSpeed Insights ou Lighthouse local |
| `site_tecnologia` | texto | detecção | wix, wordpress, linktree, só Instagram, próprio… |
| `site_copyright_ano` | int | site | ano no rodapé; ≤ ano atual − 3 = site parado |
| `site_tem_agendamento` · `site_tem_cardapio` · `site_tem_loja` · `site_tem_whatsapp` | bool | site | o que **falta** vira argumento de venda |
| `instagram_seguidores` | int | scraper/manual | |
| `instagram_ultimo_post_em` | data | scraper/manual | ativo = post nos últimos 30 dias |
| `instagram_posts_30d` | int | scraper/manual | |
| `instagram_link_bio` | url | scraper/manual | linktree ou wa.me no lugar de site = sinal |
| `anuncia` | bool | manual/biblioteca de anúncios | quem já paga anúncio entende investir em digital |

### 2.5 Relacionamento (funil)

| Campo | Tipo | Notas |
|---|---|---|
| `etapa` | enum `novo·contato·reuniao·proposta·fechado·perdido·pausado` | nomes de interface: Sementes/Novos, Contato, Reunião, Proposta… (par em AREAS.md) |
| `origem` | enum `csv·scraper·indicacao·instagram·site·calendly·manual` | + `origem_detalhe` (nome do arquivo, quem indicou) |
| `importado_em` | data | filtro "dia da importação" |
| `toques` | lista de `Toque` (§6) | cada mensagem enviada, com hora, canal, modelo e resultado |
| `ultimo_contato_em` · `ultima_resposta_em` | data-hora | derivados dos toques |
| `tempo_medio_resposta_min` | int | derivado; só com ≥ 1 resposta |
| `horas_resposta` | int[] | horas locais em que o lead respondeu; alimenta §5 |
| `objecoes` | enum[] `preco·tempo·ja_tem·sem_interesse·depois·outro` | marcadas na conversa |
| `motivo_perda` | enum | igual a objeções + `sumiu`, `fechou_com_outro` |
| `valor_estimado` | R$ | ticket estimado (§2.8) até existir proposta |
| `proxima_acao` · `proxima_acao_em` | texto · data-hora | derivado (§6), editável |
| `tags` | texto[] | livres |

### 2.6 Conformidade (LGPD)

| Campo | Tipo | Regra |
|---|---|---|
| `base_legal` | enum `legitimo_interesse·consentimento·contrato` | padrão para lead de scraper/CSV: `legitimo_interesse` |
| `coletado_em` · `fonte_coleta` | data · texto | obrigatórios para lead de scraper |
| `optout` | bool + `optout_em` | lead pediu para sair → **nunca** mais recebe mensagem; mantém só nome normalizado + telefone com hash para não reimportar |
| `retencao_ate` | data | `coletado_em + 12 meses` sem nenhuma resposta → anonimizar **[decidir prazo]** |

Toda primeira mensagem diz de onde veio o contato ("vi vocês no Google Maps") e oferece saída ("se não fizer sentido, é só responder SAIR"). Respostas com `sair`, `pare`, `não quero`, `remover` (sem acento e caixa) marcam `optout` automaticamente e pedem confirmação da Tiburcio.

### 2.7 Derivados (calculados)

| Campo | Regra |
|---|---|
| `score` | §3 |
| `sinais` | lista de §4, com texto pronto para "por que abordar" |
| `janela_envio` | as 3 melhores janelas dos próximos 7 dias (§5) |
| `potencial_fechamento` | 0–100: `score` ajustado pela taxa de fechamento real do nicho (§3.3) |
| `argumento_principal` | o sinal de maior peso vira a primeira frase sugerida da mensagem |

### 2.8 Regras dos campos derivados

- **`site_status`**: sem URL ou URL que é só Instagram/Linktree → `nao_tem`; não responde ou erro 4xx/5xx em 2 tentativas → `fora_do_ar`; sem HTTPS **ou** não mobile **ou** desempenho < 50 **ou** copyright ≤ ano − 3 → `fraco`; desempenho 50–79 → `ok`; ≥ 80 com HTTPS e mobile → `bom`.
- **`porte_estimado`** **[calibrar]**: avaliações < 100 → `micro`; 100–499 → `pequeno`; ≥ 500 ou `eh_rede` → `medio`.
- **`valor_estimado`** **[calibrar]**: ticket médio dos projetos fechados no mesmo nicho (Colheita); sem histórico, tabela padrão: site institucional R$ 3.200 · com agendamento R$ 4.800 · e-commerce R$ 8.500.
- **`tem_whatsapp`** de número fixo: fixo nunca é WhatsApp por padrão; só vira `sim` com confirmação manual (há WhatsApp Business em fixo, mas é raro).

### 2.9 Nichos (lista inicial)

`restaurante · lanchonete_cafe · padaria · salao_beleza · barbearia · estetica · clinica_odonto · clinica_saude · pet · academia · loja_roupa · otica · imobiliaria · advocacia · contabilidade · oficina_auto · escola_curso · hotel_pousada · outro`.
Mapa de categorias do Maps → nicho fica em `nichos.json` (código). Categoria sem mapa → `outro` + aviso na importação para a Tiburcio classificar uma vez (a escolha vira regra).

## 3. Score

### 3.1 Base (já definida em AREAS.md, não muda)

Sem site ou site fraco **+25** · nota 4,5+ com 50+ avaliações **+20** · nicho que já fechou **+20** · Instagram ativo + WhatsApp **+20** · até 8 km **+15** · sem resposta 2× **−20**.

### 3.2 Complementos propostos **[calibrar]**

| Sinal | Pontos | Por quê |
|---|---|---|
| `site_status = fora_do_ar` | +25 (no lugar do "sem site") | dor urgente |
| `maps_responde_avaliacoes ≥ 50%` | +5 | dono presente, responde mensagem |
| `maps_avaliacoes_90d ≥ 10` | +5 | negócio crescendo |
| `anuncia = true` e site fraco/sem site | +10 | paga tráfego e perde no destino |
| `eh_rede = true` | −10 | decisão longe da loja |
| `maps_status ≠ operando` | score = 0 e bloqueia | |
| `optout = true` | score = 0 e bloqueia | |
| `decisor_papel = dono` conhecido | +5 | |

Limite: 0 a 100 (corta nas pontas). Cada ponto aparece no detalhe do lead ("+25 site fora do ar") para a Tiburcio entender e corrigir.

### 3.3 Aprendizado

Depois de **20 leads fechados ou perdidos** num nicho, o peso "nicho que já fechou" passa a ser `20 × (taxa de fechamento do nicho ÷ taxa geral)`, limitado a 0–30. Abaixo de 20 casos, vale o fixo.

## 4. Sinais "por que abordar"

Cada sinal tem código, condição e texto pronto (tom gentil, sem expor o lead).

| Código | Condição | Texto sugerido |
|---|---|---|
| `sem_site` | `site_status = nao_tem` | "Tem ótima avaliação e ainda não tem site." |
| `site_fora` | `fora_do_ar` | "O site está fora do ar desde a última verificação." |
| `site_lento` | desempenho < 50 | "O site demora para abrir no celular." |
| `sem_https` | `site_https = false` | "O site aparece como 'não seguro' no navegador." |
| `site_parado` | copyright ≤ ano − 3 | "O site não é atualizado desde {ano}." |
| `sem_agendamento` | nicho com agenda (salão, barbearia, estética, clínicas, pet, academia) e sem agendamento | "Agenda tudo pelo WhatsApp; dá para automatizar." |
| `sem_cardapio` | restaurante/lanchonete/padaria sem cardápio no site | "O cardápio só existe em foto no Instagram." |
| `link_bio_improvisado` | link da bio é Linktree/wa.me | "Usa o Instagram como site." |
| `bem_avaliado` | nota 4,5+ e 50+ avaliações | "Clientes adoram: {nota} com {n} avaliações." |
| `crescendo` | `maps_avaliacoes_90d ≥ 10` | "Ganhou {n} avaliações nos últimos 3 meses." |
| `anuncia_sem_destino` | anuncia e site fraco/sem site | "Faz anúncio, mas o anúncio leva para um lugar fraco." |
| `perto` | ≤ 8 km | "Fica a {x} km, dá para reunião presencial." |

## 5. Melhor horário para enviar mensagem

### 5.1 Entradas

1. **Horário de funcionamento do lead** (`horario_funcionamento`): `{ "seg": [["09:00","12:00"],["14:00","18:00"]], "dom": [] }` (lista de intervalos por dia; lista vazia = fechado; `["00:00","24:00"]` = 24h).
2. **Movimento do lead** (`movimento_por_hora`): `{ "seg": [0,0,…,62,80,…] }`, 24 valores 0–100 por dia (Popular Times).
3. **Movimento do nicho**: mediana de `movimento_por_hora` de todos os leads do mesmo `nicho` e `cidade` (mínimo 5 leads; senão, só `nicho`; senão, tabela §5.4).
4. **Histórico de respostas**: dos toques da Tiburcio (§6), taxa de resposta em até 24 h por `nicho × dia da semana × faixa de 1 h` — e as `horas_resposta` do próprio lead.
5. **Calendário**: feriados nacionais, estaduais (CE) e municipais (Fortaleza e cidade do lead); datas de pico do nicho (§5.5).
6. **Disponibilidade da Tiburcio** (Estações): blocos de Floração, calls e o modo ativo. Mandar mensagem e não poder responder na próxima hora desperdiça a resposta.

### 5.2 Bloqueios (regras duras; slot bloqueado nunca é sugerido)

Grade: fatias de **30 min** nos próximos **7 dias**, no fuso do lead.

1. Fora de **08:00–20:00** do lead, sempre.
2. Lead fechado naquele horário (fora de `horario_funcionamento`). Exceção: nichos em que quem responde não está no balcão (`advocacia`, `contabilidade`, `imobiliaria`) aceitam até 1 h antes de abrir e até 1 h depois de fechar.
3. **Primeiros 30 min depois de abrir** e **últimos 30 min antes de fechar** (abrindo e fechando caixa).
4. Movimento do lead (ou do nicho, se não houver o do lead) **≥ 70** naquela hora: pico.
5. Feriado (nacional, estadual, municipal) e véspera de feriado depois das 15:00.
6. `maps_status ≠ operando`, `optout`, ou etapa `fechado`/`perdido`/`pausado`.
7. Já houve toque para este lead nas últimas **48 h** sem resposta (respeita a cadência de §6).
8. Tiburcio em **Seiva** ou com call/Floração começando em menos de **45 min** depois do slot (ela não conseguiria responder).

### 5.3 Pontuação de cada slot livre

```
nota = 0,30 × (1 − movimento_lead/100)
     + 0,15 × (1 − movimento_nicho/100)
     + 0,35 × resposta_historica
     + 0,10 × disponibilidade_marina
     + 0,10 × afinidade_lead
     − penalidades
```

- **`resposta_historica`**: taxa de resposta em 24 h do `nicho × dia × hora`, suavizada: `(respostas + 2 × prior) / (envios + 2)`, onde `prior` é a nota da tabela §5.4 para aquele slot (0–1). Com poucos envios a tabela manda; com muitos, os dados mandam.
- **`disponibilidade_marina`**: 1 se ela tem ≥ 60 min livres após o slot; 0,5 se tem 45–60 min; (menos que 45 já é bloqueio).
- **`afinidade_lead`**: 1 se o slot está a ± 1 h de alguma hora em `horas_resposta` do lead; senão 0. Lead que já respondeu às 15h tende a responder às 15h.
- **Penalidades** **[calibrar]**: −0,10 se o slot cai no almoço típico do nicho (restaurante 11:00–14:30, lanchonete 11:30–13:30); −0,10 se é segunda antes das 10:00 (caixa de mensagens cheia do fim de semana); −0,05 para sexta depois das 16:00 e sábado.
- Sem `movimento_por_hora` do lead: o peso 0,30 vai para `movimento_nicho`. Sem nenhum movimento: os 0,45 vão para `resposta_historica`.
- Lead **24 h**: ignora bloqueio 2 e 3; aplica só 1, 4–8.

**Saída**: as 3 melhores janelas (slots vizinhos com nota ≥ 90% do melhor viram uma janela só, ex.: "ter 15:00–16:30"), cada uma com até 2 motivos em texto curto, escolhidos entre os maiores termos da fórmula:

> **Melhor janela: terça, 15:00–16:30**
> Movimento baixo na loja · Salões de Fortaleza respondem 2× mais nesse horário.

Recalcula: ao importar, ao mudar horário ou movimento, a cada toque, à meia-noite, e quando a agenda da Tiburcio muda.

### 5.4 Tabela inicial por nicho **[calibrar]**

Palpite de partida (nota 0–1 por faixa), usado só até existirem dados (§5.3). Fora das faixas listadas, prior = 0,3 dentro do expediente.

| Nicho | Melhores faixas (prior 0,8) | Evitar (prior 0,1) | Por quê |
|---|---|---|---|
| restaurante, lanchonete_cafe | ter–qui 15:00–17:30 | 11:00–14:30 · 18:30–21:00 · sex–dom | entre o almoço e o jantar |
| padaria | ter–qui 09:30–11:00 · 14:00–16:00 | 06:00–09:00 · 17:00–19:00 | fora do café e do fim de tarde |
| salao_beleza, barbearia, estetica | ter–qui 09:00–10:30 · 13:30–15:00 | sáb · vésperas de feriado | começo do dia, antes da agenda encher |
| clinica_odonto, clinica_saude | ter–qui 12:00–13:30 · 17:00–18:00 | seg manhã | intervalo entre pacientes |
| pet | ter–qui 10:00–11:30 · 14:00–16:00 | sáb | |
| academia | ter–qui 10:00–11:30 · 14:00–16:00 | 06:00–09:00 · 17:30–21:00 | entre os picos de treino |
| loja_roupa, otica | ter–qui 10:00–11:30 · 14:00–15:30 | sáb · dezembro após dia 10 | |
| advocacia, contabilidade, imobiliaria | ter–qui 08:30–10:00 · 14:00–15:00 | contabilidade: dias 15–20 e fim de mês | escritório; contabilidade tem prazos fiscais |
| oficina_auto | ter–qui 10:00–11:00 · 14:00–15:30 | seg manhã · sáb | |
| escola_curso | ter–qui 09:00–11:00 · 14:00–16:00 | janeiro e julho (matrículas) | |
| hotel_pousada | ter–qui 10:00–11:30 · 14:00–16:00 | alta temporada (jul, dez–jan) | |
| outro | ter–qui 09:30–11:00 · 14:00–16:00 | — | padrão comercial |

Coerência com Anéis: o padrão "propostas na terça de manhã respondem 2× mais" sai desta mesma base de toques, por área = Sementeira.

### 5.5 Datas de pico (bloqueio de semana inteira) **[calibrar]**

Lista em `datas_pico.json`: restaurante — Dia das Mães, Dia dos Namorados, véspera de Natal; salão/barbearia/estética — semana antes de Natal e Réveillon, Carnaval; loja de roupa — Black Friday, dezembro; contabilidade — fim de abril/maio (IR). Nessas datas o nicho fica com prior 0,1 e aparece o aviso "semana corrida para {nicho}, melhor depois de {data}".

### 5.6 Onde a janela aparece

- **Sementeira / Funil**: chip "melhor janela" no cartão do lead; filtro "na janela agora"; ordenação por "janela mais próxima".
- **Sementeira / Importar**: coluna "melhor janela" na prévia e filtro "posso enviar hoje".
- **Estações**: os envios agendados aparecem na semana como faixas finas ("3 mensagens às 15:00"), sem ocupar o Calendly; ao criar bloco de Floração por cima, os envios se movem para a próxima janela e avisam.
- **Jardim / Próximos passos**: "4 leads na janela ideal até as 16:30" com botão para abrir a fila.
- **Busca `Ctrl K`**: ação "Enviar para leads na janela agora".
- **Anéis**: mapa hora × dia de respostas da Sementeira.

## 6. Toques, cadência e próxima ação

`Toque = { lead_id, enviado_em, canal, modelo_id, etapa_no_envio, nota_do_slot, respondeu_em?, resposta_tipo? ('positiva'|'neutra'|'negativa'|'optout') }`.

- **Respondeu** = qualquer resposta em até 24 h (para o aprendizado de horário) e até 7 dias (para o funil).
- Cadência do primeiro contato **[calibrar]**: D0 → D+3 → D+7 → pausa. Cada toque usa a janela de §5 do dia. Após 3 toques sem resposta: etapa `pausado` por 60 dias e o score já levou −20 no segundo.
- Mudou de canal (WhatsApp → Instagram) no terceiro toque se o primeiro canal não teve leitura (quando o canal informar).
- Resposta positiva → `proxima_acao = "Propor call"` com link do Calendly (respeitando as regras de Estações: calls só depois das 14h, máx. 2/dia).
- Toda mudança vira um evento na tabela de eventos (`lead_tocado`, `lead_respondeu`, `lead_movido`, `lead_optout`) que alimenta Anéis e o aprendizado.

## 7. Envio

- **WhatsApp**: pela API oficial (WhatsApp Business Platform), a primeira mensagem para quem não falou com a empresa precisa ser um **modelo aprovado** e cada modelo enviado é cobrado; dentro da janela de 24 h aberta por uma resposta do cliente, mensagem livre é permitida. Sem API, a Protea **não automatiza o WhatsApp pessoal** (risco de bloqueio): monta a mensagem e abre `wa.me/{numero}?text=…` na hora da janela; a Tiburcio envia e o toque é registrado com um clique.
- **[decidir]** API oficial (custo por modelo, aprovação de modelos) ou envio manual assistido no MVP. Sugestão: manual assistido no MVP.
- Agendamento: a Protea dispara um **lembrete** no início da janela (notificação + item na fila "Enviar agora"); nunca envia sozinha no modo manual.
- Limite diário de primeiros contatos **[calibrar]**: 20 por dia, para não parecer disparo em massa e para a Tiburcio dar conta das respostas.

## 8. Exemplo (coerente com os dados de AREAS.md)

**Studio Jasmim** · salao_beleza · Aldeota, Fortaleza · 3,1 km · nota 4,8 (212 avaliações, 18 nos últimos 90 dias) · WhatsApp sim · Instagram ativo (posts 30d: 14) · link da bio wa.me · sem site · fecha domingo e segunda; ter–sáb 09:00–19:00 · movimento ter 15h: 35, ter 10h: 20, sáb 10h: 92.

- **Score**: sem site +25 · bem avaliado +20 · Instagram + WhatsApp +20 · até 8 km +15 · crescendo +5 = **85**.
- **Sinais**: `sem_site`, `sem_agendamento`, `link_bio_improvisado`, `crescendo`.
- **Bloqueios**: domingo e segunda (fechado), 09:00–09:30 e 18:30–19:00, sábado 10h–14h (movimento ≥ 70), terça 9h–11h se a Tiburcio estiver em Seiva (pico dela ter–qui 9h–11h).
- **Janelas sugeridas**: ter 13:30–15:00 · qua 13:30–15:00 · qui 09:30–10:30 (se a agenda dela liberar).

## 9. Modelo de dados (sugestão para o código)

Tabelas: `leads` (campos de §2, colunas simples) · `lead_campos_fonte` (`lead_id, campo, fonte, atualizado_em`) · `toques` (§6) · `eventos` (já prevista em IDEIAS §8) · `nichos` (código, rótulo, categorias do Maps, faixas de §5.4) · `feriados` (data, abrangência, cidade/uf) · `datas_pico`. `horario_funcionamento` e `movimento_por_hora` em `jsonb`. Cálculos de §3–§5 em funções puras (`calcularScore(lead, ctx)`, `calcularSinais(lead)`, `calcularJanelas(lead, agendaTiburcio, historico, agora)`) com testes usando o exemplo de §8.

## 10. Decisões em aberto

- [ ] PageSpeed por API ou Lighthouse local (custo × limite).
- [ ] Fonte de `movimento_por_hora`: Outscraper ou Apify (preço, estabilidade). O dado não vem da API oficial do Google e pode sumir.
- [ ] WhatsApp: API oficial ou envio manual assistido no MVP (§7).
- [ ] Prazo de retenção de leads sem resposta (§2.6) — confirmar com quem entende de LGPD; registrar a avaliação de legítimo interesse.
- [ ] Pesos de §3.2 e §5.3 e tabela de §5.4: revisar depois dos primeiros 200 toques.
