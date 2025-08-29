import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export { store };

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
