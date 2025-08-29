import { useState } from "react";
import type { Content } from "../../../custom-types/content.type";
import { Pencil, Share2, Trash2, Check, Copy } from "lucide-react";
import {
  capitalizeFirstChar,
  getContentTypeColor,
} from "../../../utils/content.utils";
import { TagChip } from "../tag-chip/tag-chip";

// export type Note = {
//   id: string;
//   icon?: React.ReactNode;
//   title: string;
//   contentType: "list" | "image" | "text";
//   bullets?: string[];
//   imageAlt?: string;
//   tags: string[];
//   text?: string;
//   addedOn: string;
// };

type ContentCardProps = {
  content: Content;
};

export function ContentCard({ content }: ContentCardProps) {
  console.log(getContentTypeColor(content.type));
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = content.url;
    try {
      // copying url to clipboard
      await navigator.clipboard.writeText(url);
      setCopied(true);

      // toggling back to normal
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }
  return (
    <article
      className="solid-border color-base-200 color-base-content flex h-full flex-col rounded-2xl p-5"
      role="region"
      aria-labelledby={`note-${content.id}-title`}
    >
      <header className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {capitalizeFirstChar(content.type)}
          </span>
          <span
            className={`rounded-full h-4 w-4 
              ${getContentTypeColor(content.type)}`}
          ></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Share note"
            className="rounded-lg p-2 cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="More options"
            className="rounded-lg p-2 cursor-pointer"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Delete note"
            className="rounded-lg p-2 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </header>

      <h3
        id={`note-${content.id}-title`}
        className="mb-3 text-balance text-xl font-semibold"
      >
        {content.type === "image" ? "Future Projects" : content.title}
      </h3>

      <div className="mb-3 flex items-center gap-2 rounded-xl border px-2.5 py-1.5">
        <span
          className="truncate text-xs"
          title={content.url}
          aria-label="Content link"
        >
          {content.url}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy content link"
          className="text-secondary ml-auto inline-flex items-center rounded-md p-1.5 cursor-pointer"
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
          <span className="sr-only">{copied ? "Copied" : "Copy link"}</span>
        </button>
      </div>

      <footer className="mt-auto pt-2 text-xs">
        {content.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {content.tags.map((t) => (
              <span>
                <TagChip label={t} />
              </span>
            ))}
          </div>
        )}
      </footer>
    </article>
  );
}
