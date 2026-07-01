import type { ReactNode } from "react";

export function renderSimpleMarkdown(content: string): ReactNode[] {
  const blocks = content.trim().split(/\n\n+/);

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="font-headline text-2xl font-bold text-on-surface mt-10 mb-4"
        >
          {trimmed.slice(3)}
        </h2>
      );
    }
    return (
      <p key={index} className="text-on-tertiary-container leading-relaxed mb-4">
        {trimmed}
      </p>
    );
  });
}
