export interface Skill {
  id: string;
  name: string;
  category: 'FACILITACAO' | 'COACHING' | 'CONFLITOS' | 'AGILIDADE';
  description: string;
  cost: number;
  unlockedBy: string | null;
}

export const SKILLS_DATA: Skill[] = [
  // FACILITACAO
  {
    id: 'fac_daily',
    name: 'Daily Eficiente',
    category: 'FACILITACAO',
    description: 'Melhora a condução das reuniões diárias. Desbloqueia opções que reduzem o risco diário e aumentam a visibilidade do time.',
    cost: 1,
    unlockedBy: null
  },
  {
    id: 'fac_planning',
    name: 'Planning Colaborativa',
    category: 'FACILITACAO',
    description: 'Facilita a definição de metas e escopo. Garante +5 de velocidade no início de cada Sprint.',
    cost: 2,
    unlockedBy: 'fac_daily'
  },
  // COACHING
  {
    id: 'coa_feedback',
    name: 'Feedback Empático',
    category: 'COACHING',
    description: 'Desbloqueia a ação de conversar com membros estressados na tela da Equipe, reduzindo o estresse deles em 20 pontos.',
    cost: 1,
    unlockedBy: null
  },
  {
    id: 'coa_autonomy',
    name: 'Cultivar Autonomia',
    category: 'COACHING',
    description: 'Promove a auto-organização. Membros do time ganham +15% de motivação em ações positivas.',
    cost: 2,
    unlockedBy: 'coa_feedback'
  },
  // CONFLITOS
  {
    id: 'con_negotiation',
    name: 'Negociação Ativa',
    category: 'CONFLITOS',
    description: 'Desbloqueia diálogos alternativos durante conflitos na equipe, mitigando perdas de moral.',
    cost: 1,
    unlockedBy: null
  },
  {
    id: 'con_mediation',
    name: 'Mediação Avançada',
    category: 'CONFLITOS',
    description: 'Capacidade de aproximar membros em conflito. Aumenta a relação entre os personagens envolvidos.',
    cost: 2,
    unlockedBy: 'con_negotiation'
  },
  // AGILIDADE
  {
    id: 'agi_product',
    name: 'Foco em Valor',
    category: 'AGILIDADE',
    description: 'Permite renegociar histórias com a PO Ana. Aumenta os ganhos de Valor em 10%.',
    cost: 1,
    unlockedBy: null
  },
  {
    id: 'agi_cont_improvement',
    name: 'Melhoria Contínua',
    category: 'AGILIDADE',
    description: 'Potencializa as ações da Retrospectiva. Ações selecionadas geram o dobro de bônus na Sprint seguinte.',
    cost: 2,
    unlockedBy: 'agi_product'
  }
];
