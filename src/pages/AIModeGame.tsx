import React, { useState, useEffect, useCallback } from 'react';
import { RetroButton } from '../components/ui/RetroButton';
import { PixelCharacter } from '../components/characters/PixelCharacter';
import { AIConfig, AISituation } from '../ai/AIConfig';
import { generateSituation } from '../ai/AIService';
import { CHARACTERS_DATA } from '../data/characters';

const CHARACTERS_ARRAY = Object.values(CHARACTERS_DATA);

const findCharacter = (speakerName: string) =>
  CHARACTERS_ARRAY.find((c) => speakerName.toLowerCase().includes(c.name.toLowerCase())) ?? CHARACTERS_ARRAY[0];

interface AIModeGameProps {
  config: AIConfig;
  playerName: string;
  onBack: () => void;
}

interface RoundResult {
  titulo: string;
  avaliacao: 'BOM' | 'MEDIANO' | 'RUIM';
  explicacao: string;
  escolhaTexto: string;
}

const AVALIACAO_STYLE = {
  BOM: { border: 'border-retro-green', bg: 'bg-green-950/40', text: 'text-retro-green', badge: '✅ BOM' },
  MEDIANO: { border: 'border-yellow-500', bg: 'bg-yellow-950/40', text: 'text-yellow-400', badge: '⚡ MEDIANO' },
  RUIM: { border: 'border-retro-red', bg: 'bg-red-950/40', text: 'text-retro-red', badge: '❌ RUIM' },
};

const SCORE_POINTS = { BOM: 3, MEDIANO: 1, RUIM: 0 };

const BG_IMAGES: Record<string, string> = {
  escritorio: `${import.meta.env.BASE_URL}backgrounds/escritorio.jpg`,
  reuniao: `${import.meta.env.BASE_URL}backgrounds/reuniao.jpg`,
  desenvolvimento: `${import.meta.env.BASE_URL}backgrounds/desenvolvimento.jpg`,
  cafeteria: `${import.meta.env.BASE_URL}backgrounds/cafeteria.jpg`,
  servidores: `${import.meta.env.BASE_URL}backgrounds/servidores.jpg`,
  diretoria: `${import.meta.env.BASE_URL}backgrounds/diretoria.jpg`,
};


export const AIModeGame: React.FC<AIModeGameProps> = ({ config, playerName, onBack }) => {
  const [situation, setSituation] = useState<AISituation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [choiceMade, setChoiceMade] = useState<number | null>(null);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<RoundResult[]>([]);
  const [previousTitles, setPreviousTitles] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [bgError, setBgError] = useState(false);

  const loadNextSituation = useCallback(async () => {
    setLoading(true);
    setError(null);
    setChoiceMade(null);
    setBgError(false);
    setSituation(null);

    try {
      const sit = await generateSituation(config, round, playerName, previousTitles);
      setSituation(sit);
      setPreviousTitles((prev) => [...prev.slice(-10), sit.titulo]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [config, round, playerName, previousTitles]);

  useEffect(() => {
    loadNextSituation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChoice = (idx: number) => {
    if (!situation || choiceMade !== null) return;
    setChoiceMade(idx);
    const choice = situation.escolhas[idx];
    const points = SCORE_POINTS[choice.avaliacao];
    setScore((s) => s + points);
    setHistory((h) => [
      { titulo: situation.titulo, avaliacao: choice.avaliacao, explicacao: choice.explicacao, escolhaTexto: choice.texto },
      ...h,
    ]);
  };

  const handleNext = () => {
    setRound((r) => r + 1);
    loadNextSituation();
  };

  const char = situation ? findCharacter(situation.speaker) : null;
  const bgUrl = situation ? BG_IMAGES[situation.background] : '';
  const scorePercent = round > 1 ? Math.round((score / ((round - 1) * 3)) * 100) : 0;

  return (
    <div className="min-h-screen bg-retro-bg text-retro-text flex flex-col select-none">

      {/* ── HUD Bar ── */}
      <div className="border-b-4 border-retro-border bg-retro-panel px-4 py-2 flex flex-wrap items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-4">
          <div className="font-pressstart text-xs text-retro-accent">🤖 MODO IA</div>
          <div className="font-pressstart text-xs text-retro-dimmed">
            RODADA <span className="text-white">{round}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Score */}
          <div className="bg-[#131326] border border-retro-border px-3 py-1 font-pressstart text-xs text-retro-green">
            ⭐ {score} pts
          </div>
          {round > 1 && (
            <div className="bg-[#131326] border border-retro-border px-3 py-1 font-pressstart text-[9px] text-retro-accent">
              {scorePercent}% acerto
            </div>
          )}
          <RetroButton variant="secondary" onClick={() => setShowHistory(!showHistory)} className="text-[9px]">
            📊 Histórico ({history.length})
          </RetroButton>
          <RetroButton variant="danger" onClick={onBack} className="text-[9px]">
            🚪 Sair
          </RetroButton>
        </div>
      </div>

      {/* ── History Panel ── */}
      {showHistory && (
        <div className="absolute top-16 right-4 z-50 w-80 max-h-96 overflow-y-auto bg-retro-panel border-4 border-retro-border shadow-retro p-3 space-y-2">
          <div className="font-pressstart text-[9px] text-retro-accent mb-2">📊 HISTÓRICO DE RODADAS</div>
          {history.length === 0 && <p className="text-xs text-retro-dimmed font-sans">Nenhuma rodada concluída ainda.</p>}
          {history.map((h, i) => {
            const s = AVALIACAO_STYLE[h.avaliacao];
            return (
              <div key={i} className={`border ${s.border} ${s.bg} p-2 rounded`}>
                <div className={`font-pressstart text-[8px] ${s.text} mb-1`}>{s.badge} — {h.titulo}</div>
                <p className="text-[9px] font-sans text-slate-300 italic">"{h.escolhaTexto}"</p>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 relative flex flex-col">

        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          {bgUrl && !bgError && (
            <img
              src={bgUrl}
              alt="background"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              onError={() => setBgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-retro-bg via-retro-bg/60 to-transparent" />
        </div>

        {/* ── Loading state ── */}
        {loading && (
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-4 p-8">
            <div className="font-pressstart text-retro-accent text-sm animate-pulse">🤖 Gerando situação...</div>
            <div className="text-xs text-retro-dimmed font-pressstart">A IA está criando um novo desafio para você</div>
            <div className="flex gap-1 mt-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-3 h-3 bg-retro-accent rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* ── Error state ── */}
        {error && !loading && (
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-4 p-8 max-w-lg mx-auto text-center">
            <div className="font-pressstart text-retro-red text-sm">❌ Erro ao gerar situação</div>
            <p className="text-sm font-sans text-slate-300 leading-relaxed border border-retro-red/40 bg-red-950/30 p-3 rounded">{error}</p>
            <div className="flex gap-3">
              <RetroButton variant="success" onClick={loadNextSituation}>
                🔄 Tentar Novamente
              </RetroButton>
              <RetroButton variant="secondary" onClick={onBack}>
                ← Voltar Config
              </RetroButton>
            </div>
          </div>
        )}

        {/* ── Situation + Choices ── */}
        {situation && !loading && !error && (
          <div className="relative z-10 flex-1 flex flex-col">

            {/* Character Area */}
            <div className="relative flex-1 flex items-end px-4 pb-2" style={{ minHeight: '220px' }}>
              {char && (
                <div className="absolute left-10 md:left-20 bottom-0">
                  <PixelCharacter
                    characterId={char.id}
                    expression={situation.expressao as Parameters<typeof PixelCharacter>[0]['expression']}
                    size={160}
                  />
                </div>
              )}
            </div>

            {/* Dialogue + Title */}
            <div className="px-3 md:px-6 pb-2">
              {/* Situation title badge */}
              <div className="inline-block font-pressstart text-[9px] text-retro-accent bg-slate-950/80 border border-retro-accent/50 px-3 py-1 mb-2 uppercase">
                ⚠️ {situation.titulo}
              </div>

              {/* Speaker dialogue box */}
              <div className="bg-retro-panel/95 border-4 border-retro-border p-4 mb-3 shadow-retro">
                <div className="font-pressstart text-xs text-retro-accent mb-2">{situation.speaker}</div>
                <p className="text-sm md:text-base font-sans text-white leading-relaxed">{situation.situacao}</p>
              </div>

              {/* Choices — shown before selection */}
              {choiceMade === null && (
                <div className="space-y-2">
                  <p className="font-pressstart text-[9px] text-retro-dimmed uppercase mb-2">
                    💬 Como você, {playerName}, vai agir como Scrum Master?
                  </p>
                  {situation.escolhas.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoice(idx)}
                      className="w-full text-left p-3 border-2 border-slate-700 bg-slate-900/80 hover:border-retro-accent hover:bg-slate-800/80 transition-all rounded text-sm font-sans text-slate-300 hover:text-white"
                    >
                      <span className="font-pressstart text-[9px] text-retro-accent mr-2">{['A', 'B', 'C'][idx]}.</span>
                      {c.texto}
                    </button>
                  ))}
                </div>
              )}

              {/* Feedback — shown after selection */}
              {choiceMade !== null && situation.escolhas[choiceMade] && (() => {
                const chosen = situation.escolhas[choiceMade];
                const style = AVALIACAO_STYLE[chosen.avaliacao];
                return (
                  <div className="space-y-3">
                    {/* All choices with their ratings revealed */}
                    {situation.escolhas.map((c, idx) => {
                      const s = AVALIACAO_STYLE[c.avaliacao];
                      const isChosen = idx === choiceMade;
                      return (
                        <div
                          key={idx}
                          className={`border-2 rounded p-3 transition-all ${
                            isChosen ? `${s.border} ${s.bg}` : 'border-slate-800 bg-slate-950/40 opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-pressstart text-[9px] ${s.text}`}>{s.badge}</span>
                            {isChosen && <span className="font-pressstart text-[8px] text-retro-dimmed">← SUA ESCOLHA</span>}
                          </div>
                          <p className="text-sm font-sans text-slate-300">{c.texto}</p>
                          {isChosen && (
                            <p className="text-xs font-sans text-slate-400 mt-2 leading-relaxed border-t border-slate-700/50 pt-2">
                              💡 {c.explicacao}
                            </p>
                          )}
                        </div>
                      );
                    })}

                    {/* Score earned */}
                    <div className={`flex items-center justify-between border ${style.border} ${style.bg} px-4 py-2 rounded`}>
                      <span className={`font-pressstart text-sm ${style.text}`}>{style.badge}</span>
                      <span className="font-pressstart text-sm text-white">+{SCORE_POINTS[chosen.avaliacao]} pts</span>
                    </div>

                    {/* Next button */}
                    <RetroButton variant="success" onClick={handleNext} className="w-full py-3 uppercase text-sm">
                      ▶ Próxima Situação (Rodada {round + 1})
                    </RetroButton>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
