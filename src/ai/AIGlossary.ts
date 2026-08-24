// Agile & Tech Glossary — terms that appear highlighted in AI Mode dialogues

export interface GlossaryEntry {
  term: string;
  category: 'scrum' | 'kanban' | 'engineering' | 'management' | 'product';
  emoji: string;
  definition: string;
  example: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  // ── Scrum ──────────────────────────────────────────────────────────────────
  { term: 'Sprint', category: 'scrum', emoji: '🔄', definition: 'Ciclo de desenvolvimento de tempo fixo (1-4 semanas) onde o time entrega um Incremento funcional do produto.', example: 'Nosso time usa Sprints de 2 semanas — cada ciclo termina com uma Sprint Review.' },
  { term: 'Daily Scrum', category: 'scrum', emoji: '☀️', definition: 'Reunião diária de 15 minutos onde os Developers sincronizam o progresso, planejam o dia e identificam impedimentos.', example: 'Na Daily Scrum, cada dev responde: O que fiz? O que farei? Há bloqueios?' },
  { term: 'Sprint Planning', category: 'scrum', emoji: '📋', definition: 'Evento onde o Scrum Team define o Sprint Goal e seleciona os itens do Product Backlog para a Sprint.', example: 'Na Sprint Planning definimos que o goal seria "usuário consegue fazer login em menos de 3 cliques".' },
  { term: 'Sprint Review', category: 'scrum', emoji: '🔍', definition: 'Evento no final da Sprint onde o Scrum Team apresenta o Incremento aos stakeholders e coleta feedback.', example: 'Na Sprint Review o cliente sugeriu mudar o fluxo de pagamento — atualizamos o backlog.' },
  { term: 'Retrospectiva', category: 'scrum', emoji: '🪞', definition: 'Evento onde o Scrum Team inspeciona seu próprio processo e define uma ação concreta de melhoria.', example: 'Na Retrospectiva identificamos que falta de testes automatizados causou bugs na review.' },
  { term: 'Product Backlog', category: 'scrum', emoji: '📜', definition: 'Lista ordenada e priorizada de tudo que pode ser necessário no produto, gerenciada pelo Product Owner.', example: 'O Product Backlog tem 87 itens, mas apenas os 10 primeiros estão refinados e prontos para sprints.' },
  { term: 'Sprint Backlog', category: 'scrum', emoji: '✅', definition: 'Conjunto de itens do Product Backlog selecionados para a Sprint, mais o plano de entrega do Incremento.', example: 'Colocamos 8 User Stories no Sprint Backlog — velocity do time é de 40 pontos.' },
  { term: 'Sprint Goal', category: 'scrum', emoji: '🎯', definition: 'Objetivo único e claro que orienta o time durante a Sprint e dá coesão ao trabalho realizado.', example: 'Sprint Goal: "Usuários podem realizar transações Pix básicas sem erros."' },
  { term: 'Incremento', category: 'scrum', emoji: '📦', definition: 'Soma de todos os itens do Product Backlog concluídos conforme a Definition of Done — deve ser utilizável.', example: 'Ao fim da Sprint, o Incremento incluía login, cadastro e envio de Pix — tudo testado e em produção.' },
  { term: 'Definition of Done', category: 'scrum', emoji: '☑️', definition: 'Acordo formal que define os critérios que um item deve satisfazer para ser considerado "pronto" para entrega.', example: 'Nossa DoD: código revisado, testes unitários passando, sem erros no Sonar, aprovado em staging.' },
  { term: 'Scrum Master', category: 'scrum', emoji: '🧭', definition: 'Líder-servidor responsável por garantir que o Scrum seja compreendido e aplicado. Remove impedimentos e facilita eventos.', example: 'O Scrum Master percebeu que a reunião estava virando debate técnico e propôs um parking lot.' },
  { term: 'Product Owner', category: 'scrum', emoji: '📦', definition: 'Papel responsável por maximizar o valor do produto, gerenciando e priorizando o Product Backlog.', example: 'O Product Owner definiu que integração bancária tem prioridade maior que redesign da tela inicial.' },
  { term: 'Velocity', category: 'scrum', emoji: '⚡', definition: 'Quantidade de trabalho (story points) que um time consegue concluir em média por Sprint. Usado para planejamento.', example: 'Velocity do time: 38 pontos/sprint. Com 76 pontos no backlog, estimamos mais 2 sprints.' },
  { term: 'Burndown', category: 'scrum', emoji: '📉', definition: 'Gráfico que mostra o trabalho restante ao longo do tempo. Usado para acompanhar o progresso da Sprint.', example: 'O Burndown mostrou que estávamos 30% abaixo da curva ideal na quarta-feira — aceleramos.' },
  { term: 'Story Points', category: 'scrum', emoji: '🃏', definition: 'Unidade relativa de estimativa que mede esforço, complexidade e incerteza — não horas de trabalho.', example: 'Estimamos o módulo de autenticação em 8 story points — mesmo nível que o cadastro de usuários.' },
  { term: 'Refinement', category: 'scrum', emoji: '🔧', definition: 'Atividade contínua de detalhamento e estimativa dos itens do Product Backlog para preparação das próximas Sprints.', example: 'No Refinement quebramos a User Story de "pagamentos" em 5 tasks menores com critérios claros.' },
  { term: 'Impedimento', category: 'scrum', emoji: '🚧', definition: 'Qualquer obstáculo que impede um Developer de avançar no trabalho. O Scrum Master deve removê-lo rapidamente.', example: 'O impedimento era acesso ao ambiente de staging — o SM resolveu com o time de infraestrutura em 2h.' },
  { term: 'Time-box', category: 'scrum', emoji: '⏱️', definition: 'Limite fixo de tempo para um evento Scrum. Garante foco e evita reuniões intermináveis.', example: 'A Sprint Planning tem time-box de 8 horas para uma Sprint de 1 mês.' },

  // ── Kanban ─────────────────────────────────────────────────────────────────
  { term: 'WIP', category: 'kanban', emoji: '🔄', definition: 'Work In Progress — quantidade de itens em andamento simultaneamente. Limitar o WIP aumenta o foco e reduz gargalos.', example: 'Limitamos WIP a 2 por dev — ninguém pode pegar nova tarefa sem finalizar a atual.' },
  { term: 'Lead Time', category: 'kanban', emoji: '⏳', definition: 'Tempo total desde que um item é solicitado até ser entregue ao cliente final.', example: 'Lead Time médio: 12 dias. O gargalo estava em code review, que levava 3 dias em média.' },
  { term: 'Throughput', category: 'kanban', emoji: '📊', definition: 'Quantidade de itens entregues por unidade de tempo. Métrica de produtividade do sistema Kanban.', example: 'Throughput da última semana: 7 features. Na semana anterior, eram apenas 4 — melhoramos 75%.' },
  { term: 'Kanban Board', category: 'kanban', emoji: '📋', definition: 'Quadro visual que representa o fluxo de trabalho com colunas (To Do, In Progress, Done) para tornar o trabalho visível.', example: 'Nosso Kanban Board tem 6 colunas: Backlog, Pronto para Dev, Em Desenvolvimento, Em Review, Em QA, Concluído.' },

  // ── Engenharia ─────────────────────────────────────────────────────────────
  { term: 'TDD', category: 'engineering', emoji: '🧪', definition: 'Test-Driven Development — escrever o teste antes do código. Garante cobertura e força design de código limpo.', example: 'Com TDD, Carlos escreveu 15 testes antes de implementar o serviço de pagamento — zero bugs na Review.' },
  { term: 'CI/CD', category: 'engineering', emoji: '🚀', definition: 'Continuous Integration / Continuous Delivery — pipeline automático de build, teste e deploy a cada commit.', example: 'Com CI/CD, todo push na main aciona testes automatizados e deploy em staging em menos de 5 minutos.' },
  { term: 'Code Review', category: 'engineering', emoji: '👁️', definition: 'Revisão do código por outro desenvolvedor antes de ser integrado. Previne bugs, dissemina conhecimento e garante padrões.', example: 'A política de Code Review exige aprovação de 2 devs antes de merge — reduziu bugs em produção em 60%.' },
  { term: 'Pair Programming', category: 'engineering', emoji: '👥', definition: 'Dois desenvolvedores trabalhando juntos no mesmo código — um escreve (driver), o outro revisa (navigator).', example: 'Carlos e Júlia usaram Pair Programming para integrar a API de pagamentos — resolveram em 4h o que levaria 2 dias.' },
  { term: 'Dívida Técnica', category: 'engineering', emoji: '💳', definition: 'Custo implícito de soluções rápidas e de baixa qualidade. Quanto mais cresce, mais lento fica o desenvolvimento.', example: 'A Dívida Técnica acumulada no módulo legado aumentou o tempo de cada nova feature em 3x.' },
  { term: 'Refactoring', category: 'engineering', emoji: '🔄', definition: 'Reestruturação do código existente para melhorar qualidade e legibilidade sem alterar comportamento externo.', example: 'Carlos dedicou 2 dias de Refactoring no módulo de autenticação — velocidade de build caiu 40%.' },
  { term: 'Deploy', category: 'engineering', emoji: '📤', definition: 'Processo de publicar o software em um ambiente (staging, produção) para uso real.', example: 'O Deploy de sexta às 17h quebrou autenticação — Rafael reverteu em 8 minutos usando o rollback.' },
  { term: 'Rollback', category: 'engineering', emoji: '⏪', definition: 'Reversão de um deploy com problemas para a versão anterior estável do sistema.', example: 'O Rollback automático foi acionado após 3 erros 500 consecutivos em produção.' },
  { term: 'Hotfix', category: 'engineering', emoji: '🔥', definition: 'Correção emergencial aplicada diretamente em produção para resolver um bug crítico sem aguardar a próxima Sprint.', example: 'O Hotfix do bug de autenticação foi aplicado em 45 minutos e comunicado ao PO imediatamente.' },
  { term: 'Staging', category: 'engineering', emoji: '🧪', definition: 'Ambiente idêntico à produção usado para testes finais antes do deploy real.', example: 'Todos os deploys passam por Staging primeiro — o bug foi pego ali antes de chegar ao cliente.' },
  { term: 'API', category: 'engineering', emoji: '🔌', definition: 'Application Programming Interface — contrato que permite sistemas diferentes se comunicarem de forma padronizada.', example: 'A API do banco parceiro caiu às 14h — bloqueou todas as transações Pix até às 16h30.' },

  // ── Gestão ─────────────────────────────────────────────────────────────────
  { term: 'OKR', category: 'management', emoji: '🎯', definition: 'Objectives and Key Results — framework de metas com objetivo qualitativo e resultados mensuráveis para guiar o time.', example: 'OKR do trimestre: Aumentar retenção de usuários em 20% (medido por DAU/MAU).' },
  { term: 'KPI', category: 'management', emoji: '📊', definition: 'Key Performance Indicator — métrica crítica usada para avaliar o desempenho de uma área ou produto.', example: 'KPIs acompanhados: taxa de erro em produção (<0.1%), tempo de resposta da API (<200ms), NPS (>8).' },
  { term: 'Stakeholder', category: 'management', emoji: '👔', definition: 'Qualquer pessoa ou grupo afetado pelo produto ou que influencia as decisões do projeto.', example: 'Os Stakeholders presentes na Sprint Review foram: diretoria de TI, time de vendas e 2 clientes beta.' },
  { term: 'Burnout', category: 'management', emoji: '🔥', definition: 'Estado de esgotamento físico e mental causado por sobrecarga crônica. Afeta produtividade e qualidade de vida.', example: 'Júlia pediu afastamento por Burnout após 3 meses de crunch sem descanso adequado.' },
  { term: 'One-on-One', category: 'management', emoji: '💬', definition: 'Reunião individual periódica entre gestor/SM e um membro da equipe para feedback, suporte e desenvolvimento.', example: 'Nos One-on-Ones semanais o SM descobriu que Carlos estava insatisfeito antes de ele pedir demissão.' },
  { term: 'Escopo', category: 'management', emoji: '📐', definition: 'Conjunto delimitado de funcionalidades e entregas acordadas para o produto ou Sprint.', example: 'A diretoria pediu para adicionar relatórios ao Escopo da Sprint — o PO priorizou com o time.' },
  { term: 'SLA', category: 'management', emoji: '📜', definition: 'Service Level Agreement — acordo formal de nível de serviço que define tempo de resposta, disponibilidade e outros critérios.', example: 'Nosso SLA com clientes enterprise é de 99.9% de uptime e resposta a incidentes em menos de 4h.' },

  // ── Produto ─────────────────────────────────────────────────────────────────
  { term: 'User Story', category: 'product', emoji: '📖', definition: 'Descrição de uma necessidade do usuário no formato: "Como [persona], quero [ação], para [benefício]".', example: '"Como usuário Pix, quero salvar favoritos, para transferir para recorrentes sem redigitar os dados."' },
  { term: 'MVP', category: 'product', emoji: '🚀', definition: 'Minimum Viable Product — versão mínima do produto com apenas as funcionalidades essenciais para validar uma hipótese.', example: 'O MVP do Pixflow tinha só transferência e extrato — validou que o mercado queria o produto.' },
  { term: 'Critérios de Aceite', category: 'product', emoji: '✅', definition: 'Condições que o software deve satisfazer para que a User Story seja considerada concluída pelo Product Owner.', example: 'Critérios de Aceite: transação processa em menos de 3s, comprovante gerado em PDF, erro exibe mensagem amigável.' },
  { term: 'Épico', category: 'product', emoji: '🏔️', definition: 'User Story de grande porte que precisa ser quebrada em stories menores para caber em uma ou poucas Sprints.', example: 'O Épico "Módulo de Cobrança" foi dividido em 8 User Stories ao longo de 3 Sprints.' },
  { term: 'NPS', category: 'product', emoji: '⭐', definition: 'Net Promoter Score — métrica de satisfação do cliente baseada na pergunta: "Você indicaria este produto a um amigo?" (0-10).', example: 'NPS do Pixflow subiu de 7.2 para 8.6 após a melhoria no fluxo de transferência.' },
];

// Build a fast lookup map: lowercase term -> entry
export const GLOSSARY_MAP = new Map<string, GlossaryEntry>(
  GLOSSARY.map((e) => [e.term.toLowerCase(), e])
);

// All terms sorted by length desc (longer first) for regex precedence
export const GLOSSARY_TERMS_SORTED = GLOSSARY
  .map((e) => e.term)
  .sort((a, b) => b.length - a.length);
