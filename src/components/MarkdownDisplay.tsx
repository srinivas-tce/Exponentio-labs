"use client";

import ReactMarkdown from "react-markdown";

type MarkdownDisplayProps = {
  content: string | null | undefined;
  className?: string;
};

/**
 * Renders markdown as styled HTML for facilitator/inquiry views.
 * Uses Tailwind classes only (no @tailwindcss/typography required).
 */
export function MarkdownDisplay({ content, className = "" }: MarkdownDisplayProps) {
  const text = (content ?? "").trim();
  if (!text) return null;

  return (
    <div className={`markdown-body text-gray-800 ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-gray-900 mt-6 mb-3 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold text-gray-900 mt-5 mb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-gray-900 mt-4 mb-2">{children}</h3>
          ),
          p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-3 space-y-1 ml-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-3 space-y-1 ml-1">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <pre className="bg-gray-100 rounded-lg p-3 text-sm overflow-x-auto mb-3">
                  <code className={className}>{children}</code>
                </pre>
              );
            }
            return (
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 my-3 text-gray-600 italic">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-6 border-gray-200" />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
