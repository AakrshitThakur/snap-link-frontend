import { useState } from "react";
import { AtSign, KeyRound } from "lucide-react";
import { validateSignin } from "../../utils/auth.utils";

export default function Signin() {
  // initializing all the states
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // on-change function
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // on-submit function
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // setting validation errors
    setErrors({
      email: "",
      password: "",
    });
    const err = validateSignin(form);
    if (typeof err === "object") return setErrors(err);

    setSubmitting(true);
    // api
  }

  return (
    <div
      id="signup-page"
      className="color-base-100 color-base-content min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md rounded-xl shadow-xl overflow-hidden">
        <div className="color-base-200 color-base-content p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-sm">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-3">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative rounded-lg mb-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* mail icon */}
                  <AtSign strokeWidth={1} />
                </span>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <span className="text-error text-sm">
                {errors.email && errors.email}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative rounded-lg mb-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound strokeWidth={1} />
                </span>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg text-sm"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                >
                  <span className="cursor-pointer hover:underline">
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </button>
              </div>
              <span className="text-error text-sm">
                {errors.password && errors.password}
              </span>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="color-success color-success-content rounded-md text-nowrap px-2 py-2 sm:px-2 sm:py-2
              md:px-3 md:py-2 text-sm sm:text-sm md:text-base cursor-pointer"
              >
                {submitting ? "Please wait..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="hover-color rounded-md text-sm px-3 py-2 font-medium hover:underline focus:outline-none focus:underline cursor-pointer"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
