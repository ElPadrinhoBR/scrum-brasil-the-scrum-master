// AI Service — calls Gemini, OpenAI or Claude APIs and parses situations

import { AIConfig, AIProvider, AISituation } from './AIConfig';

// ── System Prompt ──────────────────────────────────────────────────────────────
// Kept deliberately concise to reduce token usage and avoid truncation.
const buildPrompt = (sprint: number, playerName: string, previousTitles: string[]): string => {
  const avoidList = previousTitles.length > 0
    ? `\nNão repita: ${previousTitles.slice(-5).join(', ')}.`
    : '';

  return `Você é um simulador de situações adversas de desenvolvimento de software para treinar Scrum Masters.

Gere UMA situação entre membros do time. Sprint: ${sprint}. SM: ${playerName}.
Time: Ana Lima (PO), Carlos Souza (Backend), Júlia Santos (Frontend), Marcos Oliveira (QA), Beatriz Costa (UX), Rafael Mendes (DevOps). Produto: Pixflow (pagamentos Pix).${avoidList}

Categorias possíveis (escolha uma aleatoriamente):
conflito dev×PO, bug em produção, dev querendo sair, mudança de escopo na sprint, burnout, dívida técnica crítica, conflito interpessoal, PO ausente, estimativas erradas, pressão da diretoria, deploy que quebrou produção, dependência de time externo, qualidade×velocidade, onboarding falho, daily virou reunião técnica, cliente pedindo demo cedo, conflito de responsabilidade, férias sem passagem de contexto.

REGRAS CRÍTICAS:
- Responda SOMENTE com JSON válido e completo. Zero texto antes ou depois.
- Mantenha TODOS os textos curtos: titulo ≤50 chars, situacao ≤200 chars, cada texto/explicacao ≤120 chars.
- Não use aspas simples dentro de strings. Use apenas aspas duplas.
- Não use caracteres especiais que quebrem JSON.

JSON (preencha todos os campos):
{"titulo":"...","speaker":"nome do personagem","expressao":"neutral|happy|worried|angry|sad|surprised|confident","background":"escritorio|reuniao|desenvolvimento|cafeteria|servidores|diretoria","situacao":"fala do personagem em 1a pessoa","escolhas":[{"texto":"ação do SM","avaliacao":"BOM","explicacao":"por que é boa prática"},{"texto":"ação do SM","avaliacao":"MEDIANO","explicacao":"por que é mediana"},{"texto":"ação do SM","avaliacao":"RUIM","explicacao":"por que é ruim"}]}`;
};

// ── Robust JSON repair ────────────────────────────────────────────────────────
// Attempts to fix common truncation/formatting issues before parsing
function repairJSON(raw: string): string {
  let text = raw.trim();

  // Strip markdown code fences
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)(?:```|$)/);
  if (fenceMatch) text = fenceMatch[1].trim();

  // Find the outermost { ... }
  const start = text.indexOf('{');
  if (start === -1) throw new Error('Nenhum JSON encontrado na resposta da IA.');
  text = text.slice(start);

  // If the JSON is truncated (no closing }), try to close it
  const openBraces = (text.match(/\{/g) || []).length;
  const closeBraces = (text.match(/\}/g) || []).length;
  const missing = openBraces - closeBraces;

  if (missing > 0) {
    // Close any open string if ends mid-string
    const lastChar = text.trimEnd().slice(-1);
    if (lastChar !== '"' && lastChar !== '}' && lastChar !== ']') {
      // Likely truncated inside a string value — close the string
      text = text.trimEnd() + '"';
    }
    // Close open arrays
    const openArrays = (text.match(/\[/g) || []).length;
    const closeArrays = (text.match(/\]/g) || []).length;
    const missingArrays = openArrays - closeArrays;
    for (let i = 0; i < missingArrays; i++) text += ']';
    // Close open objects
    for (let i = 0; i < missing; i++) text += '}';
  }

  // Remove trailing commas before ] or }
  text = text.replace(/,\s*([}\]])/g, '$1');

  return text;
}

function extractJSON(raw: string): AISituation {
  const repaired = repairJSON(raw);

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(repaired);
  } catch (e) {
    // Last resort: try stripping everything after the last complete }
    const lastBrace = repaired.lastIndexOf('}');
    if (lastBrace > 0) {
      parsed = JSON.parse(repaired.slice(0, lastBrace + 1));
    } else {
      throw new Error(`JSON malformado: ${e instanceof Error ? e.message : String(e)}\n\nResposta recebida:\n${raw.slice(0, 300)}`);
    }
  }

  // Validate and supply defaults for any missing optional fields
  if (!parsed.titulo) parsed.titulo = 'Situação do Time';
  if (!parsed.speaker) parsed.speaker = 'Ana Lima';
  if (!parsed.expressao) parsed.expressao = 'neutral';
  if (!parsed.background) parsed.background = 'escritorio';
  if (!parsed.situacao) parsed.situacao = 'Precisamos resolver isso agora.';
  if (!Array.isArray(parsed.escolhas) || (parsed.escolhas as unknown[]).length === 0) {
    parsed.escolhas = [
      { texto: 'Facilitar uma conversa estruturada', avaliacao: 'BOM', explicacao: 'Boa prática de facilitação ágil.' },
      { texto: 'Registrar o impedimento e monitorar', avaliacao: 'MEDIANO', explicacao: 'Resolve a médio prazo.' },
      { texto: 'Ignorar o problema temporariamente', avaliacao: 'RUIM', explicacao: 'Evita o conflito mas não resolve.' },
    ];
  }

  return parsed as unknown as AISituation;
}

// ── Provider calls ────────────────────────────────────────────────────────────

async function callGemini(config: AIConfig, prompt: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.85,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
      },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } })?.error?.message || `Gemini API error ${res.status}`);
  }
  const data = await res.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
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
      messages: [
        {
          role: 'system',
          content: 'Você é um gerador de situações para treinamento de Scrum Masters. Responda APENAS com JSON válido e completo, sem texto adicional.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.85,
      max_tokens: 2048,
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } })?.error?.message || `OpenAI API error ${res.status}`);
  }
  const data = await res.json() as { choices?: { message?: { content?: string } }[] };
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
      max_tokens: 2048,
      system: 'Responda APENAS com JSON válido e completo. Nenhum texto antes ou depois do JSON.',
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } })?.error?.message || `Claude API error ${res.status}. Pode haver restrição CORS.`);
  }
  const data = await res.json() as { content?: { text?: string }[] };
  return data.content?.[0]?.text ?? '';
}

// ── Main exported function with retry ─────────────────────────────────────────
export async function generateSituation(
  config: AIConfig,
  sprint: number,
  playerName: string,
  previousTitles: string[] = [],
): Promise<AISituation> {
  const prompt = buildPrompt(sprint, playerName, previousTitles);
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let rawText = '';
    try {
      switch (config.provider as AIProvider) {
        case 'gemini':  rawText = await callGemini(config, prompt);  break;
        case 'openai':  rawText = await callOpenAI(config, prompt);  break;
        case 'claude':  rawText = await callClaude(config, prompt);  break;
        default: throw new Error('Provider desconhecido.');
      }
      return extractJSON(rawText);
    } catch (e) {
      if (attempt === maxAttempts) {
        const msg = e instanceof Error ? e.message : String(e);
        throw new Error(`Falha após ${maxAttempts} tentativas: ${msg}`);
      }
      // Wait a moment before retrying
      await new Promise((r) => setTimeout(r, 800 * attempt));
    }
  }

  throw new Error('Falha inesperada ao gerar situação.');
}

// ── Quick connection test ─────────────────────────────────────────────────────
export async function testConnection(config: AIConfig): Promise<{ ok: boolean; error?: string }> {
  try {
    const testPrompt = 'Responda apenas com o JSON: {"ok":true}';

    switch (config.provider) {
      case 'gemini': {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: testPrompt }] }],
            generationConfig: { maxOutputTokens: 20 },
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          return { ok: false, error: (err as { error?: { message?: string } })?.error?.message || `Erro ${res.status}` };
        }
        return { ok: true };
      }
      case 'openai': {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.apiKey}` },
          body: JSON.stringify({ model: config.model, messages: [{ role: 'user', content: testPrompt }], max_tokens: 10 }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          return { ok: false, error: (err as { error?: { message?: string } })?.error?.message || `Erro ${res.status}` };
        }
        return { ok: true };
      }
      case 'claude': {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({ model: config.model, max_tokens: 10, messages: [{ role: 'user', content: testPrompt }] }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          return { ok: false, error: (err as { error?: { message?: string } })?.error?.message || `Erro ${res.status}. Claude pode bloquear chamadas do browser.` };
        }
        return { ok: true };
      }
    }
    return { ok: false, error: 'Provider desconhecido.' };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}
