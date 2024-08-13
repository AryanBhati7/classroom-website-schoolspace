import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: false,
  },
  reducers: {
    setUser: (state, action) => {
      if (!action.payload) {
        state.status = false;
        state.user = null;
      } else {
        state.status = true;
        state.user = action.payload;
      }
    },
  },
});

export const { setUser, unSetUser } = authSlice.actions;
export default authSlice.reducer;
