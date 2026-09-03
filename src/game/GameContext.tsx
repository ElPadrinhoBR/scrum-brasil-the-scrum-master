import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, UserStory, MemberStats, getRequiredXPForLevel } from './GameState';
import { SaveSystem } from './SaveSystem';
import { SPRINTS_DATA, DialogueChoice, DialogueLine } from '../data/sprints';
import { CHARACTERS_DATA, isCharacterQA } from '../data/characters';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import { SoundManager } from '../components/ui/SoundManager';
import { SandboxGenerator } from './SandboxGenerator';
import { COMPANY_CAMPAIGNS } from '../data/companyStories';

interface GameContextType {
  state: GameState;
  activeTab: 'game' | 'team' | 'board';
  setActiveTab: (tab: 'game' | 'team' | 'board') => void;
  muted: boolean;
  toggleMute: () => void;
  startNewGame: (
    playerName?: string,
    gameMode?: 'campaign' | 'sandbox',
    playerGender?: 'male' | 'female',
    playerAvatar?: 'roberto' | 'mariana',
    selectedCompanyId?: string,
  ) => void;
  loadSavedGame: () => boolean;
  advanceDialogueLine: () => void;
  selectDialogueChoice: (choice: DialogueChoice) => void;
  startDevelopmentPhase: () => void;
  assignDeveloperToStory: (storyId: string, memberId: string | null) => void;
  moveStoryStatus: (storyId: string, targetStatus: UserStory['status']) => void;
  addStoryToBacklog: (title: string, value: number, complexity: number) => void;
  simulateActiveDayProgress: () => void;
  finishSprintReview: () => void;
  selectRetrospectiveImprovement: (improvementId: string, name: string) => void;
  unlockPlayerSkill: (skillId: string, cost: number) => boolean;
  talkToTeamMember: (memberId: string) => void; // Unlocked by coaching skill
  hasSaveGame: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCurrentSprintDef: () => any;
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

  const startNewGame = (
    playerName?: string,
    gameMode?: 'campaign' | 'sandbox',
    playerGender?: 'male' | 'female',
    playerAvatar?: 'roberto' | 'mariana',
    selectedCompanyId?: string,
  ) => {
    const freshState = SaveSystem.createInitialState();
    if (playerName) {
      freshState.playerName = playerName;
    }
    freshState.gameMode = gameMode || 'campaign';
    freshState.playerGender = playerGender || (playerAvatar === 'mariana' ? 'female' : 'male');
    freshState.playerAvatar = playerAvatar || 'roberto';
    freshState.selectedCompanyId = selectedCompanyId || 'novatech';
    freshState.recentMetricDeltas = {};

    if (freshState.gameMode === 'sandbox') {
      const initialGoal = "Estruturar o MVP (Sandbox)";
      freshState.backlog = SandboxGenerator.generateStories(1);
      freshState.currentSprintGoal = initialGoal;
      freshState.phase = 'PLANNING';
      freshState.dialogueIndex = 0;
      freshState.sandboxDialogues = SandboxGenerator.generatePlanningDialogue(1, initialGoal);
    } else if (freshState.selectedCompanyId && COMPANY_CAMPAIGNS[freshState.selectedCompanyId]) {
      // Carrega a campanha da empresa selecionada
      const campaign = COMPANY_CAMPAIGNS[freshState.selectedCompanyId];
      const firstSprint = campaign.sprints[0];
      freshState.backlog = JSON.parse(JSON.stringify(firstSprint.stories));
      freshState.currentSprintGoal = firstSprint.goal;
      freshState.phase = 'INTRO';
      freshState.dialogueIndex = 0;
      freshState.sandboxDialogues = [];
    } else {
      // Load Sprint 1 stories and planning dialogs (Novatech padrão)
      const firstSprint = SPRINTS_DATA[0];
      freshState.backlog = JSON.parse(JSON.stringify(firstSprint.stories));
      freshState.currentSprintGoal = firstSprint.goal;
      freshState.phase = 'INTRO';
      freshState.dialogueIndex = 0;
      freshState.sandboxDialogues = [];
    }
    
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
    if (state.selectedCompanyId && COMPANY_CAMPAIGNS[state.selectedCompanyId]) {
      const campaign = COMPANY_CAMPAIGNS[state.selectedCompanyId];
      const sp = campaign.sprints[state.sprint - 1] || campaign.sprints[0];
      if (sp) return sp as unknown as typeof SPRINTS_DATA[0];
    }
    return SPRINTS_DATA[state.sprint - 1] || SPRINTS_DATA[0];
  };

  const advanceDialogueLine = () => {
    const sprintDef = getCurrentSprintDef();
    let currentDialogues: DialogueLine[] = [];

    if (state.gameMode === 'sandbox') {
      currentDialogues = state.sandboxDialogues as DialogueLine[];
    } else {
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
          dialogueHistory: []
        });
        setActiveTab('board');
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
        const completedKey = `daily_event_${state.sprint}_${state.day}_completed`;
        saveState({
          ...state,
          dialogueIndex: 0,
          dialogueHistory: [],
          flags: { ...state.flags, [completedKey]: true }
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

    if (state.gameMode === 'sandbox') {
      currentDialogues = state.sandboxDialogues as DialogueLine[];
    } else {
      if (state.phase === 'INTRO' || state.phase === 'PLANNING') {
        currentDialogues = sprintDef.planningDialogues;
      } else if (state.phase === 'DEVELOPMENT') {
        const dayDialogues = sprintDef.dailyEvents[state.day];
        if (dayDialogues) currentDialogues = dayDialogues;
      }
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
      if (state.phase === 'INTRO' || state.phase === 'PLANNING') {
        saveState({
          ...nextState,
          phase: 'PLANNING',
          dialogueIndex: 0,
          dialogueHistory: []
        });
        setActiveTab('board');
      } else if (state.phase === 'DEVELOPMENT') {
        const completedKey = `daily_event_${state.sprint}_${state.day}_completed`;
        saveState({
          ...nextState,
          dialogueIndex: 0,
          dialogueHistory: [],
          flags: { ...nextState.flags, [completedKey]: true }
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

  const startDevelopmentPhase = () => {
    let morningDialogues: Array<{ speaker: string; text: string }> = [];
    let nextSandboxDialogues = state.sandboxDialogues;

    if (state.gameMode === 'sandbox') {
      const dailyLines = SandboxGenerator.generateDailyEvent(state.sprint, 1);
      nextSandboxDialogues = dailyLines;
      morningDialogues = [{ speaker: dailyLines[0].speaker, text: dailyLines[0].text }];
    } else {
      const sprintDef = getCurrentSprintDef();
      const lines = sprintDef.dailyEvents[1] || [];
      morningDialogues = lines.length > 0
        ? [{ speaker: lines[0].speaker, text: lines[0].text }]
        : [];
    }
    
    saveState({
      ...state,
      phase: 'DEVELOPMENT',
      day: 1,
      dialogueIndex: 0,
      dialogueHistory: morningDialogues,
      sandboxDialogues: nextSandboxDialogues,
      flags: { ...state.flags, sprintPlanningCompleted: true }
    });
    setActiveTab('game');
  };

  const assignDeveloperToStory = (storyId: string, memberId: string | null) => {
    // Validação: somente QAs têm capacidade para os reviews
    const targetStory = state.backlog.find((s) => s.id === storyId);
    if (targetStory && targetStory.status === 'review' && memberId && !isCharacterQA(memberId)) {
      alert("⚠️ Somente profissionais de QA (Marcos, Dandara ou Tainá) têm capacidade para revisar histórias na coluna de Review!");
      return;
    }

    const updatedBacklog = state.backlog.map((story) => {
      if (story.id === storyId) {
        let nextStatus = story.status;

        // "quando seleciono os personagens que vão fazer as tarefas do TO DO automaticamente eles tem que ir pra In Progress"
        if (memberId && story.status === 'todo') {
          nextStatus = 'progress';
        }

        return {
          ...story,
          assignedTo: memberId,
          status: nextStatus,
        };
      }
      return story;
    });

    saveState({
      ...state,
      backlog: updatedBacklog,
    });
    SoundManager.playClick();
  };

  const moveStoryStatus = (storyId: string, targetStatus: UserStory['status']) => {
    let gainedValue = 0;
    const currentStory = state.backlog.find((s) => s.id === storyId);

    // Validação ao mover para review: se o membro não for QA, desatribui para aguardar um QA
    let nextAssigned = currentStory?.assignedTo || null;
    if (targetStatus === 'review' && nextAssigned && !isCharacterQA(nextAssigned)) {
      nextAssigned = null;
    }

    const updatedBacklog = state.backlog.map((story) => {
      if (story.id === storyId) {
        let nextProgress = story.progress;

        if (targetStatus === 'done') {
          nextProgress = 100;
          if (story.status !== 'done') {
            gainedValue = story.value * 3;
          }
        } else if (targetStatus === 'backlog') {
          nextProgress = 0;
          nextAssigned = null;
        } else if (targetStatus === 'todo') {
          nextProgress = 0;
        }

        return {
          ...story,
          status: targetStatus,
          progress: nextProgress,
          assignedTo: nextAssigned,
        };
      }
      return story;
    });

    let updatedStats = { ...state.stats };
    let deltas: Partial<Record<keyof typeof updatedStats, number>> = {};

    if (gainedValue > 0) {
      updatedStats.valor = Math.min(100, updatedStats.valor + gainedValue);
      updatedStats.confianca = Math.min(100, updatedStats.confianca + 2);
      updatedStats.risco = Math.max(0, updatedStats.risco - 2);
      deltas.valor = gainedValue;
      deltas.confianca = 2;
      deltas.risco = -2;
      SoundManager.playSuccess();
    } else {
      SoundManager.playClick();
    }

    saveState({
      ...state,
      backlog: updatedBacklog,
      stats: updatedStats,
      recentMetricDeltas: Object.keys(deltas).length > 0 ? deltas : state.recentMetricDeltas,
    });
  };

  const addStoryToBacklog = (title: string, value: number, complexity: number) => {
    const nextNum = state.backlog.length + 1;
    const newId = `US-${nextNum.toString().padStart(2, '0')}`;
    const newStory: UserStory = {
      id: newId,
      title: title.trim(),
      value: Math.max(1, Math.min(10, value)),
      complexity: complexity || 3,
      status: 'backlog',
      assignedTo: null,
      progress: 0,
    };

    saveState({
      ...state,
      backlog: [...state.backlog, newStory],
    });
    SoundManager.playSuccess();
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
    let updatedStats = { ...state.stats };
    
    // Read speed and general stats
    const { velocidade } = state.stats;
    let completedStoriesCount = 0;
    let reviewStoriesCount = 0;
    let valueDeliveredToday = 0;

    // Simulate work for each card
    updatedBacklog.forEach((story) => {
      if (story.status === 'done' || story.status === 'backlog') return;
      if (!story.assignedTo) return;

      const devStats = updatedTeam[story.assignedTo];
      if (!devStats) return;

      // Base calculation of daily developer progress
      const baseWork = 22 + (velocidade / 5) + (devStats.motivation / 6);
      
      // If developer is heavily stressed, apply 30% penalty
      const stressPenalty = devStats.stress > 70 ? 0.7 : 1.0;
      
      // Daily progress points (divided by complexity to simulate larger tasks taking longer)
      const dailyGain = Math.round((baseWork * stressPenalty) / story.complexity);
      
      story.progress = Math.min(100, story.progress + Math.max(10, dailyGain));

      // Columns flow: todo -> progress -> review -> done
      if (story.progress >= 100) {
        if (story.status === 'todo') {
          story.status = 'progress';
          story.progress = 0;
        } else if (story.status === 'progress') {
          // "se a etapa estiver em review automaticamente vai pra review"
          story.status = 'review';
          story.progress = 0;
          reviewStoriesCount++;
          // "somente os QAs tem capacidade para os review": desatribui se não for QA para aguardar um QA
          if (!isCharacterQA(story.assignedTo)) {
            story.assignedTo = null;
          }
        } else if (story.status === 'review') {
          // "somente os QAs tem capacidade para os review" e "o que for sendo concluido vai ficando persistente no Concluido"
          if (isCharacterQA(story.assignedTo)) {
            story.status = 'done';
            story.progress = 100;
            completedStoriesCount++;
            valueDeliveredToday += story.value * 2;
            SoundManager.playSuccess();
            // QA ganha motivação ao homologar e aprovar entrega de valor
            devStats.motivation = Math.min(100, devStats.motivation + 6);
          } else {
            story.progress = 90; // Permanece em review até um QA homologar
          }
        }
      }
    });

    // Generate random developer stress increase (1-5 points per day)
    let totalStress = 0;
    let totalMotivation = 0;
    const teamKeys = Object.keys(updatedTeam);

    teamKeys.forEach((k) => {
      const dev = updatedTeam[k];
      dev.stress = Math.min(100, dev.stress + Math.round(Math.random() * 4 + 1));
      totalStress += dev.stress;
      totalMotivation += dev.motivation;
    });

    const avgStress = Math.round(totalStress / teamKeys.length);
    const avgMotivation = Math.round(totalMotivation / teamKeys.length);

    // ── Cálculo dinâmico das 6 métricas oscilantes ──
    let deltaValor = valueDeliveredToday;
    let deltaVelocidade = completedStoriesCount > 0 ? (completedStoriesCount * 3) : -1;
    let deltaQualidade = reviewStoriesCount * 2 + (completedStoriesCount * 2);
    let deltaMoral = 0;
    let deltaConfianca = completedStoriesCount > 0 ? (completedStoriesCount * 4) : 0;
    let deltaRisco = 0;

    // Impacto do estresse na Moral e Risco
    if (avgStress > 60) {
      deltaMoral -= Math.round((avgStress - 60) / 4);
      deltaRisco += 4;
      deltaVelocidade -= 2;
    } else if (avgStress < 35) {
      deltaMoral += 3;
      deltaRisco -= 2;
    }

    // Impacto da motivação
    if (avgMotivation > 75) {
      deltaMoral += 2;
      deltaConfianca += 2;
    } else if (avgMotivation < 45) {
      deltaConfianca -= 3;
      deltaRisco += 3;
    }

    // Se tarefas foram entregues hoje, alivia risco
    if (completedStoriesCount > 0) {
      deltaRisco -= completedStoriesCount * 3;
    } else {
      // Dia sem entregas eleva ligeiramente o risco
      deltaRisco += 2;
      deltaConfianca -= 1;
    }

    // Flutuação orgânica leve de mercado (+/- 1 aleatório)
    const organicJitter = Math.floor(Math.random() * 3) - 1; // -1, 0 ou +1
    deltaQualidade += organicJitter;

    // Aplicar deltas aos limites 0-100
    updatedStats.valor = Math.max(0, Math.min(100, updatedStats.valor + deltaValor));
    updatedStats.moral = Math.max(0, Math.min(100, updatedStats.moral + deltaMoral));
    updatedStats.qualidade = Math.max(0, Math.min(100, updatedStats.qualidade + deltaQualidade));
    updatedStats.velocidade = Math.max(0, Math.min(100, updatedStats.velocidade + deltaVelocidade));
    updatedStats.confianca = Math.max(0, Math.min(100, updatedStats.confianca + deltaConfianca));
    updatedStats.risco = Math.max(0, Math.min(100, updatedStats.risco + deltaRisco));

    const recentDeltas: Partial<Record<keyof typeof updatedStats, number>> = {
      valor: deltaValor,
      moral: deltaMoral,
      qualidade: deltaQualidade,
      velocidade: deltaVelocidade,
      confianca: deltaConfianca,
      risco: deltaRisco,
    };

    // Advance day
    const nextDay = state.day + 1;
    let nextPhase: GameState['phase'] = state.phase;
    let nextDialogueHistory: Array<{ speaker: string; text: string }> = [];
    let nextDialogueIndex = 0;
    let nextSandboxDialogues = [...state.sandboxDialogues];

    const sprintDef = getCurrentSprintDef();

    if (nextDay > 3) {
      // 3 days of development are completed. Move to Sprint Review!
      nextPhase = 'REVIEW';
      if (state.gameMode === 'sandbox') {
        const completedStories = updatedBacklog.filter(s => s.status === 'done').length;
        const totalStories = updatedBacklog.length;
        const reviewDialogs = SandboxGenerator.generateReviewDialogue(state.sprint, completedStories, totalStories);
        nextSandboxDialogues = reviewDialogs;
        nextDialogueHistory = [{ speaker: reviewDialogs[0].speaker, text: reviewDialogs[0].text }];
      } else {
        const firstReviewLine = sprintDef.reviewDialogues[0];
        nextDialogueHistory = [{ speaker: firstReviewLine.speaker, text: firstReviewLine.text }];
      }
      setActiveTab('game');
    } else {
      // Next day starts: trigger morning daily scrum event dialogue
      if (state.gameMode === 'sandbox') {
        const dailyDialogs = SandboxGenerator.generateDailyEvent(state.sprint, nextDay);
        nextSandboxDialogues = dailyDialogs;
        nextDialogueHistory = [{ speaker: dailyDialogs[0].speaker, text: dailyDialogs[0].text }];
      } else {
        const morningDialogues = sprintDef.dailyEvents[nextDay];
        if (morningDialogues && morningDialogues.length > 0) {
          nextDialogueHistory = [{ speaker: morningDialogues[0].speaker, text: morningDialogues[0].text }];
        }
      }
      setActiveTab('game');
    }

    saveState({
      ...state,
      backlog: updatedBacklog,
      team: updatedTeam,
      stats: updatedStats,
      recentMetricDeltas: recentDeltas,
      day: nextDay > 3 ? 3 : nextDay, // cap day at 3, transition handled by phase
      phase: nextPhase,
      dialogueIndex: nextDialogueIndex,
      dialogueHistory: nextDialogueHistory,
      sandboxDialogues: nextSandboxDialogues,
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
    let nextDialogs: Array<{ speaker: string; text: string }> = [];
    let nextSandboxDialogues = state.sandboxDialogues;

    if (state.gameMode === 'sandbox') {
      // Sandbox: generate infinite next sprint procedurally — no end
      nextGoal = `Sprint ${nextSprint} — Evoluindo o Pixflow (Sandbox)`;
      nextStories = SandboxGenerator.generateStories(nextSprint);
      const planningLines = SandboxGenerator.generatePlanningDialogue(nextSprint, nextGoal);
      nextSandboxDialogues = planningLines;
      nextDialogs = [{ speaker: planningLines[0].speaker, text: planningLines[0].text }];
    } else if (nextSprint > 8) {
      // Campaign: game over after 8 sprints
      nextPhase = 'RESULTS';
    } else {
      // Campaign: load next sprint — prefer company campaign, fallback to Novatech SPRINTS_DATA
      let nextSprintDef;
      if (state.selectedCompanyId && COMPANY_CAMPAIGNS[state.selectedCompanyId]) {
        const campaign = COMPANY_CAMPAIGNS[state.selectedCompanyId];
        nextSprintDef = campaign.sprints[nextSprint - 1] || campaign.sprints[campaign.sprints.length - 1];
      }
      if (!nextSprintDef) {
        nextSprintDef = SPRINTS_DATA[nextSprint - 1] || SPRINTS_DATA[SPRINTS_DATA.length - 1];
      }
      nextStories = JSON.parse(JSON.stringify(nextSprintDef.stories));
      nextGoal = nextSprintDef.goal;
      nextDialogs = [{ speaker: nextSprintDef.planningDialogues[0].speaker, text: nextSprintDef.planningDialogues[0].text }];
    }

    nextState = {
      ...state,
      sprint: nextSprint > 8 && state.gameMode !== 'sandbox' ? 8 : nextSprint,
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
      sandboxDialogues: nextSandboxDialogues,
      flags: {},  // reset per-sprint flags
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
        startDevelopmentPhase,
        assignDeveloperToStory,
        moveStoryStatus,
        addStoryToBacklog,
        simulateActiveDayProgress,
        finishSprintReview,
        selectRetrospectiveImprovement,
        unlockPlayerSkill,
        talkToTeamMember,
        hasSaveGame,
        getCurrentSprintDef,
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
