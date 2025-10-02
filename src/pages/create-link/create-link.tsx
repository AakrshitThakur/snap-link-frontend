import { useState, useEffect } from "react";
import { Copy, Check, Flame } from "lucide-react";
import { useFetch } from "../../hooks/use-fetch";
import {
  infoNotification,
  successNotification,
  errorNotification,
} from "../../utils/toast.utils";
import type { CreateLinkApi } from "../../custom-types/link.type";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;
const baseFrontendUrl = import.meta.env.VITE_BASE_FRONTEND_URL;

export default function CreateLink() {
  // intializing all the states
  const [linkId, setLinkId] = useState<string>("");
  // copy to clipboard state
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // api states
  const [url, setUrl] = useState<string>("");
  const [options, setOptions] = useState<RequestInit | undefined>(undefined);

  // custom hook to fetch api
  const { data, loading, error } = useFetch<CreateLinkApi>(url, options);

  // Copy to clipboard
  async function handleCopy() {
    const url: string = baseFrontendUrl + "/links/" + linkId;
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
      } else {
        errorNotification(error as string);
      }
    }
  }

  function createLink() {
    setIsSubmitting(true);
    setUrl(baseApiUrl + "/links/create");
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  // call api on click
  function deleteLink() {
    setIsSubmitting(true);
    setUrl(baseApiUrl + "/links/delete");
    setOptions({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  // get shareable link on mount
  useEffect(() => {
    setUrl(baseApiUrl + "/links/get");
    setOptions({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }, []);

  useEffect(() => {
    if (data?.id) {
      // do not want to call api on intervals
      setIsSubmitting(loading);
      successNotification(data.message);
      setLinkId(data.id);
      return;
    } else if (data?.message) {
      // do not want to call api on intervals
      setIsSubmitting(loading);
      successNotification(data.message);
      setLinkId("");
      return;
    }
    if (error) {
      // api error
      setUrl("");
      setOptions(undefined);
      setIsSubmitting(loading);
      errorNotification(error.message);
    }
  }, [data, error]);

  return (
    <div
      id="create-link-page"
      className="bg-animate color-base-100 color-base-content relative h-full w-full flex items-center justify-center p-5 sm:p-10 md:p-15"
    >
      <div className="color-base-200 color-base-content solid-border w-full max-w-lg flex flex-col items-center justify-center rounded-lg p-5">
        <div className="mb-3">
          <div className="flex flex-col justify-center items-center gap-1">
            <span className="rounded-full color-accent color-accent-content w-11 sm:w-13 md:w-15 h-auto p-2">
              <Flame strokeWidth={1.25} className="w-full h-full" />
            </span>
            <h2 className="text-lg text-center font-semibold text-foreground text-pretty">
              {linkId
                ? "Share Your Valuable Links with the World"
                : "Generate a Shareable Link"}
            </h2>
          </div>
        </div>

        <div className="mb-3 rounded-xl border px-2.5 py-1.5">
          <span
            className="text-xs break-all"
            title={linkId}
            aria-label="Content link"
          >
            {linkId
              ? baseFrontendUrl + "/links/" + linkId
              : "Generate a new shareable link"}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy content link"
            className="text-accent ml-auto items-center rounded-md p-1.5 cursor-pointer"
          >
            {copied ? (
              <Check className="inline-block h-4 w-4" aria-hidden />
            ) : (
              <Copy className="inline-block h-4 w-4" aria-hidden />
            )}
            <span className="sr-only">{copied ? "Copied" : "Copy link"}</span>
          </button>
        </div>

        <div className="flex justify-end gap-2">
          {linkId ? (
            <button
              onClick={deleteLink}
              disabled={isSubmitting}
              type="button"
              className={`color-error color-error-content rounded-md px-3 py-2 text-sm font-medium ${
                isSubmitting ? "cursor-progress" : "cursor-pointer"
              }`}
            >
              {isSubmitting ? (
                <div className="flex justify-center items-center gap-1">
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-[rgb(0,10,2)] border-t-transparent" />
                  <p>Deleting link...</p>
                </div>
              ) : (
                "Delete link"
              )}
            </button>
          ) : (
            <button
              onClick={createLink}
              disabled={isSubmitting}
              type="button"
              className={`color-success color-success-content rounded-md px-3 py-2 text-sm font-medium ${
                isSubmitting ? "cursor-progress" : "cursor-pointer"
              }`}
            >
              {isSubmitting ? (
                <div className="flex justify-center items-center gap-1">
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-[rgb(0,10,2)] border-t-transparent" />
                  <p>Generating link...</p>
                </div>
              ) : (
                "Generate link"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
