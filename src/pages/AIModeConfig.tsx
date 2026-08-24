import React, { useState, useEffect } from 'react';
import { RetroCard } from '../components/ui/RetroCard';
import { RetroButton } from '../components/ui/RetroButton';
import {
  AIConfig, AIProvider, AIConfigStorage,
  AI_MODELS, AI_PROVIDER_INFO,
} from '../ai/AIConfig';
import { testConnection } from '../ai/AIService';

interface AIModeConfigProps {
  onBack: () => void;
  onStart: (config: AIConfig, playerName: string) => void;
}

export const AIModeConfig: React.FC<AIModeConfigProps> = ({ onBack, onStart }) => {
  const [provider, setProvider] = useState<AIProvider>('gemini');
  const [model, setModel] = useState('gemini-1.5-flash');
  const [apiKey, setApiKey] = useState('');
  const [playerName, setPlayerName] = useState('Roberto');
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; error?: string } | null>(null);

  // Load saved config on mount
  useEffect(() => {
    const saved = AIConfigStorage.load();
    if (saved) {
      setProvider(saved.provider);
      setModel(saved.model);
      setApiKey(saved.apiKey);
    }
  }, []);

  // Reset model when provider changes
  const handleProviderChange = (p: AIProvider) => {
    setProvider(p);
    setModel(AI_MODELS[p][0].id);
    setTestResult(null);
  };

  const handleTest = async () => {
    if (!apiKey.trim()) { setTestResult({ ok: false, error: 'Insira uma chave de API antes de testar.' }); return; }
    setTesting(true);
    setTestResult(null);
    const result = await testConnection({ provider, model, apiKey });
    setTestResult(result);
    setTesting(false);
  };

  const handleStart = () => {
    if (!apiKey.trim()) { alert('⚠️ Insira sua chave de API para continuar.'); return; }
    if (!playerName.trim()) { alert('⚠️ Insira seu nome de Scrum Master.'); return; }
    const config: AIConfig = { provider, model, apiKey };
    AIConfigStorage.save(config);
    onStart(config, playerName.trim());
  };

  const info = AI_PROVIDER_INFO[provider];
  const models = AI_MODELS[provider];

  return (
    <div className="min-h-screen bg-retro-bg text-retro-text flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Retro grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(19,19,38,0.3)_1px,transparent_1px),linear-gradient(to_right,rgba(19,19,38,0.3)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="w-full max-w-xl relative z-10 space-y-4">

        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="font-pressstart text-lg md:text-2xl text-retro-accent uppercase">🤖 Modo IA</h1>
          <p className="text-xs text-retro-dimmed font-pressstart mt-1">Situações Adversas Geradas por Inteligência Artificial</p>
        </div>

        {/* Player Name */}
        <RetroCard title="👤 Seu Nome de Scrum Master">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={24}
            className="w-full bg-[#131326] border-4 border-retro-border p-3 text-white font-mono text-center text-sm outline-none focus:border-retro-accent rounded"
            placeholder="Digite seu nome..."
          />
        </RetroCard>

        {/* Provider Selection */}
        <RetroCard title="🔌 Escolha a IA">
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(AI_PROVIDER_INFO) as AIProvider[]).map((p) => {
              const pi = AI_PROVIDER_INFO[p];
              return (
                <button
                  key={p}
                  onClick={() => handleProviderChange(p)}
                  className={`p-3 border-2 rounded transition-all text-center ${
                    provider === p
                      ? `${pi.color} bg-slate-900/80 shadow-lg`
                      : 'border-slate-700 bg-slate-950/50 hover:border-slate-500'
                  }`}
                >
                  <div className="text-2xl mb-1">{pi.icon}</div>
                  <div className="font-pressstart text-[8px] md:text-[9px] text-white leading-tight">{pi.name}</div>
                  {!pi.browserSupport && (
                    <div className="text-[7px] text-retro-red font-pressstart mt-1">⚠️ CORS</div>
                  )}
                </button>
              );
            })}
          </div>

          {/* CORS warning for Claude */}
          {!info.browserSupport && (
            <div className="mt-3 p-2 border border-retro-red/50 bg-red-950/30 rounded">
              <p className="text-xs font-sans text-retro-red leading-relaxed">
                ⚠️ <strong>Claude</strong> pode bloquear chamadas diretas do browser por restrições CORS. Se ocorrer erro, use Gemini ou OpenAI.
              </p>
            </div>
          )}
        </RetroCard>

        {/* Model Selection */}
        <RetroCard title={`🧩 Modelo (${info.name})`}>
          <div className="space-y-2">
            {models.map((m) => (
              <button
                key={m.id}
                onClick={() => setModel(m.id)}
                className={`w-full text-left p-3 border-2 rounded transition-all ${
                  model === m.id
                    ? 'border-retro-accent bg-slate-900/80'
                    : 'border-slate-700 bg-slate-950/50 hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-pressstart text-[9px] text-white">{m.label}</span>
                  <span className="text-[8px] font-mono text-retro-dimmed">{m.contextWindow}</span>
                </div>
                <p className="text-xs font-sans text-slate-400 mt-1">{m.description}</p>
              </button>
            ))}
          </div>
        </RetroCard>

        {/* API Key */}
        <RetroCard title="🔑 Chave de API">
          <div className="flex gap-2 mb-2">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 bg-[#131326] border-4 border-retro-border p-3 text-white font-mono text-sm outline-none focus:border-retro-accent rounded"
              placeholder="Cole sua chave aqui..."
              autoComplete="off"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="px-3 border-2 border-slate-600 bg-slate-900 text-retro-dimmed hover:text-white hover:border-slate-400 rounded text-sm"
              title={showKey ? 'Ocultar' : 'Mostrar'}
            >
              {showKey ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Get key link */}
          <p className="text-xs font-sans text-slate-400 mb-3">
            Não tem chave?{' '}
            <a
              href={info.getKeyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-retro-accent underline hover:text-white"
            >
              Obter chave {info.name} →
            </a>
          </p>

          {/* Security notice */}
          <div className="p-2 border border-slate-700 bg-slate-900/40 rounded">
            <p className="text-[10px] font-sans text-slate-500 leading-relaxed">
              🔒 Sua chave é salva <strong className="text-slate-400">apenas localmente</strong> no seu browser (localStorage). Nunca é enviada a servidores de terceiros.
            </p>
          </div>

          {/* Test connection */}
          <div className="flex items-center gap-3 mt-3">
            <RetroButton
              variant="secondary"
              onClick={handleTest}
              className="text-[9px] uppercase"
            >
              {testing ? '⏳ Testando...' : '🔌 Testar Conexão'}
            </RetroButton>

            {testResult && (
              <span className={`font-pressstart text-[9px] ${testResult.ok ? 'text-retro-green' : 'text-retro-red'}`}>
                {testResult.ok ? '✅ Conexão OK!' : `❌ ${testResult.error}`}
              </span>
            )}
          </div>
        </RetroCard>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <RetroButton
            variant="success"
            onClick={handleStart}
            className="py-3 text-sm uppercase font-pressstart w-full"
          >
            🤖 Iniciar Modo IA
          </RetroButton>
          <RetroButton variant="secondary" onClick={onBack} className="py-2 text-xs uppercase w-full">
            ← Voltar ao Menu
          </RetroButton>
        </div>

        {/* Info box */}
        <div className="border border-retro-purple/40 bg-purple-950/20 p-3 rounded">
          <p className="text-xs font-sans text-slate-300 leading-relaxed">
            <strong className="text-retro-purple font-pressstart text-[8px]">ℹ️ COMO FUNCIONA</strong><br />
            A IA gera situações únicas entre os personagens do time (PO, devs, QA, UX, DevOps) a cada rodada. Você decide como o Scrum Master deve agir e recebe feedback pedagógico sobre as boas práticas ágeis.
          </p>
        </div>
      </div>
    </div>
  );
};
