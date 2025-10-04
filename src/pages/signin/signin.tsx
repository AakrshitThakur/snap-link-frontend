import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAsAuthenticated } from "../../features/auth/auth-slice";
import { AtSign, KeyRound, LogIn, } from "lucide-react";
import { validateSignin } from "../../utils/auth.utils";
import { useFetch } from "../../hooks/use-fetch";
import {
  successNotification,
  errorNotification,
} from "../../utils/toast.utils";
import type { AppDispatch } from "../../store/store";
import type { AuthApiResponse } from "../../custom-types/auth.type";
import InfoAlert from "../../components/custom/alert/info.alert";
// import FloatingIcons from "../../components/custom/floating-icons/floating-icons";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // initializing all the states
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // frontend errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  // form element states
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
      email: "",
      password: "",
    });
    const err = validateSignin(form);
    if (typeof err === "object") return setErrors(err);

    // waiting for api response
    setSubmitting(true);

    // invoke useFetch hook
    setUrl(baseApiUrl + "/auth/signin");
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });
  }

  // on successful sign-in navigate to dashboard
  useEffect(() => {
    // set states to initial values
    if (error) {
      setUrl("");
      setOptions(undefined);
      setSubmitting(loading);
      errorNotification(error.message);
      return;
    }
    if (data) {
      // set states to initial values
      setForm({
        email: "",
        password: "",
      });
      setUrl("");
      setOptions(undefined);
      setSubmitting(loading);
      successNotification(data.message);

      // used for filtering navbar
      dispatch(setAsAuthenticated());

      // navigate to dashboard
      navigate("/dashboard");
    }
  }, [data, error, navigate]);

  return (
    <div
      id="signin-page"
      className="bg-animate color-base-100 color-base-content relative h-full w-full flex items-center justify-center p-5 sm:p-10 md:p-15"
    >
      <InfoAlert />

      <div className="w-full relative max-w-lg">

        <div className="color-base-200 color-base-content rounded-xl p-8">
          <div className="flex flex-col items-center gap-1">
            <span className="rounded-full color-accent color-accent-content w-11 sm:w-13 md:w-15 h-auto p-2">
              <LogIn strokeWidth={1.25} className="w-full h-full" />
            </span>
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-sm">Welcome Back!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 mb-2 md:mb-3">
            <div>
              <label className="block text-base font-medium mb-1">Email</label>
              <div className="relative rounded-lg mb-1 text-sm">
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
              <span className="text-error text-sm leading-tight">
                {errors.email && errors.email}
              </span>
            </div>

            <div>
              <label className="block text-base font-medium mb-1">
                Password
              </label>
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
              <span className="text-error text-sm leading-0">
                {errors.password && errors.password}
              </span>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className={`color-success color-success-content w-2xs rounded-md text-nowrap px-2 py-2 sm:px-2 sm:py-2
              md:px-3 md:py-2 text-sm sm:text-sm md:text-base ${
                submitting ? "cursor-progress" : "cursor-pointer"
              }`}
              >
                {submitting ? (
                  <div className="flex justify-center items-center gap-1">
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-[rgb(0,10,2)] border-t-transparent" />
                    <p>Signing In...</p>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-xs">
              Don't have an account?{" "}
              <Link to="/signup">
                <button className="text-accent hover-color rounded-md text-xs px-2 py-1 font-medium cursor-pointer">
                  Sign up
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
