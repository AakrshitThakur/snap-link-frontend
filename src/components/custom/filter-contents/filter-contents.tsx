import { useDispatch } from "react-redux";
import { setCallApi } from "../../../features/content/content-api-call";
import { FILTER_CONTENTS } from "../../../constants/content.constant";
import { capitalizeFirstChar } from "../../../utils/content.utils";
import type { AppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export default function FilterContents() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  function filterContents(f: string) {
    // get all contents
    if (f === "all") {
      dispatch(
        setCallApi({
          url: baseApiUrl + "/contents/all/",
          options: {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        })
      );
      navigate("/dashboard");
      return;
    }
    // get filtered content
    dispatch(
      setCallApi({
        url: baseApiUrl + `/contents/all/?type=${f}`,
        options: {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      })
    );
    navigate("/dashboard");
  }

  return (
    <section id="filter-contents" className="pb-1 text-sm">
      {Object.entries(FILTER_CONTENTS).map(([c, L]) => (
        <button
          className="hover-color flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
          onClick={() => filterContents(c)}
        >
          <L strokeWidth={1} className="h-5 w-5" />
          <span className="font-medium">{capitalizeFirstChar(c)}</span>
        </button>
      ))}
    </section>
  );
}
