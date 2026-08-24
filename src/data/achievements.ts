export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isFunny: boolean;
}

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'first_sprint',
    title: '🏆 Primeiro Sprint',
    description: 'Completou a primeira Sprint na Nova Tech com sucesso!',
    icon: '🚀',
    isFunny: false
  },
  {
    id: 'golden_retro',
    title: '🏆 Retrospectiva de Ouro',
    description: 'Escolheu uma melhoria na Retrospectiva que resolveu um grande gargalo.',
    icon: '🪙',
    isFunny: false
  },
  {
    id: 'mediator',
    title: '🏆 Mediador',
    description: 'Acalmou os ânimos de dois membros em conflito sem causar ressentimento.',
    icon: '🤝',
    isFunny: false
  },
  {
    id: 'master_fac',
    title: '🏆 Mestre da Facilitação',
    description: 'Completou todas as reuniões de uma Sprint com aprovação total da equipe.',
    icon: '🎤',
    isFunny: false
  },
  {
    id: 'zero_burnout',
    title: '🏆 Zero Burnout',
    description: 'Chegou à Sprint 8 sem deixar nenhum membro da equipe atingir 90% de estresse.',
    icon: '❤️',
    isFunny: false
  },
  {
    id: 'perfect_sprint',
    title: '🏆 Sprint Perfeita',
    description: 'Entregou todas as histórias planejadas no Sprint Board sem gerar nenhum risco de bugs.',
    icon: '✨',
    isFunny: false
  },
  {
    id: 'goal_guardian',
    title: '🏆 Guardião do Sprint Goal',
    description: 'Defendeu o time de uma interferência externa que mudaria o objetivo da Sprint.',
    icon: '🛡️',
    isFunny: false
  },
  {
    id: 'team_trust',
    title: '🏆 O Time Confia em Você',
    description: 'Atingiu mais de 80 de Confiança média na equipe.',
    icon: '🙌',
    isFunny: false
  },
  {
    id: 'agile_coach',
    title: '🏆 Agile Coach',
    description: 'Atingiu o nível 5 de experiência como Scrum Master.',
    icon: '🎓',
    isFunny: false
  },
  // FUNNY ACHIEVEMENTS
  {
    id: 'coffee',
    title: '☕ Café Resolve Tudo',
    description: 'Conversou com Carlos ou Marcos oferecendo café para resolver um problema.',
    icon: '☕',
    isFunny: true
  },
  {
    id: 'friday_deploy',
    title: '🔥 Sexta-feira em Produção',
    description: 'Decidiu fazer deploy de uma funcionalidade crítica na sexta-feira de tarde.',
    icon: '🔥',
    isFunny: true
  },
  {
    id: 'demo_bug',
    title: '🐛 Bugou na Demo',
    description: 'Um bug crítico estourou bem no meio da Sprint Review na frente da PO.',
    icon: '🐛',
    isFunny: true
  },
  {
    id: 'spreadsheets',
    title: '📊 Mais uma Planilha',
    description: 'Tentou resolver um problema de comunicação do time criando uma planilha de controle diário.',
    icon: '📊',
    isFunny: true
  }
];
