import React, { useState } from 'react';
import { useGame } from '../game/GameContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { RetroButton } from '../components/ui/RetroButton';
import { RetroCard } from '../components/ui/RetroCard';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import { AgileLearningPage } from './AgileLearningPage';

interface MainMenuProps {
  onStartGame: () => void;
  onAIMode: () => void;
}

const LANG_OPTIONS: { code: Language; flag: string; label: string }[] = [
  { code: 'pt-BR', flag: '🇧🇷', label: 'PT' },
  { code: 'en-US', flag: '🇺🇸', label: 'EN' },
  { code: 'es-ES', flag: '🇪🇸', label: 'ES' },
];

export const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onAIMode }) => {
  const { startNewGame, loadSavedGame, hasSaveGame, state, muted, toggleMute } = useGame();
  const { lang, setLang, t } = useLanguage();
  const [view, setView] = useState<'main' | 'achievements' | 'credits' | 'name_input' | 'mode_select' | 'agile_learning'>('main');
  const [nameInput, setNameInput] = useState('Roberto');

  // If user navigated to Agile Learning, render it full-screen
  if (view === 'agile_learning') {
    return <AgileLearningPage onBack={() => setView('main')} />;
  }

  const handleNewGame = () => {
    if (hasSaveGame) {
      const confirm = window.confirm("⚠️ Iniciar um novo jogo apagará seu save atual. Deseja continuar?");
      if (!confirm) return;
    }
    setView('name_input');
  };

  const handleNameConfirm = () => {
    if (!nameInput.trim()) {
      alert("⚠️ Digite um nome de Scrum Master válido!");
      return;
    }
    setView('mode_select');
  };

  const handleStartGameWithMode = (mode: 'campaign' | 'sandbox') => {
    startNewGame(nameInput.trim(), mode);
    onStartGame();
  };

  const handleContinue = () => {
    const success = loadSavedGame();
    if (success) {
      onStartGame();
    } else {
      alert("❌ Falha ao carregar o jogo salvo.");
    }
  };

  return (
    <div className="min-h-screen bg-retro-bg text-retro-text flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      
      {/* Background Retro Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(19,19,38,0.3)_1px,transparent_1px),linear-gradient(to_right,rgba(19,19,38,0.3)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Language Selector — top right */}
      <div className="absolute top-4 right-4 z-20 flex gap-1.5">
        {LANG_OPTIONS.map(({ code, flag, label }) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            title={label}
            className={`px-2 py-1 text-[10px] font-pressstart border-2 transition-all ${
              lang === code
                ? 'border-retro-accent bg-retro-panel text-retro-accent'
                : 'border-slate-700 bg-slate-950/80 text-slate-400 hover:border-slate-500 hover:text-white'
            }`}
          >
            {flag}
          </button>
        ))}
      </div>
      
      {/* Title Banner */}
      <div className="text-center mb-8 relative z-10 animate-pulse">
        <h1 className="font-pressstart text-3xl md:text-5xl text-retro-accent tracking-tighter drop-shadow-[6px_6px_0px_rgba(0,0,0,0.8)] uppercase">
          {t.menu.title}
        </h1>
        <h2 className="font-pressstart text-[10px] md:text-[13px] text-retro-purple mt-4 tracking-widest bg-slate-950/80 px-4 py-1.5 border-2 border-retro-border inline-block uppercase">
          {t.menu.subtitle}
        </h2>
      </div>

      <div className="w-full max-w-md relative z-10">

        {/* ── MAIN MENU ── */}
        {view === 'main' && (
          <RetroCard title="Menu Principal" className="text-center space-y-4">
            <div className="flex flex-col gap-3.5">
              <RetroButton variant="success" onClick={handleNewGame} className="py-3 text-[11px] uppercase">
                {t.menu.newGame}
              </RetroButton>
              
              <RetroButton 
                variant="primary" 
                onClick={handleContinue} 
                disabled={!hasSaveGame}
                className="py-3 text-[11px] uppercase"
              >
                {t.menu.continue}
              </RetroButton>

              {/* Gestão Ágil — destaque especial */}
              <button
                onClick={() => setView('agile_learning')}
                className="w-full py-3 border-2 border-retro-purple bg-[#1a0c26]/60 hover:bg-[#1a0c26] hover:border-retro-accent transition-all font-pressstart text-[11px] text-retro-purple hover:text-white uppercase"
              >
                {t.menu.agileManagement}
              </button>

              {/* Modo IA */}
              <button
                onClick={() => onAIMode()}
                className="w-full py-3 border-2 border-blue-500 bg-[#0c0f26]/60 hover:bg-[#0c0f26] hover:border-retro-accent transition-all font-pressstart text-[11px] text-blue-400 hover:text-white uppercase"
              >
                🤖 Modo IA — Situações Infinitas
              </button>

              <RetroButton variant="secondary" onClick={() => setView('achievements')} className="py-3 text-[11px] uppercase">
                {t.menu.achievements}
              </RetroButton>

              <RetroButton variant="secondary" onClick={() => setView('credits')} className="py-3 text-[11px] uppercase">
                {t.menu.credits}
              </RetroButton>

              {/* Sound Toggle */}
              <button 
                onClick={toggleMute}
                className="border-2 border-dashed border-retro-border py-2 text-[9px] font-pressstart text-retro-dimmed hover:text-white uppercase mt-2 bg-[#0c0c14]"
              >
                {muted ? t.menu.soundOff : t.menu.soundOn}
              </button>
            </div>

            {hasSaveGame && (
              <div className="pt-2 text-[9px] text-retro-dimmed font-mono text-center">
                {t.menu.saveInfo} {state.sprint} ({t.menu.xpLabel} {state.xp})
              </div>
            )}
          </RetroCard>
        )}

        {/* ── NAME INPUT ── */}
        {view === 'name_input' && (
          <RetroCard title={t.menu.nameTitle} className="text-center space-y-4">
            <p className="text-[9px] text-retro-dimmed font-pressstart text-left mb-2">{t.menu.nameLabel}</p>
            <input 
              type="text" 
              value={nameInput} 
              onChange={(e) => setNameInput(e.target.value)}
              maxLength={20}
              className="w-full bg-[#131326] border-4 border-retro-border p-3 text-white font-mono text-center text-sm outline-none focus:border-retro-accent rounded"
              placeholder={t.menu.namePlaceholder}
              onKeyDown={(e) => e.key === 'Enter' && handleNameConfirm()}
            />
            <div className="flex flex-col gap-3 pt-2">
              <RetroButton variant="success" onClick={handleNameConfirm} className="py-2.5 uppercase w-full">
                {t.menu.nameNext}
              </RetroButton>
              <RetroButton variant="danger" onClick={() => setView('main')} className="py-2.5 uppercase w-full">
                {t.menu.cancel}
              </RetroButton>
            </div>
          </RetroCard>
        )}

        {/* ── MODE SELECT ── */}
        {view === 'mode_select' && (
          <RetroCard title={t.menu.modeTitle} className="space-y-4">
            <p className="text-[9px] text-retro-dimmed font-pressstart text-center">
              Olá, <span className="text-retro-accent">{nameInput}</span>! {t.menu.modeGreeting}
            </p>

            {/* Campaign Mode */}
            <button
              onClick={() => handleStartGameWithMode('campaign')}
              className="w-full text-left p-4 border-2 border-retro-blue bg-[#0c1326]/70 hover:border-retro-accent hover:bg-[#0c1326] transition-all rounded group"
            >
              <div className="font-pressstart text-[10px] text-retro-accent mb-2 group-hover:text-white">
                {t.menu.campaignTitle}
              </div>
              <p className="text-[9px] font-sans text-slate-300 leading-relaxed">
                {t.menu.campaignDesc}
              </p>
              <div className="mt-2 text-[8px] font-pressstart text-retro-green bg-green-950/40 inline-block px-2 py-0.5 border border-green-800">
                {t.menu.campaignBadge}
              </div>
            </button>

            {/* Sandbox Mode */}
            <button
              onClick={() => handleStartGameWithMode('sandbox')}
              className="w-full text-left p-4 border-2 border-retro-purple bg-[#1a0c26]/70 hover:border-retro-accent hover:bg-[#1a0c26] transition-all rounded group"
            >
              <div className="font-pressstart text-[10px] text-retro-purple mb-2 group-hover:text-white">
                {t.menu.sandboxTitle}
              </div>
              <p className="text-[9px] font-sans text-slate-300 leading-relaxed">
                {t.menu.sandboxDesc}
              </p>
              <div className="mt-2 text-[8px] font-pressstart text-retro-purple bg-purple-950/40 inline-block px-2 py-0.5 border border-purple-800">
                {t.menu.sandboxBadge}
              </div>
            </button>

            <RetroButton variant="secondary" onClick={() => setView('name_input')} className="py-2 text-[9px] uppercase w-full mt-1">
              {t.menu.back}
            </RetroButton>
          </RetroCard>
        )}

        {/* ── ACHIEVEMENTS ── */}
        {view === 'achievements' && (
          <RetroCard title={t.menu.unlockedAchievements} className="w-full">
            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
              {state.unlockedAchievements.length === 0 && (
                <p className="text-[9px] text-retro-dimmed font-sans text-center py-4">{t.menu.noAchievements}</p>
              )}
              {ACHIEVEMENTS_DATA.map((ach) => {
                const isUnlocked = state.unlockedAchievements.includes(ach.id);
                return (
                  <div 
                    key={ach.id}
                    className={`border-2 p-2 flex items-center space-x-3 transition-all ${
                      isUnlocked 
                        ? 'border-retro-accent bg-slate-900/60' 
                        : 'border-slate-800 opacity-40 bg-[#0c0c14]'
                    }`}
                  >
                    <span className="text-xl">{isUnlocked ? ach.icon : '🔒'}</span>
                    <div className="text-left">
                      <span className={`block font-pressstart text-[8.5px] ${isUnlocked ? 'text-retro-accent' : 'text-slate-500'}`}>
                        {ach.title} {ach.isFunny && <span className="text-[7px] text-retro-purple font-mono bg-purple-950/40 px-1 border border-purple-800">[ZUEIRA]</span>}
                      </span>
                      <span className="text-[9px] font-sans text-retro-dimmed leading-snug block">
                        {ach.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800">
              <span className="text-[9px] font-pressstart text-retro-dimmed">
                Total: {state.unlockedAchievements.length} / {ACHIEVEMENTS_DATA.length}
              </span>
              <RetroButton variant="danger" onClick={() => setView('main')}>
                {t.menu.back}
              </RetroButton>
            </div>
          </RetroCard>
        )}

        {/* ── CREDITS ── */}
        {view === 'credits' && (
          <RetroCard title="Créditos do Jogo">
            <div className="text-left font-sans text-xs space-y-3.5 leading-relaxed text-slate-300">
              <p>
                <strong className="text-retro-accent font-pressstart text-[9px] block mb-1">SOBRE O PROJETO E DIREÇÃO:</strong>
                Idealizado e dirigido por <a href="https://www.linkedin.com/in/robertolmc/" target="_blank" rel="noopener noreferrer" className="text-retro-accent underline hover:text-white">Roberto Leandro M Corrêa</a>.
              </p>
              <p>
                <strong className="text-retro-accent font-pressstart text-[9px] block mb-1">CONCEPÇÃO E DESIGN:</strong>
                Desenvolvido como um jogo educacional focado em ensinar boas práticas de facilitação, mediação de conflitos e governança no framework Scrum.
              </p>
              <p>
                <strong className="text-retro-accent font-pressstart text-[9px] block mb-1">PROGRAMAÇÃO:</strong>
                React + Vite + Tailwind CSS + Web Audio API (Sintetizador Retro Chiptune).
              </p>
              <p>
                <strong className="text-retro-accent font-pressstart text-[9px] block mb-1">AGRADECIMENTOS ESPECIAIS:</strong>
                A todos os Scrum Masters e Product Owners que lidam com deploy na sexta-feira e microgerentes diariamente!
              </p>
            </div>
            <div className="flex justify-end mt-4 pt-4 border-t border-slate-800">
              <RetroButton variant="danger" onClick={() => setView('main')}>
                {t.menu.back}
              </RetroButton>
            </div>
          </RetroCard>
        )}
      </div>
      
      {/* Bottom Footer */}
      <div className="absolute bottom-4 text-center text-[8px] font-mono text-retro-dimmed relative z-10 mt-6">
        © 2026 Scrum Brasil — The Scrum Master. Licença MIT.
      </div>
    </div>
  );
};
