import React from 'react';
import { useGame } from '../game/GameContext';
import { PixelCharacter } from '../components/characters/PixelCharacter';
import { DialogueBox } from '../components/dialogue/DialogueBox';
import { Retrospective } from '../components/sprint/Retrospective';
import { RetroCard } from '../components/ui/RetroCard';
import { SPRINTS_DATA } from '../data/sprints';

export const GameScreen: React.FC = () => {
  const { state, advanceDialogueLine, selectDialogueChoice, selectRetrospectiveImprovement } = useGame();
  const { sprint, phase, dialogueIndex, dialogueHistory, unlockedSkills } = state;

  const currentSprintDef = SPRINTS_DATA[sprint - 1] || SPRINTS_DATA[0];
  
  // Choose dialog array based on active phase
  const getActiveDialogues = () => {
    // In sandbox mode, dialogues are always stored in state.sandboxDialogues
    if (state.gameMode === 'sandbox') {
      return state.sandboxDialogues as typeof currentSprintDef.planningDialogues;
    }
    if (phase === 'INTRO' || phase === 'PLANNING') {
      return currentSprintDef.planningDialogues;
    } else if (phase === 'DEVELOPMENT') {
      const completedKey = `daily_event_${sprint}_${state.day}_completed`;
      if (state.flags[completedKey]) {
        return [];
      }
      return currentSprintDef.dailyEvents[state.day] || [];
    } else if (phase === 'REVIEW') {
      return currentSprintDef.reviewDialogues;
    }
    return [];
  };  const [bgErrors, setBgErrors] = React.useState<Record<string, boolean>>({});

  const dialogues = getActiveDialogues();
  const currentLine = dialogues[dialogueIndex];

  // Renders the background programmatically with SVG retro details
  const renderBackgroundScene = (bg?: string) => {
    const scene = bg || currentSprintDef.background;
    
    if (!bgErrors[scene]) {
      return (
        <div className="absolute inset-0 bg-[#0c0c14]">
          <img 
            src={`${import.meta.env.BASE_URL}backgrounds/${scene}.png`} 
            alt={scene} 
            className="w-full h-full object-cover"
            onError={() => {
              setBgErrors(prev => ({ ...prev, [scene]: true }));
            }}
          />
        </div>
      );
    }

    switch (scene) {
      case 'reuniao':
        return (
          <div className="absolute inset-0 bg-[#1d1d35] flex items-center justify-center overflow-hidden">
            {/* Conference Room Table */}
            <svg className="absolute bottom-0 w-full h-2/5" viewBox="0 0 100 40" preserveAspectRatio="none">
              <polygon points="10,40 20,10 80,10 90,40" fill="#4a2511" stroke="#33180a" strokeWidth="1" style={{ shapeRendering: 'crispEdges' }} />
              <polygon points="15,40 22,14 78,14 85,40" fill="#5c3016" style={{ shapeRendering: 'crispEdges' }} />
            </svg>
            <div className="absolute top-8 text-center text-[9px] font-pressstart text-retro-dimmed uppercase">
              🏫 Sala de Reuniões
            </div>
          </div>
        );
      case 'desenvolvimento':
        return (
          <div className="absolute inset-0 bg-[#0e1717] flex items-center justify-between p-8 overflow-hidden">
            {/* Dual retro computer screens */}
            <div className="w-1/4 h-2/3 border-4 border-retro-border bg-slate-950 p-2 flex flex-col justify-between" style={{ shapeRendering: 'crispEdges' }}>
              <div className="w-full grow bg-[#051a05] border border-green-950 grid grid-cols-6 grid-rows-6 opacity-80 gap-0.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-green-500/20 h-1.5 w-full rounded-sm animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
              </div>
              <div className="h-4 bg-slate-800 border-t-2 border-retro-border" />
            </div>
            <div className="w-1/4 h-2/3 border-4 border-retro-border bg-slate-950 p-2 flex flex-col justify-between" style={{ shapeRendering: 'crispEdges' }}>
              <div className="w-full grow bg-[#1a052e] border border-purple-950 grid grid-cols-6 grid-rows-6 opacity-80 gap-0.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-purple-500/20 h-1.5 w-full rounded-sm animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
              <div className="h-4 bg-slate-800 border-t-2 border-retro-border" />
            </div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center text-[9px] font-pressstart text-retro-dimmed uppercase">
              💻 Sala de Desenvolvimento
            </div>
          </div>
        );
      case 'cafeteria':
        return (
          <div className="absolute inset-0 bg-[#241712] flex items-center justify-center overflow-hidden">
            {/* Cafe bar and coffee maker */}
            <div className="absolute bottom-0 w-3/4 h-1/2 border-t-4 border-l-4 border-r-4 border-retro-border bg-[#3a251c]" style={{ shapeRendering: 'crispEdges' }}>
              <div className="w-12 h-16 border-2 border-retro-border bg-slate-950 absolute -top-16 left-6 p-1 flex flex-col justify-between">
                <div className="bg-retro-blue h-2 w-full rounded animate-pulse" />
                <div className="bg-retro-accent h-6 w-full rounded" />
              </div>
            </div>
            <div className="absolute top-8 text-center text-[9px] font-pressstart text-retro-dimmed uppercase">
              ☕ Cafeteria Nova Tech
            </div>
          </div>
        );
      case 'servidores':
        return (
          <div className="absolute inset-0 bg-[#0c0c14] flex justify-around items-center p-4 overflow-hidden">
            {/* Flashing server racks */}
            {Array.from({ length: 3 }).map((_, r) => (
              <div key={r} className="w-1/4 h-4/5 border-4 border-retro-border bg-slate-950 p-2 flex flex-col justify-between gap-1 relative" style={{ shapeRendering: 'crispEdges' }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-3 bg-slate-900 border border-slate-800 flex items-center justify-around">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: `${(i + r) * 150}ms` }} />
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDuration: '1s', animationDelay: `${(i + r) * 200}ms` }} />
                    <div className="w-4 h-1 bg-slate-700" />
                  </div>
                ))}
              </div>
            ))}
            <div className="absolute top-8 text-center text-[9px] font-pressstart text-retro-dimmed uppercase">
              ⚙️ Sala de Servidores (NOC)
            </div>
          </div>
        );
      case 'diretoria':
        return (
          <div className="absolute inset-0 bg-[#16131c] flex items-center justify-center overflow-hidden">
            {/* Director desk detail */}
            <div className="absolute bottom-0 w-full h-1/3 border-t-8 border-retro-accent bg-[#3f202b]" style={{ shapeRendering: 'crispEdges' }} />
            <div className="absolute top-8 text-center text-[9px] font-pressstart text-retro-dimmed uppercase">
              👔 Diretoria da Nova Tech
            </div>
          </div>
        );
      case 'war_room':
        return (
          <div className="absolute inset-0 bg-[#2b0c10] flex items-center justify-around p-6 overflow-hidden">
            {/* War room incident wall with flashing red telemetry */}
            <div className="w-2/5 h-3/4 border-4 border-retro-red bg-slate-950 p-2.5 flex flex-col justify-between shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <div className="flex justify-between items-center border-b border-red-900 pb-1">
                <span className="text-[8px] font-pressstart text-retro-red animate-pulse">🚨 CRITICAL INCIDENT</span>
                <span className="text-[7px] font-mono text-white">STATUS: 504 TIMEOUT</span>
              </div>
              <div className="space-y-1 my-2">
                <div className="h-2 bg-red-600/40 w-full animate-pulse" />
                <div className="h-2 bg-red-600/60 w-4/5 animate-pulse" style={{ animationDelay: '200ms' }} />
                <div className="h-2 bg-red-600/30 w-3/5" />
              </div>
              <div className="border-t border-red-900 pt-1 flex justify-between text-[7px] font-mono text-slate-400">
                <span>API LATENCY: 3420ms</span>
                <span className="text-retro-red">ROLLBACK READY</span>
              </div>
            </div>
            {/* Telemetry charts */}
            <div className="w-2/5 h-3/4 border-4 border-retro-border bg-slate-950 p-2.5 flex flex-col justify-between">
              <span className="text-[8px] font-pressstart text-yellow-400">📊 WAR ROOM TELEMETRY</span>
              <div className="flex items-end justify-between h-24 gap-1 pt-2">
                {[65, 80, 45, 95, 100, 90, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-red-500/80 border-t-2 border-yellow-300" style={{ height: `${h}%` }} />
                ))}
              </div>
              <span className="text-[7px] font-mono text-slate-400 text-center">NOC MONITOR 01</span>
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center text-[9px] font-pressstart text-retro-red uppercase bg-black/60 px-3 py-1 border border-retro-red">
              🚨 Sala de Guerra / War Room (Incidente)
            </div>
          </div>
        );
      case 'home_office':
        return (
          <div className="absolute inset-0 bg-[#0c1222] flex items-center justify-center overflow-hidden">
            {/* Window with night stars and skyline */}
            <div className="w-48 h-32 border-4 border-retro-border bg-[#050914] absolute top-8 left-12 overflow-hidden flex flex-col justify-end">
              <div className="absolute top-2 right-4 w-1 h-1 bg-white rounded-full animate-ping" />
              <div className="absolute top-6 left-8 w-1 h-1 bg-yellow-200 rounded-full" />
              <div className="flex items-end justify-around w-full h-1/2">
                <div className="w-7 h-14 bg-[#0a1128] border-t border-slate-700" />
                <div className="w-9 h-18 bg-[#091024] border-t border-slate-700" />
                <div className="w-6 h-10 bg-[#0b142d] border-t border-slate-700" />
              </div>
            </div>
            {/* Home desk setup with dual monitor and coffee */}
            <div className="absolute bottom-0 w-4/5 h-1/3 border-t-4 border-retro-border bg-[#1f293d] flex justify-around items-start pt-2">
              <div className="w-20 h-14 border-2 border-retro-accent bg-slate-950 p-1 flex flex-col justify-between">
                <div className="h-2 bg-blue-500/40 w-full" />
                <div className="h-1 bg-green-500/60 w-3/4" />
                <div className="h-1 bg-purple-500/40 w-1/2" />
              </div>
              <div className="w-7 h-8 border border-retro-border bg-amber-900/60 rounded-sm flex items-center justify-center text-[8px]">
                ☕
              </div>
            </div>
            <div className="absolute top-6 right-12 text-center text-[9px] font-pressstart text-blue-300 uppercase bg-black/60 px-3 py-1 border border-blue-800">
              🏠 Home Office / Trabalho Remoto
            </div>
          </div>
        );
      case 'treinamento':
        return (
          <div className="absolute inset-0 bg-[#171c26] flex items-center justify-center p-6 overflow-hidden">
            {/* Giant whiteboard with agile post-its */}
            <div className="w-5/6 h-4/5 border-4 border-retro-border bg-slate-100 p-4 shadow-retro relative flex flex-col justify-between">
              <div className="flex justify-between items-center border-b-2 border-slate-300 pb-1">
                <span className="font-pressstart text-[8px] text-slate-800 uppercase">WORKSHOP ÁGIL: DOD & HISTÓRIAS</span>
                <span className="font-mono text-[7px] text-slate-500">FACILITAÇÃO SCRUM</span>
              </div>
              {/* Post-it notes grid */}
              <div className="grid grid-cols-4 gap-3 my-2 grow">
                <div className="bg-yellow-200 border border-yellow-400 p-1 text-[7px] font-mono text-slate-800 shadow-sm">
                  🎯 DoD: Testes 100% Verificados
                </div>
                <div className="bg-pink-200 border border-pink-400 p-1 text-[7px] font-mono text-slate-800 shadow-sm">
                  ⚡ Reduzir WIP do time
                </div>
                <div className="bg-green-200 border border-green-400 p-1 text-[7px] font-mono text-slate-800 shadow-sm">
                  🤝 Pair Programming diário
                </div>
                <div className="bg-cyan-200 border border-cyan-400 p-1 text-[7px] font-mono text-slate-800 shadow-sm">
                  📦 Critérios de Aceite da PO
                </div>
              </div>
              <div className="border-t border-slate-300 pt-1 text-[7px] font-mono text-slate-600 flex justify-between">
                <span>CO-CRIAÇÃO DO TIME ÁGIL</span>
                <span>SCRUM MASTER + EQUIPE</span>
              </div>
            </div>
            <div className="absolute top-4 text-center text-[9px] font-pressstart text-retro-accent uppercase bg-black/70 px-3 py-1 border border-retro-accent">
              🎓 Sala de Treinamento & Workshops
            </div>
          </div>
        );
      case 'lab_inovacao':
        return (
          <div className="absolute inset-0 bg-[#0a0f1d] flex items-center justify-around p-6 overflow-hidden">
            {/* Innovation lab devices and neon prototyping */}
            <div className="w-2/5 h-4/5 border-4 border-cyan-500 bg-slate-950 p-3 shadow-[0_0_20px_rgba(6,182,212,0.25)] flex flex-col justify-between">
              <span className="font-pressstart text-[8px] text-cyan-400">⚡ LAB DE INOVAÇÃO & SPIKES</span>
              <div className="space-y-1.5 my-2">
                <div className="h-3 bg-cyan-900/60 border border-cyan-700 flex items-center px-1 text-[6px] font-mono text-cyan-200">
                  WEBSOCKET BENCHMARK: 12ms
                </div>
                <div className="h-3 bg-emerald-900/60 border border-emerald-700 flex items-center px-1 text-[6px] font-mono text-emerald-200">
                  PIX INSTANT POOL: OK
                </div>
                <div className="h-3 bg-purple-900/60 border border-purple-700 flex items-center px-1 text-[6px] font-mono text-purple-200">
                  POC MEMÓRIA REDUCED: -40%
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-500">PROTÓTIPO EXPERIMENTAL</span>
            </div>
            {/* Device mockups rack */}
            <div className="w-2/5 h-4/5 border-4 border-retro-border bg-slate-950 p-3 flex flex-col justify-between">
              <span className="font-pressstart text-[8px] text-retro-purple">📱 TESTE MULTIDISPOSITIVOS</span>
              <div className="flex justify-around items-center grow">
                <div className="w-10 h-16 border-2 border-slate-600 bg-slate-900 rounded flex flex-col justify-between p-0.5">
                  <div className="w-full h-1.5 bg-slate-700 rounded-xs" />
                  <div className="w-2 h-2 bg-retro-accent rounded-full mx-auto" />
                </div>
                <div className="w-14 h-20 border-2 border-slate-600 bg-slate-900 rounded flex flex-col justify-between p-0.5">
                  <div className="w-full h-1.5 bg-slate-700 rounded-xs" />
                  <div className="w-2 h-2 bg-retro-green rounded-full mx-auto" />
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-500 text-center">QA HOMOLOGAÇÃO</span>
            </div>
            <div className="absolute top-4 text-center text-[9px] font-pressstart text-cyan-400 uppercase bg-black/70 px-3 py-1 border border-cyan-500">
              💡 Laboratório de Inovação & Testes
            </div>
          </div>
        );
      case 'velocelog':
        return (
          <div className="absolute inset-0 bg-[#0f1926] flex items-center justify-around p-6 overflow-hidden">
            {/* Dispatch command screen with route maps */}
            <div className="w-1/2 h-4/5 border-4 border-yellow-500 bg-slate-950 p-3 shadow-retro flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-yellow-900 pb-1">
                <span className="font-pressstart text-[8px] text-yellow-400">🚚 VELOCELOG DESPACHO</span>
                <span className="font-mono text-[7px] text-green-400">GPS ONLINE: 842 FROTA</span>
              </div>
              <div className="grid grid-cols-4 grid-rows-3 gap-1.5 my-2 grow bg-slate-900/60 p-2 border border-slate-800">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border border-yellow-500/30 bg-yellow-950/20 p-1 flex flex-col justify-between">
                    <span className="text-[6px] font-mono text-yellow-200">ROTA #{i + 101}</span>
                    <span className="text-[6px] font-mono text-green-400">98% NO PRAZO</span>
                  </div>
                ))}
              </div>
              <span className="text-[7px] font-mono text-slate-500">ROTEIRIZAÇÃO DINÂMICA COM IA</span>
            </div>
            {/* Conveyor Belt indicator */}
            <div className="w-1/3 h-4/5 border-4 border-retro-border bg-slate-950 p-3 flex flex-col justify-between">
              <span className="font-pressstart text-[8px] text-white">📦 TRIAGEM RÁPIDA</span>
              <div className="space-y-2 my-auto">
                <div className="h-4 bg-yellow-500/40 border border-yellow-600 rounded flex items-center px-1 text-[7px] font-mono text-white">
                  LOTE SP-LESTE: EM TRÂNSITO
                </div>
                <div className="h-4 bg-green-500/40 border border-green-600 rounded flex items-center px-1 text-[7px] font-mono text-white">
                  LOTE SP-SUL: ENTREGUE
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-400 text-center">SLA LAST-MILE: 99.4%</span>
            </div>
            <div className="absolute top-4 text-center text-[9px] font-pressstart text-yellow-400 uppercase bg-black/70 px-3 py-1 border border-yellow-500">
              🚚 VeloceLog — Centro de Operações e Despacho
            </div>
          </div>
        );
      case 'healthpulse':
        return (
          <div className="absolute inset-0 bg-[#071a17] flex items-center justify-around p-6 overflow-hidden">
            {/* Telemedicine & Patient monitors */}
            <div className="w-1/2 h-4/5 border-4 border-emerald-500 bg-slate-950 p-3 shadow-retro flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-emerald-900 pb-1">
                <span className="font-pressstart text-[8px] text-emerald-400">🏥 TELECONSULTA MEDCONNECT</span>
                <span className="font-mono text-[7px] text-white">LGPD V2.4 EM AUDITORIA</span>
              </div>
              <div className="space-y-2 my-auto">
                <div className="h-6 bg-emerald-950/60 border border-emerald-700 flex items-center px-2 justify-between text-[7px] font-mono text-emerald-200">
                  <span>SINAIS VITAIS: PACIENTE #4092</span>
                  <span className="text-emerald-400 font-bold">ESTÁVEL</span>
                </div>
                <div className="h-8 bg-slate-900 border border-slate-700 flex items-center px-2 text-[7px] font-mono text-slate-300">
                  RECEITA DIGITAL: ASSINATURA ICP-BRASIL VÁLIDA
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-500">PRONTUÁRIO INTEGRADO ANS</span>
            </div>
            {/* Heartbeat EKG monitor */}
            <div className="w-1/3 h-4/5 border-4 border-retro-border bg-slate-950 p-3 flex flex-col justify-between">
              <span className="font-pressstart text-[8px] text-emerald-300">💓 TELEMETRIA ECG</span>
              <div className="h-20 bg-[#04120f] border border-emerald-900 flex items-center justify-around px-1">
                <span className="text-emerald-400 font-mono text-lg animate-pulse">/\_/\_/\_</span>
              </div>
              <span className="text-[7px] font-mono text-slate-400 text-center">BPM: 72 · LATÊNCIA: 18ms</span>
            </div>
            <div className="absolute top-4 text-center text-[9px] font-pressstart text-emerald-400 uppercase bg-black/70 px-3 py-1 border border-emerald-500">
              🏥 HealthPulse — Sala de Telemedicina e Prontuários
            </div>
          </div>
        );
      case 'agrosmart':
        return (
          <div className="absolute inset-0 bg-[#0d1a10] flex items-center justify-around p-6 overflow-hidden">
            {/* View to green crop field and drone telemetry */}
            <div className="w-1/2 h-4/5 border-4 border-emerald-600 bg-slate-950 p-3 shadow-retro flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-emerald-900 pb-1">
                <span className="font-pressstart text-[8px] text-emerald-400">🌾 SAFRAVIEW TELEMETRIA</span>
                <span className="font-mono text-[7px] text-yellow-300">SATÉLITE: 4.8 KBPS</span>
              </div>
              <div className="grid grid-cols-2 gap-2 my-auto">
                <div className="bg-emerald-950/40 border border-emerald-700 p-2 rounded text-[7px] font-mono text-emerald-100">
                  UMIDADE DO SOLO: 64%<br />
                  SENSOR LORA #18: OK
                </div>
                <div className="bg-emerald-950/40 border border-emerald-700 p-2 rounded text-[7px] font-mono text-emerald-100">
                  DRONE TÉRMICO: VOANDO<br />
                  TALHÃO B: FERTILIZADO
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-500">ESTAÇÃO METEOROLÓGICA NO CAMPO</span>
            </div>
            {/* Drone Bay */}
            <div className="w-1/3 h-4/5 border-4 border-retro-border bg-slate-950 p-3 flex flex-col justify-between">
              <span className="font-pressstart text-[8px] text-green-300">🛸 DOCA DE DRONES</span>
              <div className="flex justify-around items-center grow text-2xl">
                <span>🚁</span>
                <span>📡</span>
              </div>
              <span className="text-[7px] font-mono text-slate-400 text-center">BATERIA: 92% · ÁREA: 40.000 HA</span>
            </div>
            <div className="absolute top-4 text-center text-[9px] font-pressstart text-emerald-400 uppercase bg-black/70 px-3 py-1 border border-emerald-600">
              🌾 AgroSmart — Estação de Monitoramento Agrícola
            </div>
          </div>
        );
      case 'cybershield':
        return (
          <div className="absolute inset-0 bg-[#14080b] flex items-center justify-around p-6 overflow-hidden">
            {/* Dark SOC War Room with Threat Map */}
            <div className="w-3/5 h-4/5 border-4 border-retro-red bg-slate-950 p-3 shadow-[0_0_25px_rgba(239,68,68,0.3)] flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-red-900 pb-1">
                <span className="font-pressstart text-[8px] text-retro-red animate-pulse">🛡️ THREATWATCHER SOC</span>
                <span className="font-mono text-[7px] text-white">INGESTÃO: 2.1M EPS</span>
              </div>
              <div className="space-y-1 my-auto font-mono text-[7px] text-red-300 bg-red-950/20 p-2 border border-red-900">
                <div>[ALERT] DDOS SYN-FLOOD MITIGADO EM 4S</div>
                <div>[WARN] BRUTE-FORCE DETECTADO IP 185.220.X.X</div>
                <div>[OK] FIREWALL AUTOMATION BLOCK ENFORCED</div>
              </div>
              <span className="text-[7px] font-mono text-slate-500">CENTRO DE OPERAÇÕES DE SEGURANÇA</span>
            </div>
            <div className="w-1/4 h-4/5 border-4 border-retro-border bg-slate-950 p-3 flex flex-col justify-between">
              <span className="font-pressstart text-[8px] text-yellow-400">⚠️ STATUS SOC</span>
              <div className="text-center my-auto">
                <span className="text-3xl animate-bounce">🚨</span>
                <p className="text-[8px] font-mono text-retro-red mt-2">NÍVEL DEFCON 2</p>
              </div>
              <span className="text-[7px] font-mono text-slate-400 text-center">CONTENÇÃO: 28S</span>
            </div>
            <div className="absolute top-4 text-center text-[9px] font-pressstart text-retro-red uppercase bg-black/70 px-3 py-1 border border-retro-red">
              🛡️ CyberShield — Sala de Operações de Ciberdefesa (SOC)
            </div>
          </div>
        );
      case 'edunext':
        return (
          <div className="absolute inset-0 bg-[#160d26] flex items-center justify-around p-6 overflow-hidden">
            {/* Gamification studio and student learning boards */}
            <div className="w-1/2 h-4/5 border-4 border-purple-500 bg-slate-950 p-3 shadow-retro flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-purple-900 pb-1">
                <span className="font-pressstart text-[8px] text-purple-300">🎓 APRENDA+ GAMIFICAÇÃO</span>
                <span className="font-mono text-[7px] text-yellow-400">ALUNOS ATIVOS: 500K</span>
              </div>
              <div className="grid grid-cols-3 gap-2 my-auto">
                <div className="bg-purple-950/40 border border-purple-700 p-2 text-center rounded">
                  <span className="text-xl">🏆</span>
                  <p className="text-[6px] font-mono text-purple-200 mt-1">MISSÃO COLETIVA</p>
                </div>
                <div className="bg-purple-950/40 border border-purple-700 p-2 text-center rounded">
                  <span className="text-xl">⭐</span>
                  <p className="text-[6px] font-mono text-yellow-200 mt-1">AVATAR NÍVEL 12</p>
                </div>
                <div className="bg-purple-950/40 border border-purple-700 p-2 text-center rounded">
                  <span className="text-xl">📚</span>
                  <p className="text-[6px] font-mono text-cyan-200 mt-1">TRILHA ADAPTATIVA</p>
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-500">REDES PÚBLICAS & PARTICULARES</span>
            </div>
            <div className="w-1/3 h-4/5 border-4 border-retro-border bg-slate-950 p-3 flex flex-col justify-between">
              <span className="font-pressstart text-[8px] text-purple-400">📱 PAINEL ESCOLAR</span>
              <div className="space-y-1.5 my-auto text-[7px] font-mono text-slate-300">
                <div className="bg-slate-900 p-1 border border-slate-700">ENGAGAMENTO: +75%</div>
                <div className="bg-slate-900 p-1 border border-slate-700">CONEXÃO LENTA: OTIMIZADO</div>
              </div>
              <span className="text-[7px] font-mono text-slate-400 text-center">300+ ESCOLAS ATIVAS</span>
            </div>
            <div className="absolute top-4 text-center text-[9px] font-pressstart text-purple-400 uppercase bg-black/70 px-3 py-1 border border-purple-500">
              🎓 EduNext — Estúdio de Aprendizagem e Gamificação
            </div>
          </div>
        );
      case 'safevault':
        return (
          <div className="absolute inset-0 bg-[#0d1626] flex items-center justify-around p-6 overflow-hidden">
            {/* Traditional Bank pillars with modern agile microservices */}
            <div className="w-1/2 h-4/5 border-4 border-blue-400 bg-slate-950 p-3 shadow-retro flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-blue-900 pb-1">
                <span className="font-pressstart text-[8px] text-blue-300">🏛️ SAFEVAULT OPEN BANKING</span>
                <span className="font-mono text-[7px] text-green-400">ESTEIRA CI/CD ATIVA</span>
              </div>
              <div className="space-y-2 my-auto text-[7px] font-mono text-blue-200">
                <div className="bg-blue-950/40 p-2 border border-blue-700 rounded">
                  MICROSSERVIÇOS OAUTH2: HOMOLOGADO<br />
                  CONTRATO MAINFRAME: DESACOPLADO
                </div>
                <div className="bg-blue-950/40 p-2 border border-blue-700 rounded">
                  CAB APPROVAL: DISPENSADO POR AUTOMAÇÃO<br />
                  TESTES 100% RECONCILIADOS
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-500">TRANSIÇÃO ÁGIL CENTENÁRIA</span>
            </div>
            <div className="w-1/3 h-4/5 border-4 border-retro-border bg-slate-950 p-3 flex flex-col justify-between">
              <span className="font-pressstart text-[8px] text-blue-400">💼 GOVERNANÇA</span>
              <div className="text-center my-auto text-3xl">
                🏛️
              </div>
              <span className="text-[7px] font-mono text-slate-400 text-center">ZERO FALHAS EM AUDITORIA</span>
            </div>
            <div className="absolute top-4 text-center text-[9px] font-pressstart text-blue-300 uppercase bg-black/70 px-3 py-1 border border-blue-400">
              🏛️ SafeVault — Piso de Transformação Digital Bancária
            </div>
          </div>
        );
      case 'foodfast':
        return (
          <div className="absolute inset-0 bg-[#26150a] flex items-center justify-around p-6 overflow-hidden">
            {/* Kitchen dispatch & delivery heatmap */}
            <div className="w-1/2 h-4/5 border-4 border-orange-500 bg-slate-950 p-3 shadow-retro flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-orange-900 pb-1">
                <span className="font-pressstart text-[8px] text-orange-400">🍔 FOODFAST DISPATCH HUB</span>
                <span className="font-mono text-[7px] text-green-400">TEMPO MÉDIO: 18 MIN</span>
              </div>
              <div className="space-y-1.5 my-auto text-[7px] font-mono text-orange-200">
                <div className="bg-orange-950/40 p-2 border border-orange-700 rounded">
                  FILA DE RESTAURANTES: 4.820 PEDIDOS<br />
                  ESPERA DE MOTOBOY: 4 MINUTOS
                </div>
                <div className="bg-orange-950/40 p-2 border border-orange-700 rounded">
                  WEBSOCKETS HEATMAP: ATUALIZADO 1S<br />
                  RETENÇÃO PARCEIROS: +22%
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-500">MERCADO FOODTECH VELOZ</span>
            </div>
            <div className="w-1/3 h-4/5 border-4 border-retro-border bg-slate-950 p-3 flex flex-col justify-between">
              <span className="font-pressstart text-[8px] text-orange-300">🛵 FROTA DE MOTOS</span>
              <div className="text-center my-auto text-3xl">
                🍕
              </div>
              <span className="text-[7px] font-mono text-slate-400 text-center">40 CIDADES EM OPERAÇÃO</span>
            </div>
            <div className="absolute top-4 text-center text-[9px] font-pressstart text-orange-400 uppercase bg-black/70 px-3 py-1 border border-orange-500">
              🍔 FoodFast — Hub de Operações e Despacho de Cozinha
            </div>
          </div>
        );
      case 'autodrive':
        return (
          <div className="absolute inset-0 bg-[#07191f] flex items-center justify-around p-6 overflow-hidden">
            {/* Automotive diagnostic garage with oscilloscope and CAN bus */}
            <div className="w-1/2 h-4/5 border-4 border-cyan-400 bg-slate-950 p-3 shadow-retro flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-cyan-900 pb-1">
                <span className="font-pressstart text-[8px] text-cyan-300">🚗 FLEETINTEL TELEMETRIA</span>
                <span className="font-mono text-[7px] text-cyan-200">CAN BUS J1939: ATIVO</span>
              </div>
              <div className="space-y-2 my-auto text-[7px] font-mono text-cyan-200">
                <div className="bg-cyan-950/40 p-2 border border-cyan-700 rounded">
                  FREIOS PREDITIVOS: 100% HOMOLOGADO<br />
                  TEMPERATURA MOTOR: 88°C (SEGURO)
                </div>
                <div className="bg-cyan-950/40 p-2 border border-cyan-700 rounded">
                  ALERTA EM CABINE: 0.04S RESPOSTA<br />
                  RUÍDO ELÉTRICO: FILTRO DIGITAL OK
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-500">SOFTWARE EMBARCADO RTOS</span>
            </div>
            <div className="w-1/3 h-4/5 border-4 border-retro-border bg-slate-950 p-3 flex flex-col justify-between">
              <span className="font-pressstart text-[8px] text-cyan-400">🚙 PISTA DE TESTES</span>
              <div className="text-center my-auto text-3xl">
                🏎️
              </div>
              <span className="text-[7px] font-mono text-slate-400 text-center">TOLERÂNCIA ZERO A FALHAS</span>
            </div>
            <div className="absolute top-4 text-center text-[9px] font-pressstart text-cyan-300 uppercase bg-black/70 px-3 py-1 border border-cyan-400">
              🚗 AutoDrive — Garagem de Engenharia e Telemetria Veicular
            </div>
          </div>
        );
      case 'ecoenergy':
        return (
          <div className="absolute inset-0 bg-[#1a1906] flex items-center justify-around p-6 overflow-hidden">
            {/* Renewable solar and grid control */}
            <div className="w-1/2 h-4/5 border-4 border-yellow-400 bg-slate-950 p-3 shadow-retro flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-yellow-900 pb-1">
                <span className="font-pressstart text-[8px] text-yellow-300">☀️ SOLARTRADE CONTROLE</span>
                <span className="font-mono text-[7px] text-green-400">ANEEL: REGULADO</span>
              </div>
              <div className="space-y-2 my-auto text-[7px] font-mono text-yellow-100">
                <div className="bg-yellow-950/40 p-2 border border-yellow-700 rounded">
                  GERAÇÃO SOLAR: 14.8 GWH/MÊS<br />
                  COMPENSAÇÃO TARIFA: EXATA (6 CASAS)
                </div>
                <div className="bg-yellow-950/40 p-2 border border-yellow-700 rounded">
                  ECONOMIA FAMÍLIAS: R$ 84/MÊS<br />
                  CARBONO NEUTRO: 840 TONELADAS
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-500">TRANSIÇÃO ENERGÉTICA SUSTENTÁVEL</span>
            </div>
            <div className="w-1/3 h-4/5 border-4 border-retro-border bg-slate-950 p-3 flex flex-col justify-between">
              <span className="font-pressstart text-[8px] text-yellow-400">🌱 FAZENDAS SOLARES</span>
              <div className="text-center my-auto text-3xl">
                ☀️
              </div>
              <span className="text-[7px] font-mono text-slate-400 text-center">5.000 CLIENTES ATENDIDOS</span>
            </div>
            <div className="absolute top-4 text-center text-[9px] font-pressstart text-yellow-300 uppercase bg-black/70 px-3 py-1 border border-yellow-400">
              ☀️ EcoEnergy — Centro de Controle de Energia Renovável
            </div>
          </div>
        );
      case 'cloudcore':
        return (
          <div className="absolute inset-0 bg-[#120826] flex items-center justify-around p-6 overflow-hidden">
            {/* Multicloud server aisles and Kubernetes terminal */}
            <div className="w-1/2 h-4/5 border-4 border-indigo-400 bg-slate-950 p-3 shadow-retro flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-indigo-900 pb-1">
                <span className="font-pressstart text-[8px] text-indigo-300">☁️ KUBEMASTER ORCHESTRATION</span>
                <span className="font-mono text-[7px] text-green-400">MULTICLOUD: AWS/GCP/AZURE</span>
              </div>
              <div className="space-y-2 my-auto text-[7px] font-mono text-indigo-200">
                <div className="bg-indigo-950/40 p-2 border border-indigo-700 rounded">
                  FAILOVER REGIONAL: 14 SEGUNDOS<br />
                  TERRAFORM GITOPS: 100% DECLARATIVO
                </div>
                <div className="bg-indigo-950/40 p-2 border border-indigo-700 rounded">
                  PODS REPLICADOS: 1.280 SERVIÇOS<br />
                  DISPONIBILIDADE: 99.999% SLA
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-500">ENGENHARIA DE PLATAFORMA SRE</span>
            </div>
            <div className="w-1/3 h-4/5 border-4 border-retro-border bg-slate-950 p-3 flex flex-col justify-between">
              <span className="font-pressstart text-[8px] text-indigo-400">⚡ CLOUD FABRIC</span>
              <div className="text-center my-auto text-3xl">
                ☁️
              </div>
              <span className="text-[7px] font-mono text-slate-400 text-center">ZERO DOWNTIME TOLERANCE</span>
            </div>
            <div className="absolute top-4 text-center text-[9px] font-pressstart text-indigo-300 uppercase bg-black/70 px-3 py-1 border border-indigo-400">
              ☁️ CloudCore — Sala de Infraestrutura e Plataforma Multicloud
            </div>
          </div>
        );
      case 'escritorio':
      default:
        return (
          <div className="absolute inset-0 bg-[#14141c] flex items-center justify-center overflow-hidden">
            {/* Office window */}
            <div className="w-32 h-20 border-4 border-retro-border bg-[#001f3f] absolute top-12 left-10 overflow-hidden flex flex-col justify-end" style={{ shapeRendering: 'crispEdges' }}>
              {/* Skyline blocks */}
              <div className="flex items-end justify-around w-full h-full pt-4">
                <div className="w-6 h-12 bg-[#0c0c14] border-t border-l border-r border-slate-700" />
                <div className="w-8 h-16 bg-[#0c0c14] border-t border-l border-r border-slate-700" />
                <div className="w-5 h-8 bg-[#0c0c14] border-t border-l border-r border-slate-700" />
              </div>
            </div>
            {/* Water cooler block */}
            <div className="w-8 h-20 border-2 border-retro-border bg-slate-800 absolute bottom-0 right-10 flex flex-col items-center">
              <div className="w-6 h-8 bg-[#3b82f6]/40 border-2 border-retro-border mt-1" />
            </div>
            <div className="absolute top-8 text-center text-[9px] font-pressstart text-retro-dimmed uppercase">
              🏢 Escritório Nova Tech
            </div>
          </div>
        );
    }
  };

  const isNarrativeActive = phase !== 'RETROSPECTIVE' && currentLine;

  return (
    <div className="flex flex-col h-full grow relative select-none">
      
      {/* 1. NARRATIVE / VISUAL NOVEL RENDER AREA */}
      {isNarrativeActive && (
        <div className="relative border-4 border-retro-border h-[320px] md:h-[400px] flex flex-col justify-between overflow-hidden shadow-retro mb-4">
          
          {/* Background Scene */}
          {renderBackgroundScene(currentLine.background)}

          {/* Foreground Speaker Sprite */}
          {currentLine.speaker !== 'NARRADOR' && 
           currentLine.speaker !== 'SISTEMA' && 
           currentLine.speaker !== 'VOCÊ — SCRUM MASTER' && (
            <div className="absolute bottom-0 left-10 md:left-20 z-10 flex flex-col items-center animate-bounce" style={{ animationDuration: '3s' }}>
              <PixelCharacter 
                characterId={currentLine.speaker} 
                expression={currentLine.expression || 'neutral'} 
                size={160} 
                className="border-0 shadow-none bg-transparent"
              />
            </div>
          )}

          {/* Black overlay for system messages or narrator focused scenes */}
          {(currentLine.speaker === 'NARRADOR' || currentLine.speaker === 'SISTEMA') && (
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          )}

          {/* Overlay Tag for Phase alerts */}
          <div className="absolute top-3 right-3 bg-retro-panel border-2 border-retro-border px-2 py-1 text-[8px] font-pressstart text-retro-accent uppercase z-20">
            Sprint Phase: {phase}
          </div>
        </div>
      )}

      {/* 2. MAIN DIALOGUE BOX OR INTERACTIVE PANELS */}
      {isNarrativeActive && (
        <DialogueBox
          speaker={currentLine.speaker}
          text={currentLine.text}
          choices={currentLine.choices}
          unlockedSkills={unlockedSkills}
          onChoiceSelect={selectDialogueChoice}
          onAdvance={advanceDialogueLine}
          dialogueHistory={dialogueHistory}
          playerName={state.playerName}
        />
      )}

      {/* 3. SPRINT RETROSPECTIVE SCREEN IF ACTIVE */}
      {phase === 'RETROSPECTIVE' && (
        <Retrospective
          sprintNumber={sprint}
          unlockedSkills={unlockedSkills}
          onSelectImprovement={selectRetrospectiveImprovement}
        />
      )}

      {/* Fallback info card if narrative ended / board required */}
      {!isNarrativeActive && phase !== 'RETROSPECTIVE' && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <RetroCard title="Ciclo em Andamento" className="max-w-md">
            <p className="text-sm font-sans mb-4 text-slate-300">
              O planejamento foi encerrado ou o dia foi simulado. O time está trabalhando nos cards.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => {
                  // Switch tab to board
                  const boardTabBtn = document.querySelector('button[class*="Kanban"]') as HTMLButtonElement;
                  if (boardTabBtn) boardTabBtn.click();
                }}
                className="retro-border-interactive px-4 py-2 bg-retro-accent font-pressstart text-[9px] text-black font-bold uppercase"
              >
                📋 Ir para o Quadro Kanban
              </button>
            </div>
          </RetroCard>
        </div>
      )}
    </div>
  );
};
