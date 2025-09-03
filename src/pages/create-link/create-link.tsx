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

  console.log("linkId", linkId);

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
    } else if (data?.message) {
      // do not want to call api on intervals
      setIsSubmitting(loading);
      successNotification(data.message);
      setLinkId("");
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
      className="bg-animate color-base-100 color-base-content h-screen flex items-center justify-center p-4"
    >
      <div className="color-base-200 color-base-content solid-border w-full max-w-md flex flex-col items-center justify-center rounded-lg p-6">
        <div className="mb-3">
          <div className="flex justify-center gap-1">
            <h2 className="text-lg font-semibold text-foreground text-pretty">
              {linkId
                ? "Share Your Valuable Links with the World"
                : "Generate a Shareable Link"}
            </h2>
            <Flame className="text-accent" />
          </div>
        </div>

        <div className="mb-3 flex items-center flex-wrap gap-2 rounded-xl border px-2.5 py-1.5">
          <span
            className="truncate text-xs"
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

        <div className="flex justify-end gap-2">
          {linkId ? (
            <button
              onClick={deleteLink}
              disabled={isSubmitting}
              type="button"
              className="color-error color-error-content rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
            >
              {isSubmitting ? "Please wait..." : "Delete link"}
            </button>
          ) : (
            <button
              onClick={createLink}
              disabled={isSubmitting}
              type="button"
              className="color-success color-success-content rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
            >
              {isSubmitting ? "Please wait..." : "Create link"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
