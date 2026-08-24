// AI Mode — Types and localStorage persistence

export type AIProvider = 'gemini' | 'openai' | 'claude';

export interface AIModelOption {
  id: string;
  label: string;
  description: string;
  contextWindow: string;
}

export const AI_MODELS: Record<AIProvider, AIModelOption[]> = {
  gemini: [
    { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', description: 'Rápido e eficiente. Ideal para geração de situações.', contextWindow: '1M tokens' },
    { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', description: 'Mais poderoso, respostas mais elaboradas.', contextWindow: '2M tokens' },
    { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', description: 'Mais recente e veloz da Google.', contextWindow: '1M tokens' },
  ],
  openai: [
    { id: 'gpt-4o-mini', label: 'GPT-4o Mini', description: 'Rápido e econômico. Ótima relação custo-benefício.', contextWindow: '128K tokens' },
    { id: 'gpt-4o', label: 'GPT-4o', description: 'Mais avançado da OpenAI, respostas detalhadas.', contextWindow: '128K tokens' },
    { id: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: 'Legado, mais barato e veloz.', contextWindow: '16K tokens' },
  ],
  claude: [
    { id: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku', description: 'O mais rápido da Anthropic. Ideal para uso frequente.', contextWindow: '200K tokens' },
    { id: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet', description: 'Equilíbrio perfeito entre inteligência e velocidade.', contextWindow: '200K tokens' },
    { id: 'claude-opus-4-5', label: 'Claude Opus 4.5', description: 'O mais poderoso da Anthropic.', contextWindow: '200K tokens' },
  ],
};

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
