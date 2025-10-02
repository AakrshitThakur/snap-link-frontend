import { Link } from "react-router-dom";
import { ContentCard } from "../../components/custom/content-card/content-card";
// import type { Content } from "../../custom-types/content.type";
import { Brain, Plus, Share2 } from "lucide-react";
import { useFetch } from "../../hooks/use-fetch";
import { useSelector, useDispatch } from "react-redux";
import { setCallApi } from "../../features/content/content-api-call";
import {
  successNotification,
  errorNotification,
} from "../../utils/toast.utils";
import type {
  GetAllContentApi,
  Content,
} from "../../custom-types/content.type";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import BasicSpinner from "../../components/custom/spinners/basic-spinner";
import Error from "../../components/custom/errors/errors";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export default function Dashboard() {
  // get states / setters to get / call api for contents
  const dispatch = useDispatch<AppDispatch>();
  // setting states for use-fetch hook
  const { url, options } = useSelector(
    (state: RootState) => state.contentCallApi
  );

  // setting states for dashboard
  const [contents, setContents] = useState<Content[] | undefined>(undefined);

  const { data, loading, error } = useFetch<GetAllContentApi>(url, options);

  useEffect(() => {
    // call api on mounting
    dispatch(
      setCallApi({
        url: baseApiUrl + "/contents/all",
        options: {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      })
    );
  }, []);

  // handle api response
  useEffect(() => {
    if (data) {
      setContents(data?.contents);
      successNotification(data.message);
      return;
    }
    if (error) {
      // api error
      errorNotification(error.message);
    }
  }, [data, error]);

  return (
    <main
      id="dashboard"
      className="bg-animate color-base-100 color-base-content relative h-full w-full flex flex-col mx-auto max-w-7xl p-5 sm:p-10 md:p-10"
    >
      {/* loading during API execution */}
      {loading || !data ? (
        <div
          className="flex justify-center items-center h-full w-full"
          role="status"
        >
          <BasicSpinner />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <section className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <h1 className="text-pretty text-2xl font-semibold">All Contents</h1>

            <div className="flex items-center gap-3">
              <Link to="/links">
                <button
                  type="button"
                  className="color-secondary color-secondary-content inline-flex items-center gap-1 rounded-xl border px-4 py-2 text-sm font-medium leading-none cursor-pointer"
                >
                  <Share2 className="h-4 w-4" aria-hidden />
                  <span>Share Content</span>
                  <span className="sr-only">Share your knowledge base</span>
                </button>
              </Link>

              <Link to="/create-content">
                <button
                  type="button"
                  className="color-primary color-primary-content inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium leading-none cursor-pointer"
                >
                  <Plus className="h-4 w-4" aria-hidden />
                  <span>Add Content</span>
                </button>
              </Link>
            </div>
          </section>

          {contents && contents.length < 1 ? (
            <div className="w-full h-full flex justify-center items-center">
              <Error text="No contents found" />
            </div>
          ) : (
            <section className="flex-1" aria-label="Notes list">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {contents?.map((c, idx) => (
                  <ContentCard key={idx} content={c} />
                ))}
              </div>
            </section>
          )}

          {/* Decorative icon matching theme; hidden from layout */}
          <div className="sr-only">
            <Brain aria-hidden className="h-0 w-0" />
          </div>
        </>
      )}
    </main>
  );
}
