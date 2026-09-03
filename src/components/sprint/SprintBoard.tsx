import React, { useState } from 'react';
import { UserStory, MemberStats } from '../../game/GameState';
import { CHARACTERS_DATA } from '../../data/characters';
import { RetroButton } from '../ui/RetroButton';

interface SprintBoardProps {
  backlog: UserStory[];
  onAssignStory?: (storyId: string, memberId: string | null) => void;
  onMoveStoryStatus?: (storyId: string, targetStatus: UserStory['status']) => void;
  onAddStory?: (title: string, value: number, complexity: number) => void;
  team: Record<string, MemberStats>;
  isPlanningMode: boolean;
}

const STATUS_ORDER: UserStory['status'][] = ['backlog', 'todo', 'progress', 'review', 'done'];

export const SprintBoard: React.FC<SprintBoardProps> = ({
  backlog,
  onAssignStory,
  onMoveStoryStatus,
  onAddStory,
  team,
  isPlanningMode,
}) => {
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newValue, setNewValue] = useState(5);
  const [newComplexity, setNewComplexity] = useState(3);

  const columns: Array<{
    id: UserStory['status'];
    title: string;
    bgColor: string;
    borderColor: string;
    badgeColor: string;
    icon: string;
  }> = [
    { id: 'backlog', title: 'Backlog', bgColor: 'bg-[#141424]', borderColor: 'border-slate-700', badgeColor: 'bg-slate-800 text-slate-300', icon: '📦' },
    { id: 'todo', title: 'To Do', bgColor: 'bg-[#181a38]', borderColor: 'border-retro-blue', badgeColor: 'bg-blue-950 text-blue-300', icon: '📋' },
    { id: 'progress', title: 'In Progress', bgColor: 'bg-[#14281e]', borderColor: 'border-retro-green', badgeColor: 'bg-green-950 text-green-300', icon: '⚙️' },
    { id: 'review', title: 'Review / QA', bgColor: 'bg-[#292414]', borderColor: 'border-yellow-600', badgeColor: 'bg-yellow-950 text-yellow-300', icon: '👀' },
    { id: 'done', title: 'Done (Pronto)', bgColor: 'bg-[#122b1e]', borderColor: 'border-emerald-500', badgeColor: 'bg-emerald-950 text-emerald-300', icon: '✅' },
  ];

  const getStoriesByStatus = (status: UserStory['status']) => {
    return backlog.filter((story) => story.status === status);
  };

  const getMemberName = (id: string | null) => {
    if (!id) return 'Não atribuído';
    return CHARACTERS_DATA[id]?.name || id;
  };

  const handleCreateStory = () => {
    if (!newTitle.trim()) {
      alert('⚠️ Por favor, digite o título da história de usuário.');
      return;
    }
    if (onAddStory) {
      onAddStory(newTitle.trim(), newValue, newComplexity);
    }
    setNewTitle('');
    setNewValue(5);
    setNewComplexity(3);
    setIsAddModalOpen(false);
  };

  const handleMove = (story: UserStory, direction: 'prev' | 'next') => {
    if (!onMoveStoryStatus) return;
    const currentIndex = STATUS_ORDER.indexOf(story.status);
    if (direction === 'prev' && currentIndex > 0) {
      onMoveStoryStatus(story.id, STATUS_ORDER[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < STATUS_ORDER.length - 1) {
      onMoveStoryStatus(story.id, STATUS_ORDER[currentIndex + 1]);
    }
  };

  return (
    <div className="w-full flex flex-col h-full select-none space-y-3">
      {/* Board Controls & Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-[#101020] p-3 border-2 border-retro-border rounded">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <h2 className="font-pressstart text-xs text-retro-accent uppercase">
              Quadro Kanban Ágil & Backlog
            </h2>
          </div>
          <p className="text-[10px] text-retro-dimmed mt-0.5 font-sans">
            {isPlanningMode
              ? 'Planejamento: Defina histórias no Backlog, mova para To Do e atribua desenvolvedores.'
              : 'Desenvolvimento: Acompanhe o fluxo diário ou ajuste status conforme o progresso.'}
          </p>
        </div>

        {/* Action Button: Add Story */}
        <div className="flex items-center gap-2 flex-wrap">
          {onAddStory && (
            <RetroButton
              variant="primary"
              onClick={() => setIsAddModalOpen(true)}
              className="text-[9px] uppercase font-pressstart"
            >
              ➕ Definir Backlog
            </RetroButton>
          )}
        </div>
      </div>

      {/* Board Grid: 5 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto pb-4 grow items-stretch min-h-[500px]">
        {columns.map((col) => {
          const colStories = getStoriesByStatus(col.id);
          const colIndex = STATUS_ORDER.indexOf(col.id);

          return (
            <div
              key={col.id}
              className={`flex flex-col border-2 ${col.borderColor} p-2 ${col.bgColor} min-w-[210px] rounded shadow-md`}
            >
              {/* Column Header */}
              <div className="border-b-2 border-slate-800 pb-2 mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">{col.icon}</span>
                  <span className="font-pressstart text-[9px] text-white uppercase tracking-wider">
                    {col.title}
                  </span>
                </div>
                <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border border-slate-700 ${col.badgeColor}`}>
                  {colStories.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="flex flex-col gap-2.5 grow overflow-y-auto max-h-[520px]">
                {colStories.length === 0 ? (
                  <div className="text-[9px] font-mono text-center text-slate-600 py-10 border border-dashed border-slate-800 rounded italic">
                    Nenhum item
                  </div>
                ) : (
                  colStories.map((story) => (
                    <div
                      key={story.id}
                      className="border-2 border-retro-border bg-retro-panel p-2.5 rounded hover:border-slate-400 transition-all flex flex-col justify-between gap-2 shadow-sm"
                    >
                      {/* Top row: ID, Value, Complexity */}
                      <div className="flex items-center justify-between text-[8px] font-pressstart">
                        <span className="text-retro-accent">{story.id}</span>
                        <div className="flex space-x-1.5 font-mono">
                          <span className="text-retro-purple bg-purple-950/60 px-1 rounded" title="Valor de Negócio">
                            V:{story.value}
                          </span>
                          <span className="text-retro-blue bg-blue-950/60 px-1 rounded" title="Complexidade Fibonacci">
                            C:{story.complexity}
                          </span>
                        </div>
                      </div>

                      {/* Story Title */}
                      <p className="text-[11px] font-sans text-white font-medium leading-snug">
                        {story.title}
                      </p>

                      {/* Assignee / Responsible */}
                      <div className="text-[8px] font-mono flex items-center justify-between pt-1 border-t border-slate-800/80">
                        <span className="text-retro-dimmed">Dev:</span>
                        <button
                          onClick={() => setSelectedStory(story)}
                          className={`font-semibold hover:underline px-1 py-0.5 rounded ${
                            story.assignedTo
                              ? 'text-retro-green bg-green-950/40 border border-green-900/60'
                              : 'text-retro-red bg-red-950/40 border border-red-900/60 animate-pulse'
                          }`}
                          title="Clique para atribuir ou trocar responsável"
                        >
                          {getMemberName(story.assignedTo)} ✎
                        </button>
                      </div>

                      {/* Progress Bar (if in progress or review) */}
                      {story.status !== 'todo' && story.status !== 'backlog' && story.status !== 'done' && (
                        <div className="space-y-0.5">
                          <div className="flex justify-between text-[7px] font-mono text-retro-dimmed">
                            <span>Progresso:</span>
                            <span>{story.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-900 h-1.5 border border-slate-800 rounded-xs overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                story.status === 'review' ? 'bg-yellow-400' : 'bg-retro-green'
                              }`}
                              style={{ width: `${story.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Status Movement Quick Buttons */}
                      <div className="flex justify-between items-center pt-1 border-t border-slate-800 text-[8px] font-pressstart gap-1">
                        {colIndex > 0 ? (
                          <button
                            onClick={() => handleMove(story, 'prev')}
                            className="px-1.5 py-1 bg-slate-900 border border-slate-700 hover:border-retro-accent hover:text-white text-slate-400 rounded transition-all"
                            title={`Mover para ${columns[colIndex - 1].title}`}
                          >
                            ◀ {columns[colIndex - 1].title.split(' ')[0]}
                          </button>
                        ) : <div />}

                        {colIndex < columns.length - 1 ? (
                          <button
                            onClick={() => handleMove(story, 'next')}
                            className="px-1.5 py-1 bg-slate-900 border border-slate-700 hover:border-retro-accent hover:text-white text-slate-300 rounded transition-all ml-auto"
                            title={`Mover para ${columns[colIndex + 1].title}`}
                          >
                            {columns[colIndex + 1].title.split(' ')[0]} ▶
                          </button>
                        ) : (
                          <span className="text-retro-green text-[7px] ml-auto">PRONTO</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Definir Nova História no Backlog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-retro-panel border-4 border-retro-accent p-6 shadow-retro-lg max-w-md w-full space-y-4">
            <div className="flex justify-between items-center border-b-2 border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">➕</span>
                <h3 className="font-pressstart text-xs text-retro-accent uppercase">
                  Definir História no Backlog
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white font-pressstart text-xs"
              >
                ✕
              </button>
            </div>

            {/* Title Input */}
            <div className="space-y-1">
              <label className="text-[9px] font-pressstart text-retro-dimmed uppercase block">
                Título da User Story:
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                maxLength={60}
                placeholder="Ex: Como usuário, quero consultar comprovante Pix em PDF"
                className="w-full bg-[#131326] border-2 border-retro-border p-2.5 text-white font-sans text-xs outline-none focus:border-retro-accent rounded"
              />
            </div>

            {/* Value (1-10) */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-pressstart text-retro-purple">
                <span>Valor de Negócio (PO):</span>
                <span>{newValue} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={newValue}
                onChange={(e) => setNewValue(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Complexity (Fibonacci 1, 2, 3, 5, 8) */}
            <div className="space-y-1">
              <label className="text-[9px] font-pressstart text-retro-blue uppercase block">
                Complexidade (Story Points - Planning Poker):
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 5, 8].map((pts) => (
                  <button
                    key={pts}
                    type="button"
                    onClick={() => setNewComplexity(pts)}
                    className={`flex-1 py-2 border-2 rounded font-pressstart text-[10px] transition-all ${
                      newComplexity === pts
                        ? 'border-retro-blue bg-blue-950 text-white shadow-md'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {pts}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <RetroButton variant="secondary" onClick={() => setIsAddModalOpen(false)}>
                Cancelar
              </RetroButton>
              <RetroButton variant="success" onClick={handleCreateStory}>
                Salvar no Backlog
              </RetroButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Atribuir Desenvolvedor */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-retro-panel border-4 border-retro-border p-6 shadow-retro-lg max-w-sm w-full">
            <h3 className="font-pressstart text-[10px] text-retro-accent mb-2 uppercase">
              Atribuir Desenvolvedor
            </h3>

            <div className="border border-retro-border bg-[#131326] p-3 mb-4 text-[10px] rounded">
              <span className="font-pressstart text-[8px] text-retro-dimmed">{selectedStory.id}</span>
              <p className="font-sans text-white text-sm font-semibold mt-1 leading-snug">
                {selectedStory.title}
              </p>
              <div className="flex space-x-4 mt-2 font-mono text-[9px]">
                <span>Valor: <strong className="text-retro-purple">{selectedStory.value}</strong></span>
                <span>Complexidade: <strong className="text-retro-blue">{selectedStory.complexity} pts</strong></span>
              </div>
            </div>

            <p className="text-[9px] text-retro-dimmed font-pressstart mb-3">Selecione o responsável:</p>
            <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto mb-4">
              {Object.keys(CHARACTERS_DATA).map((key) => {
                const char = CHARACTERS_DATA[key];
                const stats = team[key];
                if (!stats) return null;

                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (onAssignStory) {
                        onAssignStory(selectedStory.id, key);
                      }
                      setSelectedStory(null);
                    }}
                    className="flex justify-between items-center text-left border-2 border-retro-border p-2 bg-[#131326] hover:border-retro-accent transition-colors text-[10px] rounded"
                  >
                    <div>
                      <span className="font-pressstart text-[9px] block text-white">{char.name}</span>
                      <span className="text-[8px] text-retro-dimmed font-mono">{char.role}</span>
                    </div>
                    <div className="text-right font-mono text-[8px] text-retro-dimmed">
                      Motiv.: <strong className="text-retro-green">{stats.motivation}%</strong><br />
                      Estresse: <strong className={stats.stress > 60 ? 'text-retro-red' : 'text-slate-300'}>{stats.stress}%</strong>
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
                className="text-center border-2 border-dashed border-retro-border p-2 bg-[#0c0c14] hover:border-retro-red text-retro-red text-[9px] font-pressstart uppercase mt-1 rounded"
              >
                Remover Atribuição
              </button>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <RetroButton variant="danger" onClick={() => setSelectedStory(null)}>
                Cancelar
              </RetroButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
