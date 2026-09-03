// Histórias, Sprints e Desafios Reais de Gestão Ágil para as Empresas do Scrum Brasil

import { UserStory } from '../game/GameState';
import { DialogueLine } from './sprints';

export interface CompanySprintDef {
  sprint: number;
  goal: string;
  background: string;
  stories: UserStory[];
  planningDialogues: DialogueLine[];
  dailyEvents: Record<number, DialogueLine[]>;
  reviewDialogues: DialogueLine[];
}

export interface CompanyCampaign {
  companyId: string;
  companyName: string;
  productName: string;
  backgroundDefault: string;
  sprints: CompanySprintDef[];
}

export const COMPANY_CAMPAIGNS: Record<string, CompanyCampaign> = {
  // ── 1. VELOCELOG (Logtech & Entregas Last-Mile) ──────────────────────────────
  velocelog: {
    companyId: 'velocelog',
    companyName: 'VeloceLog Express',
    productName: 'RouteFast (Otimizador de Rotas com IA)',
    backgroundDefault: 'velocelog',
    sprints: [
      {
        sprint: 1,
        goal: 'Mapear e roteirizar 500 entregas simultâneas na Grande SP sem estourar tempo de resposta',
        background: 'velocelog',
        stories: [
          { id: 'VL-01', title: 'Integração com API de tráfego em tempo real para cálculo de pedágios', value: 8, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'VL-02', title: 'App do motorista: aceitar lote de entregas com 1 toque offline', value: 9, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'VL-03', title: 'Algoritmo de agrupamento de CEPs para diminuir km rodado em 18%', value: 10, complexity: 8, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'VL-04', title: 'Dashboard do operador logístico com alerta de entrega em atraso', value: 7, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
        ],
        planningDialogues: [
          { speaker: 'Ana', text: 'Scrum Master, a Black Friday começa em 3 semanas. Se o RouteFast falhar na roteirização, a multa por atraso quebra a empresa!', expression: 'worried' },
          { speaker: 'Carlos', text: 'O algoritmo usa grafos pesados. Se tentarmos calcular todas as rotas ao mesmo tempo no mesmo servidor, o banco vai derreter.', expression: 'worried' },
          { speaker: 'Scrum Master', text: 'Vamos limitar o WIP, focar primeiro no agrupamento de CEPs e validar a performance antes de abrir para toda a frota.', expression: 'confident' },
        ],
        dailyEvents: {
          1: [
            { speaker: 'Júlia', text: 'Fizemos testes em campo e os motoristas reclamaram que o botão de confirmar entrega é pequeno demais para usar com luva!', expression: 'surprised' },
            {
              speaker: 'Scrum Master',
              text: 'Como devemos tratar esse feedback de usabilidade no meio da Sprint?',
              choices: [
                {
                  text: 'Ajustar imediatamente a área de toque no app em 1 hora para evitar acidentes e retrabalho.',
                  effects: { stats: { qualidade: 6, moral: 5, risco: -4 }, xp: 30 },
                },
                {
                  text: 'Recusar qualquer mudança e exigir que os motoristas comprem luvas touch screen.',
                  effects: { stats: { moral: -8, confianca: -6, risco: 8 }, xp: 5 },
                },
              ],
            },
          ],
          2: [
            { speaker: 'Rafael', text: 'A API de mapas que usamos caiu por 40 minutos na Zona Leste e travou todos os despachos da manhã!', expression: 'angry' },
            {
              speaker: 'Scrum Master',
              text: 'Qual a melhor resposta ágil para a dependência externa que falhou?',
              choices: [
                {
                  text: 'Criar um cache local com rotas offline de contingência enquanto negociamos SLA com o provedor.',
                  effects: { stats: { qualidade: 8, risco: -8, confianca: 6 }, xp: 35 },
                },
                {
                  text: 'Culpar o time de DevOps e cancelar a simulação do dia.',
                  effects: { stats: { moral: -10, risco: 12 }, xp: 0 },
                },
              ],
            },
          ],
          3: [
            { speaker: 'Marcos', text: 'Descobri um bug: quando o motorista passa por túnel sem sinal, o app duplica a confirmação de entrega!', expression: 'worried' },
            {
              speaker: 'Scrum Master',
              text: 'O que priorizar antes da Review amanhã?',
              choices: [
                {
                  text: 'Carlos e Marcos aplicam validação idempotente para impedir envio duplicado.',
                  effects: { stats: { qualidade: 10, valor: 8, risco: -10 }, xp: 40 },
                },
                {
                  text: 'Deixar passar para a Review e fingir que ninguém percebeu.',
                  effects: { stats: { confianca: -15, qualidade: -10, risco: 15 }, xp: 0 },
                },
              ],
            },
          ],
        },
        reviewDialogues: [
          { speaker: 'Ana', text: 'Incrível! Conseguimos roteirizar 650 entregas com 14% de economia de combustível nos testes piloto!', expression: 'happy' },
          { speaker: 'Carlos', text: 'O cache offline salvou a operação quando a rede oscilou. Bom trabalho na facilitação das prioridades!', expression: 'confident' },
        ],
      },
    ],
  },

  // ── 2. HEALTHPULSE (Healthtech & Telemedicina) ────────────────────────────────
  healthpulse: {
    companyId: 'healthpulse',
    companyName: 'HealthPulse Digital',
    productName: 'MedConnect (Prontuário e Consultas em Tempo Real)',
    backgroundDefault: 'healthpulse',
    sprints: [
      {
        sprint: 1,
        goal: 'Lançar sala de teleconsulta com prontuário eletrônico integrado em conformidade estrita com a LGPD',
        background: 'healthpulse',
        stories: [
          { id: 'HP-01', title: 'Criptografia ponta-a-ponta na transmissão de vídeo da teleconsulta', value: 10, complexity: 8, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'HP-02', title: 'Assinatura digital padrão ICP-Brasil para receitas médicas em PDF', value: 9, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'HP-03', title: 'Prontuário com histórico de alergias e alertas visuais de risco', value: 8, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'HP-04', title: 'Log de auditoria imutável de acessos aos dados sigilosos do paciente', value: 7, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
        ],
        planningDialogues: [
          { speaker: 'Ana', text: 'Na telemedicina não há margem para erro. Um vazamento de prontuário gera processo criminal e fecha nossa empresa.', expression: 'worried' },
          { speaker: 'Marcos', text: 'Precisamos de testes automatizados de segurança (SAST/DAST) rodando no pipeline antes de qualquer deploy.', expression: 'confident' },
          { speaker: 'Scrum Master', text: 'A Definition of Done nesta Sprint exigirá validação de conformidade da LGPD em 100% das histórias.', expression: 'confident' },
        ],
        dailyEvents: {
          1: [
            { speaker: 'Carlos', text: 'O conselho médico exigiu um campo novo de CRM do médico em 4 lugares diferentes que não estavam no escopo planejado.', expression: 'worried' },
            {
              speaker: 'Scrum Master',
              text: 'Como agir diante de exigência regulatória urgente no meio da Sprint?',
              choices: [
                {
                  text: 'Alinhar com a PO Ana para trocar uma história não crítica pelo ajuste de compliance com acordo do time.',
                  effects: { stats: { confianca: 8, valor: 6, risco: -6 }, xp: 35 },
                },
                {
                  text: 'Ignorar a regulação e esperar sermos multados na auditoria médica.',
                  effects: { stats: { risco: 20, confianca: -15 }, xp: 0 },
                },
              ],
            },
          ],
          2: [
            { speaker: 'Júlia', text: 'Dois médicos voluntários disseram que o prontuário tem botões demais e que eles preferem continuar no papel.', expression: 'sad' },
            {
              speaker: 'Scrum Master',
              text: 'Como aumentar a adesão dos usuários médicos resistentes à tecnologia?',
              choices: [
                {
                  text: 'Convidar os médicos para uma sessão rápida de co-design e simplificar o fluxo de preenchimento rápido.',
                  effects: { stats: { valor: 8, moral: 6, qualidade: 6 }, xp: 40 },
                },
                {
                  text: 'Dizer que os médicos estão desatualizados e forçar o uso por decreto.',
                  effects: { stats: { confianca: -10, moral: -8 }, xp: 5 },
                },
              ],
            },
          ],
          3: [
            { speaker: 'Rafael', text: 'Identifiquei que os arquivos de receitas estavam sendo gravados em bucket S3 com permissão pública por engano!', expression: 'angry' },
            {
              speaker: 'Scrum Master',
              text: 'Incidente de segurança grave descoberto em Staging! O que fazer?',
              choices: [
                {
                  text: 'Bloquear o acesso imediatamente, isolar as chaves e rodar varredura completa de integridade com o time.',
                  effects: { stats: { qualidade: 12, risco: -14, confianca: 10 }, xp: 50 },
                },
                {
                  text: 'Deixar para corrigir no próximo mês para não atrasar a meta da sprint.',
                  effects: { stats: { risco: 25, confianca: -20, qualidade: -15 }, xp: 0 },
                },
              ],
            },
          ],
        },
        reviewDialogues: [
          { speaker: 'Ana', text: 'Os médicos do hospital parceiro testaram e elogiaram a rapidez na emissão de receitas assinadas digitalmente!', expression: 'happy' },
          { speaker: 'Marcos', text: 'Aprovado na auditoria preliminar com nota máxima de segurança de dados. Excelente facilitação!', expression: 'confident' },
        ],
      },
    ],
  },

  // ── 3. AGROSMART (Agrotech & IoT no Campo) ──────────────────────────────────
  agrosmart: {
    companyId: 'agrosmart',
    companyName: 'AgroSmart Terra',
    productName: 'SafraView (Sensores e Monitoramento de Lavouras)',
    backgroundDefault: 'agrosmart',
    sprints: [
      {
        sprint: 1,
        goal: 'Sincronizar dados de sensores de solo e drones em áreas remotas via rede satelital e Bluetooth Mesh',
        background: 'agrosmart',
        stories: [
          { id: 'AG-01', title: 'Protocolo de compressão de dados climáticos para envio econômico via satélite', value: 9, complexity: 8, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'AG-02', title: 'Firmware: modo economia de bateria profunda em estações solares no campo', value: 8, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'AG-03', title: 'Mapa térmico de umidade da lavoura na tela do tablet do produtor rural', value: 10, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'AG-04', title: 'Alerta preventivo de pragas e fungos baseado em umidade e temperatura', value: 7, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
        ],
        planningDialogues: [
          { speaker: 'Ana', text: 'Os fazendeiros de Mato Grosso estão plantando agora. Se o SafraView não ler os sensores a tempo, eles perderão a janela de irrigação.', expression: 'worried' },
          { speaker: 'Carlos', text: 'O hardware dos sensores sofre com poeira e tempestades. Precisamos testar perda de pacotes e reconexão automática.', expression: 'confident' },
          { speaker: 'Scrum Master', text: 'Vamos criar um ambiente de testes simulando alta latência e perda de pacotes para blindar o sistema.', expression: 'confident' },
        ],
        dailyEvents: {
          1: [
            { speaker: 'Rafael', text: 'Os módulos de rádio LoRa que importamos atrasaram na alfândega e não temos placas suficientes para todos os devs.', expression: 'worried' },
            {
              speaker: 'Scrum Master',
              text: 'Como resolver o impedimento de falta de hardware físico?',
              choices: [
                {
                  text: 'Criar um emulador em software que simula o envio de sinais LoRa enquanto as placas não chegam.',
                  effects: { stats: { velocidade: 8, moral: 6, risco: -6 }, xp: 35 },
                },
                {
                  text: 'Mandar o time de desenvolvimento para casa esperar a Receita Federal liberar a carga.',
                  effects: { stats: { velocidade: -12, moral: -10 }, xp: 0 },
                },
              ],
            },
          ],
          2: [
            { speaker: 'Júlia', text: 'O sol forte no campo torna impossível ler a tela do tablet com o tema escuro atual!', expression: 'surprised' },
            {
              speaker: 'Scrum Master',
              text: 'Feedback de uso real em ambiente agro. Qual a ação correta?',
              choices: [
                {
                  text: 'Implementar modo Alto Contraste Solar para uso ao ar livre com teste direto sob luz natural.',
                  effects: { stats: { valor: 8, qualidade: 6, confianca: 6 }, xp: 35 },
                },
                {
                  text: 'Ignorar e sugerir que os fazendeiros usem sombrinhas enquanto olham os gráficos.',
                  effects: { stats: { confianca: -10, valor: -6 }, xp: 5 },
                },
              ],
            },
          ],
          3: [
            { speaker: 'Carlos', text: 'Conseguimos comprimir os pacotes em 85%! O custo de telemetria satelital caiu de R$ 40 para R$ 6 por hectare!', expression: 'happy' },
            {
              speaker: 'Scrum Master',
              text: 'Como aproveitar essa grande vitória técnica na Sprint?',
              choices: [
                {
                  text: 'Comemorar o marco com o time e documentar o aprendizado para os próximos módulos.',
                  effects: { stats: { moral: 10, valor: 10, confianca: 8 }, xp: 40 },
                },
                {
                  text: 'Exigir que Carlos trabalhe até tarde para tentar bater 95% de compressão.',
                  effects: { stats: { moral: -10, risco: 8 }, xp: 5 },
                },
              ],
            },
          ],
        },
        reviewDialogues: [
          { speaker: 'Ana', text: 'A cooperativa fechou contrato para monitorar 40 mil hectares com o SafraView! Vitória incrível!', expression: 'happy' },
          { speaker: 'Carlos', text: 'O emulador nos permitiu testar sem parar mesmo sem as placas físicas. A agilidade fez toda a diferença.', expression: 'confident' },
        ],
      },
    ],
  },

  // ── 4. CYBERSHIELD (Cibersegurança & SOC) ───────────────────────────────────
  cybershield: {
    companyId: 'cybershield',
    companyName: 'CyberShield Defesa',
    productName: 'ThreatWatcher (Detecção de Ameaças em Nuvem)',
    backgroundDefault: 'cybershield',
    sprints: [
      {
        sprint: 1,
        goal: 'Construir pipeline de detecção e contenção automática de ataques ransomware em menos de 60 segundos',
        background: 'cybershield',
        stories: [
          { id: 'CS-01', title: 'Ingestão de 2 milhões de logs/segundo com cluster Kafka distribuído', value: 10, complexity: 8, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'CS-02', title: 'Regras de correlação de eventos usando modelo heurístico de anomalias', value: 9, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'CS-03', title: 'Isolamento automático de endpoints infectados via API de firewall', value: 9, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'CS-04', title: 'Painel tático do SOC com alertas sonoros de criticidade nível 1', value: 7, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
        ],
        planningDialogues: [
          { speaker: 'Ana', text: 'Nossos clientes de e-commerce estão sofrendo tentativas de sequestro de dados todos os dias. O ThreatWatcher tem que ser infalível.', expression: 'worried' },
          { speaker: 'Carlos', text: 'Processar 2 milhões de eventos por segundo exige arquitetura reativa sem nenhum gargalo de sincronização.', expression: 'confident' },
          { speaker: 'Scrum Master', text: 'Vamos focar em testes de carga contínuos e garantir que o time mantenha a calma sob pressão.', expression: 'confident' },
        ],
        dailyEvents: {
          1: [
            { speaker: 'Rafael', text: 'Um ataque simulado de penetração derrubou nosso cluster de testes de ingestão de logs!', expression: 'worried' },
            {
              speaker: 'Scrum Master',
              text: 'O cluster caiu no teste de estresse. O que fazer?',
              choices: [
                {
                  text: 'Realizar uma sessão de debriefing blameless (sem culpados) e redimensionar os particionadores do Kafka.',
                  effects: { stats: { qualidade: 10, confianca: 8, risco: -8 }, xp: 40 },
                },
                {
                  text: 'Procurar quem configurou o cluster e aplicar punição pública para dar exemplo.',
                  effects: { stats: { moral: -18, confianca: -15, risco: 15 }, xp: 0 },
                },
              ],
            },
          ],
          2: [
            { speaker: 'Júlia', text: 'Os analistas do SOC disseram que a tela pisca tantos alertas falsos que eles estão tendo fadiga de alarmes.', expression: 'sad' },
            {
              speaker: 'Scrum Master',
              text: 'Fadiga de alertas é o maior risco de segurança da informação. Como agir?',
              choices: [
                {
                  text: 'Trabalhar com Marcos e PO para calibrar o limiar de severidade e agrupar alertas repetidos.',
                  effects: { stats: { qualidade: 8, valor: 8, moral: 6 }, xp: 35 },
                },
                {
                  text: 'Mandar os analistas prestarem mais atenção e tomarem energético para aguentar o turno.',
                  effects: { stats: { moral: -12, risco: 12 }, xp: 5 },
                },
              ],
            },
          ],
          3: [
            { speaker: 'Marcos', text: 'Conseguimos conter um ataque de ransomware em laboratório em apenas 28 segundos! Novo recorde da equipe!', expression: 'confident' },
            {
              speaker: 'Scrum Master',
              text: 'Tempo de resposta 50% mais veloz que a meta. Qual o próximo passo?',
              choices: [
                {
                  text: 'Registrar as métricas no relatório de Review e preparar demonstração ao vivo para a diretoria.',
                  effects: { stats: { confianca: 12, valor: 10, moral: 8 }, xp: 45 },
                },
                {
                  text: 'Não contar para os clientes para não criar expectativas altas demais.',
                  effects: { stats: { confianca: -8, valor: -6 }, xp: 5 },
                },
              ],
            },
          ],
        },
        reviewDialogues: [
          { speaker: 'Ana', text: 'A diretoria executiva ficou de queixo caído com a contenção em 28 segundos ao vivo na Review!', expression: 'happy' },
          { speaker: 'Carlos', text: 'O processo ágil nos deu clareza para resolver os gargalos de memória sem atrito interpessoal.', expression: 'confident' },
        ],
      },
    ],
  },

  // ── 5. EDUNEXT (Edtech & Gamificação Escolar) ────────────────────────────────
  edunext: {
    companyId: 'edunext',
    companyName: 'EduNext Academy',
    productName: 'Aprenda+ (Plataforma Gamificada para Escolas)',
    backgroundDefault: 'edunext',
    sprints: [
      {
        sprint: 1,
        goal: 'Entregar módulo de missões diárias com trilha adaptativa e ranking escolar para o início do ano letivo',
        background: 'edunext',
        stories: [
          { id: 'ED-01', title: 'Motor de recomendação de exercícios baseado no nível de proficiência do aluno', value: 10, complexity: 8, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'ED-02', title: 'Interface gamificada: avatar customizável, moedas virtuais e recompensas', value: 8, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'ED-03', title: 'Painel do professor com relatórios de defasagem de aprendizagem da turma', value: 9, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'ED-04', title: 'Otimização para conexão lenta em escolas públicas de periferia', value: 8, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
        ],
        planningDialogues: [
          { speaker: 'Ana', text: 'O ano letivo começa em 15 dias. Mais de 300 escolas compraram o Aprenda+ e os servidores precisam aguentar o primeiro dia de aula!', expression: 'worried' },
          { speaker: 'Júlia', text: 'As ilustrações dos avatares precisam ser inclusivas e rodar liso em celulares baratos com pouca memória.', expression: 'confident' },
          { speaker: 'Scrum Master', text: 'Vamos garantir que o MVP seja leve e rápido antes de focar em animações pesadas.', expression: 'confident' },
        ],
        dailyEvents: {
          1: [
            { speaker: 'Carlos', text: 'Os pedagogos querem mudar a pontuação das missões porque acham que ranking gera competição tóxica entre crianças.', expression: 'worried' },
            {
              speaker: 'Scrum Master',
              text: 'Dilema pedagógico vs escopo técnico já planejado. O que fazer?',
              choices: [
                {
                  text: 'Facilitar uma conversa rápida entre PO e pedagogos para transformar o ranking em conquistas cooperativas de turma.',
                  effects: { stats: { valor: 8, confianca: 8, moral: 6 }, xp: 35 },
                },
                {
                  text: 'Dizer que os pedagogos não entendem de software e ignorar o apontamento.',
                  effects: { stats: { confianca: -12, valor: -8 }, xp: 0 },
                },
              ],
            },
          ],
          2: [
            { speaker: 'Rafael', text: 'No teste de carga com 50 mil requisições simultâneas, o serviço de autenticação caiu.', expression: 'worried' },
            {
              speaker: 'Scrum Master',
              text: 'A carga de alunos no primeiro dia de aula vai ser 10 vezes maior. Como agir?',
              choices: [
                {
                  text: 'Adicionar filas de espera com Redis e escalar réplicas stateless com balanceamento de carga.',
                  effects: { stats: { qualidade: 10, risco: -10, velocidade: 6 }, xp: 40 },
                },
                {
                  text: 'Rezar para os alunos não acessarem todos no mesmo horário.',
                  effects: { stats: { risco: 20, confianca: -12 }, xp: 0 },
                },
              ],
            },
          ],
          3: [
            { speaker: 'Júlia', text: 'Fizemos um teste com 10 estudantes em uma escola pública: o engajamento subiu 75% quando as missões deram badges!', expression: 'happy' },
            {
              speaker: 'Scrum Master',
              text: 'Feedback de campo extremamente positivo. Como consolidar?',
              choices: [
                {
                  text: 'Trazer os dados para a Sprint Review e demonstrar o impacto direto no aprendizado real dos alunos.',
                  effects: { stats: { valor: 10, confianca: 10, moral: 8 }, xp: 45 },
                },
                {
                  text: 'Achar que foi sorte e descartar a métrica de engajamento.',
                  effects: { stats: { moral: -6, valor: -4 }, xp: 5 },
                },
              ],
            },
          ],
        },
        reviewDialogues: [
          { speaker: 'Ana', text: 'Os secretários de educação aprovaram o piloto e o sistema aguentou 80 mil acessos no pré-lançamento!', expression: 'happy' },
          { speaker: 'Júlia', text: 'A mudança de ranking competitivo para missões cooperativas foi o diferencial de valor.', expression: 'confident' },
        ],
      },
    ],
  },

  // ── 6. SAFEVAULT (Banco Tradicional & Transição Ágil) ────────────────────────
  safevault: {
    companyId: 'safevault',
    companyName: 'SafeVault Finance',
    productName: 'OpenBank Core (Modernização de Sistemas Legados)',
    backgroundDefault: 'safevault',
    sprints: [
      {
        sprint: 1,
        goal: 'Expor APIs seguras de Open Finance a partir do sistema bancário central sem indisponibilidade no caixa',
        background: 'safevault',
        stories: [
          { id: 'SV-01', title: 'Camada de microsserviços desacoplada com barramento de eventos sobre o legado', value: 10, complexity: 8, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'SV-02', title: 'Autenticação OAuth2 mTLS para consentimento de compartilhamento de dados', value: 9, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'SV-03', title: 'Consulta de saldo e extrato com resposta abaixo de 200 milissegundos', value: 8, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'SV-04', title: 'Relatório automatizado de conformidade para o comitê de governança do banco', value: 7, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
        ],
        planningDialogues: [
          { speaker: 'Ana', text: 'O comitê CAB do banco tradicional não acredita em entregas quinzenais. Eles exigem relatórios de 150 páginas antes de cada deploy.', expression: 'worried' },
          { speaker: 'Carlos', text: 'Nosso time perde 2 dias por semana preenchendo planilhas de aprovação que ninguém lê.', expression: 'sad' },
          { speaker: 'Scrum Master', text: 'Vamos construir confiança automatizando a comprovação de testes e trazendo a diretoria para a Sprint Review!', expression: 'confident' },
        ],
        dailyEvents: {
          1: [
            { speaker: 'Carlos', text: 'O gerente de infraestrutura tradicional barrou o deploy de teste dizendo que ágil é arriscado demais.', expression: 'angry' },
            {
              speaker: 'Scrum Master',
              text: 'Conflito clássico entre governança tradicional e agilidade. Como agir?',
              choices: [
                {
                  text: 'Agendar uma reunião executiva para apresentar os testes automatizados e o plano de rollback seguro em 1 clique.',
                  effects: { stats: { confianca: 10, velocidade: 8, risco: -6 }, xp: 40 },
                },
                {
                  text: 'Discutir aos gritos no corredor e acusar o gerente de sabotagem.',
                  effects: { stats: { moral: -15, confianca: -15, risco: 15 }, xp: 0 },
                },
              ],
            },
          ],
          2: [
            { speaker: 'Marcos', text: 'Encontramos transações de teste que falharam silenciosamente no sistema mainframe antigo.', expression: 'worried' },
            {
              speaker: 'Scrum Master',
              text: 'Falha silenciosa de legado. Como proceder?',
              choices: [
                {
                  text: 'Criar testes de reconciliação de saldo em tempo real que alertam discrepâncias imediatamente.',
                  effects: { stats: { qualidade: 12, risco: -10, valor: 6 }, xp: 35 },
                },
                {
                  text: 'Fingir que não vimos porque o problema é do sistema velho.',
                  effects: { stats: { risco: 20, qualidade: -15 }, xp: 0 },
                },
              ],
            },
          ],
          3: [
            { speaker: 'Rafael', text: 'O pipeline automatizado executou 480 testes de segurança e compliance em 3 minutos e gerou o relatório do CAB sozinho!', expression: 'happy' },
            {
              speaker: 'Scrum Master',
              text: 'Automação substituindo burocracia manual. Como usar isso?',
              choices: [
                {
                  text: 'Apresentar a evidência ao comitê de governança para conquistar dispensa de aprovações manuais no futuro.',
                  effects: { stats: { velocidade: 12, confianca: 12, moral: 8 }, xp: 45 },
                },
                {
                  text: 'Guardar em segredo para o time ter tempo ocioso sem que ninguém saiba.',
                  effects: { stats: { confianca: -10 }, xp: 5 },
                },
              ],
            },
          ],
        },
        reviewDialogues: [
          { speaker: 'Ana', text: 'Pela primeira vez na história de 40 anos do banco, um projeto entregou em 2 semanas com zero chamados de suporte!', expression: 'happy' },
          { speaker: 'Carlos', text: 'A diretoria finalmente aprovou a dispensa do comitê manual para os deploys da nossa esteira.', expression: 'confident' },
        ],
      },
    ],
  },

  // ── 7. FOODFAST (Foodtech & Marketplace) ────────────────────────────────────
  foodfast: {
    companyId: 'foodfast',
    companyName: 'FoodFast Delivery',
    productName: 'FoodFast App & Painel dos Restaurantes',
    backgroundDefault: 'foodfast',
    sprints: [
      {
        sprint: 1,
        goal: 'Lançar rastreamento em tempo real do entregador no mapa e despacho automatizado para as cozinhas',
        background: 'foodfast',
        stories: [
          { id: 'FF-01', title: 'Algoritmo de previsão de tempo de preparo baseado na fila de pedidos do restaurante', value: 9, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'FF-02', title: 'Localização do entregador atualizada via WebSockets sem esgotar bateria do celular', value: 10, complexity: 8, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'FF-03', title: 'Painel da cozinha (KDS) com alerta sonoro quando o motoboy estiver a 500m', value: 8, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'FF-04', title: 'Cupom relâmpago de 20 minutos com contingenciamento de estoque por bairro', value: 7, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
        ],
        planningDialogues: [
          { speaker: 'Ana', text: 'Nosso concorrente acabou de receber aporte milionário e está roubando nossos restaurantes parceiros. Precisamos entregar rápido!', expression: 'worried' },
          { speaker: 'Júlia', text: 'O app dos motoboys não pode travar nas noites de chuva e fins de semana, que é quando ocorrem 70% dos pedidos.', expression: 'confident' },
          { speaker: 'Scrum Master', text: 'Foco total no fluxo de ponta a ponta: do clique do cliente até a campainha tocar.', expression: 'confident' },
        ],
        dailyEvents: {
          1: [
            { speaker: 'Carlos', text: 'A PO Ana quer descartar a história de previsão de tempo no meio da Sprint para criar uma roleta de descontos.', expression: 'angry' },
            {
              speaker: 'Scrum Master',
              text: 'Mudança drástica de escopo no meio da Sprint. Como agir?',
              choices: [
                {
                  text: 'Lembrar do Sprint Goal acordado, explicar o custo de troca de contexto e planejar a roleta para a Sprint seguinte.',
                  effects: { stats: { velocidade: 8, confianca: 6, moral: 6 }, xp: 35 },
                },
                {
                  text: 'Jogar fora tudo o que Carlos fez e começar a roleta correndo de madrugada.',
                  effects: { stats: { moral: -15, qualidade: -12, risco: 12 }, xp: 5 },
                },
              ],
            },
          ],
          2: [
            { speaker: 'Marcos', text: 'Na simulação de sexta à noite, o WebSockets perdeu a conexão com 30% dos motoboys em São Paulo.', expression: 'worried' },
            {
              speaker: 'Scrum Master',
              text: 'Gargalo de conexão simultânea. Como o Scrum Master atua?',
              choices: [
                {
                  text: 'Facilitar pair programming entre Carlos e Rafael para implementar reconexão com backoff exponencial.',
                  effects: { stats: { qualidade: 10, risco: -10, confianca: 6 }, xp: 40 },
                },
                {
                  text: 'Dizer que internet móvel no Brasil é assim mesmo e não tem o que fazer.',
                  effects: { stats: { qualidade: -10, risco: 10 }, xp: 0 },
                },
              ],
            },
          ],
          3: [
            { speaker: 'Júlia', text: 'Os donos de restaurante elogiaram o painel: o tempo de espera do motoboy na porta caiu de 14 para 4 minutos!', expression: 'happy' },
            {
              speaker: 'Scrum Master',
              text: 'Métrica de negócio melhorou expressivamente. Como conduzir?',
              choices: [
                {
                  text: 'Compartilhar o número com toda a empresa na Daily e registrar no board de conquistas.',
                  effects: { stats: { moral: 10, valor: 10, confianca: 8 }, xp: 35 },
                },
                {
                  text: 'Achar 4 minutos muito ruim e cobrar o time agressivamente.',
                  effects: { stats: { moral: -10, confianca: -6 }, xp: 5 },
                },
              ],
            },
          ],
        },
        reviewDialogues: [
          { speaker: 'Ana', text: 'A retenção dos restaurantes subiu 22% com a redução do tempo de espera das motos. Excelente trabalho!', expression: 'happy' },
          { speaker: 'Carlos', text: 'Segurar o escopo contra mudanças impulsivas foi o que garantiu uma entrega sólida e sem bugs.', expression: 'confident' },
        ],
      },
    ],
  },

  // ── 8. AUTODRIVE (Mobilidade & Carros Conectados) ───────────────────────────
  autodrive: {
    companyId: 'autodrive',
    companyName: 'AutoDrive Connected',
    productName: 'FleetIntel (Telemetria Automotiva e Diagnóstico OBD-II)',
    backgroundDefault: 'autodrive',
    sprints: [
      {
        sprint: 1,
        goal: 'Capturar telemetria de freios, temperatura e rotação de motores pesados com tolerância zero a falhas em pista',
        background: 'autodrive',
        stories: [
          { id: 'AD-01', title: 'Decodificação do protocolo CAN bus J1939 em microcontrolador automotivo', value: 10, complexity: 8, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'AD-02', title: 'Detecção preditiva de superaquecimento de freios com alerta sonoro em cabine', value: 9, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'AD-03', title: 'Transmissão celular 4G com buffering em memória flash em áreas de serra', value: 8, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'AD-04', title: 'Portal do gestor de frotas com ranking de direção segura dos motoristas', value: 7, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
        ],
        planningDialogues: [
          { speaker: 'Ana', text: 'Se nosso software falhar em emitir o alerta de freio, uma carreta de 40 toneladas pode sofrer acidente na descida de serra.', expression: 'worried' },
          { speaker: 'Carlos', text: 'Software embarcado precisa rodar em tempo real estrito (RTOS) com memória estática para evitar memory leak.', expression: 'confident' },
          { speaker: 'Scrum Master', text: 'Nossa prioridade absoluta é confiabilidade e testes de estresse em ambiente de simulação térmica.', expression: 'confident' },
        ],
        dailyEvents: {
          1: [
            { speaker: 'Carlos', text: 'O teste na câmara climática a 60°C causou travamento no chip por ruído elétrico da ignição.', expression: 'worried' },
            {
              speaker: 'Scrum Master',
              text: 'Problema de hardware interferindo no software. O que fazer?',
              choices: [
                {
                  text: 'Desenvolver filtro digital por software para eliminar picos de ruído elétrico e testar novamente.',
                  effects: { stats: { qualidade: 10, risco: -10, confianca: 8 }, xp: 40 },
                },
                {
                  text: 'Dizer que software não mexe com eletricidade e cruzar os braços.',
                  effects: { stats: { moral: -10, risco: 15 }, xp: 0 },
                },
              ],
            },
          ],
          2: [
            { speaker: 'Marcos', text: 'O teste de freios funcionou 99 vezes, mas falhou 1 vez em uma curva acentuada.', expression: 'worried' },
            {
              speaker: 'Scrum Master',
              text: '99% de sucesso não é aceitável quando vidas estão em risco. O que fazer?',
              choices: [
                {
                  text: 'Parar o desenvolvimento de novas features para investigar a causa raiz do 1% até obter 100% de consistência.',
                  effects: { stats: { qualidade: 12, risco: -14, confianca: 10 }, xp: 45 },
                },
                {
                  text: 'Aprovar mesmo assim porque 99% é nota alta na escola.',
                  effects: { stats: { risco: 30, confianca: -20 }, xp: 0 },
                },
              ],
            },
          ],
          3: [
            { speaker: 'Júlia', text: 'Os motoristas de teste elogiaram o alerta sonoro: ele evitou o travamento de rodas em uma simulação de pista molhada!', expression: 'happy' },
            {
              speaker: 'Scrum Master',
              text: 'Validação comprovada em pista real. Como fechar a Sprint?',
              choices: [
                {
                  text: 'Documentar a telemetria do teste e parabenizar a engenharia pela precisão milimétrica.',
                  effects: { stats: { moral: 10, valor: 10, confianca: 10 }, xp: 40 },
                },
                {
                  text: 'Dizer que não fizeram mais do que a obrigação.',
                  effects: { stats: { moral: -8, confianca: -5 }, xp: 5 },
                },
              ],
            },
          ],
        },
        reviewDialogues: [
          { speaker: 'Ana', text: 'A montadora homologou nosso módulo de freios com nota máxima de segurança viária!', expression: 'happy' },
          { speaker: 'Carlos', text: 'A decisão do Scrum Master de investigar o 1% de falha salvou o projeto antes da homologação final.', expression: 'confident' },
        ],
      },
    ],
  },

  // ── 9. ECOENERGY (Cleantech & Mercado Livre de Energia) ─────────────────────
  ecoenergy: {
    companyId: 'ecoenergy',
    companyName: 'EcoEnergy Renováveis',
    productName: 'SolarTrade (Leilões e Compensação de Energia Solar)',
    backgroundDefault: 'ecoenergy',
    sprints: [
      {
        sprint: 1,
        goal: 'Permitir liquidação automática de créditos solares e compensação na conta de luz de 5 mil clientes',
        background: 'ecoenergy',
        stories: [
          { id: 'EE-01', title: 'Integração de medição de geração de energia das fazendas solares via protocolo MQTT', value: 9, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'EE-02', title: 'Motor de cálculo de compensação tarifária conforme regras vigentes da Aneel', value: 10, complexity: 8, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'EE-03', title: 'App do cliente residencial com gráficos de economia de carbono e dinheiro', value: 8, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'EE-04', title: 'Extrato contábil automático para as cooperativas de energia renovável', value: 7, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
        ],
        planningDialogues: [
          { speaker: 'Ana', text: 'A Aneel publicou uma resolução nova ontem e as cooperativas exigem que nosso cálculo esteja rigorosamente exato.', expression: 'worried' },
          { speaker: 'Carlos', text: 'As regras tributárias de ICMS sobre energia solar mudam de estado para estado. A complexidade do cálculo é alta.', expression: 'confident' },
          { speaker: 'Scrum Master', text: 'Vamos construir tabelas de decisão orientadas a testes (TDD) para validar cada regra com os advogados regulatórios.', expression: 'confident' },
        ],
        dailyEvents: {
          1: [
            { speaker: 'Marcos', text: 'Uma divergência de 2 centavos por kWh em um cliente gerou dúvida se a fórmula de cálculo está correta.', expression: 'worried' },
            {
              speaker: 'Scrum Master',
              text: 'Discrepância centesimal em cálculo financeiro de energia. Como agir?',
              choices: [
                {
                  text: 'Ajustar a precisão para 6 casas decimais e validar contra a planilha oficial da distribuidora elétrica.',
                  effects: { stats: { qualidade: 10, confianca: 8, risco: -6 }, xp: 35 },
                },
                {
                  text: 'Arredondar para cima e ficar com a sobra de centavos para a empresa.',
                  effects: { stats: { risco: 20, confianca: -15 }, xp: 0 },
                },
              ],
            },
          ],
          2: [
            { speaker: 'Júlia', text: 'Os clientes residenciais disseram que não entendem termos como "quilowatt-hora" e querem ver a economia em reais.', expression: 'surprised' },
            {
              speaker: 'Scrum Master',
              text: 'Feedback de linguagem de produto. Qual a melhor decisão?',
              choices: [
                {
                  text: 'Exibir a economia de forma clara: "Você economizou R$ 84,00 e 12 árvores este mês".',
                  effects: { stats: { valor: 8, confianca: 6, moral: 6 }, xp: 35 },
                },
                {
                  text: 'Manter jargões técnicos complexos para parecer mais inteligente.',
                  effects: { stats: { valor: -6, confianca: -4 }, xp: 5 },
                },
              ],
            },
          ],
          3: [
            { speaker: 'Rafael', text: 'As fazendas solares sincronizaram 100 mil leituras com zero perdas via MQTT e a compensação rodou com perfeição!', expression: 'happy' },
            {
              speaker: 'Scrum Master',
              text: 'Sincronização impecável da rede. Como registrar?',
              choices: [
                {
                  text: 'Apresentar a compensação em tempo real na Review e celebrar o avanço verde da equipe.',
                  effects: { stats: { moral: 10, valor: 10, confianca: 8 }, xp: 40 },
                },
                {
                  text: 'Reclamar que o deploy demorou 1 minuto a mais do que o esperado.',
                  effects: { stats: { moral: -8 }, xp: 5 },
                },
              ],
            },
          ],
        },
        reviewDialogues: [
          { speaker: 'Ana', text: 'Mais de 5 mil famílias economizaram na conta de luz hoje graças ao nosso sistema. Orgulho imenso!', expression: 'happy' },
          { speaker: 'Carlos', text: 'A abordagem de TDD nas regras regulatórias impediu processos fiscais. Trabalho ágil impecável.', expression: 'confident' },
        ],
      },
    ],
  },

  // ── 10. CLOUDCORE (DevOps & Plataforma Cloud) ───────────────────────────────
  cloudcore: {
    companyId: 'cloudcore',
    companyName: 'CloudCore Infrastructure',
    productName: 'KubeMaster (Orquestração Multicloud Automatizada)',
    backgroundDefault: 'cloudcore',
    sprints: [
      {
        sprint: 1,
        goal: 'Automatizar o provisionamento de clusters Kubernetes em AWS, GCP e Azure com failover transparente',
        background: 'cloudcore',
        stories: [
          { id: 'CC-01', title: 'Módulos Terraform declarativos para criação de clusters EKS/GKE com zero downtime', value: 10, complexity: 8, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'CC-02', title: 'Controlador de failover que migra pods para outra nuvem se uma região cair', value: 10, complexity: 8, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'CC-03', title: 'Dashboard unificado de métricas de CPU, memória e custos financeiros de nuvem', value: 8, complexity: 5, status: 'todo', assignedTo: null, progress: 0 },
          { id: 'CC-04', title: 'Automação de backup diário de volumes persistentes com criptografia KMS', value: 7, complexity: 3, status: 'todo', assignedTo: null, progress: 0 },
        ],
        planningDialogues: [
          { speaker: 'Ana', text: 'Nossos clientes de tecnologia não aceitam nem 30 segundos de downtime. Se a AWS cair em Virgínia, temos que migrar para a Europa no mesmo instante!', expression: 'worried' },
          { speaker: 'Rafael', text: 'Orquestração multicloud é o ápice da engenharia DevOps. O risco de split-brain de dados precisa ser tratado com algoritmo de consenso Raft.', expression: 'confident' },
          { speaker: 'Scrum Master', text: 'Vamos conduzir testes de Chaos Engineering na Sprint para provar que a infraestrutura se auto-regenera.', expression: 'confident' },
        ],
        dailyEvents: {
          1: [
            { speaker: 'Rafael', text: 'Um script de automação aplicou um comando incorreto em ambiente de homologação e destruiu a rede virtual inteira.', expression: 'worried' },
            {
              speaker: 'Scrum Master',
              text: 'Desastre na infraestrutura de testes! Como agir como Scrum Master líder servidor?',
              choices: [
                {
                  text: 'Manter a calma, conduzir restauração pelo repositório GitOps e criar travas de segurança contra comandos destrutivos.',
                  effects: { stats: { qualidade: 10, confianca: 8, moral: 6, risco: -8 }, xp: 40 },
                },
                {
                  text: 'Exigir a demissão imediata de quem rodou o script e proibir deploys automatizados.',
                  effects: { stats: { moral: -20, confianca: -18, risco: 20 }, xp: 0 },
                },
              ],
            },
          ],
          2: [
            { speaker: 'Carlos', text: 'O time de desenvolvimento e o de operações estão trocando farpas sobre quem é responsável pela lentidão do banco.', expression: 'angry' },
            {
              speaker: 'Scrum Master',
              text: 'Muro entre Dev e Ops gerando atrito cultural. Qual a melhor facilitação ágil?',
              choices: [
                {
                  text: 'Juntar os dois times em uma sala de guerra única com métricas compartilhadas e responsabilidade mútua (DevOps real).',
                  effects: { stats: { moral: 10, velocidade: 8, confianca: 8 }, xp: 40 },
                },
                {
                  text: 'Criar mais formulários burocráticos para os devs abrirem chamado para o Ops.',
                  effects: { stats: { velocidade: -12, moral: -10 }, xp: 0 },
                },
              ],
            },
          ],
          3: [
            { speaker: 'Rafael', text: 'Simulamos a queda intencional da região Leste dos EUA e o KubeMaster migrou 120 serviços em 14 segundos sem derrubar conexões!', expression: 'happy' },
            {
              speaker: 'Scrum Master',
              text: 'Failover multicloud com sucesso total no teste de caos. Como valorizar a equipe?',
              choices: [
                {
                  text: 'Compartilhar o vídeo do teste com todos os stakeholders e parabenizar o time pela resiliência alcançada.',
                  effects: { stats: { valor: 10, confianca: 12, moral: 10 }, xp: 45 },
                },
                {
                  text: 'Dizer que 14 segundos ainda é muito lento e não reconhecer a vitória.',
                  effects: { stats: { moral: -10 }, xp: 5 },
                },
              ],
            },
          ],
        },
        reviewDialogues: [
          { speaker: 'Ana', text: 'Fechamos contrato enterprise com 3 multinacionais após a demonstração de failover ao vivo!', expression: 'happy' },
          { speaker: 'Rafael', text: 'A cultura ágil sem apontamento de culpados foi o que permitiu ao time ousar e criar a melhor plataforma cloud do mercado.', expression: 'confident' },
        ],
      },
    ],
  },
};

/**
 * Retorna as definições de campanha para uma empresa específica ou faz fallback para Novatech
 */
export function getCompanyCampaign(companyId: string): CompanyCampaign | undefined {
  return COMPANY_CAMPAIGNS[companyId];
}
