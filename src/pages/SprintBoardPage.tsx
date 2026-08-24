import React from 'react';
import { useGame } from '../game/GameContext';
import { SprintBoard } from '../components/sprint/SprintBoard';
import { RetroCard } from '../components/ui/RetroCard';
import { RetroButton } from '../components/ui/RetroButton';

export const SprintBoardPage: React.FC = () => {
  const { state, assignDeveloperToStory, simulateActiveDayProgress, startDevelopmentPhase, setActiveTab } = useGame();
  const { backlog, phase, day, team } = state;

  const isPlanning = phase === 'PLANNING';
  const isDevelopment = phase === 'DEVELOPMENT';

  const handleFinishPlanning = () => {
    // Ensure all stories are assigned
    const unassigned = backlog.some(s => s.status === 'todo' && !s.assignedTo);
    if (unassigned) {
      alert("⚠️ Atenção: Há histórias não atribuídas na coluna 'To Do'. Atribua um desenvolvedor para cada história antes de iniciar a Sprint!");
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
            Fase Atual: <strong className="text-white">{phase}</strong>
          </span>
          <div className="text-[9px] text-retro-dimmed mt-1 font-mono">
            {isPlanning && 'Defina os responsáveis pelas tarefas no quadro abaixo e inicie a Sprint.'}
            {isDevelopment && `DIA ${day} / 3: Resolva os impedimentos na aba História antes de simular o progresso do dia.`}
            {phase === 'REVIEW' && 'Apresente as entregas finalizadas para os stakeholders. Vá para a aba História.'}
            {phase === 'RETROSPECTIVE' && 'Inicie a retrospectiva com a equipe. Vá para a aba História.'}
          </div>
        </div>

        <div>
          {isPlanning && (
            <RetroButton variant="success" onClick={handleFinishPlanning} className="text-[9px] uppercase">
              🚀 Iniciar Desenvolvimento (Sprint)
            </RetroButton>
          )}

          {isDevelopment && (
            <div className="flex items-center space-x-3">
              <span className="font-pressstart text-[9px] text-retro-green animate-pulse">● Simulação Pronta</span>
              <RetroButton variant="success" onClick={simulateActiveDayProgress} className="text-[9px] uppercase">
                ⚡ Simular Dia (Progresso)
              </RetroButton>
            </div>
          )}

          {(phase === 'REVIEW' || phase === 'RETROSPECTIVE') && (
            <RetroButton variant="primary" onClick={() => setActiveTab('game')} className="text-[9px] uppercase">
              💬 Ir para Diálogos
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
        />
      </div>
    </div>
  );
};
