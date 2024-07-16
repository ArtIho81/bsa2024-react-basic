import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api, AuthResponse, Auth } from "../../api/requests";

export const authUser: any = createAsyncThunk<AuthResponse, Auth>(
  "user/authUser",
  async function (payload, { rejectWithValue }) {
    try {
      return await Api.authUser(payload);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUser: any = createAsyncThunk<User>(
  "user/getUser",
  async function (_, { rejectWithValue }) {
    try {
      return await Api.getUser();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export enum Status {
  LOADING = "loading",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

export type User = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
};
const initialUser: User = {
  id: "",
  fullName: "",
  email: "",
  createdAt: "",
};
const initialState = {
  user: initialUser,
  status: "",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state, action) {
      state.user = action.payload.user;
    },

    signOut(state) {
      state.user = initialUser;
      state.status = "";
      state.error = null;

      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.status = Status.RESOLVED;
        state.user = action.payload.user;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(authUser.rejected, (state, action) => {
        state.status = Status.REJECTED;
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = Status.RESOLVED;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = Status.REJECTED;
        state.error = action.payload;
      });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
