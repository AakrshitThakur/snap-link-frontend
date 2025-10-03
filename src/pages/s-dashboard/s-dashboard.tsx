import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/use-fetch";
import { useSelector, useDispatch } from "react-redux";
import { setCallApi } from "../../features/content/content-api-call";
import { ShareableContentCard } from "../../components/custom/shareables/s-content-card/s-content-card";
import {
  successNotification,
  errorNotification,
} from "../../utils/toast.utils";
import type {
  ShareableContentsApi,
  Content,
} from "../../custom-types/content.type";
import type { AppDispatch, RootState } from "../../store/store";
import Error from "../../components/custom/errors/errors";
import BasicSpinner from "../../components/custom/spinners/basic-spinner";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export default function ShareableDashboard() {
  const { linkId } = useParams();

  // get states / setters to get / call api for contents
  const dispatch = useDispatch<AppDispatch>();
  // setting states for use-fetch hook
  const { url, options } = useSelector(
    (state: RootState) => state.contentCallApi
  );

  // setting states for dashboard
  const [contents, setContents] = useState<Content[] | null>(null);
  const [username, setUsername] = useState<string>("");

  const { data, loading, error } = useFetch<ShareableContentsApi>(url, options);

  useEffect(() => {
    // call api on mounting
    dispatch(
      setCallApi({
        url: baseApiUrl + `/links/${linkId}`,
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

  useEffect(() => {
    if (data?.contents) {
      // do not want to call api on intervals
      setUsername(data.username || "");
      setContents(data?.contents);
      successNotification(data.message);
    }
    if (error) {
      // api error
      errorNotification(error.message);
    }
  }, [data, error]);

  return (
    <main
      id="shareable-dashboard"
      className="bg-animate color-base-100 color-base-content relative h-full w-full flex flex-col mx-auto p-5 sm:p-10 md:p-10"
    >
      {/* loading during API execution */}
      {loading || !data ? (
        <div
          className="flex justify-center items-center min-h-screen"
          role="status"
        >
          <BasicSpinner />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <section className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-pretty text-2xl font-semibold">
              {username && `${username}'s All Contents`}
            </h1>
          </section>

          {contents && contents.length < 1 ? (
            <div className="flex-1 flex flex-col justify-center items-center">
              <Error text="No contents found" />
            </div>
          ) : (
            <section aria-label="Notes list">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {contents?.map((c, idx) => (
                  <ShareableContentCard key={idx} content={c} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
