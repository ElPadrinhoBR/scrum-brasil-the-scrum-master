// AI Mode — Types and localStorage persistence

export type AIProvider = 'gemini' | 'openai' | 'claude';

export const AI_PROVIDER_INFO = {
  gemini: { name: 'Google Gemini', icon: '🌟', color: 'border-blue-400', getKeyUrl: 'https://aistudio.google.com/app/apikey', browserSupport: true },
  openai: { name: 'OpenAI / ChatGPT', icon: '🤖', color: 'border-green-400', getKeyUrl: 'https://platform.openai.com/api-keys', browserSupport: true },
  claude: { name: 'Anthropic Claude', icon: '🧠', color: 'border-orange-400', getKeyUrl: 'https://console.anthropic.com/', browserSupport: false },
};

export interface AIConfig {
  provider: AIProvider;
  model: string;
  apiKey: string;
}

export interface AISituation {
  titulo: string;
  categoria?: string;
  speaker: string;
  expressao: 'neutral' | 'happy' | 'worried' | 'angry' | 'sad' | 'surprised' | 'confident';
  background: 'escritorio' | 'reuniao' | 'desenvolvimento' | 'cafeteria' | 'servidores' | 'diretoria';
  situacao: string;
  escolhas: {
    texto: string;
    avaliacao: 'BOM' | 'MEDIANO' | 'RUIM';
    explicacao: string;
  }[];
}

const STORAGE_KEY = 'scrum_brasil_ai_config';

export const AIConfigStorage = {
  load(): AIConfig | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  save(config: AIConfig): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  },
  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
