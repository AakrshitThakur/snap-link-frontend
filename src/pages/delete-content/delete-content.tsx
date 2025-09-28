import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/use-fetch";
import {
  successNotification,
  errorNotification,
} from "../../utils/toast.utils";
import type { ContentBasicApi } from "../../custom-types/content.type";
import { Trash2 } from "lucide-react";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export default function DeleteContent() {
  // get content id
  const { contentId } = useParams();

  const navigate = useNavigate();

  // intializing all the states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // api states
  const [url, setUrl] = useState<string>("");
  const [options, setOptions] = useState<RequestInit | undefined>(undefined);

  // custom hook to fetch api
  const { data, loading, error } = useFetch<ContentBasicApi>(url, options);

  // call api on click
  function deleteContentById() {
    setIsSubmitting(loading);
    setUrl(baseApiUrl + `/contents/${contentId}/delete`);
    setOptions({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
  useEffect(() => {
    if (data) {
      // do not want to call api on intervals
      setUrl("");
      setOptions(undefined);
      successNotification(data.message);
      setIsSubmitting(loading);
      navigate("/dashboard");
    }
    if (error) {
      // api error
      setUrl("");
      setOptions(undefined);
      errorNotification(error.message);
      setIsSubmitting(loading);
      navigate("/dashboard");
    }
  }, [data, error]);

  return (
    <div
      id="delete-content-page"
      className="bg-animate color-base-100 color-base-content relative h-full w-full flex items-center justify-center p-5 sm:p-10 md:p-15"
    >
      <div className="color-base-200 color-base-content solid-border w-full max-w-md rounded-lg p-5">
        <h2 className="flex items-center justify-between text-lg font-semibold text-foreground text-pretty">
          <span className="rounded-full color-accent color-accent-content w-11 sm:w-13 md:w-15 h-auto p-2">
            <Trash2 strokeWidth={1.25} className="w-full h-full" />
          </span>
        </h2>

        <div className="mt-4 text-sm text-muted-foreground">
          Are you sure you want to delete this content?
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            className="hover-color rounded-md bg-muted px-3 py-2 text-sm font-medium text-foreground cursor-pointer"
          >
            <Link to="/dashboard">Close</Link>
          </button>

          <button
            onClick={deleteContentById}
            disabled={isSubmitting}
            type="button"
            className={`color-error color-error-content rounded-md px-3 py-2 text-sm font-medium ${
              isSubmitting ? "cursor-progress" : "cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center gap-1">
                <div className="animate-spin border-2 border-[rgb(0,10,2)] border-t-transparent rounded-full h-4 w-4" />
                <p>Deleting...</p>
              </div>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
