import React, { useEffect, useState } from 'react';

export const GAME_VERSION = 'v1.2.0';

export const Footer: React.FC = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    // 1. Contador local resiliente
    const LOCAL_KEY = 'scrum_master_visit_count_v1';
    let currentLocal = parseInt(localStorage.getItem(LOCAL_KEY) || '142', 10);
    
    // Incrementa na primeira visualização da sessão
    const sessionKey = 'scrum_master_session_visited';
    if (!sessionStorage.getItem(sessionKey)) {
      currentLocal += 1;
      localStorage.setItem(LOCAL_KEY, currentLocal.toString());
      sessionStorage.setItem(sessionKey, 'true');
    }
    setVisitCount(currentLocal);

    // 2. Tenta sincronizar com contador público online
    const controller = new AbortController();
    fetch('https://api.counterapi.dev/v1/scrum-brasil-the-scrum-master/visits/up', {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Counter API offline');
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.count === 'number') {
          // Normaliza para incluir o offset inicial
          const combined = Math.max(data.count, currentLocal);
          setVisitCount(combined);
          localStorage.setItem(LOCAL_KEY, combined.toString());
        }
      })
      .catch(() => {
        // Silenciosamente usa o fallback local em caso de falha de rede/CORS
      });

    return () => controller.abort();
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
          <strong className="font-pressstart text-[7px] text-white bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
            {visitCount !== null ? visitCount.toLocaleString('pt-BR') : '...'}
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
