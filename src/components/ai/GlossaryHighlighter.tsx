import React, { useState, useRef, useEffect } from 'react';
import { GLOSSARY_MAP, GLOSSARY_TERMS_SORTED, GlossaryEntry } from '../../ai/AIGlossary';

// Builds a regex that matches any glossary term (case-insensitive, whole-word-ish)
const buildTermRegex = () => {
  const escaped = GLOSSARY_TERMS_SORTED.map((t) =>
    t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  ).join('|');
  return new RegExp(`(${escaped})`, 'gi');
};

const TERM_REGEX = buildTermRegex();

// ── Tooltip Modal ──────────────────────────────────────────────────────────────
const CATEGORY_COLOR: Record<string, string> = {
  scrum: 'border-retro-blue bg-blue-950/80',
  kanban: 'border-retro-green bg-green-950/80',
  engineering: 'border-retro-purple bg-purple-950/80',
  management: 'border-yellow-500 bg-yellow-950/80',
  product: 'border-retro-accent bg-orange-950/80',
};

interface GlossaryModalProps {
  entry: GlossaryEntry;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

const GlossaryModal: React.FC<GlossaryModalProps> = ({ entry, onClose, anchorRef }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        modalRef.current && !modalRef.current.contains(e.target as Node) &&
        anchorRef.current && !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose, anchorRef]);

  const colorClass = CATEGORY_COLOR[entry.category] ?? 'border-slate-500 bg-slate-900/90';

  return (
    <div
      ref={modalRef}
      className={`fixed z-50 bottom-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-sm border-2 ${colorClass} shadow-2xl rounded p-4 select-text`}
      role="dialog"
      aria-label={`Glossário: ${entry.term}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{entry.emoji}</span>
          <span className="font-pressstart text-xs text-white">{entry.term}</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-xs font-pressstart shrink-0"
          aria-label="Fechar"
        >
          ✕
        </button>
      </div>

      {/* Definition */}
      <p className="text-sm font-sans text-slate-200 leading-relaxed mb-3">{entry.definition}</p>

      {/* Example */}
      <div className="border-t border-slate-700 pt-2">
        <span className="font-pressstart text-[8px] text-slate-400 uppercase block mb-1">Exemplo prático:</span>
        <p className="text-xs font-sans text-slate-300 italic leading-relaxed">"{entry.example}"</p>
      </div>
    </div>
  );
};

// ── Clickable Term Span ────────────────────────────────────────────────────────
interface TermSpanProps {
  word: string;
  entry: GlossaryEntry;
  onSelect: (entry: GlossaryEntry, ref: React.RefObject<HTMLElement | null>) => void;
  isActive: boolean;
}

const TermSpan: React.FC<TermSpanProps> = ({ word, entry, onSelect, isActive }) => {
  const ref = useRef<HTMLSpanElement>(null);

  const categoryUnderline: Record<string, string> = {
    scrum: 'decoration-retro-blue',
    kanban: 'decoration-retro-green',
    engineering: 'decoration-retro-purple',
    management: 'decoration-yellow-400',
    product: 'decoration-retro-accent',
  };

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      onClick={() => onSelect(entry, ref as React.RefObject<HTMLElement | null>)}
      className={`cursor-pointer underline decoration-dotted decoration-2 transition-all ${
        categoryUnderline[entry.category] ?? 'decoration-slate-400'
      } ${isActive ? 'bg-white/10 rounded px-0.5' : 'hover:bg-white/5 rounded px-0.5'}`}
      title={`📖 ${entry.term} — clique para ver a definição`}
    >
      {word}
    </span>
  );
};

// ── Main component: parses text and highlights glossary terms ──────────────────
interface GlossaryHighlighterProps {
  text: string;
  className?: string;
}

export const GlossaryHighlighter: React.FC<GlossaryHighlighterProps> = ({ text, className = '' }) => {
  const [activeEntry, setActiveEntry] = useState<GlossaryEntry | null>(null);
  const [activeRef, setActiveRef] = useState<React.RefObject<HTMLElement | null> | null>(null);

  const handleSelect = (entry: GlossaryEntry, ref: React.RefObject<HTMLElement | null>) => {
    if (activeEntry?.term === entry.term) {
      setActiveEntry(null);
      setActiveRef(null);
    } else {
      setActiveEntry(entry);
      setActiveRef(ref);
    }
  };

  const handleClose = () => {
    setActiveEntry(null);
    setActiveRef(null);
  };

  // Split text into segments: plain strings and matched terms
  const segments = text.split(TERM_REGEX);

  const nodes = segments.map((seg, idx) => {
    const entry = GLOSSARY_MAP.get(seg.toLowerCase());
    if (entry) {
      return (
        <TermSpan
          key={idx}
          word={seg}
          entry={entry}
          onSelect={handleSelect}
          isActive={activeEntry?.term === entry.term}
        />
      );
    }
    return <React.Fragment key={idx}>{seg}</React.Fragment>;
  });

  return (
    <>
      <span className={className}>{nodes}</span>
      {activeEntry && activeRef && (
        <GlossaryModal entry={activeEntry} onClose={handleClose} anchorRef={activeRef} />
      )}
    </>
  );
};
