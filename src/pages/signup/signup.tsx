import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAsAuthenticated } from "../../features/auth/auth-slice";
import { CircleUserRound, AtSign, KeyRound, UserRoundPlus } from "lucide-react";
import { validateSignup } from "../../utils/auth.utils";
import { useFetch } from "../../hooks/use-fetch";
import {
  successNotification,
  errorNotification,
} from "../../utils/toast.utils";
import type { AppDispatch } from "../../store/store";
import type { AuthApiResponse } from "../../custom-types/auth.type";
import InfoAlert from "../../components/custom/alert/info.alert";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export default function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // initializing all the states
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // api states
  const [url, setUrl] = useState<string>("");
  const [options, setOptions] = useState<RequestInit | undefined>(undefined);

  // custom hook to fetch api
  const { data, loading, error } = useFetch<AuthApiResponse>(url, options);

  // on-change function
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.trim() }));
  }

  // on-submit function
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // setting validation errors
    setErrors({
      username: "",
      email: "",
      password: "",
      confirm: "",
    });
    const err = validateSignup(form);
    if (typeof err === "object") return setErrors(err);

    // waiting for api response
    setSubmitting(loading);

    // invoke useFetch hook
    setUrl(baseApiUrl + "/auth/signup");
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        password: form.password,
      }),
      credentials: "include",
    });
  }

  // on successful sign-in navigate to dashboard
  useEffect(() => {
    // set states to initial values
    if (error) {
      setUrl("");
      setOptions(undefined);
      setSubmitting(false);
      errorNotification(error.message);
      return;
    }
    if (data) {
      // set states to initial values
      setForm({
        username: "",
        email: "",
        password: "",
        confirm: "",
      });
      setUrl("");
      setOptions(undefined);
      setSubmitting(false);
      successNotification(data.message);

      // used for filtering navbar
      dispatch(setAsAuthenticated());

      // navigate to dashboard
      navigate("/dashboard");
    }
  }, [data, error, navigate]);

  return (
    <div
      id="signup-page"
      className="bg-animate color-base-100 color-base-content relative h-full w-full flex items-center justify-center p-5 sm:p-10 md:p-15"
    >
      <InfoAlert />
      <div className="color-base-200 color-base-content p-8 w-full max-w-lg rounded-xl">
        <div className="flex flex-col items-center gap-1 mb-5">
          <span className="rounded-full color-accent color-accent-content w-11 sm:w-13 md:w-15 h-auto p-2">
            <UserRoundPlus strokeWidth={1.25} className="w-full h-full" />
          </span>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm">Join us today to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mb-3">
          <div>
            <label className="block text-base font-medium mb-1">Username</label>
            <div className="relative rounded-lg text-sm mb-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                {/* user icon */}
                <CircleUserRound strokeWidth={1} />
              </span>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg"
                placeholder="Jane_Doe"
              />
            </div>
            <span className="text-error">
              {errors.username && errors.username}
            </span>
          </div>

          <div>
            <label className="block text-base font-medium mb-1">Email</label>
            <div className="relative rounded-lg text-sm mb-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                {/* mail icon */}
                <AtSign strokeWidth={1} />
              </span>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg"
                placeholder="you@example.com"
              />
            </div>
            <span className="text-error">{errors.email && errors.email}</span>
          </div>

          <div>
            <label className="block text-base font-medium mb-1">Password</label>
            <div className="relative rounded-lg text-sm mb-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <KeyRound strokeWidth={1} />
              </span>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <span className="cursor-pointer hover:underline">
                  {showPassword ? "Hide" : "Show"}
                </span>
              </button>
            </div>
            <span className="text-error">
              {errors.password && errors.password}
            </span>
          </div>

          <div>
            <label className="block text-base font-medium mb-1">Confirm</label>
            <div className="relative rounded-lg text-sm mb-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <KeyRound strokeWidth={1} />
              </span>
              <input
                name="confirm"
                type={showPassword ? "text" : "password"}
                value={form.confirm}
                onChange={handleChange}
                className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg"
                placeholder="Confirm password"
              />
            </div>
            <span className="text-error">
              {errors.confirm && errors.confirm}
            </span>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className={`color-success color-success-content rounded-md text-nowrap px-2 py-2 sm:px-2 sm:py-2
              md:px-3 md:py-2 text-sm sm:text-sm md:text-base w-2xs ${
                submitting ? "cursor-progress" : "cursor-pointer"
              }`}
            >
              {submitting ? (
                <div className="flex justify-center items-center gap-1">
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-[rgb(0,10,2)] border-t-transparent" />
                  Creating account...
                </div>
              ) : (
                "Create account"
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-xs">
            Already have an account?{" "}
            <Link to="/signin">
              <button
                type="button"
                className="text-accent hover-color rounded-md text-xs px-2 py-1 font-medium cursor-pointer"
              >
                Sign in
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
