import React from 'react';
import { GameState, getLevelName, getRequiredXPForLevel } from '../../game/GameState';
import { RetroButton } from '../ui/RetroButton';
import { useLanguage } from '../../i18n/LanguageContext';

interface HUDProps {
  state: GameState;
  activeTab: 'game' | 'team' | 'board';
  setActiveTab: (tab: 'game' | 'team' | 'board') => void;
  onExit: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  state,
  activeTab,
  setActiveTab,
  onExit,
}) => {
  const { sprint, xp, level, stats, currentSprintGoal, phase } = state;
  const xpNeeded = getRequiredXPForLevel(level);
  const { t } = useLanguage();

  // Time tracker logic: 8 Sprints total, each Sprint is 2 weeks (10 working days). Total 80 days.
  const elapsedDays = (sprint - 1) * 10 + (phase === 'DEVELOPMENT' ? (state.day - 1) * 3 : (phase === 'REVIEW' || phase === 'RETROSPECTIVE' ? 10 : 0));
  const remainingDays = Math.max(0, 80 - elapsedDays);
  const weeksLeft = Math.floor(remainingDays / 5);
  const daysLeft = remainingDays % 5;

  // Helper to draw text progress bar
  const renderTextBar = (val: number, isRisk = false) => {
    const totalBlocks = 10;
    const filledBlocks = Math.round((Math.max(0, Math.min(100, val)) / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    
    // Choose colors based on value and whether it is risk
    let textColor = 'text-retro-green';
    if (isRisk) {
      if (val > 60) textColor = 'text-retro-red';
      else if (val > 30) textColor = 'text-retro-accent';
    } else {
      if (val < 40) textColor = 'text-retro-red';
      else if (val < 70) textColor = 'text-retro-accent';
    }

    return (
      <div className="flex items-center space-x-1 font-mono">
        <span className={textColor}>
          {'█'.repeat(filledBlocks)}
          <span className="opacity-20">{'░'.repeat(emptyBlocks)}</span>
        </span>
        <span className="text-[10px] font-pressstart ml-1">{val}%</span>
      </div>
    );
  };

  return (
    <div className="border-4 border-retro-border bg-retro-panel p-4 shadow-retro mb-4">
      {/* Top row: Sprint, Level, Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b-4 border-retro-border gap-4">
        {/* Sprint Goal & Title and Countdown */}
        <div className="flex flex-wrap items-center gap-4">
          <div>
            {state.gameMode === 'sandbox' ? (
              <>
                <div className="font-pressstart text-[14px] text-retro-purple">
                  {t.hud.sprint} {sprint.toString().padStart(2, '0')} {t.hud.of} ♾️
                </div>
                <div className="text-[10px] text-retro-dimmed mt-1 font-pressstart uppercase">
                  {t.hud.status}: <span className="text-white">{phase}</span>
                </div>
              </>
            ) : (
              <>
                <div className="font-pressstart text-[14px] text-retro-accent">
                  {t.hud.sprint} {sprint.toString().padStart(2, '0')} {t.hud.of} 08
                </div>
                <div className="text-[10px] text-retro-dimmed mt-1 font-pressstart uppercase">
                  {t.hud.status}: <span className="text-white">{phase}</span>
                </div>
              </>
            )}
          </div>

          <div className="border-l-4 border-dashed border-slate-800 pl-4">
            {state.gameMode === 'sandbox' ? (
              <>
                <div className="font-pressstart text-[9px] text-retro-purple uppercase">
                  {t.hud.sandboxMode}
                </div>
                <div className="text-[9px] text-white mt-1 font-pressstart uppercase">
                  {t.hud.sandboxSprints}
                </div>
              </>
            ) : (
              <>
                <div className="font-pressstart text-[9px] text-retro-red uppercase">
                  {t.hud.deadline}
                </div>
                <div className="text-[9px] text-white mt-1 font-pressstart uppercase">
                  {t.hud.remaining}: <span className="text-retro-accent">{weeksLeft} {t.hud.weeks} {daysLeft > 0 ? `E ${daysLeft} ${t.hud.days}` : ''}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Level and XP */}
        <div className="flex-1 md:mx-6 bg-[#131326] p-2 border-2 border-retro-border flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[9px] text-retro-accent font-pressstart uppercase">{t.hud.xp}: {xp} / {xpNeeded}</span>
            <span className="text-[10px] font-pressstart truncate text-white">{getLevelName(level)}</span>
          </div>
          {/* XP Bar */}
          <div className="w-full md:w-32 bg-slate-900 border border-slate-700 h-3 relative overflow-hidden">
            <div 
              className="bg-retro-purple h-full transition-all duration-300"
              style={{ width: `${Math.min(100, (xp / xpNeeded) * 100)}%` }}
            />
          </div>
        </div>

        {/* Tabs and Actions */}
        <div className="flex flex-wrap gap-2">
          <RetroButton 
            variant={activeTab === 'game' ? 'warning' : 'secondary'} 
            onClick={() => setActiveTab('game')}
          >
            {t.hud.story}
          </RetroButton>
          <RetroButton 
            variant={activeTab === 'board' ? 'warning' : 'secondary'} 
            onClick={() => setActiveTab('board')}
          >
            {t.hud.board}
          </RetroButton>
          <RetroButton 
            variant={activeTab === 'team' ? 'warning' : 'secondary'} 
            onClick={() => setActiveTab('team')}
          >
            {t.hud.team}
          </RetroButton>
          <RetroButton 
            variant="danger" 
            onClick={onExit}
          >
            {t.hud.exit}
          </RetroButton>
        </div>
      </div>

      {/* Grid of Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 py-3 border-b-2 border-slate-800 text-[10px]">
        <div className="flex flex-col space-y-1">
          <span className="font-pressstart text-retro-accent">🎯 VALOR</span>
          {renderTextBar(stats.valor)}
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-pressstart text-retro-purple">❤️ MORAL</span>
          {renderTextBar(stats.moral)}
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-pressstart text-retro-green">🧪 QUALIDADE</span>
          {renderTextBar(stats.qualidade)}
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-pressstart text-retro-blue">⚡ VELOCIDADE</span>
          {renderTextBar(stats.velocidade)}
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-pressstart text-white">🤝 CONFIANÇA</span>
          {renderTextBar(stats.confianca)}
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-pressstart text-retro-red">⚠️ RISCO</span>
          {renderTextBar(stats.risco, true)}
        </div>
      </div>

      {/* Sprint Goal banner */}
      {currentSprintGoal && (
        <div className="pt-2 text-[10px] flex items-center bg-[#131326] px-2 py-1.5 border border-dashed border-retro-border">
          <span className="font-pressstart text-retro-accent mr-2">{t.hud.sprintGoal}:</span>
          <span className="text-white italic">"{currentSprintGoal}"</span>
        </div>
      )}
    </div>
  );
};
