import { Character } from '../game/GameState';

export const CHARACTERS_DATA: Record<string, Omit<Character, 'stats'>> = {
  ana: {
    id: 'ana',
    name: 'Ana',
    role: 'Product Owner',
    age: 32,
    personality: 'Comunicativa, inteligente, objetiva, orientada a negócio, às vezes impaciente. Foco em escopo, prazo e entrega de valor.',
    phrase: 'Precisamos lembrar por que estamos construindo isso.',
    avatarColor: '#ea580c' // Orange
  },
  carlos: {
    id: 'carlos',
    name: 'Carlos',
    role: 'Developer (Backend)',
    age: 29,
    personality: 'Técnico, reservado, excelente programador, pouco comunicativo. Preza por código limpo, arquitetura e testes.',
    phrase: 'Se a gente fizer direito agora, não vai precisar corrigir depois.',
    avatarColor: '#16a34a' // Green
  },
  julia: {
    id: 'julia',
    name: 'Júlia',
    role: 'Developer (Frontend)',
    age: 26,
    personality: 'Criativa, curiosa, comunicativa, gosta de experimentar novas tecnologias. Às vezes se empolga demais com novidades.',
    phrase: 'E se a gente tentasse de outro jeito?',
    avatarColor: '#9333ea' // Purple
  },
  marcos: {
    id: 'marcos',
    name: 'Marcos',
    role: 'QA (Tester)',
    age: 34,
    personality: 'Detalhista, crítico, responsável, extremamente preocupado com qualidade. Inimigo número um de deploys apressados.',
    phrase: 'Funciona no seu computador. Mas funciona em produção?',
    avatarColor: '#dc2626' // Red
  },
  beatriz: {
    id: 'beatriz',
    name: 'Beatriz',
    role: 'UX/UI Designer',
    age: 28,
    personality: 'Empática, criativa, observadora. Defende a experiência do usuário com unhas e dentes contra as pressões de tempo.',
    phrase: 'Estamos pensando no usuário ou apenas na funcionalidade?',
    avatarColor: '#eab308' // Yellow
  },
  rafael: {
    id: 'rafael',
    name: 'Rafael',
    role: 'DevOps Engineer',
    age: 36,
    personality: 'Calmo, pragmático, experiente, pouco tolerante a improvisação. Fã de automação, CI/CD e estabilidade do servidor.',
    phrase: 'Produção não é ambiente de testes.',
    avatarColor: '#2563eb' // Blue
  }
};
