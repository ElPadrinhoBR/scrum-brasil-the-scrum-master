// AI Service — calls Gemini, OpenAI or Claude APIs and parses situations

import { AIConfig, AIProvider, AISituation } from './AIConfig';

// ── System Prompt ──────────────────────────────────────────────────────────────
const buildPrompt = (sprint: number, playerName: string, previousTitles: string[]): string => {
  const avoidList = previousTitles.length > 0
    ? `\n\nEvite repetir estas situações já geradas: ${previousTitles.join(', ')}.`
    : '';

  return `Você é um simulador de situações reais e adversas de desenvolvimento de software para treinar Scrum Masters brasileiros.

Gere UMA situação nova, realista e desafiadora que acontece entre os membros de um time de desenvolvimento de software.

CONTEXTO:
- Sprint atual: ${sprint}
- Nome do Scrum Master: ${playerName}
- Time: Ana Lima (Product Owner — exigente), Carlos Souza (Dev Backend — perfeccionista), Júlia Santos (Dev Frontend — criativa), Marcos Oliveira (QA — metódico), Beatriz Costa (UX Designer), Rafael Mendes (DevOps — pragmático)
- Produto: Pixflow, uma plataforma de pagamentos via Pix para microempresas${avoidList}

CATEGORIAS DE SITUAÇÕES (escolha uma aleatoriamente e varie a cada chamada):
1. Conflito direto entre Dev e PO sobre prioridades de backlog
2. Bug crítico em produção descoberto durante a Sprint
3. Desenvolvedor ameaçando sair da empresa por sobrecarga
4. Stakeholder pedindo mudança drástica de escopo no meio da Sprint
5. Burnout grave de um membro da equipe
6. Dívida técnica atingindo ponto crítico e travando entregas
7. Conflito interpessoal sério entre dois membros do time
8. PO tomando decisões sem consultar o time
9. Estimativas completamente erradas causando atraso
10. Pressão da diretoria por funcionalidade específica não planejada
11. Deploy quebrou produção na sexta à tarde
12. Dependência de time externo atrasando a Sprint
13. Discussão sobre qualidade vs velocidade de entrega
14. Novo integrante sem onboarding causando problemas
15. Reunião de Daily virou discussão técnica prolongada
16. Cliente pedindo demonstração antes do produto estar pronto
17. Conflito sobre quem é responsável por uma área de código
18. Membro da equipe indo de férias sem passar o contexto

Responda APENAS com um JSON válido, sem texto adicional, sem markdown, sem blocos de código. Formato exato:
{
  "titulo": "título curto e impactante (máximo 60 caracteres)",
  "speaker": "nome exato de um dos personagens (Ana Lima, Carlos Souza, Júlia Santos, Marcos Oliveira, Beatriz Costa ou Rafael Mendes)",
  "expressao": "uma de: neutral, happy, worried, angry, sad, surprised, confident",
  "background": "um de: escritorio, reuniao, desenvolvimento, cafeteria, servidores, diretoria",
  "situacao": "falas do personagem descrevendo a situação em 2-3 frases vívidas, em primeira pessoa, tom emocional",
  "escolhas": [
    {
      "texto": "ação concreta que o Scrum Master pode tomar (começar com verbo)",
      "avaliacao": "BOM",
      "explicacao": "explicação pedagógica de por que essa é uma boa prática ágil (1-2 frases)"
    },
    {
      "texto": "ação alternativa do Scrum Master",
      "avaliacao": "MEDIANO",
      "explicacao": "explicação pedagógica de por que essa é uma prática mediana"
    },
    {
      "texto": "ação incorreta que um SM menos experiente tomaria",
      "avaliacao": "RUIM",
      "explicacao": "explicação pedagógica de por que essa é uma má prática"
    }
  ]
}`;
};

// ── Provider-specific API calls ──────────────────────────────────────────────

async function callGemini(config: AIConfig, prompt: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.9, maxOutputTokens: 1024 },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini API error ${res.status}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

async function callOpenAI(config: AIConfig, prompt: string): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
      max_tokens: 1024,
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `OpenAI API error ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

async function callClaude(config: AIConfig, prompt: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Claude API error ${res.status}`);
  }
  const data = await res.json();
  return data.content?.[0]?.text ?? '';
}

// ── JSON extraction ────────────────────────────────────────────────────────────
function extractJSON(raw: string): AISituation {
  // Try to parse directly, or extract from markdown code block
  let text = raw.trim();
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) text = match[1].trim();

  // Find first { and last } just in case there's extra text
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end !== -1) text = text.slice(start, end + 1);

  const parsed = JSON.parse(text);

  // Validate required fields
  if (!parsed.titulo || !parsed.speaker || !parsed.situacao || !Array.isArray(parsed.escolhas)) {
    throw new Error('JSON inválido: campos obrigatórios ausentes.');
  }

  return parsed as AISituation;
}

// ── Main exported function ────────────────────────────────────────────────────
export async function generateSituation(
  config: AIConfig,
  sprint: number,
  playerName: string,
  previousTitles: string[] = [],
): Promise<AISituation> {
  const prompt = buildPrompt(sprint, playerName, previousTitles);

  let rawText = '';

  switch (config.provider as AIProvider) {
    case 'gemini':
      rawText = await callGemini(config, prompt);
      break;
    case 'openai':
      rawText = await callOpenAI(config, prompt);
      break;
    case 'claude':
      rawText = await callClaude(config, prompt);
      break;
    default:
      throw new Error('Provider desconhecido.');
  }

  return extractJSON(rawText);
}

// ── Quick connection test ─────────────────────────────────────────────────────
export async function testConnection(config: AIConfig): Promise<{ ok: boolean; error?: string }> {
  try {
    const testConfig = { ...config };
    let rawText = '';
    const testPrompt = 'Responda apenas com: {"ok":true}';

    switch (testConfig.provider) {
      case 'gemini': {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${testConfig.model}:generateContent?key=${testConfig.apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: testPrompt }] }] }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          return { ok: false, error: err?.error?.message || `Erro ${res.status}` };
        }
        const data = await res.json();
        rawText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
        break;
      }
      case 'openai': {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${testConfig.apiKey}` },
          body: JSON.stringify({ model: testConfig.model, messages: [{ role: 'user', content: testPrompt }], max_tokens: 10 }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          return { ok: false, error: err?.error?.message || `Erro ${res.status}` };
        }
        rawText = 'ok';
        break;
      }
      case 'claude': {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': testConfig.apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({ model: testConfig.model, max_tokens: 10, messages: [{ role: 'user', content: testPrompt }] }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          return { ok: false, error: err?.error?.message || `Erro ${res.status}. Claude pode bloquear chamadas diretas do browser.` };
        }
        rawText = 'ok';
        break;
      }
    }

    return { ok: rawText.length > 0 };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}
