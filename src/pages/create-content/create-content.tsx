import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tag, Link, MousePointer, Type, CirclePlus } from "lucide-react";
import { TagChipDelete } from "../../components/custom/tag-chip/tag-chip-delete";
import { useFetch } from "../../hooks/use-fetch";
import {
  successNotification,
  errorNotification,
} from "../../utils/toast.utils";
import { CONTENT_TYPE } from "../../constants/content.constant";
import {
  capitalizeFirstChar,
  validateCreateContent,
} from "../../utils/content.utils";
import type {
  CreateContent,
  ContentBasicApi,
} from "../../custom-types/content.type";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export default function CreateContentPage() {
  const navigate = useNavigate();

  // initializing all the states
  const [form, setForm] = useState<CreateContent>({
    title: "",
    url: "",
    type: "website",
    tags: [],
  });
  // frontend errors
  const [errors, setErrors] = useState({
    title: "",
    url: "",
    tags: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [tag, setTag] = useState<string>("");

  // api states
  const [url, setUrl] = useState<string>("");
  const [options, setOptions] = useState<RequestInit | undefined>(undefined);

  // custom hook to fetch api
  const { data, loading, error } = useFetch<ContentBasicApi>(url, options);

  // custom change for tag input
  function handleChangeForTag(e: React.ChangeEvent<HTMLInputElement>) {
    setTag(e.target.value.trim());
  }

  // push new tag in form.tags
  function pushNewTag() {
    // validations
    if (tag.length < 2) errorNotification("Invalid tag name");
    else if (form.tags.length >= 5) {
      errorNotification("Only 5 tags are allowed for a content");
      setTag("");
    } else if (tag && form.tags.find((t) => t === tag)) {
      errorNotification("Duplicate tags aren't allowed");
      setTag("");
    } else {
      setForm((curr) => ({ ...curr, tags: [...form.tags, tag] }));
      setTag("");
    }
  }

  // on-change function
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.trim() }));
  }

  // on-submit function
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // setting validation errors
    setErrors({
      title: "",
      url: "",
      tags: "",
    });
    const err = validateCreateContent(form);
    if (typeof err === "object") return setErrors(err);

    // waiting for api response
    setSubmitting(true);

    // invoke useFetch hook
    setUrl(baseApiUrl + "/contents/create");
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });
  }

  // on successful creation navigate to dashboard
  useEffect(() => {
    if (error) {
      // set states to initial values
      setForm({
        title: "",
        url: "",
        type: "website",
        tags: [],
      });
      setUrl("");
      setOptions(undefined);
      setSubmitting(loading);
      errorNotification(error.message);

      // navigate to dashboard
      navigate("/dashboard");
    }
    if (data) {
      // set states to initial values
      setForm({
        title: "",
        url: "",
        type: "website",
        tags: [],
      });
      setUrl("");
      setOptions(undefined);
      setSubmitting(loading);
      successNotification(data.message);

      // navigate to dashboard
      navigate("/dashboard");
    }
  }, [data, error, navigate]);

  return (
    <div
      id="create-content-page"
      className="bg-animate color-base-100 color-base-content relative h-full w-full flex items-center justify-center p-5 sm:p-10 md:p-15"
    >
      <div className="w-full max-w-lg rounded-xl shadow-xl overflow-hidden">
        <div className="color-base-200 color-base-content p-9">
          <div className="flex flex-col items-center gap-1">
            <span className="rounded-full color-accent color-accent-content w-11 sm:w-13 md:w-15 h-auto p-2">
              <CirclePlus strokeWidth={1.25} className="w-full h-full" />
            </span>
            <h1 className="text-3xl font-bold">Create Content</h1>
            <p className="text-sm">Creating new content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-base font-medium mb-1">Title</label>
              <div className="relative text-sm rounded-lg mb-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  {/* mail icon */}
                  <Type strokeWidth={1} />
                </span>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg"
                  placeholder="e.g., My Travel Blog Post"
                />
              </div>
              <span className="text-error">{errors.title && errors.title}</span>
            </div>

            <div>
              <label className="block text-base font-medium mb-1">URL</label>
              <div className="relative text-sm rounded-lg mb-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Link strokeWidth={1} />
                </span>
                <input
                  name="url"
                  type="text"
                  value={form.url}
                  onChange={handleChange}
                  className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg"
                  placeholder="https://example.com/article"
                />
              </div>
              <span className="text-error">{errors.url && errors.url}</span>
            </div>

            <div>
              <label className="block text-base font-medium mb-1">
                Choose a type
              </label>
              <div className="relative text-sm rounded-lg mb-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <MousePointer strokeWidth={1} />
                </span>
                <select
                  id="my-dropdown"
                  className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  {CONTENT_TYPE.map((c, idx) => (
                    <>
                      <option
                        className="color-neutral color-neutral-content"
                        key={idx}
                        value={c}
                      >
                        {capitalizeFirstChar(c)}
                      </option>
                    </>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium mb-1">
                Add tags
              </label>
              <div className="relative flex gap-2 text-sm rounded-lg mb-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Tag strokeWidth={1} />
                </span>
                <input
                  name="tag"
                  type="text"
                  value={tag}
                  onChange={handleChangeForTag}
                  className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg"
                  placeholder="Add a tag (e.g., travel, tech, food)"
                />
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={pushNewTag}
                    className="color-info color-info-content rounded-md text-nowrap px-2 py-2 sm:px-2 sm:py-2
              md:px-3 md:py-2 text-sm sm:text-sm md:text-base cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {form.tags.map((t, idx) => (
                  <TagChipDelete
                    key={idx}
                    label={t}
                    form={form}
                    setForm={setForm}
                  />
                ))}
              </div>
              <span className="text-error">{errors.tags && errors.tags}</span>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className={`color-success color-success-content rounded-md text-nowrap px-2 py-2 sm:px-2 sm:py-2
              md:px-3 md:py-2 text-sm sm:text-sm md:text-base ${
                submitting ? "cursor-progress" : "cursor-pointer"
              }`}
              >
                {submitting ? (
                  <div className="flex justify-center items-center gap-1">
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-[rgb(0,10,2)] border-t-transparent" />
                    <p>Creating...</p>
                  </div>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
