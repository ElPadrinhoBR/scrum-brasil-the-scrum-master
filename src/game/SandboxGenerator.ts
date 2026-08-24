import { UserStory } from './GameState';
import { DialogueLine } from '../data/sprints';

// Procedural word list for generating user story titles
const VERBS = [
  'Implementar', 'Otimizar', 'Refatorar', 'Integrar', 'Configurar', 
  'Criar', 'Corrigir', 'Refinar', 'Validar', 'Estruturar', 'Modelar'
];

const FEATURES = [
  'o fluxo de autenticação multifator (MFA)',
  'a integração da API do gateway de pagamentos Pix',
  'o painel de relatórios consolidados em PDF',
  'o sistema de envio automático de SMS para tokens',
  'a tela de checkout simplificada',
  'o pipeline de deploy automatizado em staging',
  'a lógica de validação de CNPJ do banco parceiro',
  'o histórico de transações financeiras',
  'o filtro de busca avançada com tags',
  'o mecanismo de cache e indexação de buscas',
  'o tratamento de erros críticos de conexões'
];

const TECH_COMPONENTS = [
  'usando serviços em nuvem AWS',
  'com banco de dados PostgreSQL estruturado',
  'utilizando cache em Redis para performance',
  'com contêineres Docker isolados',
  'aplicando regras estritas de segurança da LGPD',
  'para reduzir o tempo de resposta em 40%',
  'com cobertura de testes unitários automatizados',
  'e resolver os problemas de concorrência técnica'
];

// Helper to pick a random element
const randomPick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const SandboxGenerator = {
  // Generates 3 procedurally generated stories for a Sandbox Sprint
  generateStories(sprintNumber: number): UserStory[] {
    const storiesCount = 3;
    const stories: UserStory[] = [];

    for (let i = 1; i <= storiesCount; i++) {
      const verb = randomPick(VERBS);
      const feature = randomPick(FEATURES);
      const tech = randomPick(TECH_COMPONENTS);

      const title = `${verb} ${feature} ${tech}.`;
      const value = Math.floor(Math.random() * 8) + 3; // 3 to 10
      const complexity = randomPick([1, 2, 3, 5, 8]);
      
      const id = `SND-${sprintNumber.toString().padStart(2, '0')}${i}`;

      stories.push({
        id,
        title,
        value,
        complexity,
        status: 'todo',
        assignedTo: null,
        progress: 0
      });
    }

    return stories;
  },

  // Generates a random planning scenario for the Sprint
  generatePlanningDialogue(sprintNumber: number, goal: string): DialogueLine[] {
    const scenarios = [
      // Scenario A: Scope negotiation
      [
        {
          speaker: 'NARRADOR',
          text: `Início da Sprint ${sprintNumber} no modo Sandbox. A meta é '${goal}'. Ana (PO) quer incluir mais tarefas antes de fechar a Planning.`,
          expression: 'neutral',
          background: 'reuniao'
        },
        {
          speaker: 'ana',
          text: 'Pessoal, eu sei que combinamos as 3 histórias prioritárias, mas a diretoria quer muito enfiar uma melhoria de usabilidade de última hora. Cabe na Sprint?',
          expression: 'worried',
          background: 'reuniao'
        },
        {
          speaker: 'carlos',
          text: 'Sem chance! Já estamos no nosso limite de capacidade (velocity). Adicionar mais carga sem remover nada vai arruinar a qualidade.',
          expression: 'angry',
          background: 'reuniao'
        },
        {
          speaker: 'VOCÊ — SCRUM MASTER',
          text: 'Como Scrum Master, como você conduzirá essa negociação de escopo?',
          expression: 'neutral',
          background: 'reuniao',
          choices: [
            {
              text: 'Ajudar a PO e o Time a negociar: se a nova tarefa entrar, outra de menor valor deve sair.',
              effects: {
                stats: { confianca: 65, moral: 60, risco: 20 },
                xp: 25
              },
              reactionText: 'Excelente! O time removeu uma história menor do backlog e manteve a capacidade balanceada.',
              feedback: {
                rating: 'BOM',
                explanation: 'A capacidade da Sprint é finita. Negociar trocas de escopo (trocar uma história nova por outra equivalente) mantém o ritmo sustentável e a transparência com o Product Owner.'
              }
            },
            {
              text: 'Impor o escopo extra: \'Precisamos agradar os stakeholders, vamos trabalhar horas extras se necessário.\'',
              effects: {
                stats: { moral: 40, risco: 40, velocidade: 40 },
                team: {
                  carlos: { stress: 20, motivation: -10 },
                  julia: { stress: 15, motivation: -10 }
                },
                xp: 5
              },
              reactionText: 'O time aceita frustrado, reclamando sobrecarregado no início da Sprint.',
              feedback: {
                rating: 'RUIM',
                explanation: 'Impor sobrecarga e contar com horas extras sabota a moral da equipe, aumenta a taxa de erros no código (gerando dívida técnica) e viola a auto-organização ágil.'
              }
            }
          ]
        }
      ],
      // Scenario B: Architectural Spike
      [
        {
          speaker: 'NARRADOR',
          text: `Planning da Sprint ${sprintNumber}. Carlos está preocupado com o desconhecimento sobre uma nova biblioteca de banco de dados.`,
          expression: 'neutral',
          background: 'reuniao'
        },
        {
          speaker: 'carlos',
          text: 'Eu não sei quanto tempo vai levar para configurar esse módulo. As estimativas das histórias podem estar completamente furadas.',
          expression: 'worried',
          background: 'reuniao'
        },
        {
          speaker: 'julia',
          text: 'Pois é. Se erramos a modelagem, as telas do frontend que dependem dela vão ficar travadas e perderemos a meta.',
          expression: 'worried',
          background: 'reuniao'
        },
        {
          speaker: 'VOCÊ — SCRUM MASTER',
          text: 'Como agir para mitigar a incerteza técnica relatada pelos desenvolvedores?',
          expression: 'neutral',
          background: 'reuniao',
          choices: [
            {
              text: 'Sugerir um Spike curto no início para que Carlos investigue a biblioteca antes de codificar em definitivo.',
              effects: {
                stats: { confianca: 70, qualidade: 65, risco: 15 },
                xp: 20
              },
              reactionText: 'Boa! O time concorda em gastar algumas horas estudando e as incertezas técnicas caem bastante.',
              feedback: {
                rating: 'BOM',
                explanation: 'Um Spike é uma ótima ferramenta ágil de pesquisa técnica curta usada para reduzir riscos de estimativas incorretas e falhas arquiteturais.'
              }
            },
            {
              text: 'Ignorar a dúvida: \'O tempo está correndo. Estimem no feeling e comecem a programar imediatamente.\'',
              effects: {
                stats: { risco: 35, qualidade: 45, confianca: 45 },
                team: {
                  carlos: { stress: 15 }
                },
                xp: 5
              },
              reactionText: 'O time começa a codificar às cegas, torcendo para dar certo.',
              feedback: {
                rating: 'RUIM',
                explanation: 'Forçar o desenvolvimento rápido sob alta incerteza sem permitir pesquisa técnica preliminar gera escolhas arquiteturais ruins e retrabalho massivo posterior.'
              }
            }
          ]
        }
      ]
    ];

    // Return a random scenario formatted with dialogue index offsets resolved
    const selected = randomPick(scenarios);
    return JSON.parse(JSON.stringify(selected));
  },

  // Generates a random Daily event scenario
  generateDailyEvent(sprintNumber: number, day: number): DialogueLine[] {
    const events = [
      // Event 1: Blocked developer
      [
        {
          speaker: 'NARRADOR',
          text: `Daily Scrum do Dia ${day} da Sprint ${sprintNumber}. Júlia relata um impedimento que a impede de avançar.`,
          expression: 'neutral',
          background: 'reuniao'
        },
        {
          speaker: 'julia',
          text: 'Eu terminei a estilização pixel-art dos botões, mas não consigo testar o envio de dados porque a API de e-mail ainda está fora do ar.',
          expression: 'worried',
          background: 'reuniao'
        },
        {
          speaker: 'rafael',
          text: 'O provedor externo está instável hoje de manhã. Não temos previsão de retorno.',
          expression: 'neutral',
          background: 'reuniao'
        },
        {
          speaker: 'VOCÊ — SCRUM MASTER',
          text: 'Qual é o seu direcionamento para desbloquear a Júlia?',
          expression: 'neutral',
          background: 'reuniao',
          choices: [
            {
              text: 'Orientar Júlia e Carlos a mocar (criar simulação de) a API localmente para continuar programando o frontend sem depender do ar.',
              effects: {
                stats: { velocidade: 60, confianca: 65 },
                xp: 25
              },
              reactionText: 'Excelente! Júlia cria dados fictícios de teste e continua trabalhando sem ficar parada.',
              feedback: {
                rating: 'BOM',
                explanation: 'Mocar APIs externas é uma prática técnica ágil padrão para remover dependências de sistemas instáveis de terceiros, mantendo o fluxo de entrega ativo.'
              }
            },
            {
              text: 'Dizer para a Júlia esperar a API voltar e ir focar em responder e-mails ou organizar documentação no Jira.',
              effects: {
                stats: { velocidade: 35, moral: 45 },
                team: {
                  julia: { motivation: -10, stress: 5 }
                },
                xp: 5
              },
              reactionText: 'Júlia fica ociosa no dia, desanimada com a falta de dinamismo.',
              feedback: {
                rating: 'RUIM',
                explanation: 'Deixar um desenvolvedor parado aguardando terceiros sabota a velocidade da Sprint. O Scrum Master deve estimular alternativas técnicas (como mockar) para manter a produtividade.'
              }
            }
          ]
        }
      ],
      // Event 2: Quality vs Speed debate
      [
        {
          speaker: 'NARRADOR',
          text: `Daily Scrum da Sprint ${sprintNumber}, Dia ${day}. Carlos quer passar mais tempo escrevendo testes unitários.`,
          expression: 'neutral',
          background: 'reuniao'
        },
        {
          speaker: 'carlos',
          text: 'Eu sei que estamos apertados, mas se não fizermos testes de integração para essa rota crítica, a chance de subir bugs para produção é gigantesca.',
          expression: 'worried',
          background: 'reuniao'
        },
        {
          speaker: 'ana',
          text: 'Carlos, os testes demoram demais. O investidor quer testar a tela funcionando até amanhã! Os testes podem ficar para depois.',
          expression: 'angry',
          background: 'reuniao'
        },
        {
          speaker: 'VOCÊ — SCRUM MASTER',
          text: 'De que lado você se posiciona para gerenciar esse dilema de qualidade?',
          expression: 'neutral',
          background: 'reuniao',
          choices: [
            {
              text: 'Apoiar os testes: \'A Definição de Pronto (DoD) inclui testes. Pular isso compromete a estabilidade básica do produto.\'',
              effects: {
                stats: { qualidade: 70, velocidade: 45, risco: 15 },
                team: {
                  carlos: { confidence: 15, motivation: 10 }
                },
                xp: 20
              },
              reactionText: 'Carlos escreve a suíte de testes. Ana reclama da demora, mas os testes barram um bug severo logo de tarde.',
              feedback: {
                rating: 'BOM',
                explanation: 'Qualidade não é negociável. Negligenciar testes acumula dívida técnica e bugs perigosos que atrasam o projeto no médio prazo muito mais do que o tempo de escrita dos testes.'
              }
            },
            {
              text: 'Ficar ao lado da PO: \'Desative os testes por enquanto. Vamos subir o código cru e testar manualmente na pressa.\'',
              effects: {
                stats: { velocidade: 60, qualidade: 35, risco: 40, confianca: 40 },
                team: {
                  carlos: { motivation: -15, stress: 10 }
                },
                xp: 5
              },
              reactionText: 'O código sobe rápido, mas o banco de dados corrompe os dados simulados devido a uma falha de validação.',
              feedback: {
                rating: 'RUIM',
                explanation: 'Ignorar a DoD e pular testes automatizados sob pressão gera código frágil e eleva os riscos operacionais. O Scrum Master deve zelar pelos padrões mínimos de qualidade pactuados.'
              }
            }
          ]
        }
      ],
      // Event 3: Conflict resolution
      [
        {
          speaker: 'NARRADOR',
          text: `Daily Scrum da Sprint ${sprintNumber}, Dia ${day}. Clima tenso entre Marcos (QA) e Júlia (Frontend).`,
          expression: 'worried',
          background: 'reuniao'
        },
        {
          speaker: 'marcos',
          text: 'Eu recusei o card de checkout da Júlia pela terceira vez! Ela vive subindo a tela desalinhada e sem validação de campos.',
          expression: 'angry',
          background: 'reuniao'
        },
        {
          speaker: 'julia',
          text: 'Marcos está sendo preciosista demais! O botão está torto por apenas 2 pixels, e a validação básica de e-mail está funcionando sim!',
          expression: 'angry',
          background: 'reuniao'
        },
        {
          speaker: 'VOCÊ — SCRUM MASTER',
          text: 'Como você media esse conflito interpessoal entre desenvolvedores?',
          expression: 'neutral',
          background: 'reuniao',
          choices: [
            {
              text: 'Reunir ambos após a Daily para esclarecer a DoD: os critérios visuais e de validação devem estar acordados de forma objetiva.',
              effects: {
                stats: { moral: 60, confianca: 65 },
                team: {
                  julia: { relationship: 10, stress: -10 },
                  marcos: { relationship: 10, stress: -10 }
                },
                xp: 25
              },
              reactionText: 'Excelente! Júlia entende o ponto de Marcos, e Marcos concorda em ser mais claro nas descrições de bugs.',
              feedback: {
                rating: 'BOM',
                explanation: 'Conflitos devem ser resolvidos alinhando expectativas e despersonalizando os problemas. Trazer a discussão de volta aos critérios objetivos da DoD evita picuinhas pessoais.'
              }
            },
            {
              text: 'Dar bronca geral na Daily: \'Vocês são adultos, parem de brigar por besteira de pixel e andem com esse card!\'',
              effects: {
                stats: { moral: 40, confianca: 45 },
                team: {
                  julia: { stress: 20, motivation: -10 },
                  marcos: { stress: 20, motivation: -10 }
                },
                xp: 5
              },
              reactionText: 'Ambos se calam constrangidos, mas o rancor mútuo continua minando a comunicação do time.',
              feedback: {
                rating: 'RUIM',
                explanation: 'Expor e repreender membros do time publicamente de forma grosseira destrói a segurança psicológica da equipe e gera barreiras defensivas silenciosas.'
              }
            }
          ]
        }
      ]
    ];

    // Pick one daily event at random
    const idx = (sprintNumber + day) % events.length;
    const selected = events[idx];
    return JSON.parse(JSON.stringify(selected));
  },

  // Generates Review feedback based on actual performance (User stories completed)
  generateReviewDialogue(sprintNumber: number, storiesCompleted: number, totalStories: number): DialogueLine[] {
    const isPerfect = storiesCompleted === totalStories;
    const isHalf = storiesCompleted > 0 && storiesCompleted < totalStories;

    let systemText = `Sprint Review da Sprint ${sprintNumber} encerrada. O time apresentou os incrementos de software do Pixflow. `;
    let pOwnerText = '';
    let responseText = '';

    if (isPerfect) {
      systemText += `Todas as ${totalStories} User Stories foram concluídas com sucesso.`;
      pOwnerText = 'Sensacional! O time superou todas as expectativas. Os incrementos de produto atendem a nossa Definição de Pronto (DoD) e agregam muito valor. Vamos levar esse incremento para os stakeholders!';
      responseText = 'Excelente trabalho de facilitação. O time está colhendo os frutos de manter o foco no objetivo e remover os impedimentos rapidamente.';
    } else if (isHalf) {
      systemText += `Entregamos ${storiesCompleted} de ${totalStories} User Stories.`;
      pOwnerText = 'Bom progresso, mas parte das tarefas planejadas voltou para o backlog. Precisamos entender na Retrospectiva o que nos travou para melhorar as estimativas.';
      responseText = 'Pelo menos entregamos o incremento básico. Vamos ajustar nosso ritmo e refinar os gargalos no próximo ciclo.';
    } else {
      systemText += 'Nenhuma User Story foi entregue na coluna Done.';
      pOwnerText = 'Estou muito preocupada! Passamos a Sprint toda apagando incêndios e travados. Desse jeito o Pixflow não vai decolar. O que aconteceu?';
      responseText = 'Precisamos agir com urgência na Retrospectiva. O time está desestruturado ou os impedimentos nos engoliram.';
    }

    return [
      {
        speaker: 'SISTEMA',
        text: systemText,
        expression: 'neutral',
        background: 'reuniao'
      },
      {
        speaker: 'ana',
        text: pOwnerText,
        expression: isPerfect ? 'happy' : (isHalf ? 'neutral' : 'angry'),
        background: 'reuniao'
      },
      {
        speaker: 'VOCÊ — SCRUM MASTER',
        text: responseText,
        expression: 'neutral',
        background: 'reuniao'
      }
    ];
  }
};
