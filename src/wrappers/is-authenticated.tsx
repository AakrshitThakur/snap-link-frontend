import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFetch } from "../hooks/use-fetch";
import { errorNotification } from "../utils/toast.utils";
import {
  setAsAuthenticated,
  setAsUnAuthenticated,
} from "../features/auth/auth-slice";
import type { IsAuthenticatedApi } from "../custom-types/auth.type";
import type { AppDispatch } from "../store/store";
import BasicSpinner from "../components/custom/spinners/basic-spinner";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export default function IsAuthenticated({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // api states
  const [url, setUrl] = useState<string>("");
  const [options, setOptions] = useState<RequestInit | undefined>(undefined);

  // custom hook to fetch api
  const { data, loading, error } = useFetch<IsAuthenticatedApi>(url, options);

  // start making call to api on mounting
  useEffect(() => {
    // invoke useFetch hook
    setUrl(baseApiUrl + "/auth/is-authenticated");
    setOptions({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }, []);

  // on unsuccess navigate to sign-in page
  useEffect(() => {
    if (error) {
      // set states to initial values
      setUrl("");
      setOptions(undefined);
      errorNotification("Please sign in or create an account to continue");

      // can't allow access to resources
      dispatch(setAsUnAuthenticated());
      navigate("/signin");
    }
    if (data) {
      // set states to initial values
      setUrl("");
      setOptions(undefined);

      // allow access to resources
      dispatch(setAsAuthenticated());
    }
  }, [data, error, navigate]);

  return (
    <>
      {!loading && data ? (
        children
      ) : (
        <main
          id="is-authenticated-wrapper"
          className="bg-animate color-base-100 color-base-content min-h-screen mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
        >
          <div
            className="flex justify-center items-center min-h-screen"
            role="status"
          >
            <BasicSpinner />
            <span className="sr-only">Loading...</span>
          </div>
        </main>
      )}
    </>
  );
}
