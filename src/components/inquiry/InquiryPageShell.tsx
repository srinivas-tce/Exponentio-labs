'use client';

import React, { useState } from 'react';
import ExternalInquiryForm from '@/components/ExternalInquiryForm';
import InquiryAgentChat from '@/components/inquiry/InquiryAgentChat';
import { MessageSquare, FileText } from 'lucide-react';

type Mode = 'choose' | 'agent' | 'manual';

export default function InquiryPageShell() {
  const [mode, setMode] = useState<Mode>('choose');

  if (mode === 'agent') {
    return <InquiryAgentChat onBackToManual={() => setMode('manual')} />;
  }

  if (mode === 'manual') {
    return (
      <div>
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-3 flex justify-end">
            <button
              type="button"
              onClick={() => setMode('agent')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Try intake assistant instead
            </button>
          </div>
        </div>
        <ExternalInquiryForm />
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Partner with our labs
        </h1>
        <p className="text-lg text-slate-600 mb-10">
          Tell us what you need—our intake assistant will capture the details
          like a business analyst—or use the full form if you prefer.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
        <button
            type="button"
            onClick={() => setMode('agent')}
            className="flex flex-col items-center gap-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-6 text-left hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <MessageSquare className="w-10 h-10 text-indigo-600" />
            <span className="font-semibold text-indigo-900">
              Chat with Analyst Expa
            </span>
            <span className="text-sm text-center text-indigo-700/80">
              We will help you to get started with your inquiry.
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMode('manual')}
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-6 text-left hover:border-slate-300 hover:shadow-md transition-all"
          >
            <FileText className="w-10 h-10 text-slate-600" />
            <span className="font-semibold text-slate-900">
              Inquiry Form
            </span>
           
          </button>

         
        </div>
      </div>
    </section>
  );
}
