// Sistema Modular de Situações e Eventos Ágeis (Extensível para Novas Empresas e Expansões)

import { GameStats, MemberStats } from '../GameState';

export interface MetricImpact {
  stats?: Partial<GameStats>;
  team?: Record<string, Partial<MemberStats>>;
  xp?: number;
}

export interface ModularChoice {
  id: string;
  text: string;
  type: 'BOM' | 'MEDIANO' | 'RUIM';
  explanation: string;
  impact: MetricImpact;
}

export interface ModularSituation {
  id: string;
  companyId?: string; // 'novatech' ou '*' para todas
  sprintMin?: number;
  sprintMax?: number;
  category: 'conflito' | 'qualidade' | 'prazo' | 'burnout' | 'stakeholder' | 'processo';
  title: string;
  speaker: string;
  speakerId: string;
  expression: 'neutral' | 'happy' | 'worried' | 'angry' | 'sad' | 'surprised' | 'confident';
  background: 'escritorio' | 'reuniao' | 'desenvolvimento' | 'cafeteria' | 'servidores' | 'diretoria' | 'war_room' | 'home_office' | 'treinamento' | 'lab_inovacao';
  dialogueText: string;
  choices: ModularChoice[];
}

export class SituationRegistry {
  private static situations: Map<string, ModularSituation> = new Map();

  /**
   * Registra uma nova situação no catálogo modular
   */
  public static register(situation: ModularSituation): void {
    this.situations.set(situation.id, situation);
  }

  /**
   * Registra um lote de situações
   */
  public static registerBatch(list: ModularSituation[]): void {
    list.forEach((s) => this.register(s));
  }

  /**
   * Busca situação por ID
   */
  public static getById(id: string): ModularSituation | undefined {
    return this.situations.get(id);
  }

  /**
   * Retorna situações filtradas por empresa e/ou sprint
   */
  public static query(companyId: string, sprint?: number, category?: string): ModularSituation[] {
    return Array.from(this.situations.values()).filter((sit) => {
      const matchCompany = !sit.companyId || sit.companyId === '*' || sit.companyId === companyId;
      const matchSprint = sprint === undefined || (
        (sit.sprintMin === undefined || sprint >= sit.sprintMin) &&
        (sit.sprintMax === undefined || sprint <= sit.sprintMax)
      );
      const matchCat = !category || sit.category === category;
      return matchCompany && matchSprint && matchCat;
    });
  }

  /**
   * Lista todas as situações registradas
   */
  public static getAll(): ModularSituation[] {
    return Array.from(this.situations.values());
  }
}

// ── Situações Modulares Iniciais do Core Engine ───────────────────────────────
export const CORE_MODULAR_SITUATIONS: ModularSituation[] = [
  {
    id: 'mod_daily_war_room',
    companyId: 'novatech',
    sprintMin: 2,
    category: 'qualidade',
    title: 'Alerta Vermelho na Sala de Guerra',
    speaker: 'Rafael',
    speakerId: 'rafael',
    expression: 'worried',
    background: 'war_room',
    dialogueText: 'A API de liquidação instantânea começou a devolver timeout após a última atualização. O monitor da Sala de Guerra está apitando!',
    choices: [
      {
        id: 'c1',
        text: 'Acionar o plano de rollback imediato e conduzir uma análise de causa raiz com Carlos e Rafael.',
        type: 'BOM',
        explanation: 'Preserva a estabilidade em produção e foca em aprendizado sistemático com a equipe.',
        impact: {
          stats: { qualidade: 8, confianca: 6, risco: -10 },
          team: { rafael: { stress: -10, confidence: 10 } },
          xp: 40,
        },
      },
      {
        id: 'c2',
        text: 'Tentar aplicar um hotfix direto em produção sem passar pelos testes de homologação.',
        type: 'RUIM',
        explanation: 'Fazer deploy emergencial sem testes é um risco gravíssimo que costuma gerar bugs piores.',
        impact: {
          stats: { risco: 15, qualidade: -12, confianca: -8 },
          team: { rafael: { stress: 15, motivation: -5 } },
          xp: 10,
        },
      },
      {
        id: 'c3',
        text: 'Desligar temporariamente as notificações de alerta para não gerar pânico na diretoria.',
        type: 'RUIM',
        explanation: 'Esconder problemas de métricas de telemetria fere o pilar ágil da Transparência.',
        impact: {
          stats: { confianca: -15, moral: -10, risco: 20 },
          xp: 0,
        },
      },
    ],
  },
  {
    id: 'mod_home_office_isolation',
    companyId: 'novatech',
    sprintMin: 1,
    category: 'burnout',
    title: 'Desconexão no Trabalho Remoto',
    speaker: 'Júlia',
    speakerId: 'julia',
    expression: 'sad',
    background: 'home_office',
    dialogueText: 'Trabalhando de casa, sinto que perdi o contato com o resto do time. As conversas viraram só mensagens secas no Slack e estou travada sem saber a quem pedir ajuda.',
    choices: [
      {
        id: 'c1',
        text: 'Instituir sessões voluntárias de Pair Programming e um café virtual de 15 minutos para reencontrar o time.',
        type: 'BOM',
        explanation: 'Estimula a colaboração orgânica e reforça a segurança psicológica no modelo remoto.',
        impact: {
          stats: { moral: 10, confianca: 8, velocidade: 5 },
          team: { julia: { motivation: 15, stress: -15, relationship: 12 } },
          xp: 35,
        },
      },
      {
        id: 'c2',
        text: 'Exigir que Júlia mantenha a câmera ligada o dia todo para comprovar que está trabalhando.',
        type: 'RUIM',
        explanation: 'Microgerenciamento destrói a autonomia e a confiança, aumentando drasticamente o estresse.',
        impact: {
          stats: { moral: -15, confianca: -12 },
          team: { julia: { stress: 25, motivation: -20 } },
          xp: 0,
        },
      },
      {
        id: 'c3',
        text: 'Dizer a Júlia para postar suas dúvidas no canal geral e esperar alguém responder quando tiver tempo.',
        type: 'MEDIANO',
        explanation: 'Mantém a comunicação assíncrona, mas não resolve o sentimento de isolamento e o bloqueio da tarefa.',
        impact: {
          stats: { moral: -2, velocidade: -3 },
          xp: 15,
        },
      },
    ],
  },
  {
    id: 'mod_agile_training_workshop',
    companyId: 'novatech',
    sprintMin: 3,
    category: 'processo',
    title: 'Workshop de Refinamento e DoD',
    speaker: 'Ana',
    speakerId: 'ana',
    expression: 'confident',
    background: 'treinamento',
    dialogueText: 'Aproveitando a sala de treinamento com o quadro repleto de post-its, o time quer alinhar finalmente o que significa uma história estar 100% "Pronta".',
    choices: [
      {
        id: 'c1',
        text: 'Construir colaborativamente com Devs, QA e PO uma Definition of Done objetiva com critérios verificáveis.',
        type: 'BOM',
        explanation: 'A Definition of Done construída em conjunto cria um padrão compartilhado de qualidade transparente.',
        impact: {
          stats: { qualidade: 12, valor: 8, risco: -10, confianca: 10 },
          team: {
            ana: { confidence: 10 },
            marcos: { motivation: 10 },
            carlos: { motivation: 8 },
          },
          xp: 50,
        },
      },
      {
        id: 'c2',
        text: 'O Scrum Master dita uma lista pronta de regras tiradas de um livro e exige que todos assinem.',
        type: 'MEDIANO',
        explanation: 'Embora tenha boas regras teóricas, a falta de co-criação diminui o engajamento e a responsabilidade coletiva.',
        impact: {
          stats: { qualidade: 3, moral: -4 },
          xp: 20,
        },
      },
      {
        id: 'c3',
        text: 'Cancelar a sessão porque documentar Definition of Done toma tempo que deveria ser gasto codando.',
        type: 'RUIM',
        explanation: 'Sem critérios de pronto claros, histórias incompletas chegam à Review causando retrabalho massivo.',
        impact: {
          stats: { qualidade: -10, risco: 15 },
          xp: 5,
        },
      },
    ],
  },
  {
    id: 'mod_innovation_lab_spike',
    companyId: 'novatech',
    sprintMin: 2,
    category: 'conflito',
    title: 'Spike Técnico no Lab de Inovação',
    speaker: 'Carlos',
    speakerId: 'carlos',
    expression: 'surprised',
    background: 'lab_inovacao',
    dialogueText: 'Fizemos um protótipo experimental aqui no Lab usando WebSockets para baratear o custo das notificações Pix em 70%, mas isso vai atrasar a entrega da história atual em 1 dia.',
    choices: [
      {
        id: 'c1',
        text: 'Apresentar a economia e métricas na Daily com a PO Ana para decidirem juntos se criam uma história de Spike.',
        type: 'BOM',
        explanation: 'Envolve a Product Owner na decisão de trade-off de valor financeiro vs prazo da Sprint.',
        impact: {
          stats: { valor: 10, confianca: 8, qualidade: 6 },
          team: { carlos: { motivation: 12 }, ana: { confidence: 8 } },
          xp: 45,
        },
      },
      {
        id: 'c2',
        text: 'Proibir Carlos de fazer qualquer protótipo ou teste inovador fora do que foi rigidamente planejado.',
        type: 'RUIM',
        explanation: 'Matar a proatividade técnica desmotiva os desenvolvedores seniores e impede melhorias de arquitetura.',
        impact: {
          stats: { moral: -12, velocidade: -6 },
          team: { carlos: { motivation: -20, stress: 15 } },
          xp: 5,
        },
      },
      {
        id: 'c3',
        text: 'Deixar Carlos continuar a implementação escondido da PO sem atualizar o quadro Kanban.',
        type: 'RUIM',
        explanation: 'Trabalho invisível distorce a velocidade do time e quebra a confiança do Product Owner.',
        impact: {
          stats: { confianca: -15, risco: 12 },
          xp: 0,
        },
      },
    ],
  },
];

// Auto-registra as situações iniciais
SituationRegistry.registerBatch(CORE_MODULAR_SITUATIONS);
