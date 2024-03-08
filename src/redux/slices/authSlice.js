import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils";
import toastr from "cogo-toast";

const initialState = {
  email: null,
  token: null,
  isLoading: false,
  status: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    try {
      const { data } = await axios.post("/v1/auth/login", {
        email,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("appToken", data.token);
      }
      return data;
    } catch (error) {
      toastr.error("Invalid user", { position: "top-right", heading: "Error" });
      if (error.response.status === 422) {
        toastr.error("Unprocessable Entity", {
          position: "top-right",
          heading: "Error",
        });
      }
    }
  }
);

export const forgotPass = createAsyncThunk(
  "auth/forgotPass",
  async ({ rejectWithValue }) => {
    try {
      const { email } = await axios.post("/v1/auth/password-set");
      return email;
    } catch (error) {
      console.error(error);
      toastr.error(`${error.response.data.detail[0].error}`, {
        position: "top-right",
        heading: "Error",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPass = createAsyncThunk(
  "auth/reset",
  async ({ password, token }) => {
    try {
      const { data } = await axios.post("/v1/auth/password-reset", {
        password,
        token,
      });
      if (data) {
        window.localStorage.getItem("appToken");
        window.localStorage.removeItem("appToken");
      }
      return data;
    } catch (error) {
      console.error(error);
      toastr.error(`${error.response.data.detail[0].error}`, {
        position: "top-right",
        heading: "Error",
      });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.email = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.message;
        state.email = action.payload?.email;
        state.token = action.payload?.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = action.payload?.message || "";
        state.isLoading = false;
      })

      .addCase(resetPass.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.message;
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.status =
          action.payload?.message || "Sorry, we encountered a problem";
        state.isLoading = false;
      })

      .addCase(forgotPass.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(forgotPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.message;
      })
      .addCase(forgotPass.rejected, (state, action) => {
        state.status =
          action.payload?.message || "Sorry, we encountered a problem";
        state.isLoading = false;
      });
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
