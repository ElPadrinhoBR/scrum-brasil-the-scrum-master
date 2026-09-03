export interface GameStats {
  valor: number;       // 0-100
  moral: number;       // 0-100
  qualidade: number;   // 0-100
  velocidade: number;  // 0-100
  confianca: number;   // 0-100
  risco: number;       // 0-100
}

export interface MemberStats {
  motivation: number;  // 0-100
  stress: number;      // 0-100
  confidence: number;  // 0-100 (individual confidence in the project/team)
  relationship: number; // 0-100 (with the Scrum Master)
}

export interface Character {
  id: string;
  name: string;
  role: string;
  age: number;
  personality: string;
  stats: MemberStats;
  phrase: string;
  avatarColor: string;
}

export interface UserStory {
  id: string;
  title: string;
  value: number;       // 1-10
  complexity: number;  // 1, 2, 3, 5, 8
  status: 'backlog' | 'todo' | 'progress' | 'review' | 'done';
  assignedTo: string | null;
  progress: number;    // 0-100
}

export interface GameState {
  sprint: number;       // 1-8
  day: number;          // 1-3 (days of development inside a Sprint)
  phase: 'INTRO' | 'PLANNING' | 'DEVELOPMENT' | 'REVIEW' | 'RETROSPECTIVE' | 'RESULTS';
  xp: number;
  level: number;        // 1-5
  skillPoints: number;
  unlockedSkills: string[];
  unlockedAchievements: string[];
  flags: Record<string, boolean>;
  stats: GameStats;
  team: Record<string, MemberStats>;
  backlog: UserStory[];
  currentSprintGoal: string;
  dialogueHistory: Array<{ speaker: string; text: string }>;
  dialogueIndex: number;
  currentEventId: string | null;
  retroImprovement: string | null; // Selected action in Retro
  playerName: string;
  playerGender: 'male' | 'female';
  playerAvatar: 'roberto' | 'mariana';
  selectedCompanyId: string;
  recentMetricDeltas?: Partial<Record<keyof GameStats, number>>;
  gameMode: 'campaign' | 'sandbox';
  sandboxDialogues: Array<{ 
    speaker: string; 
    text: string; 
    expression?: 'neutral' | 'happy' | 'worried' | 'angry' | 'sad' | 'surprised' | 'confident';
    background?: 'escritorio' | 'reuniao' | 'desenvolvimento' | 'cafeteria' | 'servidores' | 'diretoria' | 'war_room' | 'home_office' | 'treinamento' | 'lab_inovacao';
    choices?: any[];
  }>;
}

export const INITIAL_STATS: GameStats = {
  valor: 40,
  moral: 50,
  qualidade: 55,
  velocidade: 45,
  confianca: 50,
  risco: 25,
};

export const INITIAL_TEAM: Record<string, MemberStats> = {
  ana: { motivation: 80, stress: 30, confidence: 75, relationship: 50 },
  carlos: { motivation: 60, stress: 25, confidence: 65, relationship: 50 },
  julia: { motivation: 85, stress: 20, confidence: 70, relationship: 55 },
  marcos: { motivation: 70, stress: 35, confidence: 60, relationship: 50 },
  beatriz: { motivation: 75, stress: 20, confidence: 70, relationship: 60 },
  rafael: { motivation: 65, stress: 15, confidence: 80, relationship: 50 },
};

export function getLevelName(level: number): string {
  switch (level) {
    case 1: return 'Scrum Master Iniciante';
    case 2: return 'Facilitador';
    case 3: return 'Scrum Master';
    case 4: return 'Scrum Master Experiente';
    case 5: return 'Agile Coach';
    default: return 'Agile Coach Lendário';
  }
}

export function getRequiredXPForLevel(level: number): number {
  // Leveling up threshold
  return level * 150;
}
