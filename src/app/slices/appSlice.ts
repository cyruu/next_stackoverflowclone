import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "appSlice",
  initialState: {
    loggedIn: false,
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload.loggeIn;
    },
  },
});
export const { setLoggedIn } = slice.actions;
export default slice.reducer;
