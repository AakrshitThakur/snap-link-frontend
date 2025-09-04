import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Share2, Trash2, Check, Copy } from "lucide-react";
import {
  capitalizeFirstChar,
  getContentTypeColor,
} from "../../../utils/content.utils";
import { TagChip } from "../tag-chip/tag-chip";
import type { Content } from "../../../custom-types/content.type";
import {
  infoNotification,
  errorNotification,
} from "../../../utils/toast.utils";

type ContentCardProps = {
  content: Content;
};

export function ContentCard({ content }: ContentCardProps) {
  // copy to clipboard state
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = content.url;
    try {
      // copying url to clipboard
      await navigator.clipboard.writeText(url);
      setCopied(true);

      // toggling back to normal
      setTimeout(() => setCopied(false), 1500);

      infoNotification("URL copied to clipboard successfully");
    } catch (error) {
      if (error instanceof Error) {
        errorNotification(error.message);
      }
    }
  }

  return (
    <article
      className="solid-border color-base-200 color-base-content flex h-full flex-col rounded-2xl p-5 transition duration-700 ease-in-out hover:scale-105"
      role="region"
      aria-labelledby={`${content.title}-title`}
    >
      <header className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {capitalizeFirstChar(content.type)}
          </span>
          <span
            className={`rounded-full h-4 w-4 animate-pulse
              ${getContentTypeColor(content.type)}`}
          ></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Share note"
            className="hover-color rounded-lg p-2 cursor-pointer"
            onClick={() =>
              infoNotification("Sharing individual link feature — coming soon")
            }
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="More options"
            className="hover-color rounded-lg p-2 cursor-pointer"
          >
            <Link to={`/contents/${content._id}/update`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </button>
          <button
            type="button"
            aria-label="Delete note"
            className="hover-color rounded-lg p-2 cursor-pointer"
          >
            <Link to={`/contents/${content._id}/delete`}>
              <Trash2 className="h-4 w-4" />
            </Link>
          </button>
        </div>
      </header>

      <h3
        id={`${content.title}-title`}
        className="mb-3 text-balance text-xl font-semibold"
      >
        {content.title}
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
          className="text-accent ml-auto inline-flex items-center rounded-md p-1.5 cursor-pointer"
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
        {content.tagIds.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {content.tagIds.map((t) => (
              <span>
                <TagChip label={t.title} />
              </span>
            ))}
          </div>
        )}
      </footer>
    </article>
  );
}
