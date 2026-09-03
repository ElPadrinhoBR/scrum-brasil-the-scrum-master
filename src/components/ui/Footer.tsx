import React, { useEffect, useState } from 'react';

export const GAME_VERSION = 'v1.2.1';

export const Footer: React.FC = () => {
  const [visitCount, setVisitCount] = useState<number>(144);
  const [justUpdated, setJustUpdated] = useState(false);

  useEffect(() => {
    // Chave única de armazenamento local
    const STORAGE_KEY = 'scrum_master_page_views_count';
    const BASE_COUNT = 143;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let current = stored ? parseInt(stored, 10) : BASE_COUNT;
      if (isNaN(current) || current < BASE_COUNT) {
        current = BASE_COUNT;
      }

      // Incrementa a cada visita / recarregamento da página (F5)
      const nextCount = current + 1;
      localStorage.setItem(STORAGE_KEY, nextCount.toString());
      setVisitCount(nextCount);
      setJustUpdated(true);

      const timer = setTimeout(() => setJustUpdated(false), 2000);
      return () => clearTimeout(timer);
    } catch {
      // Fallback em caso de bloqueio estrito de cookies/armazenamento
      setVisitCount(144);
    }
  }, []);

  return (
    <footer className="w-full py-2 px-4 mt-auto border-t border-slate-800/80 bg-[#080812]/90 flex flex-wrap items-center justify-between gap-2 text-[8px] font-mono text-slate-400 select-none">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-retro-green animate-pulse" />
          <span className="text-retro-dimmed">Versão:</span>
          <strong className="text-retro-accent font-pressstart text-[7px]">{GAME_VERSION}</strong>
        </span>

        <span className="text-slate-700">|</span>

        <span className="flex items-center gap-1 text-slate-400">
          <span>👥 Visitas:</span>
          <strong
            className={`font-pressstart text-[7px] px-1.5 py-0.5 rounded border transition-all duration-500 ${
              justUpdated
                ? 'text-retro-green border-retro-green bg-green-950/60 scale-105 shadow-sm'
                : 'text-white border-slate-800 bg-slate-900'
            }`}
            title="Total de visualizações e visitas nesta sessão"
          >
            {visitCount.toLocaleString('pt-BR')}
          </strong>
        </span>
      </div>

      <div className="flex items-center gap-2 text-[7px] text-slate-500 font-sans">
        <span>Scrum Brasil: The Scrum Master</span>
        <span className="text-slate-700">•</span>
        <span>Cruzeiro do Sul</span>
      </div>
    </footer>
  );
};
