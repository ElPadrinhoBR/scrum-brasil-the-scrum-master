import React, { useState } from 'react';
import { UserStory, MemberStats } from '../../game/GameState';
import { CHARACTERS_DATA } from '../../data/characters';
import { RetroButton } from '../ui/RetroButton';

interface SprintBoardProps {
  backlog: UserStory[];
  onAssignStory?: (storyId: string, memberId: string | null) => void;
  team: Record<string, MemberStats>;
  isPlanningMode: boolean;
}

export const SprintBoard: React.FC<SprintBoardProps> = ({
  backlog,
  onAssignStory,
  team,
  isPlanningMode,
}) => {
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);

  const columns: Array<{
    id: UserStory['status'];
    title: string;
    bgColor: string;
  }> = [
    { id: 'backlog', title: 'Backlog', bgColor: 'bg-[#18182d]' },
    { id: 'todo', title: 'To Do', bgColor: 'bg-[#1a1c38]' },
    { id: 'progress', title: 'In Progress', bgColor: 'bg-[#182d24]' },
    { id: 'review', title: 'Review', bgColor: 'bg-[#2d2a18]' },
    { id: 'done', title: 'Done', bgColor: 'bg-[#153326]' },
  ];

  const getStoriesByStatus = (status: UserStory['status']) => {
    return backlog.filter((story) => story.status === status);
  };

  const getMemberName = (id: string | null) => {
    if (!id) return 'Não atribuído';
    return CHARACTERS_DATA[id]?.name || id;
  };

  const handleCardClick = (story: UserStory) => {
    if (isPlanningMode && onAssignStory && (story.status === 'todo' || story.status === 'backlog')) {
      setSelectedStory(story);
    }
  };

  return (
    <div className="w-full flex flex-col h-full select-none">
      {/* Title Header */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h2 className="font-pressstart text-xs text-retro-accent uppercase">Quadro Kanban do Pixflow</h2>
          <p className="text-[10px] text-retro-dimmed mt-1">
            {isPlanningMode 
              ? 'Fase de Planejamento: Clique nos cards para atribuir um desenvolvedor.' 
              : 'Fase de Desenvolvimento: Monitore a evolução dos cards diariamente.'}
          </p>
        </div>
      </div>

      {/* Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto pb-4 grow items-stretch min-h-[450px]">
        {columns.map((col) => {
          const colStories = getStoriesByStatus(col.id);
          return (
            <div 
              key={col.id} 
              className={`flex flex-col border-2 border-retro-border p-2 ${col.bgColor} min-w-[200px] rounded`}
            >
              {/* Column Header */}
              <div className="border-b-2 border-retro-border pb-1.5 mb-3 flex items-center justify-between">
                <span className="font-pressstart text-[9px] text-retro-text uppercase tracking-wider">
                  {col.title}
                </span>
                <span className="bg-[#0c0c14] border border-retro-border font-mono text-[9px] px-1.5 py-0.5 text-white">
                  {colStories.length}
                </span>
              </div>

              {/* Column Cards Container */}
              <div className="flex flex-col gap-2.5 grow overflow-y-auto">
                {colStories.length === 0 ? (
                  <div className="text-[9px] font-mono text-center text-slate-600 py-8 border border-dashed border-slate-800 rounded italic">
                    Vazio
                  </div>
                ) : (
                  colStories.map((story) => (
                    <div
                      key={story.id}
                      onClick={() => handleCardClick(story)}
                      className={`border-2 p-2 relative bg-retro-panel transition-all ${
                        isPlanningMode && (story.status === 'todo' || story.status === 'backlog')
                          ? 'border-retro-border hover:border-retro-accent cursor-pointer active:translate-y-0.5' 
                          : 'border-retro-border'
                      }`}
                    >
                      {/* Card ID & Value / Complexity */}
                      <div className="flex items-center justify-between text-[8px] font-pressstart text-retro-accent mb-1">
                        <span>{story.id}</span>
                        <div className="flex space-x-1">
                          <span className="text-retro-purple">V:{story.value}</span>
                          <span className="text-retro-blue">C:{story.complexity}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <p className="text-[10px] font-sans text-white font-medium leading-tight mb-2">
                        {story.title}
                      </p>

                      {/* Assignee Badge */}
                      <div className="text-[8px] font-mono flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800">
                        <span className="text-retro-dimmed">Quem:</span>
                        <span className={`font-semibold ${story.assignedTo ? 'text-retro-green' : 'text-retro-red'}`}>
                          {getMemberName(story.assignedTo)}
                        </span>
                      </div>

                      {/* Progress Bar (if in progress/review) */}
                      {story.status !== 'todo' && story.status !== 'backlog' && story.status !== 'done' && (
                        <div className="mt-2">
                          <div className="flex justify-between text-[7px] font-mono text-retro-dimmed mb-0.5">
                            <span>Progresso:</span>
                            <span>{story.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-900 h-1.5 border border-slate-800 rounded-sm overflow-hidden">
                            <div 
                              className={`h-full ${story.status === 'review' ? 'bg-retro-accent' : 'bg-retro-green'}`}
                              style={{ width: `${story.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Finished Checkmark */}
                      {story.status === 'done' && (
                        <div className="absolute top-1.5 right-1.5 bg-retro-green/20 border border-retro-green/50 text-retro-green text-[7px] px-1 font-pressstart uppercase">
                          Pronto
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Assignment Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-retro-panel border-4 border-retro-border p-6 shadow-retro-lg max-w-sm w-full">
            <h3 className="font-pressstart text-[10px] text-retro-accent mb-2">ATRIBUIR TAREFA</h3>
            
            <div className="border border-retro-border bg-[#131326] p-3 mb-4 text-[10px]">
              <span className="font-pressstart text-[8px] text-retro-dimmed">{selectedStory.id}</span>
              <p className="font-sans text-white text-sm font-semibold mt-1">{selectedStory.title}</p>
              <div className="flex space-x-4 mt-2 font-mono text-[9px]">
                <span>Valor: <strong className="text-retro-purple">{selectedStory.value}</strong></span>
                <span>Complexidade: <strong className="text-retro-blue">{selectedStory.complexity}</strong></span>
              </div>
            </div>

            <p className="text-[9px] text-retro-dimmed font-pressstart mb-3">Selecione o responsável:</p>
            <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto mb-4">
              {/* List developers */}
              {Object.keys(CHARACTERS_DATA).map((key) => {
                const char = CHARACTERS_DATA[key];
                const stats = team[key];
                // Show role and motivation
                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (onAssignStory) {
                        onAssignStory(selectedStory.id, key);
                      }
                      setSelectedStory(null);
                    }}
                    className="flex justify-between items-center text-left border-2 border-retro-border p-2 bg-[#131326] hover:border-retro-accent transition-colors text-[10px]"
                  >
                    <div>
                      <span className="font-pressstart text-[9px] block text-white">{char.name}</span>
                      <span className="text-[8px] text-retro-dimmed font-mono">{char.role}</span>
                    </div>
                    <div className="text-right font-mono text-[8px] text-retro-dimmed">
                      Motivação: <strong className="text-retro-green">{stats.motivation}%</strong><br />
                      Estresse: <strong className={stats.stress > 60 ? 'text-retro-red' : 'text-retro-text'}>{stats.stress}%</strong>
                    </div>
                  </button>
                );
              })}

              <button
                onClick={() => {
                  if (onAssignStory) {
                    onAssignStory(selectedStory.id, null);
                  }
                  setSelectedStory(null);
                }}
                className="text-center border-2 border-dashed border-retro-border p-2 bg-[#0c0c14] hover:border-retro-red text-retro-red text-[9px] font-pressstart uppercase mt-1"
              >
                Remover Atribuição
              </button>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <RetroButton variant="danger" onClick={() => setSelectedStory(null)}>Cancelar</RetroButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
