import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, UserStory, MemberStats, getRequiredXPForLevel } from './GameState';
import { SaveSystem } from './SaveSystem';
import { SPRINTS_DATA, DialogueChoice, DialogueLine } from '../data/sprints';
import { CHARACTERS_DATA } from '../data/characters';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import { SoundManager } from '../components/ui/SoundManager';

interface GameContextType {
  state: GameState;
  activeTab: 'game' | 'team' | 'board';
  setActiveTab: (tab: 'game' | 'team' | 'board') => void;
  muted: boolean;
  toggleMute: () => void;
  startNewGame: (playerName?: string) => void;
  loadSavedGame: () => boolean;
  advanceDialogueLine: () => void;
  selectDialogueChoice: (choice: DialogueChoice) => void;
  assignDeveloperToStory: (storyId: string, memberId: string | null) => void;
  simulateActiveDayProgress: () => void;
  finishSprintReview: () => void;
  selectRetrospectiveImprovement: (improvementId: string, name: string) => void;
  unlockPlayerSkill: (skillId: string, cost: number) => boolean;
  talkToTeamMember: (memberId: string) => void; // Unlocked by coaching skill
  hasSaveGame: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(SaveSystem.createInitialState());
  const [activeTab, setActiveTab] = useState<'game' | 'team' | 'board'>('game');
  const [muted, setMuted] = useState(false);
  const [hasSaveGame, setHasSaveGame] = useState(false);

  // Synchronize mute settings
  useEffect(() => {
    setMuted(SoundManager.isMuted());
    setHasSaveGame(SaveSystem.hasSave());
  }, []);

  const toggleMute = () => {
    const newVal = !muted;
    SoundManager.setMuted(newVal);
    setMuted(newVal);
  };

  const saveState = (newState: GameState) => {
    setState(newState);
    SaveSystem.save(newState);
    setHasSaveGame(true);
  };

  const startNewGame = (playerName?: string) => {
    const freshState = SaveSystem.createInitialState();
    if (playerName) {
      freshState.playerName = playerName;
    }
    
    // Load Sprint 1 stories and planning dialogs
    const firstSprint = SPRINTS_DATA[0];
    freshState.backlog = JSON.parse(JSON.stringify(firstSprint.stories));
    freshState.currentSprintGoal = firstSprint.goal;
    freshState.phase = 'INTRO';
    freshState.dialogueIndex = 0;
    
    setState(freshState);
    SaveSystem.save(freshState);
    setHasSaveGame(true);
    setActiveTab('game');
    SoundManager.playSuccess();
  };

  const loadSavedGame = (): boolean => {
    const saved = SaveSystem.load();
    if (saved) {
      setState(saved);
      setActiveTab('game');
      SoundManager.playSuccess();
      return true;
    }
    return false;
  };

  const triggerAchievement = (id: string, currentState: GameState) => {
    if (currentState.unlockedAchievements.includes(id)) return;
    
    const achievement = ACHIEVEMENTS_DATA.find(a => a.id === id);
    if (!achievement) return;

    const newAchievements = [...currentState.unlockedAchievements, id];
    const updated = {
      ...currentState,
      unlockedAchievements: newAchievements,
      xp: currentState.xp + 50 // Unlocking gives flat 50 XP
    };
    
    // Check if level up occurred
    const levelUpUpdated = checkLevelUp(updated);
    
    saveState(levelUpUpdated);
    
    // Visual / sound effect
    SoundManager.playLevelUp();
    
    // Custom alert injection on screen via temporary text overlay or log
    setTimeout(() => {
      alert(`🏆 CONQUISTA DESBLOQUEADA!\n\n${achievement.title}\n${achievement.description}`);
    }, 100);
  };

  const checkLevelUp = (currentState: GameState): GameState => {
    let { level, xp, skillPoints } = currentState;
    let required = getRequiredXPForLevel(level);
    let leveledUp = false;

    while (xp >= required && level < 5) {
      xp -= required;
      level += 1;
      skillPoints += 1;
      required = getRequiredXPForLevel(level);
      leveledUp = true;
    }

    if (leveledUp) {
      // Trigger level-up sound
      setTimeout(() => {
        SoundManager.playLevelUp();
        alert(`🎉 SUBIU DE NÍVEL!\n\nVocê agora é: ${level === 2 ? 'Facilitador' : level === 3 ? 'Scrum Master' : level === 4 ? 'Scrum Master Experiente' : 'Agile Coach'}\nGanhou +1 Ponto de Habilidade!`);
      }, 300);
      
      // Check agile coach achievement
      let tempState = { ...currentState, level, xp, skillPoints };
      if (level === 5) {
        // We will trigger agile coach achievement
        setTimeout(() => triggerAchievement('agile_coach', tempState), 500);
      }
      return tempState;
    }

    return { ...currentState, level, xp, skillPoints };
  };

  const getCurrentSprintDef = () => {
    return SPRINTS_DATA[state.sprint - 1] || SPRINTS_DATA[0];
  };

  const advanceDialogueLine = () => {
    const sprintDef = getCurrentSprintDef();
    let currentDialogues: DialogueLine[] = [];

    if (state.phase === 'INTRO') {
      // Intro sequence
      currentDialogues = sprintDef.planningDialogues;
    } else if (state.phase === 'PLANNING') {
      currentDialogues = sprintDef.planningDialogues;
    } else if (state.phase === 'DEVELOPMENT') {
      // Daily dialogue
      const dayDialogues = sprintDef.dailyEvents[state.day];
      if (dayDialogues) {
        currentDialogues = dayDialogues;
      }
    } else if (state.phase === 'REVIEW') {
      currentDialogues = sprintDef.reviewDialogues;
    }

    const nextIndex = state.dialogueIndex + 1;

    if (nextIndex < currentDialogues.length) {
      const nextLine = currentDialogues[nextIndex];
      const newHistory = [...state.dialogueHistory, { speaker: nextLine.speaker, text: nextLine.text }];
      
      saveState({
        ...state,
        dialogueIndex: nextIndex,
        dialogueHistory: newHistory
      });
    } else {
      // End of dialogue block
      if (state.phase === 'INTRO') {
        saveState({
          ...state,
          phase: 'PLANNING',
          dialogueIndex: 0,
          dialogueHistory: [{ 
            speaker: sprintDef.planningDialogues[0].speaker, 
            text: sprintDef.planningDialogues[0].text 
          }]
        });
      } else if (state.phase === 'PLANNING') {
        // Sprints require planning assigning. Switch tab to Kanban board automatically
        saveState({
          ...state,
          dialogueIndex: 0,
          dialogueHistory: []
        });
        setActiveTab('board');
      } else if (state.phase === 'DEVELOPMENT') {
        // Daily dialog ended. Board is now ready for simulation click!
        saveState({
          ...state,
          dialogueIndex: 0,
          dialogueHistory: []
        });
        setActiveTab('board');
      } else if (state.phase === 'REVIEW') {
        // Move to Retrospective page
        saveState({
          ...state,
          phase: 'RETROSPECTIVE',
          dialogueIndex: 0,
          dialogueHistory: []
        });
      }
    }
  };

  const selectDialogueChoice = (choice: DialogueChoice) => {
    // Apply choice effects
    let updatedStats = { ...state.stats };
    let updatedTeam = JSON.parse(JSON.stringify(state.team)) as Record<string, MemberStats>;
    let updatedFlags = { ...state.flags };
    let updatedXP = state.xp;

    if (choice.effects) {
      const { stats, team, xp, flags } = choice.effects;
      
      // Apply global stats modification (capped 0-100)
      if (stats) {
        Object.keys(stats).forEach((k) => {
          const key = k as keyof typeof updatedStats;
          const delta = stats[key] || 0;
          updatedStats[key] = Math.max(0, Math.min(100, updatedStats[key] + delta));
        });
      }

      // Apply individual team stats modification (motivation, stress, relationship, confidence)
      if (team) {
        Object.keys(team).forEach((memberId) => {
          if (updatedTeam[memberId]) {
            const mData = team[memberId];
            Object.keys(mData).forEach((statKey) => {
              const key = statKey as keyof MemberStats;
              const delta = mData[key] || 0;
              
              // If we increase motivation, check if player has autonomy skill (+15% gain boost)
              let finalDelta = delta;
              if (key === 'motivation' && delta > 0 && state.unlockedSkills.includes('coa_autonomy')) {
                finalDelta = Math.round(delta * 1.15);
              }

              updatedTeam[memberId][key] = Math.max(0, Math.min(100, updatedTeam[memberId][key] + finalDelta));
            });
          }
        });
      }

      // Apply XP
      if (xp) {
        updatedXP += xp;
      }

      // Apply flags
      if (flags) {
        Object.keys(flags).forEach((fk) => {
          updatedFlags[fk] = flags[fk];
        });
      }
    }

    // Trigger achievement checks on specific flags
    let nextState = {
      ...state,
      stats: updatedStats,
      team: updatedTeam,
      flags: updatedFlags,
      xp: updatedXP,
    };

    // Check level up
    nextState = checkLevelUp(nextState);

    // Specific dialogue choice reactions / custom flags
    if (updatedFlags.deployOnFriday) {
      setTimeout(() => triggerAchievement('friday_deploy', nextState), 400);
    }
    if (updatedFlags.mockedDemo) {
      setTimeout(() => triggerAchievement('demo_bug', nextState), 400);
    }
    if (updatedFlags.shieldedTeam) {
      setTimeout(() => triggerAchievement('goal_guardian', nextState), 400);
    }
    if (choice.text.includes('café') || choice.text.includes('Café')) {
      setTimeout(() => triggerAchievement('coffee', nextState), 400);
    }
    if (choice.text.includes('planilha') || choice.text.includes('relatório')) {
      setTimeout(() => triggerAchievement('spreadsheets', nextState), 400);
    }
    if (updatedFlags.managedMicroManager || choice.text.includes('Facilitar') || choice.text.includes('Reunir')) {
      // check if conflict mediator
      if (choice.text.includes('Ouvir ambos') || choice.text.includes('reunir Júlia')) {
        setTimeout(() => triggerAchievement('mediator', nextState), 400);
      }
    }

    // Check average trust for trust achievement
    const avgTrust = Object.values(updatedTeam).reduce((sum, item) => sum + item.relationship, 0) / 6;
    if (avgTrust >= 80) {
      setTimeout(() => triggerAchievement('team_trust', nextState), 800);
    }

    // Advance dialogues
    const sprintDef = getCurrentSprintDef();
    let currentDialogues: DialogueLine[] = [];

    if (state.phase === 'INTRO' || state.phase === 'PLANNING') {
      currentDialogues = sprintDef.planningDialogues;
    } else if (state.phase === 'DEVELOPMENT') {
      const dayDialogues = sprintDef.dailyEvents[state.day];
      if (dayDialogues) currentDialogues = dayDialogues;
    }

    const nextIndex = choice.nextDialogueIndex !== undefined ? choice.nextDialogueIndex : state.dialogueIndex + 1;

    if (nextIndex < currentDialogues.length) {
      const nextLine = currentDialogues[nextIndex];
      // Inject choice reaction text as narrator if available
      const reactionLine = choice.reactionText 
        ? { speaker: 'SISTEMA', text: choice.reactionText }
        : null;
        
      const nextLinesHistory = reactionLine 
        ? [...state.dialogueHistory, reactionLine, { speaker: nextLine.speaker, text: nextLine.text }]
        : [...state.dialogueHistory, { speaker: nextLine.speaker, text: nextLine.text }];

      saveState({
        ...nextState,
        dialogueIndex: nextIndex,
        dialogueHistory: nextLinesHistory
      });
    } else {
      // Choice was the last step in this dialogue block
      if (state.phase === 'PLANNING') {
        saveState({
          ...nextState,
          dialogueIndex: 0,
          dialogueHistory: []
        });
        setActiveTab('board');
      } else if (state.phase === 'DEVELOPMENT') {
        saveState({
          ...nextState,
          dialogueIndex: 0,
          dialogueHistory: []
        });
        setActiveTab('board');
      } else {
        saveState({
          ...nextState,
          dialogueIndex: 0,
          dialogueHistory: []
        });
      }
    }
  };

  const assignDeveloperToStory = (storyId: string, memberId: string | null) => {
    const updatedBacklog = state.backlog.map((story) => {
      if (story.id === storyId) {
        return { ...story, assignedTo: memberId };
      }
      return story;
    });

    saveState({
      ...state,
      backlog: updatedBacklog,
    });
    SoundManager.playClick();
  };

  // Simulates progress on assigned stories for the current day
  const simulateActiveDayProgress = () => {
    if (state.phase !== 'DEVELOPMENT') return;

    let hasUnassigned = state.backlog.some(s => s.status === 'todo' && !s.assignedTo);
    if (hasUnassigned) {
      alert("⚠️ Você tem tarefas na coluna 'To Do' sem desenvolvedor atribuído. Vá em 'Kanban' e atribua antes de simular o dia!");
      return;
    }

    let updatedBacklog = JSON.parse(JSON.stringify(state.backlog)) as UserStory[];
    let updatedTeam = JSON.parse(JSON.stringify(state.team)) as Record<string, MemberStats>;
    
    // Read speed and general stats
    const { velocidade } = state.stats;

    // Simulate work for each card
    updatedBacklog.forEach((story) => {
      if (story.status === 'done' || story.status === 'backlog') return;
      if (!story.assignedTo) return;

      const devStats = updatedTeam[story.assignedTo];
      if (!devStats) return;

      // Base calculation of daily developer progress
      // base progress ranges around 25-45 points depending on speed & motivation
      const baseWork = 22 + (velocidade / 5) + (devStats.motivation / 6);
      
      // If developer is heavily stressed, apply 30% penalty
      const stressPenalty = devStats.stress > 70 ? 0.7 : 1.0;
      
      // Daily progress points (divided by complexity to simulate larger tasks taking longer)
      const dailyGain = Math.round((baseWork * stressPenalty) / story.complexity);
      
      story.progress = Math.min(100, story.progress + Math.max(10, dailyGain));

      // Columns flow: todo -> progress -> review -> done
      if (story.progress >= 100) {
        story.progress = 0; // Reset progress for next column transition
        
        if (story.status === 'todo') {
          story.status = 'progress';
        } else if (story.status === 'progress') {
          story.status = 'review';
        } else if (story.status === 'review') {
          story.status = 'done';
          SoundManager.playSuccess();
          // Increase motivation of dev who finished card
          devStats.motivation = Math.min(100, devStats.motivation + 5);
        }
      }
    });

    // Generate random developer stress increase (1-5 points per day)
    Object.keys(updatedTeam).forEach((k) => {
      const dev = updatedTeam[k];
      dev.stress = Math.min(100, dev.stress + Math.round(Math.random() * 4 + 1));
    });

    // Advance day
    const nextDay = state.day + 1;
    let nextPhase: GameState['phase'] = state.phase;
    let nextDialogueHistory: Array<{ speaker: string; text: string }> = [];
    let nextDialogueIndex = 0;

    const sprintDef = getCurrentSprintDef();

    if (nextDay > 3) {
      // 3 days of development are completed. Move to Sprint Review!
      nextPhase = 'REVIEW';
      const firstReviewLine = sprintDef.reviewDialogues[0];
      nextDialogueHistory = [{ speaker: firstReviewLine.speaker, text: firstReviewLine.text }];
      setActiveTab('game');
    } else {
      // Next day starts: trigger morning daily scrum event dialogue
      const morningDialogues = sprintDef.dailyEvents[nextDay];
      if (morningDialogues && morningDialogues.length > 0) {
        nextDialogueHistory = [{ speaker: morningDialogues[0].speaker, text: morningDialogues[0].text }];
      }
      setActiveTab('game');
    }

    saveState({
      ...state,
      backlog: updatedBacklog,
      team: updatedTeam,
      day: nextDay > 3 ? 3 : nextDay, // cap day at 3, transition handled by phase
      phase: nextPhase,
      dialogueIndex: nextDialogueIndex,
      dialogueHistory: nextDialogueHistory,
    });

    SoundManager.playClick();
  };

  const finishSprintReview = () => {
    // Review ended. Retrospective is automatically active
    saveState({
      ...state,
      phase: 'RETROSPECTIVE',
      dialogueIndex: 0,
      dialogueHistory: []
    });
  };

  const selectRetrospectiveImprovement = (improvementId: string, name: string) => {
    let updatedStats = { ...state.stats };
    let updatedTeam = JSON.parse(JSON.stringify(state.team)) as Record<string, MemberStats>;
    
    // Check if player has agi_cont_improvement skill (doubles buffs)
    const doubleBuff = state.unlockedSkills.includes('agi_cont_improvement');
    const factor = doubleBuff ? 2 : 1;

    // Apply Retro Buffs to stats
    if (improvementId === 'improve_daily') {
      updatedStats.risco = Math.max(0, updatedStats.risco - 5 * factor);
    } else if (improvementId === 'pair_programming') {
      updatedStats.velocidade = Math.min(100, updatedStats.velocidade + 8 * factor);
    } else if (improvementId === 'engineering_workshop') {
      updatedStats.qualidade = Math.min(100, updatedStats.qualidade + 8 * factor);
      Object.keys(updatedTeam).forEach((k) => {
        updatedTeam[k].motivation = Math.min(100, updatedTeam[k].motivation + 5 * factor);
      });
    } else if (improvementId === 'one_on_ones') {
      Object.keys(updatedTeam).forEach((k) => {
        updatedTeam[k].stress = Math.max(0, updatedTeam[k].stress - 15 * factor);
      });
    } else if (improvementId === 'refine_dod') {
      updatedStats.valor = Math.min(100, updatedStats.valor + 6 * factor);
    }

    // Award flat XP for completing the Sprint
    let updatedXP = state.xp + 100;
    
    // Check if perfect sprint (all stories in done)
    const allDone = state.backlog.every((s) => s.status === 'done');
    let nextState = { ...state };
    
    if (allDone) {
      updatedXP += 50;
      setTimeout(() => triggerAchievement('perfect_sprint', nextState), 800);
    }

    // Check first sprint achievement
    if (state.sprint === 1) {
      setTimeout(() => triggerAchievement('first_sprint', nextState), 400);
    }

    // Retrospective gold achievement
    setTimeout(() => triggerAchievement('golden_retro', nextState), 600);

    const nextSprint = state.sprint + 1;
    let nextPhase: GameState['phase'] = 'PLANNING';
    let nextStories: UserStory[] = [];
    let nextGoal = '';
    let nextDialogs: DialogueLine[] = [];

    if (nextSprint > 8) {
      // Game over! Move to Results
      nextPhase = 'RESULTS';
    } else {
      // Set up next sprint
      const nextSprintDef = SPRINTS_DATA[nextSprint - 1];
      nextStories = JSON.parse(JSON.stringify(nextSprintDef.stories));
      nextGoal = nextSprintDef.goal;
      nextDialogs = [{ speaker: nextSprintDef.planningDialogues[0].speaker, text: nextSprintDef.planningDialogues[0].text }];
    }

    nextState = {
      ...state,
      sprint: nextSprint > 8 ? 8 : nextSprint,
      day: 1,
      phase: nextPhase,
      backlog: nextStories,
      currentSprintGoal: nextGoal,
      stats: updatedStats,
      team: updatedTeam,
      xp: updatedXP,
      retroImprovement: name,
      dialogueIndex: 0,
      dialogueHistory: nextDialogs,
    };

    nextState = checkLevelUp(nextState);
    saveState(nextState);
    setActiveTab('game');
  };

  const unlockPlayerSkill = (skillId: string, cost: number): boolean => {
    if (state.skillPoints < cost) {
      alert("❌ Pontos de habilidade insuficientes!");
      return false;
    }

    const updatedSkills = [...state.unlockedSkills, skillId];
    
    // Apply immediate skill passive buffs if applicable
    let updatedStats = { ...state.stats };
    if (skillId === 'fac_planning') {
      updatedStats.velocidade = Math.min(100, updatedStats.velocidade + 5);
    }
    if (skillId === 'agi_product') {
      updatedStats.valor = Math.min(100, updatedStats.valor + 8);
    }

    const nextState = {
      ...state,
      skillPoints: state.skillPoints - cost,
      unlockedSkills: updatedSkills,
      stats: updatedStats
    };

    saveState(nextState);
    SoundManager.playSuccess();
    return true;
  };

  // Coaching action: Talk to individual to calm them down (unlocked by coa_feedback)
  const talkToTeamMember = (memberId: string) => {
    if (!state.unlockedSkills.includes('coa_feedback')) {
      alert("🔒 Requer habilidade: 'Feedback Empático' para conversar individualmente com o time.");
      return;
    }

    const member = state.team[memberId];
    if (!member) return;

    if (member.stress === 0) {
      alert(`😊 ${CHARACTERS_DATA[memberId].name} está completamente calmo(a) e motivado(a). Não precisa de mentoria no momento!`);
      return;
    }

    let updatedTeam = JSON.parse(JSON.stringify(state.team)) as Record<string, MemberStats>;
    
    // Reduce stress by 20, increase motivation by 10, relationship by 8
    updatedTeam[memberId].stress = Math.max(0, updatedTeam[memberId].stress - 20);
    updatedTeam[memberId].motivation = Math.min(100, updatedTeam[memberId].motivation + 10);
    updatedTeam[memberId].relationship = Math.min(100, updatedTeam[memberId].relationship + 8);

    saveState({
      ...state,
      team: updatedTeam
    });

    SoundManager.playSuccess();
    alert(`🗣️ Você teve uma conversa de mentoria individual com ${CHARACTERS_DATA[memberId].name}.\n\n- Estresse: -20\n- Motivação: +10\n- Relacionamento com você: +8`);
  };

  return (
    <GameContext.Provider
      value={{
        state,
        activeTab,
        setActiveTab,
        muted,
        toggleMute,
        startNewGame,
        loadSavedGame,
        advanceDialogueLine,
        selectDialogueChoice,
        assignDeveloperToStory,
        simulateActiveDayProgress,
        finishSprintReview,
        selectRetrospectiveImprovement,
        unlockPlayerSkill,
        talkToTeamMember,
        hasSaveGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
