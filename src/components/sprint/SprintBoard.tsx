import React, { useState } from 'react';
import { UserStory, MemberStats } from '../../game/GameState';
import { CHARACTERS_DATA, isCharacterQA } from '../../data/characters';
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

// Cores e estilos por status — estilo Kanban profissional
const COL_CONFIG: Record<UserStory['status'], {
  label: string;
  icon: string;
  headerBg: string;
  headerText: string;
  colBg: string;
  colBorder: string;
  cardBorder: string;
  cardBg: string;
  cardAccent: string;
  dotColor: string;
  countBg: string;
}> = {
  backlog: {
    label: 'Backlog',
    icon: '📦',
    headerBg: 'bg-slate-800',
    headerText: 'text-slate-200',
    colBg: 'bg-[#111118]',
    colBorder: 'border-slate-700',
    cardBorder: 'border-slate-600',
    cardBg: 'bg-[#1a1a28]',
    cardAccent: 'border-l-slate-500',
    dotColor: 'bg-slate-400',
    countBg: 'bg-slate-700 text-slate-200',
  },
  todo: {
    label: 'To Do',
    icon: '📋',
    headerBg: 'bg-blue-900',
    headerText: 'text-blue-100',
    colBg: 'bg-[#0d111e]',
    colBorder: 'border-blue-700',
    cardBorder: 'border-blue-700/60',
    cardBg: 'bg-[#101828]',
    cardAccent: 'border-l-blue-500',
    dotColor: 'bg-blue-400',
    countBg: 'bg-blue-900 text-blue-200',
  },
  progress: {
    label: 'In Progress',
    icon: '⚙️',
    headerBg: 'bg-amber-900',
    headerText: 'text-amber-100',
    colBg: 'bg-[#1a1508]',
    colBorder: 'border-amber-600',
    cardBorder: 'border-amber-600/60',
    cardBg: 'bg-[#231c0a]',
    cardAccent: 'border-l-amber-400',
    dotColor: 'bg-amber-400 animate-pulse',
    countBg: 'bg-amber-900 text-amber-200',
  },
  review: {
    label: 'Review / QA',
    icon: '🔍',
    headerBg: 'bg-purple-900',
    headerText: 'text-purple-100',
    colBg: 'bg-[#130f1e]',
    colBorder: 'border-purple-600',
    cardBorder: 'border-purple-600/60',
    cardBg: 'bg-[#1c1528]',
    cardAccent: 'border-l-purple-500',
    dotColor: 'bg-purple-400',
    countBg: 'bg-purple-900 text-purple-200',
  },
  done: {
    label: 'Concluído ✓',
    icon: '✅',
    headerBg: 'bg-emerald-900',
    headerText: 'text-emerald-100',
    colBg: 'bg-[#071512]',
    colBorder: 'border-emerald-600',
    cardBorder: 'border-emerald-700/60',
    cardBg: 'bg-[#0d2018]',
    cardAccent: 'border-l-emerald-400',
    dotColor: 'bg-emerald-400',
    countBg: 'bg-emerald-900 text-emerald-200',
  },
};

const FIBONACCI = [1, 2, 3, 5, 8];

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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getStoriesByStatus = (status: UserStory['status']) =>
    backlog.filter((s) => s.status === status);

  const getMemberName = (id: string | null) => {
    if (!id) return null;
    return CHARACTERS_DATA[id]?.name || id;
  };

  const getMemberAvatar = (id: string | null) => {
    if (!id) return '?';
    const name = CHARACTERS_DATA[id]?.name || id;
    return name.charAt(0).toUpperCase();
  };

  const handleMove = (story: UserStory, dir: 'prev' | 'next') => {
    if (!onMoveStoryStatus) return;
    const idx = STATUS_ORDER.indexOf(story.status);
    if (dir === 'prev' && idx > 0) onMoveStoryStatus(story.id, STATUS_ORDER[idx - 1]);
    if (dir === 'next' && idx < STATUS_ORDER.length - 1) onMoveStoryStatus(story.id, STATUS_ORDER[idx + 1]);
  };

  const handleCreateStory = () => {
    if (!newTitle.trim()) { alert('⚠️ Digite o título da história.'); return; }
    if (onAddStory) onAddStory(newTitle.trim(), newValue, newComplexity);
    setNewTitle(''); setNewValue(5); setNewComplexity(3); setIsAddModalOpen(false);
  };

  const totalStories = backlog.length;
  const doneCount = getStoriesByStatus('done').length;
  const progressPct = totalStories > 0 ? Math.round((doneCount / totalStories) * 100) : 0;

  return (
    <div className="w-full flex flex-col h-full select-none gap-3">

      {/* ── Header Bar ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-[#0d0d18] border-2 border-retro-border px-4 py-3 rounded-md shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <div>
            <h2 className="font-pressstart text-[11px] text-retro-accent uppercase tracking-wider">
              Quadro Kanban — Sprint Board
            </h2>
            <p className="text-[9px] font-sans text-retro-dimmed mt-0.5">
              {isPlanningMode
                ? '📌 Planejamento: Mova histórias do Backlog para To Do e atribua desenvolvedores.'
                : '🔄 Desenvolvimento: Simule dias para avançar cards automaticamente.'}
            </p>
          </div>
        </div>

        {/* Sprint progress bar */}
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="flex-1">
            <div className="flex justify-between text-[8px] font-mono text-retro-dimmed mb-1">
              <span>Progresso da Sprint</span>
              <span className="text-retro-green font-bold">{doneCount}/{totalStories} ({progressPct}%)</span>
            </div>
            <div className="w-full h-2 bg-slate-900 border border-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-retro-green to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          {onAddStory && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="shrink-0 px-3 py-1.5 border-2 border-retro-accent bg-retro-accent/10 hover:bg-retro-accent/30 text-retro-accent font-pressstart text-[8px] uppercase rounded transition-all"
            >
              + Backlog
            </button>
          )}
        </div>
      </div>

      {/* ── Kanban Columns ── */}
      <div className="flex gap-3 overflow-x-auto pb-2 grow items-stretch" style={{ minHeight: '520px' }}>
        {STATUS_ORDER.map((statusId) => {
          const cfg = COL_CONFIG[statusId];
          const colStories = getStoriesByStatus(statusId);
          const colIdx = STATUS_ORDER.indexOf(statusId);
          const isDoneCol = statusId === 'done';

          return (
            <div
              key={statusId}
              className={`flex flex-col border-2 ${cfg.colBorder} ${cfg.colBg} rounded-md shadow-md min-w-[220px] max-w-[260px] flex-1`}
            >
              {/* Column Header */}
              <div className={`${cfg.headerBg} px-3 py-2 rounded-t-sm flex items-center justify-between sticky top-0`}>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${cfg.dotColor}`} />
                  <span className={`font-pressstart text-[9px] ${cfg.headerText} uppercase tracking-wider`}>
                    {cfg.label}
                  </span>
                </div>
                <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.countBg}`}>
                  {colStories.length}
                </span>
              </div>

              {/* WIP Limit hint */}
              {statusId === 'progress' && colStories.length > 3 && (
                <div className="text-[7px] font-pressstart text-amber-400 bg-amber-950/60 text-center py-0.5 border-b border-amber-800 animate-pulse">
                  ⚠️ WIP LIMIT ATINGIDO
                </div>
              )}

              {/* Cards Area */}
              <div className="flex flex-col gap-2.5 p-2.5 overflow-y-auto grow" style={{ maxHeight: '520px' }}>
                {colStories.length === 0 ? (
                  <div className="flex flex-col items-center justify-center grow py-8 opacity-40">
                    <span className="text-3xl mb-2">{cfg.icon}</span>
                    <span className="text-[8px] font-mono text-slate-500 italic text-center">
                      {statusId === 'backlog' ? 'Adicione itens\nao backlog' : 'Nenhum item\nnesta coluna'}
                    </span>
                  </div>
                ) : (
                  colStories.map((story) => {
                    const memberName = getMemberName(story.assignedTo);
                    const memberAvatar = getMemberAvatar(story.assignedTo);
                    const isHovered = hoveredCard === story.id;

                    return (
                      <div
                        key={story.id}
                        className={`
                          border-l-4 ${cfg.cardAccent} border border-r-0 border-t-0 border-b-0
                          ${cfg.cardBorder} ${cfg.cardBg}
                          rounded-r-md p-3 flex flex-col gap-2 transition-all duration-150 cursor-pointer
                          ${isHovered ? 'shadow-lg scale-[1.01] brightness-110' : 'shadow-sm'}
                          ${isDoneCol ? 'opacity-80' : ''}
                        `}
                        onMouseEnter={() => setHoveredCard(story.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        {/* Card Top: ID badge + Points */}
                        <div className="flex items-center justify-between">
                          <span className={`font-mono text-[8px] px-1.5 py-0.5 rounded border ${
                            isDoneCol
                              ? 'text-emerald-300 border-emerald-800 bg-emerald-950/60 line-through'
                              : 'text-retro-accent border-slate-700 bg-slate-900/60'
                          }`}>
                            {story.id}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-[7px] font-mono px-1 py-0.5 bg-purple-950/50 border border-purple-800/50 text-purple-300 rounded" title="Valor de Negócio">
                              V{story.value}
                            </span>
                            <span className="text-[7px] font-mono px-1 py-0.5 bg-blue-950/50 border border-blue-800/50 text-blue-300 rounded" title="Story Points">
                              {story.complexity}sp
                            </span>
                          </div>
                        </div>

                        {/* Card Title */}
                        <p className={`text-[11px] font-sans leading-tight ${
                          isDoneCol ? 'text-slate-400 line-through' : 'text-white font-medium'
                        }`}>
                          {story.title}
                        </p>

                        {/* Progress Bar (In Progress or Review only) */}
                        {(story.status === 'progress' || story.status === 'review') && story.progress > 0 && (
                          <div>
                            <div className="flex justify-between text-[7px] font-mono text-retro-dimmed mb-0.5">
                              <span>Progresso</span>
                              <span className="text-white">{story.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  story.status === 'review' ? 'bg-purple-500' : 'bg-amber-400'
                                }`}
                                style={{ width: `${story.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Done checkmark + date indicator */}
                        {isDoneCol && (
                          <div className="flex items-center gap-1">
                            <span className="text-emerald-400 text-xs">✓</span>
                            <span className="text-[8px] font-mono text-emerald-500">Entregue</span>
                          </div>
                        )}

                        {/* Card Bottom: Assignee + Move Buttons */}
                        <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/60 gap-1.5">
                          {/* Assignee avatar */}
                          <button
                            onClick={() => setSelectedStory(story)}
                            className={`flex items-center gap-1.5 text-[8px] font-sans rounded px-1.5 py-0.5 border transition-all ${
                              story.assignedTo
                                ? 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-500'
                                : 'border-red-800/60 bg-red-950/30 text-red-400 animate-pulse hover:border-red-600'
                            }`}
                            title="Clique para atribuir ou trocar"
                          >
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold ${
                              story.assignedTo
                                ? 'bg-retro-green text-slate-900'
                                : 'bg-red-900 text-red-300'
                            }`}>
                              {story.assignedTo ? memberAvatar : '!'}
                            </span>
                            <span className="max-w-[70px] truncate">
                              {memberName || 'Atribuir'}
                            </span>
                          </button>

                          {/* Move buttons */}
                          <div className="flex items-center gap-1">
                            {colIdx > 0 && (
                              <button
                                onClick={() => handleMove(story, 'prev')}
                                className="w-5 h-5 flex items-center justify-center border border-slate-700 bg-slate-900 hover:border-slate-500 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-all text-[8px]"
                                title={`← ${COL_CONFIG[STATUS_ORDER[colIdx - 1]].label}`}
                              >
                                ◀
                              </button>
                            )}
                            {colIdx < STATUS_ORDER.length - 1 && (
                              <button
                                onClick={() => handleMove(story, 'next')}
                                className={`w-5 h-5 flex items-center justify-center border rounded transition-all text-[8px] font-bold ${
                                  colIdx === STATUS_ORDER.length - 2
                                    ? 'border-emerald-700 bg-emerald-950/50 text-emerald-400 hover:bg-emerald-900/50'
                                    : 'border-slate-700 bg-slate-900 hover:border-retro-accent hover:bg-slate-800 text-slate-300 hover:text-white'
                                }`}
                                title={`→ ${COL_CONFIG[STATUS_ORDER[colIdx + 1]].label}`}
                              >
                                ▶
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Column Footer: total points */}
              {colStories.length > 0 && (
                <div className={`px-3 py-1.5 border-t ${cfg.colBorder} text-[7px] font-mono text-slate-500 flex justify-between rounded-b-sm`}>
                  <span>{colStories.reduce((sum, s) => sum + s.complexity, 0)} SP total</span>
                  <span>{colStories.reduce((sum, s) => sum + s.value, 0)} valor</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Modal: Definir Nova História ── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-[#12121e] border-4 border-retro-accent rounded-md p-6 shadow-retro-lg max-w-md w-full space-y-4">
            <div className="flex justify-between items-center border-b-2 border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📝</span>
                <h3 className="font-pressstart text-[10px] text-retro-accent uppercase">Nova User Story</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white font-pressstart text-[10px]">✕</button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-pressstart text-retro-dimmed uppercase block">Título da User Story:</label>
              <textarea
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                maxLength={100}
                rows={2}
                placeholder="Como [usuário], quero [funcionalidade] para [benefício]..."
                className="w-full bg-[#0d0d18] border-2 border-slate-700 focus:border-retro-accent p-2.5 text-white font-sans text-xs outline-none rounded resize-none transition-colors"
              />
              <span className="text-[7px] font-mono text-slate-600">{newTitle.length}/100</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] font-pressstart">
                <span className="text-retro-purple">Valor de Negócio (PO):</span>
                <span className="text-white">{newValue}/10</span>
              </div>
              <input
                type="range" min={1} max={10} value={newValue}
                onChange={(e) => setNewValue(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[7px] font-mono text-slate-600">
                <span>Baixo</span><span>Médio</span><span>Alto</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-pressstart text-retro-blue uppercase block">Story Points (Planning Poker):</label>
              <div className="grid grid-cols-5 gap-2">
                {FIBONACCI.map((pts) => (
                  <button
                    key={pts} type="button"
                    onClick={() => setNewComplexity(pts)}
                    className={`py-2 border-2 rounded font-pressstart text-[11px] transition-all ${
                      newComplexity === pts
                        ? 'border-retro-blue bg-blue-900 text-white shadow-md'
                        : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {pts}
                  </button>
                ))}
              </div>
              <p className="text-[7px] font-mono text-slate-600">Sequência Fibonacci: 1 (trivial) → 8 (complexo)</p>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <RetroButton variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancelar</RetroButton>
              <RetroButton variant="success" onClick={handleCreateStory}>Adicionar ao Backlog</RetroButton>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Atribuir Desenvolvedor ── */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-[#12121e] border-4 border-retro-border rounded-md p-6 shadow-retro-lg max-w-sm w-full">
            <h3 className="font-pressstart text-[10px] text-retro-accent mb-3 uppercase">Atribuir Desenvolvedor</h3>

            <div className="bg-[#0d0d18] border border-slate-700 p-3 mb-4 rounded-md">
              <span className="font-pressstart text-[7px] text-retro-dimmed block">{selectedStory.id}</span>
              <p className="font-sans text-white text-sm font-semibold mt-1 leading-snug">{selectedStory.title}</p>
              <div className="flex gap-3 mt-2 font-mono text-[8px]">
                <span>Valor: <strong className="text-retro-purple">{selectedStory.value}</strong></span>
                <span>Pontos: <strong className="text-retro-blue">{selectedStory.complexity} SP</strong></span>
              </div>
            </div>

            {/* Status Context Banner */}
            {selectedStory.status === 'review' && (
              <div className="bg-purple-950/80 border border-purple-600/80 p-2.5 rounded text-[8px] font-sans text-purple-200 mb-3 space-y-0.5">
                <span className="font-pressstart text-[7px] text-purple-300 block uppercase">🔍 Exclusivo para QA</span>
                <span>Somente profissionais de QA (Marcos, Dandara ou Tainá) possuem capacidade técnica para homologar na coluna de Review.</span>
              </div>
            )}

            {selectedStory.status === 'todo' && (
              <div className="bg-blue-950/80 border border-blue-600/80 p-2 rounded text-[8px] font-sans text-blue-200 mb-3">
                <span className="font-pressstart text-[7px] text-blue-300 block uppercase">⚡ Fluxo Contínuo</span>
                <span>Ao atribuir um responsável, esta história avançará automaticamente para <strong>In Progress</strong>.</span>
              </div>
            )}

            <p className="text-[9px] text-retro-dimmed font-pressstart mb-2">Selecione o responsável:</p>
            <div className="flex flex-col gap-1.5 max-h-[240px] overflow-y-auto mb-4 pr-1">
              {Object.keys(CHARACTERS_DATA)
                .sort((a, b) => {
                  // Se a história estiver em review, prioriza QAs no topo
                  if (selectedStory.status === 'review') {
                    const aQA = isCharacterQA(a) ? 1 : 0;
                    const bQA = isCharacterQA(b) ? 1 : 0;
                    return bQA - aQA;
                  }
                  return 0;
                })
                .map((key) => {
                  const char = CHARACTERS_DATA[key];
                  const stats = team[key];
                  if (!stats) return null;
                  const isAssigned = selectedStory.assignedTo === key;
                  const charIsQA = isCharacterQA(key);
                  const isBlockedForReview = selectedStory.status === 'review' && !charIsQA;

                  return (
                    <button
                      key={key}
                      disabled={isBlockedForReview}
                      onClick={() => {
                        if (onAssignStory) onAssignStory(selectedStory.id, key);
                        setSelectedStory(null);
                      }}
                      className={`flex justify-between items-center text-left border-2 p-2 rounded transition-all ${
                        isBlockedForReview
                          ? 'opacity-35 cursor-not-allowed border-slate-800 bg-[#0a0a12]'
                          : isAssigned
                          ? 'border-retro-green bg-green-950/40 text-white'
                          : charIsQA
                          ? 'border-purple-600/70 bg-purple-950/30 hover:border-purple-400 text-slate-200'
                          : 'border-slate-700 bg-[#0d0d18] hover:border-retro-accent text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-pressstart text-[9px] text-white ${
                            charIsQA ? 'bg-purple-800 border border-purple-400' : 'bg-slate-700'
                          }`}
                        >
                          {char.name.charAt(0)}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-pressstart text-[9px] text-white">{char.name}</span>
                            {charIsQA && (
                              <span className="bg-purple-900 border border-purple-500 text-purple-300 font-mono text-[7px] px-1 py-0.2 rounded font-bold">
                                QA
                              </span>
                            )}
                          </div>
                          <span className="text-[7px] text-retro-dimmed font-mono">
                            {isBlockedForReview ? '🔒 Requer perfil QA' : char.role}
                          </span>
                        </div>
                      </div>
                      <div className="text-right font-mono text-[8px]">
                        <span className="text-retro-green block">Motiv: {stats.motivation}%</span>
                        <span className={stats.stress > 60 ? 'text-retro-red' : 'text-slate-300'}>
                          Stress: {stats.stress}%
                        </span>
                      </div>
                    </button>
                  );
                })}

              <button
                onClick={() => {
                  if (onAssignStory) onAssignStory(selectedStory.id, null);
                  setSelectedStory(null);
                }}
                className="border-2 border-dashed border-red-800 p-2 hover:border-retro-red text-retro-red text-[9px] font-pressstart uppercase mt-1 rounded text-center"
              >
                ✕ Remover Atribuição
              </button>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <RetroButton variant="danger" onClick={() => setSelectedStory(null)}>Fechar</RetroButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
