import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tag, Link, MousePointer, Type } from "lucide-react";
import { TagChipDelete } from "../../components/custom/tag-chip/tag-chip-delete";
import { useFetch } from "../../hooks/use-fetch";
import BasicSpinner from "../../components/custom/spinners/basic-spinner";
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
  UpdateContentApi,
} from "../../custom-types/content.type";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export default function UpdateContent() {
  const navigate = useNavigate();

  // get content id
  const { contentId } = useParams();

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
  const { data, loading, error } = useFetch<UpdateContentApi>(url, options);

  useEffect(() => {
    setUrl(baseApiUrl + `/contents/${contentId}`);
    setOptions({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }, []);

  // custom change for tag input
  function handleChangeForTag(e: React.ChangeEvent<HTMLInputElement>) {
    setTag(e.target.value);
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

  console.log(form);

  // on-change function
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    const err = form && validateCreateContent(form);
    if (typeof err === "object") return setErrors(err);

    // waiting for api response
    setSubmitting(loading);

    // invoke useFetch hook
    setUrl(baseApiUrl + `/contents/${contentId}/update`);
    setOptions({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });
  }

  // on successful creation navigate to dashboard
  useEffect(() => {
    // set states to initial values
    if (error) {
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
    if (data?.content) {
      // set states to initial values
      //   setForm({
      //     title: "",
      //     url: "",
      //     type: "website",
      //     tags: [],
      //   });
      setForm({
        title: data.content.title,
        url: data.content.url,
        type: data.content.type,
        tags: data.content.tagIds.map((t) => t.title),
      });
      setUrl("");
      setOptions(undefined);
      setSubmitting(loading);
      successNotification(data.message);
    } else if (data) {
      // set states to initial values
      //   setForm({
      //     title: "",
      //     url: "",
      //     type: "website",
      //     tags: [],
      //   });
      setForm({
        title: "",
        url: "",
        type: "website",
        tags: [],
      });
      setUrl("");
      setOptions(undefined);
      setSubmitting(loading);
      successNotification(data?.message || "Success");

      // navigate to dashboard
      navigate("/dashboard");
    }
  }, [data, error, navigate]);

  return (
    <div
      id="signup-page"
      className="bg-animate color-base-100 color-base-content min-h-screen flex items-center justify-center p-4"
    >
      {/* loading during API execution */}
      {loading || !data?.content ? (
        <div
          className="flex justify-center items-center min-h-screen"
          role="status"
        >
          <BasicSpinner />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="solid border w-full max-w-md rounded-xl overflow-hidden">
          <div className="color-base-200 color-base-content p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Update Content</h1>
              <p className="text-sm">Updating existing content</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <div className="relative rounded-lg mb-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* mail icon */}
                    <Type strokeWidth={1} />
                  </span>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg text-sm"
                    placeholder="e.g., My Travel Blog Post"
                  />
                </div>
                <span className="text-error text-sm">
                  {errors.title && errors.title}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <div className="relative rounded-lg mb-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link strokeWidth={1} />
                  </span>
                  <input
                    name="url"
                    type="text"
                    value={form.url}
                    onChange={handleChange}
                    className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg text-sm"
                    placeholder="https://example.com/article"
                  />
                </div>
                <span className="text-error text-sm">
                  {errors.url && errors.url}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Choose a type
                </label>
                <div className="relative rounded-lg mb-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MousePointer strokeWidth={1} />
                  </span>
                  <select
                    id="my-dropdown"
                    className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg text-sm"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    {CONTENT_TYPE.map((c, idx) => (
                      <>
                        <option
                          className="color-neutral color-neutral-content text-sm"
                          key={idx}
                          value={c}
                        >
                          {capitalizeFirstChar(c)}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                {/* <span className="text-error text-sm">
                {errors.type && errors.type}
              </span> */}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Add tags
                </label>
                <div className="relative flex gap-2 rounded-lg mb-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag strokeWidth={1} />
                  </span>
                  <input
                    name="tag"
                    type="text"
                    value={tag}
                    onChange={handleChangeForTag}
                    className="solid-border block w-full pl-10 pr-4 py-2 rounded-lg text-sm"
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
                <span className="text-error text-sm">
                  {errors.tags && errors.tags}
                </span>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="color-success color-success-content rounded-md text-nowrap px-2 py-2 sm:px-2 sm:py-2
              md:px-3 md:py-2 text-sm sm:text-sm md:text-base cursor-pointer"
                >
                  {submitting ? "Please wait..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
