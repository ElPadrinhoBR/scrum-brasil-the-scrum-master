import { GameStats, MemberStats, UserStory } from '../game/GameState';

export interface DialogueChoice {
  text: string;
  requiredSkill?: string; // Skill ID required to unlock this option
  effects?: {
    stats?: Partial<GameStats>;
    team?: Record<string, Partial<MemberStats>>;
    xp?: number;
    flags?: Record<string, boolean>;
  };
  nextDialogueIndex?: number; // Index to jump to, if any
  reactionText?: string;     // Brief reaction from narrator/speaker
  feedback?: {
    rating: 'BOM' | 'MEDIANO' | 'RUIM';
    explanation: string;
  };
}

export interface DialogueLine {
  speaker: string; // 'ana' | 'carlos' | 'julia' | 'marcos' | 'beatriz' | 'rafael' | 'VOCÊ — SCRUM MASTER' | 'SISTEMA' | 'NARRADOR'
  text: string;
  expression?: 'neutral' | 'happy' | 'worried' | 'angry' | 'sad' | 'surprised' | 'confident';
  background?: 'escritorio' | 'reuniao' | 'desenvolvimento' | 'cafeteria' | 'servidores' | 'diretoria';
  choices?: DialogueChoice[];
}

export interface SprintDefinition {
  id: number;
  title: string;
  goal: string;
  background: string;
  stories: UserStory[];
  planningDialogues: DialogueLine[];
  dailyEvents: Record<number, DialogueLine[]>; // Day 1, Day 2, Day 3
  reviewDialogues: DialogueLine[];
  bossEvent?: {
    title: string;
    triggerDay: number;
    dialogues: DialogueLine[];
  };
}

export const SPRINTS_DATA: SprintDefinition[] = [
  {
    id: 1,
    title: "Sprint 01: A Chegada na Nova Tech",
    goal: "Estruturar o MVP do Pixflow",
    background: "escritorio",
    stories: [
      { id: "PIX-001", title: "Modelagem do banco de dados de transações", value: 8, complexity: 5, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-002", title: "Interface básica da página de login", value: 6, complexity: 3, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-003", title: "Configuração do ambiente de CI/CD local", value: 7, complexity: 3, status: "todo", assignedTo: null, progress: 0 }
    ],
    planningDialogues: [
      {
        speaker: "NARRADOR",
        text: "Segunda-feira, 8h12. Você chega à Nova Tech. O cheiro de café novo flutua no ar, mas a tensão na sala de reuniões é quase palpável. O antigo Scrum Master saiu de repente. O projeto Pixflow, um sistema de pagamentos Pix para pequenas empresas, está atrasado.",
        expression: "neutral",
        background: "escritorio"
      },
      {
        speaker: "ana",
        text: "Finalmente você chegou! Bom, você já deve saber... Nosso Pixflow precisa ser lançado em 2 meses. A diretoria está em cima, e o time parece rodar em círculos. Carlos quer refatorar tudo, e eu só preciso ver o Pix funcionando!",
        expression: "worried",
        background: "reuniao"
      },
      {
        speaker: "carlos",
        text: "Não dá pra 'ver funcionando' se não tivermos uma arquitetura robusta no backend, Ana. Se fizermos de qualquer jeito, vai cair no primeiro dia.",
        expression: "angry",
        background: "reuniao"
      },
      {
        speaker: "VOCÊ — SCRUM MASTER",
        text: "Como Scrum Master, qual será sua primeira atitude com eles durante esta Planning?",
        expression: "neutral",
        background: "reuniao",
        choices: [
          {
            text: "Ouvir ambos os lados e facilitar uma conversa para que o time decida um meio-termo viável.",
            effects: {
              stats: { confianca: 60, moral: 55, velocidade: 48, risco: 22 },
              team: {
                ana: { relationship: 55, confidence: 60 },
                carlos: { relationship: 58, confidence: 65 }
              },
              xp: 20
            },
            nextDialogueIndex: 4,
            reactionText: "Excelente! Você agiu como facilitador. Carlos e Ana concordam em focar primeiro na modelagem sem exagerar no overengineering.",
            feedback: {
              rating: 'BOM',
              explanation: 'Excelente postura de facilitador. O Scrum Master não deve impor decisões, mas ajudar a equipe a colaborar e encontrar um meio-termo sustentável entre negócio (PO) e engenharia (Developers).'
            }
          },
          {
            text: "Ficar do lado de Carlos: 'Ele está certo. Qualidade técnica não pode ser negociada. Vamos atrasar o MVP.'",
            effects: {
              stats: { qualidade: 65, velocidade: 35, confianca: 55, risco: 15, valor: 35 },
              team: {
                ana: { relationship: 40, stress: 45 },
                carlos: { relationship: 70, confidence: 75 }
              },
              xp: 10
            },
            nextDialogueIndex: 4,
            reactionText: "Carlos agradece a defesa de sua integridade técnica, mas Ana bufa de frustração, sentindo-se ignorada.",
            feedback: {
              rating: 'MEDIANO',
              explanation: 'Embora apoiar a excelência técnica seja louvável, ignorar completamente os prazos e pressões do negócio de forma radical gera atritos severos com a PO e isola o time técnico.'
            }
          },
          {
            text: "Ficar do lado de Ana: 'Temos prazos, Carlos. Faça o código funcionar rápido, depois a gente arruma.'",
            effects: {
              stats: { velocidade: 55, qualidade: 40, risco: 35, confianca: 40, moral: 45 },
              team: {
                ana: { relationship: 65, stress: 25 },
                carlos: { relationship: 35, stress: 40, motivation: 45 }
              },
              xp: 10
            },
            nextDialogueIndex: 4,
            reactionText: "Ana sorri satisfeita, mas Carlos cruza os braços e faz cara feia. Você gerou dívida técnica imediata.",
            feedback: {
              rating: 'RUIM',
              explanation: 'Impor pressões de entrega rápida e ignorar a sustentabilidade técnica desmotiva a equipe e acumula bugs graves. O papel do SM é defender o ritmo sustentável do time.'
            }
          }
        ]
      },
      {
        speaker: "julia",
        text: "Bem, então vamos definir o objetivo desta nossa primeira Sprint? Eu sugiro: 'Estruturar a base técnica do Pixflow com segurança.' O que você acha, Scrum Master?",
        expression: "happy",
        background: "reuniao"
      },
      {
        speaker: "VOCÊ — SCRUM MASTER",
        text: "Definir o Sprint Goal é crucial para dar foco à equipe. Qual é sua decisão?",
        expression: "neutral",
        background: "reuniao",
        choices: [
          {
            text: "Aceitar a proposta do time e garantir que o Goal seja focado no MVP e na segurança básica.",
            effects: {
              stats: { confianca: 65, moral: 60 },
              xp: 15,
              flags: { protectedSprintGoal: true }
            },
            reactionText: "O time se sente alinhado e o objetivo da Sprint é oficialmente fechado!",
            feedback: {
              rating: 'BOM',
              explanation: 'Excelente. O Sprint Goal deve ser focado, realista e co-criado pela equipe. Proteger o time de sobrecarga logo no início constrói confiança e foco.'
            }
          },
          {
            text: "Adicionar mais tarefas de última hora solicitadas pela diretoria: 'Vamos aproveitar e fazer o painel administrativo também!'",
            effects: {
              stats: { moral: 45, risco: 35, velocidade: 40, confianca: 40 },
              team: {
                carlos: { stress: 45 },
                julia: { stress: 35 }
              },
              xp: 5,
              flags: { overloadedSprintGoal: true }
            },
            reactionText: "O time aceita sob protestos, sentindo-se sobrecarregado logo no primeiro dia.",
            feedback: {
              rating: 'RUIM',
              explanation: 'Sobrecarregar o time com escopo extra na Planning para agradar stakeholders viola a autonomia do time e sabota a qualidade do MVP, elevando o risco de atraso.'
            }
          }
        ]
      }
    ],
    dailyEvents: {
      1: [
        {
          speaker: "julia",
          text: "Gente, eu estou tentando criar as telas de login mas o Carlos não me passa os retornos das APIs do backend. Desse jeito eu não consigo avançar na tela do front!",
          expression: "worried",
          background: "desenvolvimento"
        },
        {
          speaker: "carlos",
          text: "Estou ocupado desenhando o banco. É só você mocar as chamadas da API por enquanto. Não é tão difícil assim.",
          expression: "neutral",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Bloqueio de comunicação clássico. Como agir?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Propor um pareamento rápido (pair programming) para definirem o contrato da API juntos e desbloquear Júlia.",
              effects: {
                stats: { confianca: 68, moral: 65, velocidade: 52 },
                team: {
                  julia: { relationship: 65, motivation: 78 },
                  carlos: { relationship: 62 }
                },
                xp: 20
              },
              reactionText: "Excelente! Eles sentam juntos e em 15 minutos alinham o contrato da API."
            },
            {
              text: "Dizer para a Júlia esperar Carlos terminar o banco de dados antes de continuar.",
              effects: {
                stats: { velocidade: 42, moral: 55, risco: 25 },
                team: {
                  julia: { relationship: 45, motivation: 60 }
                },
                xp: 5
              },
              reactionText: "Júlia fica ociosa e desanimada, atrasando a entrega da interface de login."
            }
          ]
        }
      ],
      2: [
        {
          speaker: "marcos",
          text: "Terminei de olhar as primeiras alterações técnicas no banco de dados e encontrei dois furos de consistência que podem estourar quando colocarmos multi-transações. Carlos disse que é frescura minha e que a gente conserta se quebrar.",
          expression: "worried",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Um problema de qualidade apontado pelo QA. Como se posicionar?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Apoiar Marcos e facilitar um papo de 5 min com Carlos para tratar esses furos na hora. Qualidade é inegociável.",
              effects: {
                stats: { qualidade: 70, risco: 15, confianca: 70 },
                team: {
                  marcos: { relationship: 70, motivation: 80 },
                  carlos: { stress: 30 }
                },
                xp: 20
              },
              reactionText: "O time ajusta o banco na hora. Marcos fica orgulhoso e Carlos, embora reclamando um pouco, vê valor no ajuste rápido."
            },
            {
              text: "Dizer para abrir um bug no backlog e tratar depois da Sprint, para não perder velocidade.",
              effects: {
                stats: { velocidade: 55, qualidade: 45, risco: 35 },
                team: {
                  marcos: { relationship: 45, motivation: 55 }
                },
                xp: 5
              },
              reactionText: "Marcos suspira e anota o bug, sabendo que a dívida técnica está acumulando."
            }
          ]
        }
      ],
      3: [
        {
          speaker: "rafael",
          text: "Configurei o fluxo de CI/CD para o ambiente de staging. Mas notei que ainda não definimos a nossa 'Definition of Done' (Definição de Pronto). Como vamos garantir que algo está realmente pronto para release sem isso?",
          expression: "neutral",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Rafael levantou um pilar fundamental da transparência no Scrum. O que você faz?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Aproveitar o fim do dia para reunir o time por 15 minutos e formalizar o DoD inicial (ex: código revisado, testado por Marcos e buildado em Staging).",
              effects: {
                stats: { qualidade: 75, confianca: 75, moral: 70, risco: 10 },
                team: {
                  rafael: { relationship: 72, motivation: 85 }
                },
                xp: 25,
                flags: { createdDoD: true }
              },
              reactionText: "Ótimo! Agora o time tem um critério transparente de qualidade comum a todos."
            },
            {
              text: "Ignorar por enquanto: 'Não precisamos de mais burocracia agora, vamos focar em fechar os cards da Sprint.'"
              ,
              effects: {
                stats: { velocidade: 58, qualidade: 48, risco: 30, confianca: 60 },
                team: {
                  rafael: { relationship: 45, motivation: 60 }
                },
                xp: 5
              },
              reactionText: "Rafael fica desapontado com a falta de governança do processo."
            }
          ]
        }
      ]
    },
    reviewDialogues: [
      {
        speaker: "ana",
        text: "Estou surpresa. Apesar do começo turbulento, conseguimos ver o banco de dados pronto e a tela de login rodando perfeitamente integrada! A diretoria ficou aliviada com a transparência do nosso incremento.",
        expression: "happy",
        background: "reuniao"
      },
      {
        speaker: "VOCÊ — SCRUM MASTER",
        text: "Excelente! Parabéns ao time pelo término da primeira Sprint. Agora, vamos conduzir a primeira Retrospectiva para inspecionar e adaptar o nosso processo de trabalho.",
        expression: "happy",
        background: "reuniao"
      }
    ]
  },
  {
    id: 2,
    title: "Sprint 02: O Primeiro Bug Crítico",
    goal: "Integrar o Gateway de Pagamentos e Pix no MVP",
    background: "escritorio",
    stories: [
      { id: "PIX-004", title: "Integração das APIs de Pix do Banco parceiro", value: 10, complexity: 8, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-005", title: "Tela de confirmação de pagamento Pix", value: 7, complexity: 3, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-006", title: "Testes unitários e de integração de segurança", value: 9, complexity: 5, status: "todo", assignedTo: null, progress: 0 }
    ],
    planningDialogues: [
      {
        speaker: "NARRADOR",
        text: "A equipe se reúne para planejar a segunda Sprint. O clima está bem melhor após a primeira entrega, mas o desafio agora é complexo: a integração real com o sistema de pagamentos de um banco parceiro.",
        expression: "neutral",
        background: "reuniao"
      },
      {
        speaker: "ana",
        text: "Pessoal, esta Sprint é o coração do Pixflow. Se a integração com o banco falhar, não temos produto. Eu preciso que a equipe se dedique 100% a garantir que o fluxo Pix funcione de ponta a ponta.",
        expression: "confident",
        background: "reuniao"
      },
      {
        speaker: "carlos",
        text: "A documentação da API do banco parceiro é péssima e cheia de erros de sintaxe. Integrar isso vai exigir muita tentativa e erro.",
        expression: "worried",
        background: "reuniao"
      },
      {
        speaker: "VOCÊ — SCRUM MASTER",
        text: "Como você facilita o planejamento diante da incerteza técnica relatada pelo desenvolvedor?",
        expression: "neutral",
        background: "reuniao",
        choices: [
          {
            text: "Sugerir a criação de um 'Spike' técnico (uma tarefa de investigação rápida de 1 dia) para Carlos estudar a API antes de codificar.",
            effects: {
              stats: { risco: 15, qualidade: 65, confianca: 78, velocidade: 48 },
              team: {
                carlos: { relationship: 75, stress: 20 },
                ana: { confidence: 65 }
              },
              xp: 20,
              flags: { createdSpike: true }
            },
            reactionText: "Excelente prática ágil! Carlos se sente seguro para pesquisar a API sem a pressão de entregar código quebrado logo de início."
          },
          {
            text: "Ignorar a dificuldade: 'Divida a tarefa com a Júlia e estimem com folga. Vocês dão conta.'",
            effects: {
              stats: { moral: 55, risco: 25, velocidade: 50 },
              team: {
                carlos: { stress: 35 },
                julia: { stress: 28 }
              },
              xp: 5
            },
            reactionText: "Carlos balança a cabeça, prevendo noites em claro para decifrar a documentação."
          }
        ]
      }
    ],
    dailyEvents: {
      1: [
        {
          speaker: "marcos",
          text: "Atenção equipe! O mock de pagamentos caiu e o banco parceiro está retornando erro 502 em staging. Estamos completamente bloqueados para testar o fluxo de integração!",
          expression: "angry",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Impedimento crítico bloqueando a equipe. O que fazer?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Entrar em contato direto com o suporte técnico do banco parceiro para cobrar estabilidade e, enquanto isso, ajudar o time a configurar um mock local offline.",
              effects: {
                stats: { confianca: 82, moral: 72, velocidade: 58, risco: 12 },
                team: {
                  marcos: { motivation: 82, relationship: 75 },
                  rafael: { relationship: 78, motivation: 80 }
                },
                xp: 25,
                flags: { resolvedPartnerBlock: true }
              },
              reactionText: "Perfeito! Você atuou na remoção do impedimento externo e proveu uma alternativa local rápida para manter o time produtivo."
            },
            {
              text: "Exigir que Rafael (DevOps) resolva o problema com o banco parceiro sozinho.",
              effects: {
                stats: { moral: 58, risco: 22, velocidade: 44 },
                team: {
                  rafael: { stress: 45, relationship: 48 }
                },
                xp: 5
              },
              reactionText: "Rafael se sente sobrecarregado por assumir um problema de rede externa sozinho."
            }
          ]
        }
      ],
      2: [
        {
          speaker: "julia",
          text: "Gente, a Beatriz (UX) desenhou uma tela de confirmação de pagamento linda com animações pixel art, mas o Carlos diz que isso vai dar muito trabalho no frontend e quer simplificar para um pop-up cinza básico.",
          expression: "sad",
          background: "desenvolvimento"
        },
        {
          speaker: "beatriz",
          text: "Não é só estética! O fluxo Pix precisa transmitir segurança e clareza para os pequenos comerciantes. O pop-up básico não passa essa credibilidade.",
          expression: "worried",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Divergência entre UX e Desenvolvimento. Qual o papel do Scrum Master?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Propor uma facilitação: reunir Júlia, Carlos e Beatriz por 10 minutos para encontrar uma versão simplificada mas visualmente agradável da animação (um MVP da tela).",
              effects: {
                stats: { confianca: 85, moral: 78, qualidade: 70, velocidade: 55 },
                team: {
                  beatriz: { relationship: 80, motivation: 85 },
                  julia: { relationship: 72, motivation: 80 },
                  carlos: { confidence: 70 }
                },
                xp: 20
              },
              reactionText: "Muito bom! O time chega a um consenso criativo. Carlos consegue codificar e a essência da experiência de UX de Beatriz é preservada."
            },
            {
              text: "Decidir unilateralmente: 'O design da Beatriz é a lei, façam exatamente como ela desenhou.'",
              effects: {
                stats: { velocidade: 40, qualidade: 72, moral: 62 },
                team: {
                  carlos: { stress: 40, relationship: 45 },
                  beatriz: { relationship: 85 }
                },
                xp: 5
              },
              reactionText: "Você agiu como um chefe autoritário. O design é feito, mas Carlos fica ressentido com sua decisão."
            }
          ]
        }
      ],
      3: [
        {
          speaker: "NARRADOR",
          text: "Sexta-feira, 16h40. A integração Pix foi concluída, mas Marcos avisa que a suíte de testes de segurança (PIX-006) falhou em alguns cenários de concorrência de saldo.",
          expression: "neutral",
          background: "desenvolvimento"
        },
        {
          speaker: "ana",
          text: "Precisamos mostrar o Pix funcionando na Review de segunda-feira! Podemos ignorar os testes que falharam só para a demo da Review e depois arrumar em produção?",
          expression: "worried",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Grande dilema ágil: Fazer deploy apressado de código instável na sexta-feira ou atrasar a demonstração do incremento?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Manter a integridade do DoD: 'Não faremos deploy em produção com testes de segurança falhando. Vamos apresentar o que funciona na Review e tratar os bugs na próxima Sprint.'",
              effects: {
                stats: { qualidade: 85, risco: 5, confianca: 85, valor: 45, moral: 75 },
                team: {
                  marcos: { relationship: 85, motivation: 90 },
                  ana: { stress: 40, relationship: 50 },
                  rafael: { relationship: 82, motivation: 88 }
                },
                xp: 25,
                flags: { protectedQuality: true }
              },
              reactionText: "Excelente! Você agiu como guardião do processo e da qualidade. Marcos e Rafael se sentem protegidos contra pressões perigosas."
            },
            {
              text: "Fazer o deploy correndo: 'Deploy na sexta! O importante é ver o Pix rodar na demo, consertamos na segunda!'",
              effects: {
                stats: { risco: 60, qualidade: 40, moral: 50, velocidade: 60, valor: 55, confianca: 50 },
                team: {
                  marcos: { relationship: 30, stress: 55 },
                  ana: { relationship: 80, stress: 15 },
                  rafael: { relationship: 35, stress: 60 }
                },
                xp: 5,
                flags: { deployOnFriday: true }
              },
              reactionText: "Você desbloqueou a conquista humorística: 'Sexta-feira em Produção'! Staging quebra no fim de semana, gerando pânico no time."
            }
          ]
        }
      ]
    },
    reviewDialogues: [
      {
        speaker: "ana",
        text: "Bem, a Review foi bem honesta. Mostrar a integração funcionando localmente mas admitir os problemas de segurança foi a decisão certa. Os stakeholders valorizaram a transparência. Vamos planejar os ajustes técnicos na Retrospectiva.",
        expression: "happy",
        background: "reuniao"
      }
    ]
  },
  {
    id: 3,
    title: "Sprint 03: BOSS 01 — O Microgerente",
    goal: "Implementar Autenticação 2FA nos pagamentos",
    background: "escritorio",
    stories: [
      { id: "PIX-007", title: "Fluxo de envio de Token SMS / E-mail", value: 8, complexity: 5, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-008", title: "Validação do token no checkout do app", value: 8, complexity: 3, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-009", title: "Criação de logs de segurança auditáveis", value: 6, complexity: 2, status: "todo", assignedTo: null, progress: 0 }
    ],
    planningDialogues: [
      {
        speaker: "NARRADOR",
        text: "O terceiro ciclo começa sob a sombra de um novo desafio. A diretoria da Nova Tech indicou um padrinho executivo, Dr. Cláudio, para monitorar de perto a evolução do Pixflow.",
        expression: "neutral",
        background: "escritorio"
      },
      {
        speaker: "ana",
        text: "Gente, Dr. Cláudio é muito exigente e está preocupado com a segurança do Pixflow. Ele quer garantias de que a autenticação de dois fatores estará 100% pronta nesta Sprint.",
        expression: "worried",
        background: "reuniao"
      },
      {
        speaker: "VOCÊ — SCRUM MASTER",
        text: "Como você orienta o time para esta Sprint com a sombra do microgerente?",
        expression: "neutral",
        background: "reuniao",
        choices: [
          {
            text: "Garantir o foco no Sprint Backlog aprovado e atuar como um escudo: 'Deixem as cobranças dele comigo, foquem em entregar o combinado.'",
            effects: {
              stats: { confianca: 88, moral: 80, risco: 10 },
              team: {
                carlos: { confidence: 80, relationship: 80 },
                julia: { confidence: 85, relationship: 80 }
              },
              xp: 25,
              flags: { shieldedTeam: true }
            },
            reactionText: "O time respira aliviado. Eles sabem que você está lá para protegê-los de interferências."
          },
          {
            text: "Cobrar o time duas vezes mais: 'O chefe está olhando, galera. Vamos trabalhar até mais tarde se necessário.'",
            effects: {
              stats: { moral: 45, confianca: 45, risco: 30 },
              team: {
                julia: { stress: 45, motivation: 50 },
                carlos: { stress: 50, motivation: 40 }
              },
              xp: 5
            },
            reactionText: "Você repassou a pressão corporativa diretamente para a equipe, abalando a confiança deles em você."
          }
        ]
      }
    ],
    dailyEvents: {
      1: [
        {
          speaker: "NARRADOR",
          text: "Durante a Daily Scrum, Dr. Cláudio (o padrinho executivo) entra sem bater na sala e começa a interrogar Júlia sobre o porquê dela estar demorando na tela de validação do token.",
          expression: "neutral",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Interferência direta e quebra da autonomia do time durante um evento do Scrum. O que fazer?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Intervir educadamente: 'Dr. Cláudio, a Daily é uma reunião rápida para sincronização técnica do time. Vou puxar um café com o senhor daqui a pouco e te mostro o nosso board para atualizá-lo.'",
              effects: {
                stats: { confianca: 92, moral: 85, risco: 5 },
                team: {
                  julia: { relationship: 90, motivation: 92, stress: 15 },
                  carlos: { relationship: 85 }
                },
                xp: 30,
                flags: { managedMicroManager: true }
              },
              reactionText: "Excelente! Você protegeu o time de ser exposto e cobrado de forma intimidadora na Daily, e redirecionou a ansiedade do executivo para um canal apropriado."
            },
            {
              text: "Ficar em silêncio e deixar Júlia gaguejar tentando explicar detalhes de CSS para o diretor.",
              effects: {
                stats: { confianca: 40, moral: 48, risco: 25 },
                team: {
                  julia: { stress: 65, motivation: 45, relationship: 35 }
                },
                xp: 5
              },
              reactionText: "Júlia se sente humilhada e abandonada por seu facilitador. O clima na sala fica péssimo."
            }
          ]
        }
      ],
      2: [
        {
          speaker: "carlos",
          text: "Scrum Master, o Dr. Cláudio me mandou uma mensagem direta pedindo para colocar uma alteração visual de última hora na tela de login. Ele disse que é prioritário e mandou eu passar na frente de tudo.",
          expression: "worried",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Desvio de escopo sem passar pela Product Owner ou pelo planejamento. Como agir?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Lembrar Carlos do processo e falar com Ana: 'Ana, Dr. Cláudio está pedindo alterações. Vamos avaliar isso no Backlog para priorizar de forma transparente?'",
              effects: {
                stats: { confianca: 88, moral: 82, qualidade: 75 },
                team: {
                  ana: { relationship: 85, motivation: 85 },
                  carlos: { relationship: 88, stress: 20 }
                },
                xp: 25,
                flags: { backlogNegotiation: true }
              },
              reactionText: "Excelente! Você protegeu a integridade do processo ágil e a autoridade da PO Ana sobre o escopo do produto."
            },
            {
              text: "Dizer para Carlos fazer na hora para agradar o diretor: 'Ele é o chefe, melhor a gente não arrumar briga.'",
              effects: {
                stats: { velocidade: 38, moral: 55, confianca: 50, risco: 30 },
                team: {
                  carlos: { stress: 45, relationship: 42 },
                  ana: { stress: 40, relationship: 40 }
                },
                xp: 5
              },
              reactionText: "Ana descobre depois e fica furiosa por ter tido o planejamento ignorado, e Carlos reclama do desvio de foco."
            }
          ]
        }
      ],
      3: [
        {
          speaker: "marcos",
          text: "A integração de token SMS falhou em 10% dos testes porque a API que a diretoria exigiu que contratássemos é muito instável. Mas se não aprovarmos agora, não teremos o 2FA funcionando na Review.",
          expression: "worried",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Um problema técnico crítico decorrente de uma escolha de arquitetura imposta. Qual sua ação?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Apoiar a transparência total: Apresentar a métrica de erro de 10% na Review como um risco técnico real, sugerindo a troca do fornecedor.",
              effects: {
                stats: { qualidade: 82, risco: 5, confianca: 90, valor: 60 },
                team: {
                  marcos: { relationship: 90, motivation: 90 },
                  rafael: { relationship: 88 }
                },
                xp: 25,
                flags: { reportedTechnicalDebt: true }
              },
              reactionText: "Excelente! Mostrar as métricas de forma transparente é o pilar da inspeção no Scrum."
            },
            {
              text: "Pedir para mocar os testes para passar na Review e resolver o problema depois.",
              effects: {
                stats: { risco: 55, qualidade: 45, confianca: 52 },
                team: {
                  marcos: { stress: 50, relationship: 40 }
                },
                xp: 5,
                flags: { mockedDemo: true }
              },
              reactionText: "Você obteve a conquista engraçada: 'Bugou na Demo'! Durante a Review, o token falha espetacularmente na frente de todos."
            }
          ]
        }
      ]
    },
    reviewDialogues: [
      {
        speaker: "ana",
        text: "Dr. Cláudio tentou pressionar, mas a transparência das nossas métricas de falha do token SMS convenceu a diretoria a nos dar orçamento para contratar uma API melhor de envio. Grande vitória do time!",
        expression: "happy",
        background: "reuniao"
      }
    ]
  },
  {
    id: 4,
    title: "Sprint 04: A Dívida Técnica da API",
    goal: "Corrigir Dívida Técnica e Melhorar Desempenho",
    background: "escritorio",
    stories: [
      { id: "PIX-010", title: "Refatoração dos endpoints legados da API", value: 6, complexity: 5, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-011", title: "Migração das tabelas para indexação otimizada", value: 5, complexity: 3, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-012", title: "Melhorias de cache no carregamento de telas", value: 7, complexity: 3, status: "todo", assignedTo: null, progress: 0 }
    ],
    planningDialogues: [
      {
        speaker: "NARRADOR",
        text: "Metade do projeto concluída. Os desenvolvedores Carlos e Júlia relatam que a velocidade do Pixflow está caindo devido à falta de refatoração no código base. Eles precisam de uma Sprint focada em qualidade interna.",
        expression: "neutral",
        background: "escritorio"
      },
      {
        speaker: "ana",
        text: "Eu entendo a importância técnica, mas a diretoria quer ver valor de negócio entregue! Uma Sprint inteira sem novas telas parece desperdício para quem está de fora.",
        expression: "worried",
        background: "reuniao"
      },
      {
        speaker: "VOCÊ — SCRUM MASTER",
        text: "Como você facilita essa negociação crucial entre a PO e os Desenvolvedores?",
        expression: "neutral",
        background: "reuniao",
        choices: [
          {
            text: "Explicar para Ana o conceito de Dívida Técnica: 'Tratar isso agora é o que vai nos permitir entregar mais rápido nas próximas Sprints. É um investimento em velocidade futura.'",
            effects: {
              stats: { qualidade: 88, velocidade: 52, confianca: 85 },
              team: {
                ana: { confidence: 75, relationship: 78 },
                carlos: { motivation: 85, relationship: 85 }
              },
              xp: 20,
              flags: { explainedTechnicalDebt: true }
            },
            reactionText: "Ana compreende e aceita dedicar a Sprint à melhoria de infraestrutura técnica."
          },
          {
            text: "Exigir que o time faça as refatorações escondido nos tempos mortos, sem a PO saber.",
            effects: {
              stats: { risco: 30, moral: 60, confianca: 62 },
              team: {
                ana: { relationship: 50 },
                carlos: { stress: 40 }
              },
              xp: 5,
              flags: { hiddenRefactoring: true }
            },
            reactionText: "Falta de transparência. Carlos e Júlia tentam trabalhar escondidos, gerando estresse e desconfiança na PO."
          }
        ]
      }
    ],
    dailyEvents: {
      1: [
        {
          speaker: "carlos",
          text: "Estou refatorando o endpoint principal de pagamentos e achei blocos de código gigantescos escritos pelo antigo time que não possuem um único teste de unidade. O risco de quebrar é imenso. Devo parar e escrever testes?",
          expression: "worried",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Escrever testes desacelera a entrega no curto prazo, mas reduz riscos a longo prazo. O que orientar?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Apoiar a escrita de testes: 'Carlos, faça a cobertura de testes desses blocos. Se não cobrirmos agora, será um pesadelo depois.'",
              effects: {
                stats: { qualidade: 92, risco: 5, velocidade: 44, confianca: 88 },
                team: {
                  carlos: { relationship: 85, motivation: 88 },
                  marcos: { relationship: 88 }
                },
                xp: 20
              },
              reactionText: "Ótimo! Carlos se sente seguro e cobre os endpoints com testes robustos."
            },
            {
              text: "Focar em velocidade: 'Só altere o que for estritamente necessário. Não temos tempo para testes agora.'",
              effects: {
                stats: { velocidade: 62, qualidade: 70, risco: 40 },
                team: {
                  carlos: { motivation: 65, stress: 30 }
                },
                xp: 5
              },
              reactionText: "Carlos segue as instruções com desgosto, prevendo bugs futuros no backend."
            }
          ]
        }
      ],
      2: [
        {
          speaker: "julia",
          text: "Scrum Master, a Beatriz (UX) pediu para a gente aproveitar a refatoração técnica para fazer um micro-ajuste de layout na barra de navegação. É coisa simples, mas não estava no nosso planejamento.",
          expression: "neutral",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Solicitação de alteração no escopo durante o ciclo de desenvolvimento. Como agir?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Pedir para adicionar a ideia de Beatriz ao Product Backlog para podermos estimar na Planning da próxima Sprint.",
              effects: {
                stats: { confianca: 85, risco: 10, velocidade: 52 },
                team: {
                  beatriz: { relationship: 78 },
                  julia: { stress: 18 }
                },
                xp: 15
              },
              reactionText: "Correto! Você manteve o foco do Sprint Backlog e seguiu o fluxo correto de refinamento do backlog."
            },
            {
              text: "Deixar passar: 'É pequenininho, faz na hora aí pra agradar a Bia.'",
              effects: {
                stats: { velocidade: 46, risco: 18, moral: 68 },
                team: {
                  julia: { stress: 28 },
                  beatriz: { relationship: 85 }
                },
                xp: 5
              },
              reactionText: "A alteração é feita, mas Júlia gasta metade da tarde caçando um bug CSS secundário gerado pelo ajuste rápido."
            }
          ]
        }
      ],
      3: [
        {
          speaker: "NARRADOR",
          text: "O refactoring da API reduziu o tempo de processamento de pagamentos em 60%, mas Rafael (DevOps) notou que precisamos atualizar as dependências do servidor para suportar a nova infraestrutura com segurança.",
          expression: "neutral",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Decisão operacional do processo. O que fazer?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Apoiar a atualização das dependências imediatamente: 'Rafael, vá em frente e documente para o time.'",
              effects: {
                stats: { qualidade: 94, risco: 5, confianca: 88 },
                team: {
                  rafael: { relationship: 90, motivation: 92 }
                },
                xp: 20
              },
              reactionText: "Rafael atualiza e estabiliza o servidor. A qualidade geral sobe muito."
            },
            {
              text: "Deixar para depois: 'O servidor está de pé, vamos focar em terminar os cards.'",
              effects: {
                stats: { risco: 25, qualidade: 85 },
                team: {
                  rafael: { relationship: 50, motivation: 60 }
                },
                xp: 5
              },
              reactionText: "O servidor permanece em uma versão legada vulnerável a falhas de segurança."
            }
          ]
        }
      ]
    },
    reviewDialogues: [
      {
        speaker: "ana",
        text: "Incrível! As melhorias na API deixaram a navegação do Pixflow muito mais rápida. Na Review, os stakeholders elogiaram a velocidade das telas de login. Investir na API valeu a pena!",
        expression: "happy",
        background: "reuniao"
      }
    ]
  },
  {
    id: 5,
    title: "Sprint 05: BOSS 02 — O Cliente Impossível",
    goal: "Criar Dashboard de Cobranças Pix",
    background: "escritorio",
    stories: [
      { id: "PIX-013", title: "Painel com resumo de cobranças ativas/pagas", value: 9, complexity: 5, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-014", title: "Geração de relatórios em formato PDF e CSV", value: 7, complexity: 3, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-015", title: "Filtros de pesquisa avançada por data e status", value: 6, complexity: 3, status: "todo", assignedTo: null, progress: 0 }
    ],
    planningDialogues: [
      {
        speaker: "NARRADOR",
        text: "Sprint 5. O Pixflow está amadurecendo. Mas um cliente piloto de grande importância (um grande varejista) entra em contato exigindo uma mudança completa no layout e geração dos PDFs de cobrança no meio da Sprint.",
        expression: "neutral",
        background: "escritorio"
      },
      {
        speaker: "ana",
        text: "Gente, se perdermos esse cliente, o projeto perde 40% do faturamento futuro previsto. O diretor me ligou desesperado. Eu preciso incluir essas alterações de layout do PDF na Sprint AGORA!",
        expression: "worried",
        background: "reuniao"
      },
      {
        speaker: "VOCÊ — SCRUM MASTER",
        text: "Uma crise de prioridade de negócio ameaça quebrar o Sprint Goal. Qual é a sua ação?",
        expression: "neutral",
        background: "reuniao",
        choices: [
          {
            text: "Facilitar a negociação com base na capacidade real do time: 'Ana, vamos tirar outras histórias de menor valor da Sprint para abrir espaço para essa nova demanda, sem sobrecarregar a equipe.'",
            effects: {
              stats: { confianca: 92, moral: 82, valor: 70, risco: 10 },
              team: {
                ana: { relationship: 88, confidence: 85 },
                carlos: { relationship: 85, stress: 20 }
              },
              xp: 25,
              flags: { negotiatedScopeSwap: true }
            },
            reactionText: "Excelente equilíbrio! Você manteve a previsibilidade e saúde do time ao renegociar escopo (Scope Swap) sem aceitar apenas sobrecarga."
          },
          {
            text: "Adotar postura defensiva cega: 'Não podemos mudar nada. O Scrum Guide proíbe alterações na Sprint! O cliente que espere 2 semanas.'",
            effects: {
              stats: { valor: 45, confianca: 60, moral: 70, risco: 5 },
              team: {
                ana: { relationship: 40, stress: 55 }
              },
              xp: 10,
              flags: { rejectedChangeRequest: true }
            },
            reactionText: "Ana se sente ignorada. Embora o time esteja protegido, o negócio sofreu um impacto severo pela falta de agilidade e adaptabilidade."
          }
        ]
      }
    ],
    dailyEvents: {
      1: [
        {
          speaker: "beatriz",
          text: "Scrum Master, com essa mudança no escopo dos PDFs de cobrança, vou ter que refazer todo o fluxo de exportação visual. O Carlos disse que não vai esperar meu layout e já vai programar do jeito dele para economizar tempo.",
          expression: "worried",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Dificuldade de colaboração e atropelo no fluxo de trabalho. Como intervir?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Pedir 10 minutos com Carlos e Beatriz para criar um rascunho em papel (wireframe de baixa fidelidade) imediato, permitindo que Carlos programe a estrutura e Beatriz refine a estilização depois.",
              effects: {
                stats: { confianca: 88, moral: 82, qualidade: 75, velocidade: 58 },
                team: {
                  beatriz: { relationship: 85, motivation: 85 },
                  carlos: { relationship: 80, confidence: 75 }
                },
                xp: 20
              },
              reactionText: "Muito bom! Técnica excelente de design colaborativo que agiliza o desenvolvimento frontend."
            },
            {
              text: "Dizer para Beatriz desenhar tudo com calma e Carlos ficar parado aguardando o arquivo final.",
              effects: {
                stats: { velocidade: 42, moral: 65 },
                team: {
                  carlos: { motivation: 55, stress: 30 }
                },
                xp: 5
              },
              reactionText: "Carlos cruza os braços e reclama de ficar bloqueado no desenvolvimento."
            }
          ]
        }
      ],
      2: [
        {
          speaker: "marcos",
          text: "Estou testando a geração do PDF de cobranças com os novos dados do cliente piloto. O sistema trava se o volume de transações passar de 500 registros. A diretoria quer que eu ignore isso já que o cliente piloto só faz 50 transações por dia.",
          expression: "worried",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Pressão de negócio para ignorar bugs de performance. Como agir?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Apoiar Marcos e criar um card urgente de correção no board: 'Se travar com 500, vai travar na Black Friday. Temos que arrumar agora.'",
              effects: {
                stats: { qualidade: 85, risco: 8, confianca: 90 },
                team: {
                  marcos: { relationship: 88, motivation: 88 },
                  ana: { confidence: 80 }
                },
                xp: 20
              },
              reactionText: "Parabéns! O time apoia a decisão de robustez do produto."
            },
            {
              text: "Ignorar por enquanto: 'O Marcos é muito perfeccionista. Deixem isso para depois do lançamento.'",
              effects: {
                stats: { risco: 35, qualidade: 62 },
                team: {
                  marcos: { relationship: 50, motivation: 55 }
                },
                xp: 5
              },
              reactionText: "O time deixa de lado, acumulando um bug silencioso perigoso de escala."
            }
          ]
        }
      ],
      3: [
        {
          speaker: "rafael",
          text: "Notei que as novas bibliotecas de geração de PDF aumentaram o tamanho da imagem de container em 300MB. Isso pode desacelerar nossos deploys automáticos em produção. Devo gastar um tempo otimizando a imagem Docker?",
          expression: "neutral",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Otimização de DevOps. Qual sua orientação?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Aprovar a otimização de imediato: 'Rafael, otimização de imagem Docker é fundamental para a agilidade técnica de deploy.'",
              effects: {
                stats: { qualidade: 90, risco: 5, confianca: 88 },
                team: {
                  rafael: { relationship: 92, motivation: 90 }
                },
                xp: 20
              },
              reactionText: "Rafael encolhe a imagem em 70%, acelerando as builds diárias de integração."
            },
            {
              text: "Negar: 'Não perca tempo com isso agora, foque em testar o dashboard.'",
              effects: {
                stats: { velocidade: 52, qualidade: 80, risco: 18 },
                team: {
                  rafael: { relationship: 55, motivation: 65 }
                },
                xp: 5
              },
              reactionText: "Rafael obedece, mas os deploys começam a demorar bem mais."
            }
          ]
        }
      ]
    },
    reviewDialogues: [
      {
        speaker: "ana",
        text: "Ufa! O cliente piloto amou o novo dashboard de cobranças e assinou o contrato de parceria anual! Conseguimos entregar as alterações do PDF com altíssima qualidade técnica. Grande conquista, time!",
        expression: "happy",
        background: "reuniao"
      }
    ]
  },
  {
    id: 6,
    title: "Sprint 06: BOSS 03 — A Sprint Eterna",
    goal: "Implementar Conciliação Bancária Automatizada",
    background: "escritorio",
    stories: [
      { id: "PIX-016", title: "Consumo de arquivos de retorno bancário (CNAB)", value: 9, complexity: 8, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-017", title: "Tela de conciliação de divergências de valores", value: 8, complexity: 5, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-018", title: "Mapeamento e notificações de falha de liquidação", value: 6, complexity: 3, status: "todo", assignedTo: null, progress: 0 }
    ],
    planningDialogues: [
      {
        speaker: "NARRADOR",
        text: "A Sprint 6 começa pesada. O escopo de conciliação bancária envolve parsing de arquivos CNAB legados gigantescos. O time está visivelmente cansado e a diretoria deu sinais de que quer antecipar a data final do projeto.",
        expression: "neutral",
        background: "escritorio"
      },
      {
        speaker: "ana",
        text: "Pessoal, a conciliação bancária automática é essencial para podermos escalar a carteira de clientes. Mas a diretoria quer fechar a data de lançamento na semana que vem e esperam que a gente termine esse escopo custe o que custar.",
        expression: "worried",
        background: "reuniao"
      },
      {
        speaker: "VOCÊ — SCRUM MASTER",
        text: "Pressão corporativa insana por prazos arbitrários. Como se posicionar?",
        expression: "neutral",
        background: "reuniao",
        choices: [
          {
            text: "Proteger as pessoas do time: 'Fazer horas extras desordenadas vai quebrar o time e gerar bugs. Vamos trabalhar com foco no escopo prioritário e manter a jornada saudável.'",
            effects: {
              stats: { confianca: 92, moral: 85, risco: 5, qualidade: 85 },
              team: {
                carlos: { relationship: 90, stress: 15, motivation: 85 },
                julia: { relationship: 88, stress: 18 }
              },
              xp: 25,
              flags: { protectedTimeJorney: true }
            },
            reactionText: "Excelente! Você evitou a armadilha do burnout e do estresse crônico que destrói a produtividade de equipes de software."
          },
          {
            text: "Ceder à pressão e instituir regime de plantão no fim de semana para garantir a entrega antecipada.",
            effects: {
              stats: { moral: 40, risco: 30, qualidade: 60, confianca: 42, velocidade: 48 },
              team: {
                carlos: { stress: 70, motivation: 40 },
                julia: { stress: 65, motivation: 45 },
                marcos: { stress: 68 }
              },
              xp: 5,
              flags: { orderedOvertime: true }
            },
            reactionText: "O time trabalha no fim de semana sob enorme ressentimento. A motivação desaba e o estresse individual de todos dispara."
          }
        ]
      }
    ],
    dailyEvents: {
      1: [
        {
          speaker: "carlos",
          text: "Eu passei a noite inteira batendo cabeça com as regras de importação do CNAB de conciliação. A documentação tem 400 páginas de tabelas legadas. Eu não sei se consigo terminar isso dentro do prazo sem errar nas validações financeiras.",
          expression: "sad",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Um membro do time demonstra sinais claros de sobrecarga mental (Burnout). Como Scrum Master, qual sua ação?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Intervir imediatamente: 'Carlos, dê um passo atrás. Vá tomar um café. Júlia, você pode parear com ele hoje à tarde para dividir essa carga de leitura?'",
              effects: {
                stats: { confianca: 95, moral: 82, velocidade: 50, risco: 10 },
                team: {
                  carlos: { stress: 25, relationship: 95, motivation: 80 },
                  julia: { relationship: 85, motivation: 82 }
                },
                xp: 25,
                flags: { resolvedOverload: true }
              },
              reactionText: "Perfeito! Você colocou a saúde física e mental do time em primeiro lugar e usou a colaboração interna para mitigar o gargalo de conhecimento."
            },
            {
              text: "Cobrar foco: 'Entendo o cansaço, Carlos, mas esse é o nosso maior desafio. Precisamos que você dê o seu máximo agora.'",
              effects: {
                stats: { moral: 52, risco: 35, qualidade: 60 },
                team: {
                  carlos: { stress: 85, motivation: 30, relationship: 38 }
                },
                xp: 5
              },
              reactionText: "Carlos se fecha e continua programando de cara amarrada, sob extremo cansaço."
            }
          ]
        }
      ],
      2: [
        {
          speaker: "julia",
          text: "Gente, eu notei que a página de conciliação visual está muito confusa. Acho que os lojistas vão errar muito na hora de escolher qual pagamento conciliar. Queria falar com a Beatriz (UX) para refazer a usabilidade da tela antes de codificar.",
          expression: "worried",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Um alerta de usabilidade levantado no meio do ciclo. Como agir?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Apoiar a discussão de UX: 'Vamos fazer um alinhamento rápido de 15 minutos com a Beatriz para garantir que a usabilidade esteja boa antes de você escrever mais códigos.'",
              effects: {
                stats: { qualidade: 88, confianca: 88, moral: 80 },
                team: {
                  julia: { relationship: 88, motivation: 85 },
                  beatriz: { relationship: 85, motivation: 88 }
                },
                xp: 20
              },
              reactionText: "Muito bom! Alinhamento preventivo de UX economiza retrabalho técnico."
            },
            {
              text: "Bloquear: 'Não há tempo, Júlia. Codifique como está desenhado e arrumamos nas próximas Sprints.'",
              effects: {
                stats: { velocidade: 52, qualidade: 70, risco: 22 },
                team: {
                  julia: { stress: 35 }
                },
                xp: 5
              },
              reactionText: "Júlia programa a tela sabendo que a usabilidade final está muito ruim."
            }
          ]
        }
      ],
      3: [
        {
          speaker: "marcos",
          text: "Encontrei um cenário onde a importação do arquivo CNAB duplica transações de Pix se houver alguma oscilação de internet. Isso é crítico, mas o código foi feito de forma tão confusa que reescrever vai atrasar nossa entrega em 1 dia.",
          expression: "worried",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Um bug financeiro grave de duplicidade de Pix detectado no fim da Sprint. Como agir?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Focar em resolver a duplicidade na hora: 'Carlos e Júlia, vamos focar em arrumar isso agora. Prefiro adiar o encerramento da Sprint a ver transações Pix duplicadas.'",
              effects: {
                stats: { qualidade: 94, risco: 5, confianca: 92, moral: 78 },
                team: {
                  marcos: { relationship: 90, motivation: 90 },
                  carlos: { relationship: 85, stress: 30 }
                },
                xp: 25,
                flags: { resolvedDuplicationBug: true }
              },
              reactionText: "Excelente! Agir na qualidade e evitar bugs financeiros graves protege o negócio de catástrofes."
            },
            {
              text: "Aprovar a entrega assim mesmo: 'Apresentem na Review e abram um bug de prioridade máxima para a próxima Sprint.'",
              effects: {
                stats: { risco: 50, qualidade: 60, velocidade: 55 },
                team: {
                  marcos: { relationship: 52, motivation: 55 }
                },
                xp: 5
              },
              reactionText: "O bug é levado à frente, deixando uma bomba-relógio no código do Pixflow."
            }
          ]
        }
      ]
    },
    reviewDialogues: [
      {
        speaker: "ana",
        text: "A Review foi intensa. Conseguimos mostrar o fluxo básico CNAB, mas a transparência sobre os riscos de concorrência e duplicidade nos salvou de um grande problema financeiro em produção. A equipe mostrou muito profissionalismo.",
        expression: "happy",
        background: "reuniao"
      }
    ]
  },
  {
    id: 7,
    title: "Sprint 07: BOSS 04 — Produção em Chamas",
    goal: "Migração e Estabilização do Pixflow em Produção",
    background: "escritorio",
    stories: [
      { id: "PIX-019", title: "Migração das bases para servidores de cloud estáveis", value: 9, complexity: 5, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-020", title: "Instalação de ferramentas de monitoramento em tempo real", value: 7, complexity: 3, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-021", title: "Configuração de rotinas de backup automático a cada hora", value: 8, complexity: 3, status: "todo", assignedTo: null, progress: 0 }
    ],
    planningDialogues: [
      {
        speaker: "NARRADOR",
        text: "A penúltima Sprint começa com alta tensão. A infraestrutura provisória local está estourando o consumo de CPU. O time precisa migrar o Pixflow para a nuvem sob o risco de travar todas as pequenas empresas parceiras.",
        expression: "neutral",
        background: "escritorio"
      },
      {
        speaker: "rafael",
        text: "Pessoal, migrar banco de dados em produção rodando transações Pix reais de clientes piloto é trocar a turbina do avião em pleno voo. Qualquer erro e deixamos nossos clientes offline sem conseguir receber pagamentos.",
        expression: "worried",
        background: "reuniao"
      },
      {
        speaker: "VOCÊ — SCRUM MASTER",
        text: "Como você facilita essa decisão de alto risco técnico?",
        expression: "neutral",
        background: "reuniao",
        choices: [
          {
            text: "Garantir que Rafael monte um checklist de migração claro, envolva o time nos testes de rollback e façam a migração no horário de menor movimento das empresas piloto.",
            effects: {
              stats: { risco: 5, qualidade: 92, confianca: 92, moral: 80 },
              team: {
                rafael: { relationship: 92, motivation: 92, confidence: 88 },
                carlos: { confidence: 85 }
              },
              xp: 25,
              flags: { plannedMigrationWithRollback: true }
            },
            reactionText: "Fabuloso! O planejamento minucioso de infraestrutura com foco em rollback e horários de menor tráfego é a melhor prática de engenharia de software."
          },
          {
            text: "Exigir pressa: 'Não podemos perder tempo, Rafael. Faça a migração no meio do dia para a gente monitorar no horário de trabalho.'",
            effects: {
              stats: { risco: 45, moral: 52, qualidade: 70 },
              team: {
                rafael: { stress: 65, relationship: 45 }
              },
              xp: 5
            },
            reactionText: "Rafael aceita relutante, alertando sobre os perigos de downtime durante o horário comercial."
          }
        ]
      }
    ],
    dailyEvents: {
      1: [
        {
          speaker: "NARRADOR",
          text: "Terça-feira, 14h20. O servidor de produção trava completamente após a tentativa de migração das tabelas de transações. O sistema do Pixflow está fora do ar para todos os clientes piloto.",
          expression: "neutral",
          background: "servidores"
        },
        {
          speaker: "ana",
          text: "O telefone da Nova Tech não para de tocar! O diretor está a caminho da nossa sala. O que a gente faz para consertar isso rápido?!",
          expression: "angry",
          background: "servidores"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Ambiente de crise extrema. Como agir?",
          expression: "neutral",
          background: "servidores",
          choices: [
            {
              text: "Acalmar o time, pedir para Rafael focar no rollback imediato e atuar como intermediário com os executivos: 'Deixem que eu atualizo a diretoria a cada 15 minutos, foquem em restaurar o backup.'",
              effects: {
                stats: { confianca: 95, moral: 85, risco: 10, qualidade: 88 },
                team: {
                  rafael: { stress: 20, relationship: 95, motivation: 92 },
                  ana: { stress: 30, relationship: 80 }
                },
                xp: 30,
                flags: { handledProductionFireCorrectly: true }
              },
              reactionText: "Sensacional! Você agiu como um verdadeiro escudo para o time, removendo a pressão política e permitindo que eles focassem 100% no restabelecimento técnico."
            },
            {
              text: "Reunir todos os desenvolvedores na sala do servidor e ficar cobrando atualizações de minuto em minuto a Rafael e Carlos.",
              effects: {
                stats: { moral: 40, confianca: 48, risco: 35 },
                team: {
                  rafael: { stress: 80, relationship: 38 },
                  carlos: { stress: 70, relationship: 42 }
                },
                xp: 5
              },
              reactionText: "O estresse vai a níveis intoleráveis. Sob pressão constante, Rafael comete um erro de digitação no terminal que atrasa a recuperação em 1 hora."
            }
          ]
        }
      ],
      2: [
        {
          speaker: "marcos",
          text: "A migração falhou em staging anteriormente por conta de dados inconsistentes de CNPJ cadastrados no banco. Júlia descobriu que precisamos de uma validação regex mais forte na tela de cadastro para evitar que novos cadastros corrompam o banco.",
          expression: "worried",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Uma tarefa de qualidade adicional descoberta durante a crise. O que você faz?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Apoiar a criação da tarefa de validação imediatamente: 'Júlia, implemente esse regex hoje para estancarmos os dados corrompidos na entrada.'",
              effects: {
                stats: { qualidade: 94, risco: 5, confianca: 90 },
                team: {
                  julia: { relationship: 88, motivation: 85 },
                  marcos: { relationship: 88 }
                },
                xp: 20
              },
              reactionText: "A validação regex é ativada. Dados ruins são filtrados com sucesso!"
            },
            {
              text: "Ignorar: 'Não vamos mudar a tela agora. Deixem que a PO verifique os cadastros manualmente no banco se der problema.'",
              effects: {
                stats: { risco: 25, qualidade: 80 },
                team: {
                  ana: { stress: 45 }
                },
                xp: 5
              },
              reactionText: "Ana se vê tendo que fazer queries manuais no banco de dados para consertar cadastros de CNPJ inválidos."
            }
          ]
        }
      ],
      3: [
        {
          speaker: "beatriz",
          text: "Pessoal, os lojistas reclamaram que a tela de erro de servidor que Rafael colocou é muito assustadora ('Fatal SQL Error 500'). Desenhei uma mensagem mais amigável explicando que estamos em manutenção rápida. Posso subir?",
          expression: "neutral",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Melhoria de experiência do usuário em cenário de falha. Qual sua decisão?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Aprovar o deploy da tela amigável: 'Bia, excelente empatia com o usuário. Rafael, coloque essa tela de manutenção no ar.'",
              effects: {
                stats: { qualidade: 90, confianca: 88, moral: 80 },
                team: {
                  beatriz: { relationship: 90, motivation: 88 },
                  rafael: { relationship: 88 }
                },
                xp: 20
              },
              reactionText: "A imagem pública do Pixflow é protegida mesmo nos momentos de queda do sistema."
            },
            {
              text: "Ignorar: 'O servidor já voltou, não precisamos perder tempo com tela de erro de manutenção.'",
              effects: {
                stats: { velocidade: 52, qualidade: 85 },
                team: {
                  beatriz: { relationship: 60 }
                },
                xp: 5
              },
              reactionText: "A tela assustadora é mantida para próximas eventuais quedas."
            }
          ]
        }
      ]
    },
    reviewDialogues: [
      {
        speaker: "ana",
        text: "Conseguimos recuperar o sistema e concluir a migração para a cloud estável. Na Review, a diretoria elogiou o controle de crise e a rapidez no rollback e comunicação. Agora o Pixflow roda liso na nuvem!",
        expression: "happy",
        background: "reuniao"
      }
    ]
  },
  {
    id: 8,
    title: "Sprint 08: O Lançamento Oficial do Pixflow",
    goal: "Finalizar Lançamento Nacional do Pixflow",
    background: "escritorio",
    stories: [
      { id: "PIX-022", title: "Consolidação e fechamento de relatórios financeiros", value: 10, complexity: 5, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-023", title: "Deploy final em produção com redundância de servidores", value: 10, complexity: 5, status: "todo", assignedTo: null, progress: 0 },
      { id: "PIX-024", title: "Manual de operação básico e termos de uso dos lojistas", value: 6, complexity: 2, status: "todo", assignedTo: null, progress: 0 }
    ],
    planningDialogues: [
      {
        speaker: "NARRADOR",
        text: "A Sprint final. É a semana do lançamento nacional do Pixflow na Nova Tech. O time está orgulhoso da jornada, mas a sensação de fechamento traz uma última leva de decisões e revisões críticas antes do deploy final.",
        expression: "neutral",
        background: "escritorio"
      },
      {
        speaker: "ana",
        text: "Chegamos lá, pessoal! As pequenas empresas piloto já estão transacionando milhares de reais diariamente. Esta Sprint é para dar o polimento final e colocar o Pixflow à disposição de todo o Brasil.",
        expression: "happy",
        background: "reuniao"
      },
      {
        speaker: "VOCÊ — SCRUM MASTER",
        text: "Como você incentiva o time para esta última Sprint?",
        expression: "neutral",
        background: "reuniao",
        choices: [
          {
            text: "Reforçar a confiança e autonomia construída ao longo do projeto: 'Estou muito orgulhoso deste time. Conseguimos criar um ritmo de trabalho sustentável e alta qualidade técnica juntos.'",
            effects: {
              stats: { confianca: 98, moral: 95, velocidade: 60 },
              team: {
                ana: { relationship: 95 },
                carlos: { relationship: 95 },
                julia: { relationship: 95 },
                marcos: { relationship: 95 },
                beatriz: { relationship: 95 },
                rafael: { relationship: 95 }
              },
              xp: 30
            },
            reactionText: "O time sorri com orgulho genuíno. A sinergia entre eles é imensa."
          },
          {
            text: "Manter a postura cobradora tradicional: 'Ainda não acabou. Quero atenção máxima no deploy final ou a diretoria vai cortar as cabeças.'",
            effects: {
              stats: { moral: 52, confianca: 45 },
              team: {
                carlos: { stress: 40 },
                julia: { stress: 35 }
              },
              xp: 5
            },
            reactionText: "O time sente que, apesar de toda a dedicação, você continua cobrando como um gerente tradicional."
          }
        ]
      }
    ],
    dailyEvents: {
      1: [
        {
          speaker: "rafael",
          text: "Scrum Master, configurei a redundância multi-região na AWS. Se um datacenter cair, o Pixflow se mantém no ar em segundos sem perda de dados. O custo de infraestrutura subiu um pouco, mas a segurança é total.",
          expression: "confident",
          background: "servidores"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "Decisão final de infraestrutura. Qual sua orientação?",
          expression: "neutral",
          background: "servidores",
          choices: [
            {
              text: "Apoiar a redundância total: 'Para um sistema financeiro, segurança e alta disponibilidade justificam o investimento.'",
              effects: {
                stats: { qualidade: 98, risco: 2, confianca: 92 },
                team: {
                  rafael: { relationship: 95, motivation: 95 }
                },
                xp: 20
              },
              reactionText: "Excelente! O Pixflow agora possui nível bancário de redundância na nuvem."
            },
            {
              text: "Reduzir custos: 'Cancele a redundância por enquanto, vamos economizar orçamento da diretoria.'",
              effects: {
                stats: { risco: 25, qualidade: 85 },
                team: {
                  rafael: { relationship: 60, motivation: 65 }
                },
                xp: 5
              },
              reactionText: "A infraestrutura é simplificada, economizando orçamento mas deixando o Pixflow exposto a quedas regionais."
            }
          ]
        }
      ],
      2: [
        {
          speaker: "julia",
          text: "Terminei as telas dos relatórios consolidados! Estão lindas graças ao design da Bia e as APIs otimizadas do Carlos. O sentimento de terminar isso juntos é incrível.",
          expression: "happy",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "O que você responde para valorizar a colaboração da Júlia?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Valorizar o espírito de equipe: 'Parabéns, Júlia! É esse pareamento e colaboração que fez o Pixflow dar certo. Vocês são um time fantástico.'",
              effects: {
                stats: { moral: 98, confianca: 95 },
                team: {
                  julia: { relationship: 95, motivation: 98 },
                  carlos: { confidence: 90 }
                },
                xp: 20
              },
              reactionText: "Júlia e Carlos sentem que o esforço colaborativo é realmente valorizado."
            },
            {
              text: "Focar na entrega burocrática: 'Muito bom. Agora abra o Jira e certifique-se de preencher as horas gastas.'",
              effects: {
                stats: { moral: 68, confianca: 70 },
                team: {
                  julia: { relationship: 65, motivation: 70 }
                },
                xp: 5
              },
              reactionText: "Júlia desanima um pouco com a resposta fria e orientada a métricas de controle."
            }
          ]
        }
      ],
      3: [
        {
          speaker: "marcos",
          text: "Todos os testes de carga e testes funcionais passaram com 100% de sucesso! O Pixflow está oficialmente estável e pronto para receber o tráfego de todo o país. O deploy final foi homologado.",
          expression: "happy",
          background: "desenvolvimento"
        },
        {
          speaker: "VOCÊ — SCRUM MASTER",
          text: "O momento do deploy nacional. Qual a atitude final como Scrum Master?",
          expression: "neutral",
          background: "desenvolvimento",
          choices: [
            {
              text: "Apoiar o deploy programado e preparar a equipe para comemorar juntos o lançamento na Review.",
              effects: {
                stats: { velocidade: 75, valor: 85, confianca: 98, moral: 98 },
                team: {
                  ana: { relationship: 98, motivation: 98 },
                  marcos: { relationship: 95 }
                },
                xp: 30,
                flags: { successfulNationalLaunch: true }
              },
              reactionText: "Parabéns! O deploy é realizado com maestria. O Pixflow está no ar nacionalmente!"
            }
          ]
        }
      ]
    },
    reviewDialogues: [
      {
        speaker: "ana",
        text: "Nós conseguimos! O Pixflow está no ar e nas primeiras 24 horas processou mais de 50 mil transações sem um único bug ou queda de servidor. A diretoria da Nova Tech está impressionada com o nosso desempenho técnico e de produto!",
        expression: "happy",
        background: "reuniao"
      },
      {
        speaker: "NARRADOR",
        text: "Parabéns! Você guiou o Pixflow e a equipe da Nova Tech pelas 8 Sprints desafiadoras. Agora, vamos à sala da diretoria para a avaliação final do seu desempenho como Scrum Master.",
        expression: "happy",
        background: "diretoria"
      }
    ]
  }
];
