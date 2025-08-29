import { useState } from "react";

export default function Signout() {
  const [submitting, setSubmitting] = useState(false);

  // on-submit function
  function signout() {
    setSubmitting(true);
    // api
  }

  return (
    <div
      id="signout-page"
      className="color-base-100 color-base-content min-h-screen flex items-center justify-center p-4"
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
