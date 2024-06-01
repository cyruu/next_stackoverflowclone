import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCookieUser = createAsyncThunk(
  "slice/cookieUser",
  async (thunkAPI) => {
    const response = await axios.get("api/users/getuser");

    if (response.data.statusCode == 200) {
      return response.data.loggedInUser;
    }

    return null;
  }
);

const slice = createSlice({
  name: "appSlice",
  initialState: {
    loggedInUser: null,
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload.loggedInUser;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCookieUser.pending, (state) => {
        state.loggedInUser = null;
      })
      .addCase(getCookieUser.fulfilled, (state, action) => {
        console.log("user loggedin checked", action.payload);
        state.loggedInUser = action.payload;
      })
      .addCase(getCookieUser.rejected, (state) => {
        state.loggedInUser = null;
      });
  },
});
export const { setLoggedInUser } = slice.actions;
export default slice.reducer;
