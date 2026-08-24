import React, { useState, useEffect } from 'react';
import { RetroCard } from '../components/ui/RetroCard';
import { RetroButton } from '../components/ui/RetroButton';
import {
  AIConfig, AIProvider, AIConfigStorage, AI_PROVIDER_INFO,
} from '../ai/AIConfig';
import { testConnection } from '../ai/AIService';

interface AIModeConfigProps {
  onBack: () => void;
  onStart: (config: AIConfig, playerName: string) => void;
}

// Sugestões de modelos por provider — apenas referência, não lista obrigatória
const MODEL_HINTS: Record<AIProvider, { id: string; label: string }[]> = {
  gemini: [
    { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
    { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
    { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
    { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
    { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
  ],
  openai: [
    { id: 'gpt-4o', label: 'GPT-4o' },
    { id: 'gpt-4o-mini', label: 'GPT-4o Mini' },
    { id: 'o1-mini', label: 'o1 Mini' },
    { id: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { id: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  ],
  claude: [
    { id: 'claude-opus-4-5', label: 'Claude Opus 4.5' },
    { id: 'claude-sonnet-4-5', label: 'Claude Sonnet 4.5' },
    { id: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet' },
    { id: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku' },
    { id: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku' },
  ],
};

const DEFAULT_MODELS: Record<AIProvider, string> = {
  gemini: 'gemini-2.5-flash',
  openai: 'gpt-4o',
  claude: 'claude-sonnet-4-5',
};

export const AIModeConfig: React.FC<AIModeConfigProps> = ({ onBack, onStart }) => {
  const [provider, setProvider] = useState<AIProvider>('gemini');
  const [model, setModel] = useState(DEFAULT_MODELS.gemini);
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

  const handleProviderChange = (p: AIProvider) => {
    setProvider(p);
    setModel(DEFAULT_MODELS[p]);
    setTestResult(null);
  };

  const handleTest = async () => {
    if (!apiKey.trim()) { setTestResult({ ok: false, error: 'Insira uma chave de API antes de testar.' }); return; }
    if (!model.trim()) { setTestResult({ ok: false, error: 'Insira o nome do modelo.' }); return; }
    setTesting(true);
    setTestResult(null);
    const result = await testConnection({ provider, model: model.trim(), apiKey });
    setTestResult(result);
    setTesting(false);
  };

  const handleStart = () => {
    if (!apiKey.trim()) { alert('⚠️ Insira sua chave de API para continuar.'); return; }
    if (!model.trim()) { alert('⚠️ Insira o nome do modelo.'); return; }
    if (!playerName.trim()) { alert('⚠️ Insira seu nome de Scrum Master.'); return; }
    const config: AIConfig = { provider, model: model.trim(), apiKey };
    AIConfigStorage.save(config);
    onStart(config, playerName.trim());
  };

  const info = AI_PROVIDER_INFO[provider];
  const hints = MODEL_HINTS[provider];

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

        {/* Model — free text input + quick-fill chips */}
        <RetroCard title={`🧩 Modelo — ${info.name}`}>
          {/* Free text field */}
          <input
            type="text"
            value={model}
            onChange={(e) => { setModel(e.target.value); setTestResult(null); }}
            className="w-full bg-[#131326] border-4 border-retro-border p-3 text-white font-mono text-sm outline-none focus:border-retro-accent rounded mb-3"
            placeholder="Digite o ID exato do modelo..."
            spellCheck={false}
            autoComplete="off"
          />

          {/* Quick-fill suggestion chips */}
          <p className="text-[9px] text-retro-dimmed font-pressstart mb-2 uppercase">Sugestões rápidas:</p>
          <div className="flex flex-wrap gap-1.5">
            {hints.map((h) => (
              <button
                key={h.id}
                onClick={() => { setModel(h.id); setTestResult(null); }}
                title={h.id}
                className={`px-2 py-1 text-[9px] font-mono border rounded transition-all ${
                  model === h.id
                    ? 'border-retro-accent bg-slate-800 text-retro-accent'
                    : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-500 hover:text-white'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>

          <p className="text-[9px] font-sans text-slate-500 mt-3">
            💡 Digite qualquer modelo disponível no provider escolhido. Os chips acima são apenas atalhos.
          </p>
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
          <div className="flex flex-wrap items-center gap-3 mt-3">
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
