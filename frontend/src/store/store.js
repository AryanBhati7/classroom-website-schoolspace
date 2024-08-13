import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  devTools: import.meta.env.VITE_MODE !== "production",
});

export default store;
