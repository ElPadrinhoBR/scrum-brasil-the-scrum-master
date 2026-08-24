import React, { useState } from 'react';
import { useGame } from '../game/GameContext';
import { RetroButton } from '../components/ui/RetroButton';
import { RetroCard } from '../components/ui/RetroCard';
import { ACHIEVEMENTS_DATA } from '../data/achievements';

interface MainMenuProps {
  onStartGame: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  const { startNewGame, loadSavedGame, hasSaveGame, state, muted, toggleMute } = useGame();
  const [view, setView] = useState<'main' | 'achievements' | 'credits' | 'name_input'>('main');
  const [nameInput, setNameInput] = useState('Roberto');

  const handleNewGame = () => {
    if (hasSaveGame) {
      const confirm = window.confirm("⚠️ Iniciar um novo jogo apagará seu save atual. Deseja continuar?");
      if (!confirm) return;
    }
    setView('name_input');
  };

  const handleStartGameWithName = () => {
    if (!nameInput.trim()) {
      alert("⚠️ Digite um nome de Scrum Master válido!");
      return;
    }
    startNewGame(nameInput.trim());
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
      
      {/* Background Retro Grid Details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(19,19,38,0.3)_1px,transparent_1px),linear-gradient(to_right,rgba(19,19,38,0.3)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Title Banner */}
      <div className="text-center mb-8 relative z-10 animate-pulse">
        <h1 className="font-pressstart text-3xl md:text-5xl text-retro-accent tracking-tighter drop-shadow-[6px_6px_0px_rgba(0,0,0,0.8)] uppercase">
          SCRUM BRASIL
        </h1>
        <h2 className="font-pressstart text-[10px] md:text-[13px] text-retro-purple mt-4 tracking-widest bg-slate-950/80 px-4 py-1.5 border-2 border-retro-border inline-block uppercase">
          🏆 The Scrum Master 🏆
        </h2>
      </div>

      <div className="w-full max-w-md relative z-10">
        {view === 'main' && (
          <RetroCard title="Menu Principal" className="text-center space-y-4">
            <div className="flex flex-col gap-3.5">
              <RetroButton variant="success" onClick={handleNewGame} className="py-3 text-[11px] uppercase">
                🕹️ Novo Jogo
              </RetroButton>
              
              <RetroButton 
                variant="primary" 
                onClick={handleContinue} 
                disabled={!hasSaveGame}
                className="py-3 text-[11px] uppercase"
              >
                💾 Continuar
              </RetroButton>

              <RetroButton variant="secondary" onClick={() => setView('achievements')} className="py-3 text-[11px] uppercase">
                🏆 Conquistas
              </RetroButton>

              <RetroButton variant="secondary" onClick={() => setView('credits')} className="py-3 text-[11px] uppercase">
                📜 Créditos
              </RetroButton>

              {/* Sound Toggle */}
              <button 
                onClick={toggleMute}
                className="border-2 border-dashed border-retro-border py-2 text-[9px] font-pressstart text-retro-dimmed hover:text-white uppercase mt-2 bg-[#0c0c14]"
              >
                {muted ? '🔈 Som: Mudo (Ativar)' : '🔊 Som: Ativado (Mutar)'}
              </button>
            </div>

            {hasSaveGame && (
              <div className="pt-2 text-[9px] text-retro-dimmed font-mono text-center">
                Save atual: Sprint {state.sprint} (XP {state.xp})
              </div>
            )}
          </RetroCard>
        )}

        {view === 'name_input' && (
          <RetroCard title="Nome do Scrum Master" className="text-center space-y-4">
            <p className="text-[9px] text-retro-dimmed font-pressstart text-left mb-2">Digite o seu nome de facilitador:</p>
            <input 
              type="text" 
              value={nameInput} 
              onChange={(e) => setNameInput(e.target.value)}
              maxLength={20}
              className="w-full bg-[#131326] border-4 border-retro-border p-3 text-white font-mono text-center text-sm outline-none focus:border-retro-accent rounded"
              placeholder="Digite seu nome..."
            />
            <div className="flex flex-col gap-3 pt-2">
              <RetroButton variant="success" onClick={handleStartGameWithName} className="py-2.5 uppercase w-full">
                🕹️ Começar Jogo
              </RetroButton>
              <RetroButton variant="danger" onClick={() => setView('main')} className="py-2.5 uppercase w-full">
                Cancelar
              </RetroButton>
            </div>
          </RetroCard>
        )}

        {view === 'achievements' && (
          <RetroCard title="Conquistas Desbloqueadas" className="w-full">
            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
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
                Voltar
              </RetroButton>
            </div>
          </RetroCard>
        )}
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
                Voltar
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
