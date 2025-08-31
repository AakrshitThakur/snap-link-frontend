import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

interface CallApi {
  url: string;
  options: RequestInit | undefined;
}

const initialState: CallApi = {
  url: "",
  options: undefined,
};

// central state for auth
const contentCallApiSlice = createSlice({
  name: "content-call-api",
  initialState,

  // Reducers must always return a new state object (immutability)
  // changes the state values
  reducers: {
    setCallApi: (state, action) => {
      const newUrl = action.payload.url;
      const newOptions = action.payload.options;
      return { ...state, url: newUrl, options: newOptions };
    },
  },
});

export const { setCallApi } = contentCallApiSlice.actions;

// This drills into the store and grabs the {contentCallApi} from the contentCallApiSlice
export const contentCallApi = (state: RootState) => state.contentCallApi;

export default contentCallApiSlice.reducer;
