/**
 * When the LLM returns empty extracted or a generic reply, we still merge
 * obvious facts from user text so the draft progresses and the UI can show
 * Submit / finish flow instead of looping on "tell me more".
 */
import type { InquiryDraft, InquiryAgentMessage } from '@/types/inquiry-agent';
import { REQUIRED_INQUIRY_FIELDS } from '@/types/inquiry-agent';

const GENERIC_REPLY_SNIPPETS = [
  'Thanks—could you share a bit more',
  'could you share a bit more about your project',
];

export function isGenericReply(reply: string): boolean {
  const r = reply.toLowerCase();
  return GENERIC_REPLY_SNIPPETS.some((s) => r.includes(s.toLowerCase()));
}

function lastUserMessage(messages: InquiryAgentMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'user') return messages[i].content.trim();
  }
  return '';
}

function allUserText(messages: InquiryAgentMessage[]): string {
  return messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content.trim())
    .join('\n');
}

/** Single line, no email, looks like a name/company answer */
function looksLikeCompanyName(s: string): boolean {
  const t = s.trim();
  if (t.length < 2 || t.length > 120) return false;
  if (/@/.test(t)) return false;
  if (/\n/.test(t)) return false;
  // Mostly not a full sentence
  if (/^(i |we |our |my |the |a |an )/i.test(t) && t.split(/\s+/).length > 6)
    return false;
  return true;
}

function extractEmail(s: string): string | null {
  const m = s.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
  return m ? m[0] : null;
}

/**
 * Rule-based extraction from conversation. Does not invent; only fills when clear.
 */
export function heuristicExtract(
  messages: InquiryAgentMessage[],
  draft: InquiryDraft
): Partial<Record<keyof InquiryDraft, string | boolean>> {
  const out: Partial<Record<keyof InquiryDraft, string | boolean>> = {};
  const last = lastUserMessage(messages);
  const all = allUserText(messages);

  if (!last) return out;

  // Email anywhere in thread
  if (!draft.contact_email) {
    const email = extractEmail(all) || extractEmail(last);
    if (email) out.contact_email = email;
  }

  // Company name: short line that doesn't read like a project sentence
  if (!draft.company_name && looksLikeCompanyName(last)) {
    const isProjectSentence =
      /^(i |we )\s*(want|need|will|am|'m|have)\s/i.test(last) ||
      /\b(sell|develop|build|website|app|ecommerce|platform)\b/i.test(last);
    if (!isProjectSentence) {
      out.company_name = last;
    }
  }

  // Project description: accumulate intent lines
  const intentLines = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content.trim())
    .filter(
      (t) =>
        /develop|build|sell|need|want|website|app|ecommerce|organic|jaggery|project|platform|store/i.test(
          t
        )
    );
  if (intentLines.length > 0) {
    const desc = intentLines.join(' ');
    if (desc.length > 10) {
      if (!draft.project_description) out.project_description = desc.slice(0, 2000);
      if (!draft.project_title) {
        // One-line title from first intent or company + "partnership inquiry"
        const first = intentLines[0];
        out.project_title =
          first.length <= 100
            ? first
            : first.slice(0, 97) + '...';
      }
    }
  }

  return out;
}

export function buildAcknowledgingReply(
  draft: InquiryDraft,
  missing: (keyof InquiryDraft)[]
): string {
  const parts: string[] = [];
  if (draft.company_name)
    parts.push(`I've noted ${draft.company_name} as the company.`);
  if (draft.project_description && draft.project_description.length > 20)
    parts.push(
      `Your project sounds like: ${draft.project_description.slice(0, 120)}${draft.project_description.length > 120 ? '…' : ''}`
    );
  if (missing.length === 0)
    return "We're ready to submit. Use Submit inquiry when you're happy with the summary.";
  const next =
    missing[0] === 'contact_email'
      ? 'What email should we use to follow up?'
      : missing[0] === 'contact_name'
        ? 'Who should we address—your name or main contact?'
        : missing[0] === 'project_title'
          ? 'In one short line, what should we call this project?'
          : missing[0] === 'project_description'
            ? 'What do you want to achieve—walk me through scope and main features so we can document it properly.'
            : missing[0] === 'budget_range'
              ? 'What budget range are you working with (even a ballpark helps)?'
              : missing[0] === 'timeline'
                ? 'What timeline are you aiming for (e.g. MVP date or launch quarter)?'
                : `Could you share ${String(missing[0]).replace(/_/g, ' ')}?`;
  const prefix = parts.length > 0 ? parts.join(' ') + ' ' : '';
  return prefix + `To finish: ${next}`;
}

export function hasEnoughForFinishPanel(draft: InquiryDraft): boolean {
  return Boolean(
    (draft.company_name && draft.project_description) ||
      (draft.project_description && draft.project_description.length > 30)
  );
}
