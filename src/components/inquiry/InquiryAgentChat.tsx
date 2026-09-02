'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import type { InquiryDraft, InquiryAgentMessage } from '@/types/inquiry-agent';
import { EMPTY_INQUIRY_DRAFT } from '@/types/inquiry-agent';

const OPENING_MESSAGE =
  "Hello—I'm Analyst Expa. I'll run this like a short discovery session: tell me what you're trying to achieve with the lab partnership, and I'll ask a few focused questions so we capture everything without you wrestling a long form.";

/**
 * Assistant often returns **bold** and multi-line lists; plain text collapses newlines.
 * Escape HTML, then **text** → <strong>, newlines → <br />.
 */
function assistantMessageHtml(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  const withBold = escaped.replace(
    /\*\*([^*]+)\*\*/g,
    '<strong class="font-semibold text-slate-900">$1</strong>'
  );
  return withBold.replace(/\n/g, '<br />');
}

export default function InquiryAgentChat({
  onBackToManual,
}: {
  onBackToManual: () => void;
}) {
  const [messages, setMessages] = useState<InquiryAgentMessage[]>([
    { role: 'assistant', content: OPENING_MESSAGE },
  ]);
  const [draft, setDraft] = useState<InquiryDraft>({ ...EMPTY_INQUIRY_DRAFT });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [showFinishPanel, setShowFinishPanel] = useState(false);
  const [finishPanelOpen, setFinishPanelOpen] = useState(false);
  const [missingRequired, setMissingRequired] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Instant scroll only—no smooth animation
    bottomRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    setInput('');
    const userMsg: InquiryAgentMessage = { role: 'user', content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/inquiry/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages,
          draft,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Agent request failed');
      }

      const mergedDraft = data.draft as InquiryDraft;
      setDraft(mergedDraft);
      setReadyToSubmit(Boolean(data.readyToSubmit));
      setShowFinishPanel(Boolean(data.showFinishPanel));
      setMissingRequired(
        Array.isArray(data.missingRequired) ? data.missingRequired : []
      );
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply as string },
      ]);
      // Submit is manual only: when data.readyToSubmit is true, the green
      // "Submit inquiry" button appears in the header (and optional banner below).
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setMessages((prev) => prev.slice(0, -1));
      setInput(text);
    } finally {
      setLoading(false);
    }
  };

  const submitInquiryWithDraft = async (draftToSubmit: InquiryDraft) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/external-inquiries/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draftToSubmit),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Submit failed');
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submit failed');
    } finally {
      setLoading(false);
    }
  };

  const submitInquiry = () => submitInquiryWithDraft(draft);

  if (success) {
    return (
      <section className="py-16 bg-green-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Inquiry submitted
          </h2>
          <p className="text-gray-600 mb-6">
            Our team will review and get back to you within 24–48 hours.
          </p>
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setMessages([{ role: 'assistant', content: OPENING_MESSAGE }]);
              setDraft({ ...EMPTY_INQUIRY_DRAFT });
              setReadyToSubmit(false);
              setShowFinishPanel(false);
              setFinishPanelOpen(false);
              setMissingRequired([]);
            }}
            className="text-blue-600 font-medium hover:underline"
          >
            Submit another inquiry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[520px]">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
              <span className="font-semibold text-slate-800 truncate">
                Analyst Expa
              </span>
            
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {showFinishPanel && !readyToSubmit && (
                <button
                  type="button"
                  onClick={() => setFinishPanelOpen(true)}
                  className="rounded-lg border border-indigo-600 text-indigo-600 px-3 py-1.5 text-sm font-semibold hover:bg-indigo-50"
                >
                  Finish & submit
                </button>
              )}
              {readyToSubmit && (
                <button
                  type="button"
                  onClick={() => void submitInquiry()}
                  disabled={loading}
                  className="rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-bold shadow-sm hover:bg-green-700 disabled:opacity-50 animate-pulse sm:animate-none"
                >
                  {loading ? 'Submitting…' : 'Submit inquiry'}
                </button>
              )}
              <button
                type="button"
                onClick={onBackToManual}
                className="text-sm text-slate-600 hover:text-indigo-600"
              >
                Use form instead
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[360px]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-md'
                      : 'bg-slate-100 text-slate-800 rounded-bl-md [&_strong]:text-slate-900'
                  }`}
                >
                  {m.role === 'assistant' ? (
                    <div
                      className="break-words"
                      dangerouslySetInnerHTML={{
                        __html: assistantMessageHtml(m.content),
                      }}
                    />
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2 text-slate-500 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyst Expa is thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* When draft is complete, show clear CTA — submit only happens on click */}
          {readyToSubmit && (
            <div className="mx-4 mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
              <span className="font-medium">
                All required details are captured. Submit when you&apos;re ready—we
                won&apos;t send anything until you click.
              </span>
              <button
                type="button"
                onClick={() => void submitInquiry()}
                disabled={loading}
                className="shrink-0 rounded-lg bg-green-600 text-white px-4 py-2 font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Submitting…' : 'Submit inquiry'}
              </button>
            </div>
          )}

          {finishPanelOpen && !readyToSubmit && missingRequired.length > 0 && (
            <div className="mx-4 mb-2 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-sm">
              <p className="font-medium text-indigo-900 mb-3">
                Almost there—fill the remaining required fields to submit.
              </p>
              <div className="space-y-3">
                {missingRequired.includes('contact_name') && (
                  <input
                    type="text"
                    placeholder="Contact name"
                    className="w-full rounded-lg border border-indigo-200 px-3 py-2"
                    value={draft.contact_name}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, contact_name: e.target.value }))
                    }
                  />
                )}
                {missingRequired.includes('contact_email') && (
                  <input
                    type="email"
                    placeholder="Contact email"
                    className="w-full rounded-lg border border-indigo-200 px-3 py-2"
                    value={draft.contact_email}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, contact_email: e.target.value }))
                    }
                  />
                )}
                {missingRequired.includes('company_name') && (
                  <input
                    type="text"
                    placeholder="Company name"
                    className="w-full rounded-lg border border-indigo-200 px-3 py-2"
                    value={draft.company_name}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, company_name: e.target.value }))
                    }
                  />
                )}
                {missingRequired.includes('project_title') && (
                  <input
                    type="text"
                    placeholder="Project title (one line)"
                    className="w-full rounded-lg border border-indigo-200 px-3 py-2"
                    value={draft.project_title}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, project_title: e.target.value }))
                    }
                  />
                )}
                {missingRequired.includes('project_description') && (
                  <textarea
                    placeholder="Project description"
                    rows={3}
                    className="w-full rounded-lg border border-indigo-200 px-3 py-2"
                    value={draft.project_description}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        project_description: e.target.value,
                      }))
                    }
                  />
                )}
                {missingRequired.includes('budget_range') && (
                  <input
                    type="text"
                    placeholder="Budget range (e.g. 10–20L, under $50k)"
                    className="w-full rounded-lg border border-indigo-200 px-3 py-2"
                    value={draft.budget_range}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, budget_range: e.target.value }))
                    }
                  />
                )}
                {missingRequired.includes('timeline') && (
                  <input
                    type="text"
                    placeholder="Timeline (e.g. MVP in 4 months)"
                    className="w-full rounded-lg border border-indigo-200 px-3 py-2"
                    value={draft.timeline}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, timeline: e.target.value }))
                    }
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => void submitInquiry()}
                disabled={loading}
                className="mt-4 w-full rounded-lg bg-green-600 text-white py-2 font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Submitting…' : 'Submit inquiry'}
              </button>
              <button
                type="button"
                onClick={() => setFinishPanelOpen(false)}
                className="mt-2 w-full text-indigo-600 text-sm"
              >
                Back to chat
              </button>
            </div>
          )}

          {error && (
            <div className="mx-4 mb-2 flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="p-4 border-t border-slate-100">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder="Type your message…"
                rows={2}
                className="flex-1 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => void send()}
                disabled={loading || !input.trim()}
                className="self-end rounded-xl bg-indigo-600 text-white p-3 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            {!readyToSubmit && (
              <p className="mt-2 text-xs text-slate-500">
                Submit appears only after company, contact, email, title,
                description, <strong>budget</strong>, and <strong>timeline</strong>
                are captured—and the agent will keep asking until features are
                concrete, not just high-level.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
