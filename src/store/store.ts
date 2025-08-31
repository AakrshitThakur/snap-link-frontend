import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth-slice";
import contentCallApiReducer from "../features/content/content-api-call";

const store = configureStore({
  reducer: {
    auth: authReducer,
    contentCallApi: contentCallApiReducer,
  },
});

export { store };

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
