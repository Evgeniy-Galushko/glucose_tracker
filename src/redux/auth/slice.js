import { createSlice } from "@reduxjs/toolkit";
import {
  loginRequest,
  registrationRequest,
  signoutRequest,
  userInformRequest,
  userUpdatingRequest,
} from "./operations.js";

const authSlise = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
      age: null,
      weight: null,
      height: null,
      bloodSugarNorm: null,
    },
    token: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationRequest.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(userInformRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userInformRequest.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.age = action.payload.age;
        state.user.weight = action.payload.weight;
        state.user.height = action.payload.height;
        state.user.bloodSugarNorm = action.payload.bloodSugarNorm;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(userInformRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // .addCase(userUpdatingRequest.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(userUpdatingRequest.fulfilled, (state, action) => {
      //   state.user.name = action.payload.name;
      //   state.user.email = action.payload.email;
      //   state.user.age = action.payload.age;
      //   state.user.weight = action.payload.weight;
      //   state.user.height = action.payload.height;
      //   state.isLoading = false;
      //   state.error = null;
      // })
      // .addCase(userUpdatingRequest.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })
      .addCase(signoutRequest.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
          age: null,
          weight: null,
          height: null,
        };
        state.token = null;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export default authSlise.reducer;
