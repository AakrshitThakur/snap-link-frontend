import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAsUnAuthenticated } from "../../features/auth/auth-slice";
import {
  successNotification,
  errorNotification,
} from "../../utils/toast.utils";
import { useFetch } from "../../hooks/use-fetch";
import type { AppDispatch } from "../../store/store";
import type { AuthApiResponse } from "../../custom-types/auth.type";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export default function Signout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // initializing all the states
  const [submitting, setSubmitting] = useState(false);

  // api states
  const [url, setUrl] = useState<string>("");
  const [options, setOptions] = useState<RequestInit | undefined>(undefined);

  // custom hook to fetch api
  const { data, loading, error } = useFetch<AuthApiResponse>(url, options);

  // on-click function
  function signout() {
    // waiting for api response
    setSubmitting(loading);

    // invoke useFetch hook
    setUrl(baseApiUrl + "/auth/signout");
    setOptions({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  // on successful sign-in navigate to dashboard
  useEffect(() => {
    if (error) {
      // set states to initial values
      setSubmitting(false);
      errorNotification(error.message);
    }
    if (data) {
      // set states to initial values
      setSubmitting(false);
      successNotification(data.message);
console.log("hi");
      // used for filtering navbar
      dispatch(setAsUnAuthenticated());

      // navigate to sign-in page
      navigate("/signin");
    }
  }, [data, error, navigate]);

  return (
    <div
      id="signout-page"
      className="bg-animate color-base-100 color-base-content min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md rounded-xl shadow-xl overflow-hidden">
        <div className="color-base-200 color-base-content p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Sign Out</h1>
            <p className="text-sm">Are you sure you want to sign out?</p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={signout}
              disabled={submitting}
              className="color-warning color-warning-content rounded-md text-nowrap px-2 py-2 sm:px-2 sm:py-2
              md:px-3 md:py-2 text-sm sm:text-sm md:text-base cursor-pointer"
            >
              {submitting ? "Please wait..." : "Sign out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
