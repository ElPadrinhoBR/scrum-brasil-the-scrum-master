import React, { useState } from 'react';
import { useGame } from '../game/GameContext';
import { RetroCard } from '../components/ui/RetroCard';
import { RetroButton } from '../components/ui/RetroButton';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { AgileLearningPage } from './AgileLearningPage';
import { TutorialPage } from './TutorialPage';
import { COMPANIES_DATA, Company } from '../data/companies';
import { PixelCharacter } from '../components/characters/PixelCharacter';

interface MainMenuProps {
  onStartGame: () => void;
  onAIMode: () => void;
}

const LANG_OPTIONS: { code: Language; flag: string; label: string }[] = [
  { code: 'pt-BR', flag: '🇧🇷', label: 'PT' },
  { code: 'en-US', flag: '🇺🇸', label: 'EN' },
  { code: 'es-ES', flag: '🇪🇸', label: 'ES' },
];

type MainMenuView =
  | 'main'
  | 'achievements'
  | 'credits'
  | 'name_input'
  | 'character_select'
  | 'company_select'
  | 'mode_select'
  | 'agile_learning'
  | 'tutorial';

export const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onAIMode }) => {
  const { startNewGame, loadSavedGame, hasSaveGame, state, muted, toggleMute } = useGame();
  const { lang, setLang, t } = useLanguage();
  const [view, setView] = useState<MainMenuView>('main');
  const [nameInput, setNameInput] = useState('Roberto');
  const [selectedAvatar, setSelectedAvatar] = useState<'roberto' | 'mariana'>('roberto');
  const [selectedCompany, setSelectedCompany] = useState<string>('novatech');
  const [inspectedCompany, setInspectedCompany] = useState<Company>(COMPANIES_DATA[0]);

  // If user navigated to Agile Learning, render it full-screen
  if (view === 'agile_learning') {
    return <AgileLearningPage onBack={() => setView('main')} />;
  }

  // If user navigated to Tutorial, render it full-screen
  if (view === 'tutorial') {
    return <TutorialPage onBack={() => setView('main')} onStartGame={() => setView('name_input')} />;
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
    setView('character_select');
  };

  const handleCharacterConfirm = (avatar: 'roberto' | 'mariana') => {
    setSelectedAvatar(avatar);
    setView('company_select');
  };

  const handleCompanyConfirm = () => {
    setSelectedCompany(inspectedCompany.id);
    setView('mode_select');
  };

  const handleStartGameWithMode = (mode: 'campaign' | 'sandbox') => {
    const gender = selectedAvatar === 'mariana' ? 'female' : 'male';
    startNewGame(nameInput.trim(), mode, gender, selectedAvatar, selectedCompany);
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
      <div className="text-center mb-6 relative z-10 animate-pulse">
        <h1 className="font-pressstart text-3xl md:text-5xl text-retro-accent tracking-tighter drop-shadow-[6px_6px_0px_rgba(0,0,0,0.8)] uppercase">
          {t.menu.title}
        </h1>
        <h2 className="font-pressstart text-[10px] md:text-[13px] text-retro-purple mt-3 tracking-widest bg-slate-950/80 px-4 py-1.5 border-2 border-retro-border inline-block uppercase">
          {t.menu.subtitle}
        </h2>
      </div>

      <div className="w-full max-w-lg relative z-10">

        {/* ── 1. MAIN MENU ── */}
        {view === 'main' && (
          <RetroCard title="Menu Principal" className="text-center space-y-4">
            <div className="flex flex-col gap-3">
              <RetroButton variant="success" onClick={handleNewGame} className="py-3 text-[11px] uppercase font-pressstart">
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

              {/* Modo Tutorial / Como Jogar */}
              <button
                onClick={() => setView('tutorial')}
                className="w-full py-3 border-2 border-retro-green bg-[#0c2615]/60 hover:bg-[#0c2615] hover:border-retro-green transition-all font-pressstart text-[11px] text-retro-green hover:text-white uppercase flex items-center justify-center gap-2"
              >
                <span>🎓</span> Modo Tutorial / Como Jogar
              </button>

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

              <RetroButton variant="secondary" onClick={() => setView('achievements')} className="py-2.5 text-[10px] uppercase">
                {t.menu.achievements}
              </RetroButton>

              <RetroButton variant="secondary" onClick={() => setView('credits')} className="py-2.5 text-[10px] uppercase">
                {t.menu.credits}
              </RetroButton>

              {/* Sound Toggle */}
              <button 
                onClick={toggleMute}
                className="border-2 border-dashed border-retro-border py-2 text-[9px] font-pressstart text-retro-dimmed hover:text-white uppercase mt-1 bg-[#0c0c14]"
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

        {/* ── 2. NAME INPUT ── */}
        {view === 'name_input' && (
          <RetroCard title={t.menu.nameTitle} className="text-center space-y-4">
            <p className="text-[9px] text-retro-dimmed font-pressstart text-left mb-1">
              Passo 1 de 4: {t.menu.nameLabel}
            </p>
            <input 
              type="text" 
              value={nameInput} 
              onChange={(e) => setNameInput(e.target.value)}
              maxLength={20}
              className="w-full bg-[#131326] border-4 border-retro-border p-3 text-white font-mono text-center text-sm outline-none focus:border-retro-accent rounded"
              placeholder={t.menu.namePlaceholder}
              onKeyDown={(e) => e.key === 'Enter' && handleNameConfirm()}
            />
            <div className="flex flex-col gap-2.5 pt-2">
              <RetroButton variant="success" onClick={handleNameConfirm} className="py-2.5 uppercase w-full">
                {t.menu.nameNext} ▶
              </RetroButton>
              <RetroButton variant="danger" onClick={() => setView('main')} className="py-2 uppercase w-full">
                {t.menu.cancel}
              </RetroButton>
            </div>
          </RetroCard>
        )}

        {/* ── 3. CHARACTER SELECT (Homem ou Mulher) ── */}
        {view === 'character_select' && (
          <RetroCard title="Escolha seu Personagem" className="space-y-4">
            <p className="text-[9px] text-retro-dimmed font-pressstart text-center">
              Passo 2 de 4: Escolha seu avatar de Scrum Master
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Roberto */}
              <div
                onClick={() => setSelectedAvatar('roberto')}
                className={`border-4 p-3 rounded cursor-pointer transition-all flex flex-col items-center text-center ${
                  selectedAvatar === 'roberto'
                    ? 'border-retro-accent bg-slate-900 shadow-retro'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-600'
                }`}
              >
                <PixelCharacter characterId="roberto" expression="confident" size={100} />
                <h3 className="font-pressstart text-xs text-white mt-2">Roberto</h3>
                <span className="text-[8px] font-pressstart text-retro-blue uppercase mt-0.5">
                  👨‍💼 Scrum Master
                </span>
                <p className="text-[10px] font-sans text-slate-300 mt-2 leading-tight">
                  Perfil analítico e facilitador. Especialista em métricas ágeis, remoção técnica de impedimentos e cadência de Sprints.
                </p>
                {selectedAvatar === 'roberto' && (
                  <div className="mt-2 text-[8px] font-pressstart text-retro-accent">
                    ✓ SELECIONADO
                  </div>
                )}
              </div>

              {/* Mariana */}
              <div
                onClick={() => setSelectedAvatar('mariana')}
                className={`border-4 p-3 rounded cursor-pointer transition-all flex flex-col items-center text-center ${
                  selectedAvatar === 'mariana'
                    ? 'border-retro-accent bg-slate-900 shadow-retro'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-600'
                }`}
              >
                <PixelCharacter characterId="mariana" expression="confident" size={100} />
                <h3 className="font-pressstart text-xs text-white mt-2">Mariana</h3>
                <span className="text-[8px] font-pressstart text-retro-purple uppercase mt-0.5">
                  👩‍💼 Scrum Master
                </span>
                <p className="text-[10px] font-sans text-slate-300 mt-2 leading-tight">
                  Perfil empático e transformador. Especialista em inteligência emocional, resolução de conflitos interpessoais e alinhamento de PO.
                </p>
                {selectedAvatar === 'mariana' && (
                  <div className="mt-2 text-[8px] font-pressstart text-retro-accent">
                    ✓ SELECIONADA
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <RetroButton variant="secondary" onClick={() => setView('name_input')} className="py-2 uppercase w-full">
                ◀ Voltar
              </RetroButton>
              <RetroButton
                variant="success"
                onClick={() => handleCharacterConfirm(selectedAvatar)}
                className="py-2.5 uppercase w-full font-pressstart"
              >
                Confirmar Personagem ▶
              </RetroButton>
            </div>
          </RetroCard>
        )}

        {/* ── 4. COMPANY SELECT (Novatech + 10 Em Breve) ── */}
        {view === 'company_select' && (
          <RetroCard title="Escolha a Empresa" className="space-y-4 max-w-xl">
            <div className="text-center">
              <span className="text-[9px] text-retro-dimmed font-pressstart">
                Passo 3 de 4: Selecione o desafio corporativo
              </span>
              <p className="text-xs font-sans text-slate-300 mt-1">
                Você ajudará a empresa a entregar seu produto chave sob forte concorrência.
              </p>
            </div>

            {/* Selected Company Preview Box */}
            <div className="border-2 border-retro-accent bg-[#101024] p-3 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{inspectedCompany.icon}</span>
                    <h3 className="font-pressstart text-xs text-white">{inspectedCompany.name}</h3>
                  </div>
                  <span className="text-[9px] font-mono text-retro-dimmed">{inspectedCompany.segment}</span>
                </div>
                <span className={`text-[8px] font-pressstart px-2 py-0.5 border rounded ${inspectedCompany.status === 'active' ? 'bg-green-950 border-retro-green text-retro-green' : 'bg-yellow-950 border-yellow-600 text-yellow-400'}`}>
                  {inspectedCompany.badge}
                </span>
              </div>
              <p className="text-xs font-sans text-retro-accent italic mt-2">
                "{inspectedCompany.tagline}"
              </p>
              <p className="text-[11px] font-sans text-slate-300 mt-1 leading-snug">
                {inspectedCompany.description}
              </p>
              <div className="mt-2 text-[9px] font-mono text-slate-400 border-t border-slate-800 pt-1.5">
                <span className="text-retro-purple font-semibold">Desafio Principal:</span> {inspectedCompany.contextChallenge}
              </div>
            </div>

            {/* Company List Scroll */}
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {COMPANIES_DATA.map((comp) => {
                const isInspected = inspectedCompany.id === comp.id;

                return (
                  <button
                    key={comp.id}
                    onClick={() => {
                      setInspectedCompany(comp);
                      if (comp.status === 'active') {
                        setSelectedCompany(comp.id);
                      }
                    }}
                    className={`w-full text-left p-2 border-2 rounded transition-all flex items-center justify-between gap-2 ${
                      isInspected
                        ? 'border-retro-accent bg-slate-900/90'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{comp.icon}</span>
                      <div>
                        <div className="font-pressstart text-[9px] text-white leading-tight">
                          {comp.name}
                        </div>
                        <span className="text-[8px] font-mono text-retro-dimmed">
                          {comp.product.split('(')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {comp.status === 'active' ? (
                        <span className="font-pressstart text-[8px] text-retro-green bg-green-950/80 px-1.5 py-0.5 border border-green-800 rounded">
                          ATIVO
                        </span>
                      ) : (
                        <span className="font-pressstart text-[7px] text-yellow-400 bg-yellow-950/80 px-1.5 py-0.5 border border-yellow-800 rounded">
                          EM BREVE
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <RetroButton variant="secondary" onClick={() => setView('character_select')} className="py-2 uppercase w-full">
                ◀ Voltar
              </RetroButton>
              <RetroButton
                variant="success"
                onClick={handleCompanyConfirm}
                className="py-2.5 uppercase w-full font-pressstart truncate"
              >
                Avançar com {inspectedCompany.name.split(' ')[0]} ▶
              </RetroButton>
            </div>
          </RetroCard>
        )}

        {/* ── 5. MODE SELECT ── */}
        {view === 'mode_select' && (
          <RetroCard title={t.menu.modeTitle} className="space-y-4">
            <div className="text-center">
              <span className="text-[9px] text-retro-dimmed font-pressstart">
                Passo 4 de 4: Escolha a modalidade
              </span>
              <p className="text-xs font-sans text-white mt-1">
                Scrum Master: <strong className="text-retro-accent">{nameInput}</strong> ({selectedAvatar === 'mariana' ? 'Mariana' : 'Roberto'}) · Empresa: <strong className="text-retro-purple">{COMPANIES_DATA.find(c => c.id === selectedCompany)?.name || 'Novatech'}</strong>
              </p>
            </div>

            {/* Campaign Mode */}
            <button
              onClick={() => handleStartGameWithMode('campaign')}
              className="w-full text-left p-4 border-2 border-retro-blue bg-[#0c1326]/70 hover:border-retro-accent hover:bg-[#0c1326] transition-all rounded group shadow-md"
            >
              <div className="font-pressstart text-[10px] text-retro-accent mb-1 group-hover:text-white">
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
              className="w-full text-left p-4 border-2 border-retro-purple bg-[#1a0c26]/70 hover:border-retro-accent hover:bg-[#1a0c26] transition-all rounded group shadow-md"
            >
              <div className="font-pressstart text-[10px] text-retro-purple mb-1 group-hover:text-white">
                {t.menu.sandboxTitle}
              </div>
              <p className="text-[9px] font-sans text-slate-300 leading-relaxed">
                {t.menu.sandboxDesc}
              </p>
              <div className="mt-2 text-[8px] font-pressstart text-retro-purple bg-purple-950/40 inline-block px-2 py-0.5 border border-purple-800">
                {t.menu.sandboxBadge}
              </div>
            </button>

            <RetroButton variant="secondary" onClick={() => setView('company_select')} className="py-2 text-[9px] uppercase w-full mt-1">
              ◀ Voltar
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
                    className={`border-2 p-2 flex items-center space-x-3 ${
                      isUnlocked 
                        ? 'border-retro-accent bg-retro-panel' 
                        : 'border-slate-800 opacity-40 bg-slate-950'
                    }`}
                  >
                    <div className="text-xl">{ach.icon}</div>
                    <div className="flex-1">
                      <div className="font-pressstart text-[9px] text-white">{ach.title}</div>
                      <div className="text-[8px] text-retro-dimmed font-mono mt-0.5">{ach.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <RetroButton variant="secondary" onClick={() => setView('main')} className="w-full mt-4 text-[9px] uppercase">
              {t.menu.back}
            </RetroButton>
          </RetroCard>
        )}

        {/* ── CREDITS ── */}
        {view === 'credits' && (
          <RetroCard title="Créditos & Desenvolvimento" className="w-full text-center space-y-3">
            <p className="text-xs font-sans text-slate-300">
              Projeto educacional desenvolvido para estudantes de TI e Gestão Ágil da Universidade Cruzeiro do Sul.
            </p>
            <p className="text-xs font-sans text-slate-300">
              Construído com React 18, TypeScript, Tailwind CSS, Vite e Web Speech API.
            </p>
            <div className="border-t border-slate-800 pt-3">
              <p className="text-[9px] text-retro-dimmed font-mono">
                Dedicado a todos os Scrum Masters e desenvolvedores brasileiros que enfrentam a corrida diária de entrega de valor!
              </p>
            </div>
            <RetroButton variant="secondary" onClick={() => setView('main')} className="w-full mt-2 text-[9px] uppercase">
              {t.menu.back}
            </RetroButton>
          </RetroCard>
        )}

      </div>
    </div>
  );
};
