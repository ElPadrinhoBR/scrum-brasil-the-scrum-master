import React, { useState } from 'react';
import { GameProvider, useGame } from './game/GameContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { MainMenu } from './pages/MainMenu';
import { HUD } from './components/hud/HUD';
import { GameScreen } from './pages/GameScreen';
import { SprintBoardPage } from './pages/SprintBoardPage';
import { TeamScreen } from './pages/TeamScreen';
import { ResultsScreen } from './pages/ResultsScreen';
import { AIModeConfig } from './pages/AIModeConfig';
import { AIModeGame } from './pages/AIModeGame';
import { AIConfig } from './ai/AIConfig';

const GameShell: React.FC<{ onBackToMenu: () => void }> = ({ onBackToMenu }) => {
  const { state, activeTab, setActiveTab } = useGame();

  if (state.phase === 'RESULTS') {
    return <ResultsScreen onBackToMenu={onBackToMenu} />;
  }

  return (
    <div className="min-h-screen bg-retro-bg text-retro-text p-4 md:p-6 select-none max-w-7xl mx-auto flex flex-col">
      <HUD state={state} activeTab={activeTab} setActiveTab={setActiveTab} onExit={onBackToMenu} />
      <main className="grow flex flex-col bg-slate-950/20 border-2 border-slate-900 rounded-lg p-2 md:p-4 min-h-[500px]">
        {activeTab === 'game' && <GameScreen />}
        {activeTab === 'board' && <SprintBoardPage />}
        {activeTab === 'team' && <TeamScreen />}
      </main>
    </div>
  );
};

type AppView = 'menu' | 'game' | 'ai_config' | 'ai_game';

export const App: React.FC = () => {
  const [view, setView] = useState<AppView>('menu');
  const [aiConfig, setAiConfig] = useState<AIConfig | null>(null);
  const [aiPlayerName, setAiPlayerName] = useState('');

  const handleStartAI = (config: AIConfig, playerName: string) => {
    setAiConfig(config);
    setAiPlayerName(playerName);
    setView('ai_game');
  };

  return (
    <LanguageProvider>
      <GameProvider>
        {view === 'menu' && (
          <MainMenu
            onStartGame={() => setView('game')}
            onAIMode={() => setView('ai_config')}
          />
        )}

        {view === 'game' && (
          <GameShell onBackToMenu={() => setView('menu')} />
        )}

        {view === 'ai_config' && (
          <AIModeConfig
            onBack={() => setView('menu')}
            onStart={handleStartAI}
          />
        )}

        {view === 'ai_game' && aiConfig && (
          <AIModeGame
            config={aiConfig}
            playerName={aiPlayerName}
            onBack={() => setView('ai_config')}
          />
        )}
      </GameProvider>
    </LanguageProvider>
  );
};

export default App;
