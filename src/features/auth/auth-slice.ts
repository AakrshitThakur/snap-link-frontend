import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

// central state for auth
const authSlice = createSlice({
  name: "auth",
  initialState,

  // Reducers must always return a new state object (immutability)
  // changes the state values
  reducers: {
    setAsAuthenticated: () => {
      return { isAuthenticated: true };
    },
    setAsUnAuthenticated: () => {
      return { isAuthenticated: false };
    },
  },
});

export const { setAsAuthenticated, setAsUnAuthenticated } = authSlice.actions;

// This drills into the store and grabs the {isAuthenticated} from the auth slice
export const auth = (state: RootState) => state.auth;

export default authSlice.reducer;
