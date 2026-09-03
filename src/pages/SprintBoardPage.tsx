import React from 'react';
import { useGame } from '../game/GameContext';
import { useLanguage } from '../i18n/LanguageContext';
import { SprintBoard } from '../components/sprint/SprintBoard';
import { RetroCard } from '../components/ui/RetroCard';
import { RetroButton } from '../components/ui/RetroButton';

export const SprintBoardPage: React.FC = () => {
  const {
    state,
    assignDeveloperToStory,
    moveStoryStatus,
    addStoryToBacklog,
    simulateActiveDayProgress,
    startDevelopmentPhase,
    setActiveTab,
  } = useGame();
  const { t } = useLanguage();
  const { backlog, phase, day, team } = state;

  const isPlanning = phase === 'PLANNING';
  const isDevelopment = phase === 'DEVELOPMENT';

  const handleFinishPlanning = () => {
    const unassigned = backlog.some(s => s.status === 'todo' && !s.assignedTo);
    if (unassigned) {
      alert(t.board.unassignedAlert);
      return;
    }
    startDevelopmentPhase();
  };

  return (
    <div className="space-y-4">
      {/* Control panel for Sprint phase actions */}
      <RetroCard className="border-retro-blue bg-[#10101f]/75 p-3.5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="text-left">
          <span className="text-[10px] font-pressstart text-retro-accent uppercase">
            {t.hud.status}: <strong className="text-white">{phase}</strong>
          </span>
          <div className="text-[9px] text-retro-dimmed mt-1 font-mono">
            {isPlanning && t.board.planning}
            {isDevelopment && `${t.board.day} ${day} / 3: Resolva os impedimentos na aba História antes de simular o progresso do dia.`}
            {phase === 'REVIEW' && 'Apresente as entregas finalizadas para os stakeholders. Vá para a aba História.'}
            {phase === 'RETROSPECTIVE' && 'Inicie a retrospectiva com a equipe. Vá para a aba História.'}
          </div>
        </div>

        <div>
          {isPlanning && (
            <RetroButton variant="success" onClick={handleFinishPlanning} className="text-[9px] uppercase">
              {t.board.startSprint}
            </RetroButton>
          )}

          {isDevelopment && (
            <div className="flex items-center space-x-3">
              <span className="font-pressstart text-[9px] text-retro-green animate-pulse">{t.board.ready}</span>
              <RetroButton variant="success" onClick={simulateActiveDayProgress} className="text-[9px] uppercase">
                {t.board.simulateDay}
              </RetroButton>
            </div>
          )}

          {(phase === 'REVIEW' || phase === 'RETROSPECTIVE') && (
            <RetroButton variant="primary" onClick={() => setActiveTab('game')} className="text-[9px] uppercase">
              {t.board.goToDialogue}
            </RetroButton>
          )}
        </div>
      </RetroCard>

      {/* Kanban Board rendering */}
      <div className="bg-slate-950/40 p-1 border-2 border-slate-900 rounded">
        <SprintBoard 
          backlog={backlog}
          team={team}
          isPlanningMode={isPlanning}
          onAssignStory={assignDeveloperToStory}
          onMoveStoryStatus={moveStoryStatus}
          onAddStory={addStoryToBacklog}
        />
      </div>
    </div>
  );
};
