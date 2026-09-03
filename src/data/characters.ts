import { Character } from '../game/GameState';

export const CHARACTERS_DATA: Record<string, Omit<Character, 'stats'>> = {
  ana: {
    id: 'ana',
    name: 'Ana',
    role: 'Product Owner',
    age: 32,
    personality: 'Comunicativa, inteligente, objetiva, orientada a negócio, às vezes impaciente. Foco em escopo, prazo e entrega de valor.',
    phrase: 'Precisamos lembrar por que estamos construindo isso.',
    avatarColor: '#ea580c', // Orange
  },
  carlos: {
    id: 'carlos',
    name: 'Carlos',
    role: 'Developer (Backend)',
    age: 29,
    personality: 'Técnico, reservado, excelente programador, pouco comunicativo. Preza por código limpo, arquitetura e testes.',
    phrase: 'Se a gente fizer direito agora, não vai precisar corrigir depois.',
    avatarColor: '#16a34a', // Green
  },
  julia: {
    id: 'julia',
    name: 'Júlia',
    role: 'Developer (Frontend)',
    age: 26,
    personality: 'Criativa, curiosa, comunicativa, gosta de experimentar novas tecnologias. Às vezes se empolga demais com novidades.',
    phrase: 'E se a gente tentasse de outro jeito?',
    avatarColor: '#9333ea', // Purple
  },
  marcos: {
    id: 'marcos',
    name: 'Marcos',
    role: 'QA Engineer',
    age: 34,
    personality: 'Detalhista, crítico, responsável, extremamente preocupado com qualidade. Inimigo número um de deploys apressados.',
    phrase: 'Funciona no seu computador. Mas funciona em produção?',
    avatarColor: '#dc2626', // Red
  },
  dandara: {
    id: 'dandara',
    name: 'Dandara',
    role: 'QA & Automação',
    age: 28,
    personality: 'Mulher negra brilhante e assertiva. Mestra em testes automatizados de regressão, segurança da informação e acessibilidade.',
    phrase: 'Qualidade não é checada no fim, é construída a cada linha.',
    avatarColor: '#0d9488', // Teal
  },
  taina: {
    id: 'taina',
    name: 'Tainá',
    role: 'QA & Testes de Carga',
    age: 30,
    personality: 'Mulher indígena com visão sistêmica e calma sob pressão. Especialista em resiliência, estresse de servidores e tolerância a falhas.',
    phrase: 'Se o sistema resiste à tempestade, ele aguenta qualquer Black Friday.',
    avatarColor: '#059669', // Emerald
  },
  kofi: {
    id: 'kofi',
    name: 'Kofi',
    role: 'Developer (Arquitetura)',
    age: 33,
    personality: 'Homem negro calmo, focado e pragmático. Especialista em bancos de dados distribuídos, concorrência e algoritmos escaláveis.',
    phrase: 'A melhor arquitetura é aquela que resolve o problema sem mágica.',
    avatarColor: '#d97706', // Amber
  },
  kenji: {
    id: 'kenji',
    name: 'Kenji',
    role: 'Developer (Mobile & UI)',
    age: 25,
    personality: 'Homem nipo-brasileiro ágil, detalhista com microinterações e apaixonado por performance visual e tempos de resposta rápidos.',
    phrase: 'Cada milissegundo de atraso na tela é um usuário que desiste.',
    avatarColor: '#2563eb', // Blue
  },
  aline: {
    id: 'aline',
    name: 'Aline',
    role: 'DevSecOps & Cloud',
    age: 31,
    personality: 'Mulher parda nordestina, pioneira em segurança defensiva e infraestrutura como código. Conecta desenvolvimento e operações com empatia.',
    phrase: 'Segurança ágil é acelerador de entregas confiáveis, não freio de mão.',
    avatarColor: '#e11d48', // Rose
  },
  beatriz: {
    id: 'beatriz',
    name: 'Beatriz',
    role: 'UX/UI Designer',
    age: 28,
    personality: 'Empática, criativa, observadora. Defende a experiência do usuário com unhas e dentes contra as pressões de tempo.',
    phrase: 'Estamos pensando no usuário ou apenas na funcionalidade?',
    avatarColor: '#eab308', // Yellow
  },
  rafael: {
    id: 'rafael',
    name: 'Rafael',
    role: 'DevOps Engineer',
    age: 36,
    personality: 'Calmo, pragmático, experiente, pouco tolerante a improvisação. Fã de automação, CI/CD e estabilidade do servidor.',
    phrase: 'Produção não é ambiente de testes.',
    avatarColor: '#4f46e5', // Indigo
  },
};

// Verifica se um membro da equipe possui capacidade para a etapa de Review / QA
export function isCharacterQA(characterId: string | null): boolean {
  if (!characterId) return false;
  const char = CHARACTERS_DATA[characterId];
  if (!char) return false;
  const roleUpper = char.role.toUpperCase();
  return (
    roleUpper.includes('QA') ||
    roleUpper.includes('TESTER') ||
    characterId === 'marcos' ||
    characterId === 'dandara' ||
    characterId === 'taina'
  );
}
