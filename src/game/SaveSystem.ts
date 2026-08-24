import { GameState, INITIAL_STATS, INITIAL_TEAM } from './GameState';

const SAVE_KEY = 'scrum_brasil_save_v1';

export const SaveSystem = {
  save(state: GameState): void {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save game state:', e);
    }
  },

  load(): GameState | null {
    try {
      const data = localStorage.getItem(SAVE_KEY);
      if (!data) return null;
      
      const parsed = JSON.parse(data) as GameState;
      // Basic structure validation
      if (typeof parsed.sprint !== 'number' || !parsed.stats || !parsed.team) {
        return null;
      }
      return parsed;
    } catch (e) {
      console.error('Failed to load game state:', e);
      return null;
    }
  },

  clear(): void {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (e) {
      console.error('Failed to clear save state:', e);
    }
  },

  hasSave(): boolean {
    return localStorage.getItem(SAVE_KEY) !== null;
  },

  createInitialState(): GameState {
    return {
      sprint: 1,
      day: 1,
      phase: 'INTRO',
      xp: 0,
      level: 1,
      skillPoints: 0,
      unlockedSkills: [],
      unlockedAchievements: [],
      flags: {},
      stats: { ...INITIAL_STATS },
      team: JSON.parse(JSON.stringify(INITIAL_TEAM)), // Deep copy
      backlog: [],
      currentSprintGoal: '',
      dialogueHistory: [],
      dialogueIndex: 0,
      currentEventId: null,
      retroImprovement: null,
      playerName: 'Roberto',
      gameMode: 'campaign',
      sandboxDialogues: [],
    };
  }
};
