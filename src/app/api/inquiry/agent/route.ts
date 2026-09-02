import { NextRequest, NextResponse } from 'next/server';
import type { InquiryDraft, InquiryAgentMessage } from '@/types/inquiry-agent';
import { EMPTY_INQUIRY_DRAFT, REQUIRED_INQUIRY_FIELDS } from '@/types/inquiry-agent';
import { ANALYST_EXPA_SYSTEM_PROMPT } from './prompt';
import {
  heuristicExtract,
  isGenericReply,
  buildAcknowledgingReply,
  hasEnoughForFinishPanel,
} from './heuristic';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

/** Gemini model — flash is fast/reliable; override with GEMINI_INQUIRY_MODEL */
const GEMINI_MODEL =
  process.env.GEMINI_INQUIRY_MODEL || 'gemini-2.5-flash';
const MAX_MESSAGES = Number(process.env.GEMINI_INQUIRY_MAX_MESSAGES || 60);

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function computeReadyToSubmit(draft: InquiryDraft): boolean {
  return REQUIRED_INQUIRY_FIELDS.every((key) => {
    const v = draft[key];
    if (key === 'contact_email') return typeof v === 'string' && isValidEmail(v);
    return typeof v === 'string' && String(v).trim().length > 0;
  });
}

function mergeDraft(
  previous: InquiryDraft,
  extracted: Partial<Record<keyof InquiryDraft, unknown>>
): InquiryDraft {
  const out = { ...previous };
  for (const key of Object.keys(EMPTY_INQUIRY_DRAFT) as (keyof InquiryDraft)[]) {
    const v = extracted[key];
    if (v === undefined || v === null) continue;
    if (key === 'equipment_needed') {
      if (typeof v === 'boolean') out.equipment_needed = v;
      else if (v === 'true' || v === true) out.equipment_needed = true;
      else if (v === 'false' || v === false) out.equipment_needed = false;
      continue;
    }
    if (typeof v === 'string' && v.trim()) {
      (out as unknown as Record<string, string>)[key] = v.trim();
    }
  }
  return out;
}

function extractFirstJsonObject(text: string): string | null {
  const start = text.indexOf('{');
  if (start < 0) return null;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (c === '\\' && inString) {
      escape = true;
      continue;
    }
    if (c === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

function parseAllJsonObjects(text: string): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  let rest = text.trim();
  while (rest.length > 0) {
    const chunk = extractFirstJsonObject(rest);
    if (!chunk) break;
    try {
      out.push(JSON.parse(chunk) as Record<string, unknown>);
    } catch {
      break;
    }
    rest = rest.slice(rest.indexOf(chunk) + chunk.length).trim();
  }
  return out;
}

function parseAgentJson(text: string): {
  reply: string;
  extracted: Partial<Record<keyof InquiryDraft, unknown>>;
} {
  let trimmed = text.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) trimmed = fence[1].trim();

  const objects = parseAllJsonObjects(trimmed);
  let reply = '';
  let extracted: Partial<Record<keyof InquiryDraft, unknown>> = {};

  const DRAFT_STRING_KEYS: (keyof InquiryDraft)[] = [
    'company_name',
    'contact_name',
    'contact_email',
    'project_title',
    'project_description',
    'contact_phone',
    'company_website',
    'industry',
    'project_requirements',
    'budget_range',
    'timeline',
    'preferred_lab_category',
    'preferred_lab_id',
    'equipment_details',
    'additional_notes',
  ];

  function liftFlatIntoExtracted(obj: Record<string, unknown>) {
    const partial: Partial<Record<keyof InquiryDraft, unknown>> = {};
    for (const key of DRAFT_STRING_KEYS) {
      const v = obj[key as string];
      if (typeof v === 'string' && v.trim()) {
        partial[key] = v.trim();
      }
    }
    if (typeof obj.equipment_needed === 'boolean') {
      partial.equipment_needed = obj.equipment_needed;
    }
    return partial;
  }

  for (const obj of objects) {
    if (typeof obj.reply === 'string' && obj.reply.length > 0) {
      reply = obj.reply;
    }
    if (obj.extracted && typeof obj.extracted === 'object' && obj.extracted !== null) {
      extracted = {
        ...extracted,
        ...(obj.extracted as Partial<Record<keyof InquiryDraft, unknown>>),
      };
    } else {
      // Flat schema: { reply, company_name, ... } without nested extracted
      const lifted = liftFlatIntoExtracted(obj);
      if (Object.keys(lifted).length > 0) {
        extracted = { ...extracted, ...lifted };
      }
    }
  }

  if (reply) {
    return { reply, extracted };
  }

  const first = extractFirstJsonObject(trimmed);
  if (first) {
    try {
      const parsed = JSON.parse(first) as Record<string, unknown>;
      if (typeof parsed.reply === 'string') {
        let ex = (parsed.extracted && typeof parsed.extracted === 'object'
          ? parsed.extracted
          : {}) as Partial<Record<keyof InquiryDraft, unknown>>;
        if (Object.keys(ex).length === 0) {
          const lifted = liftFlatIntoExtracted(parsed);
          if (Object.keys(lifted).length > 0) ex = { ...ex, ...lifted };
        }
        return { reply: parsed.reply, extracted: ex };
      }
    } catch {
      // fall through
    }
  }

  const replyMatch = trimmed.match(/"reply"\s*:\s*"((?:[^"\\]|\\.)*)"/);
  if (replyMatch) {
    return {
      reply: replyMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n'),
      extracted,
    };
  }

  return {
    reply: 'Thanks—could you share a bit more about your project?',
    extracted: {},
  };
}

/**
 * Gemini API — multi-turn via contents (user/model alternating).
 * responseMimeType application/json improves reliability vs local models.
 */
async function callGemini(
  messages: InquiryAgentMessage[],
  draft: InquiryDraft
): Promise<{ reply: string; extracted: Partial<Record<keyof InquiryDraft, unknown>> }> {
  const apiKey =
    process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY (or GOOGLE_API_KEY) is not set');
  }

  const systemWithDraft = `${ANALYST_EXPA_SYSTEM_PROMPT}

Current draft (merge only what changed this turn into extracted):
${JSON.stringify(draft)}

You MUST respond with valid JSON only: {"reply":"...","extracted":{}}`;

  // Gemini expects contents to start with user; if thread starts with assistant, prepend
  const contents: { role: string; parts: { text: string }[] }[] = [];
  let first = true;
  for (const m of messages) {
    const role = m.role === 'assistant' ? 'model' : 'user';
    if (first && role === 'model') {
      contents.push({
        role: 'user',
        parts: [{ text: '[User started the lab partnership inquiry session.]' }],
      });
      first = false;
    }
    contents.push({ role, parts: [{ text: m.content }] });
    first = false;
  }

  const url = `${GEMINI_BASE}/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const body = {
    systemInstruction: { parts: [{ text: systemWithDraft }] },
    contents,
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 2048,
      responseMimeType: 'application/json',
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('Gemini error:', res.status, errText);
    throw new Error(`Gemini request failed (${res.status})`);
  }

  const data = await res.json();
  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text || typeof text !== 'string') {
    throw new Error('Invalid Gemini response');
  }

  return parseAgentJson(text);
}

const PRD_SYSTEM = `You write a single PRD (Product Requirements Document) in Markdown from the given draft and conversation transcript.
Infer the project type from the transcript (e.g. e‑commerce, LMS, SaaS, mobile, IoT, internal tool) and structure sections so they fit that domain—use headings that make sense for that kind of product.
Output JSON only: {"project_requirements":"<markdown PRD>","project_description":"<optional short summary if draft description is thin>"}
Always include: Overview, Goals, Target users/roles, Scope & features (numbered), Out of scope if mentioned, Success criteria, Budget & timeline if present.
Use only facts from the input; do not invent features.`;

async function generatePrdIfMissing(
  merged: InquiryDraft,
  messages: InquiryAgentMessage[]
): Promise<Partial<Record<keyof InquiryDraft, unknown>>> {
  if (merged.project_requirements && merged.project_requirements.trim().length > 200) {
    return {};
  }
  const apiKey =
    process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) return {};

  const transcript = messages
    .map((m) => `${m.role}: ${m.content}`)
    .join('\n\n')
    .slice(0, 12000);
  const userPayload = `Draft JSON:\n${JSON.stringify({
    company_name: merged.company_name,
    project_title: merged.project_title,
    project_description: merged.project_description,
    industry: merged.industry,
    budget_range: merged.budget_range,
    timeline: merged.timeline,
  })}\n\nConversation transcript:\n${transcript}`;

  const url = `${GEMINI_BASE}/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const body = {
    systemInstruction: { parts: [{ text: PRD_SYSTEM }] },
    contents: [{ role: 'user', parts: [{ text: userPayload }] }],
    generationConfig: {
      temperature: 0.25,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return {};
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text || typeof text !== 'string') return {};
    const parsed = JSON.parse(text) as {
      project_requirements?: string;
      project_description?: string;
    };
    const out: Partial<Record<keyof InquiryDraft, unknown>> = {};
    if (typeof parsed.project_requirements === 'string' && parsed.project_requirements.trim().length > 100) {
      out.project_requirements = parsed.project_requirements.trim();
    }
    if (
      typeof parsed.project_description === 'string' &&
      parsed.project_description.trim().length > 50 &&
      (!merged.project_description || merged.project_description.length < 80)
    ) {
      out.project_description = parsed.project_description.trim();
    }
    return out;
  } catch {
    return {};
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages = body.messages as InquiryAgentMessage[] | undefined;
    const draft = (body.draft as InquiryDraft) || EMPTY_INQUIRY_DRAFT;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'messages array required' },
        { status: 400 }
      );
    }

    const trimmed =
      messages.length > MAX_MESSAGES
        ? messages.slice(-MAX_MESSAGES)
        : messages;

    let { reply, extracted } = await callGemini(trimmed, draft);
    let merged = mergeDraft(draft, extracted);

    const heuristic = heuristicExtract(trimmed, merged);
    const hadHeuristic = Object.keys(heuristic).length > 0;
    if (hadHeuristic) {
      merged = mergeDraft(merged, heuristic as Partial<Record<keyof InquiryDraft, unknown>>);
    }
    if (
      hadHeuristic &&
      (!reply ||
        isGenericReply(reply) ||
        Object.keys(extracted).length === 0)
    ) {
      const missingBefore = REQUIRED_INQUIRY_FIELDS.filter((key) => {
        const v = merged[key];
        if (key === 'contact_email')
          return typeof v !== 'string' || !isValidEmail(v);
        return typeof v !== 'string' || !String(v).trim();
      });
      reply = buildAcknowledgingReply(merged, missingBefore);
    }

    const missingRequired = REQUIRED_INQUIRY_FIELDS.filter((key) => {
      const v = merged[key];
      if (key === 'contact_email')
        return typeof v !== 'string' || !isValidEmail(v);
      return typeof v !== 'string' || !String(v).trim();
    });
    // Client shows Submit button when true; no auto-submit—user must click.
    let readyToSubmit = computeReadyToSubmit(merged);
    // Once required fields are present, ensure PRD lands in project_requirements for submit
    if (readyToSubmit) {
      const prdPatch = await generatePrdIfMissing(merged, trimmed);
      if (Object.keys(prdPatch).length > 0) {
        merged = mergeDraft(merged, prdPatch);
        readyToSubmit = computeReadyToSubmit(merged);
      }
    }
    const showFinishPanel =
      !readyToSubmit &&
      hasEnoughForFinishPanel(merged) &&
      missingRequired.length > 0;

    return NextResponse.json({
      reply,
      draft: merged,
      missingRequired,
      readyToSubmit,
      showFinishPanel,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Agent error';
    if (message.includes('GEMINI_API_KEY') || message.includes('GOOGLE_API_KEY')) {
      return NextResponse.json(
        {
          error:
            'Gemini not configured. Set GEMINI_API_KEY in .env (Google AI Studio).',
        },
        { status: 503 }
      );
    }
    console.error('inquiry agent error:', e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
