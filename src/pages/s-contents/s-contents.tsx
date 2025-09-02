import { useParams } from "react-router-dom";
import { ShareableContentCard } from "../../components/custom/s-content-card/s-content-card";
// import type { Content } from "../../custom-types/content.type";
import { useFetch } from "../../hooks/use-fetch";
import { useSelector, useDispatch } from "react-redux";
import { setCallApi } from "../../features/content/content-api-call";
import {
  successNotification,
  errorNotification,
} from "../../utils/toast.utils";
import type {
  ShareableContentsApi,
  Content,
} from "../../custom-types/content.type";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import BasicSpinner from "../../components/custom/spinners/basic-spinner";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export default function ShareableContents() {
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

  // setting states for use-fetch hook
  // const [url, setUrl] = useState<string>("");
  // const [options, setOptions] = useState<RequestInit | undefined>(undefined);

  const { data, loading, error } = useFetch<ShareableContentsApi>(url, options);

  console.log(data, loading, username, error);

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
    // setUrl(baseApiUrl + "/contents/all");
    // setOptions({
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    // });
  }, []);

  useEffect(() => {
    if (data?.contents) {
      // do not want to call api on intervals
      // dispatch(
      //   setCallApi({
      //     url: "",
      //     options: undefined,
      //   })
      // );
      // setUrl("");
      // setOptions(undefined);
      setUsername(data.username || "");
      setContents(data?.contents);
      successNotification(data.message);
    }
    if (error) {
      // api error
      // dispatch(
      //   setCallApi({
      //     url: "",
      //     options: undefined,
      //   })
      // );
      // setUrl("");
      // setOptions(undefined);
      errorNotification(error.message);
    }
  }, [data, error]);

  return (
    <main
      id="shareable-dashboard"
      className="bg-animate color-base-100 color-base-content h-screen overflow-y-scroll mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
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

          <section aria-label="Notes list">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {contents?.map((c, idx) => (
                <ShareableContentCard key={idx} content={c} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
