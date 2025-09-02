import { useDispatch } from "react-redux";
import { setCallApi } from "../../../features/content/content-api-call";
import { FILTER_CONTENTS } from "../../../constants/content.constant";
import { capitalizeFirstChar } from "../../../utils/content.utils";
import type { AppDispatch } from "../../../store/store";
import { useParams } from "react-router-dom";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export default function ShareableFilterContents() {
  const dispatch = useDispatch<AppDispatch>();
  const { linkId } = useParams();

  console.log(linkId);

  function filterContents(f: string) {
    // get all contents
    if (f === "all") {
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
      return;
    }
    // get filtered content
    dispatch(
      setCallApi({
        url: baseApiUrl + `/links/${linkId}/?type=${f}`,
        options: {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      })
    );
  }

  return (
    <>
      {Object.entries(FILTER_CONTENTS).map(([c, L]) => (
        <button
          className="hover-color text-sm flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
          onClick={() => filterContents(c)}
        >
          <L strokeWidth={1} className="h-5 w-5" />
          <span className="text-sm font-medium">{capitalizeFirstChar(c)}</span>
        </button>
      ))}
    </>
  );
}
