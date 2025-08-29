import { ContentCard } from "../../components/custom/content-card/content-card";
import type { Content } from "../../custom-types/content.type";
import { Brain, Plus, Share2 } from "lucide-react";

export default function Page() {
  const contents: Content[] = [
    {
      id: "1",
      title: "Project Ideas",
      type: "image",
      url: "https://chatgpt.com/c/68b12c40-fbbc-8320-s83d4-9a7703be88e1",
      tags: ["productivity", "ideas"],
    },
    {
      id: "2",
      title: "Donald Trump's Tweet",
      type: "article",
      url: "https://v0.app/chat/project-ideas-ua3HAHKHZka",
      tags: ["tweet", "trendings"],
    },
    {
      id: "3",
      title: "Chemistry Notes",
      type: "document",
      url: "http://localhost:5173/dashboard",
      tags: ["chemistry", "notes"],
    },
  ];

  return (
    <main
      id="dashboard"
      className="color-base-100 color-base-content mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
    >
      <section className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-pretty text-2xl font-semibold">All Contents</h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
          >
            <Share2 className="h-4 w-4" aria-hidden />
            <span>Share Brain</span>
            <span className="sr-only">Share your knowledge base</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4" aria-hidden />
            <span>Add Content</span>
          </button>
        </div>
      </section>

      <section aria-label="Notes list">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {contents.map((c) => (
            <ContentCard key={c.id} content={c} />
          ))}
        </div>
      </section>

      {/* Decorative icon matching theme; hidden from layout */}
      <div className="sr-only">
        <Brain aria-hidden className="h-0 w-0" />
      </div>
    </main>
  );
}
