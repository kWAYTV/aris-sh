'use client';

import ShikiHighlighter from 'react-shiki';

interface JsonViewerProps {
  data: unknown;
  className?: string;
}

function safeJsonStringify(data: unknown): [string, boolean] {
  try {
    const result = JSON.stringify(data, null, 2);
    return result === undefined
      ? ['Data is not JSON serializable', false]
      : [result, true];
  } catch (error) {
    return [
      `Error: ${error instanceof Error ? error.message : 'Invalid JSON'}`,
      false
    ];
  }
}

export function JsonViewer({ data, className }: JsonViewerProps) {
  const [content, isJson] = safeJsonStringify(data);

  return (
    <ShikiHighlighter
      language={isJson ? 'json' : 'text'}
      theme='github-dark'
      className={className}
    >
      {content}
    </ShikiHighlighter>
  );
}
