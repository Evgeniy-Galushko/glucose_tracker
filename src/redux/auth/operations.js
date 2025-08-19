import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://blood-sugar-control-backend.onrender.com";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const registrationRequest = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const data = await axios.post("/api/user/register", user);
      setAuthHeader(data.data.data.accessToken);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginRequest = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const data = await axios.post("/api/user/login", user);
      // console.log(data.data.data);
      setAuthHeader(data.data.data.accessToken);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userInformRequest = createAsyncThunk(
  "auth/userInform",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (token) {
        setAuthHeader(token);
      }
      const data = await axios.get("/api/user/userInformation");
      // console.log(data.data.data);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userUpdatingRequest = createAsyncThunk(
  "auth/userUpdating",
  async (userUpdate, thunkAPI) => {
    const { age, bloodSugarNorm, gender, weight, height, name } = userUpdate;
    // console.log(age, bloodSugarNorm, gender, weight, height, name);
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (token) {
        setAuthHeader(token);
      }
      const data = await axios.put("/api/user/updating", {
        ...(age && { age }),
        ...(bloodSugarNorm && { bloodSugarNorm }),
        ...(gender && { gender }),
        ...(weight && { weight }),
        ...(height && { height }),
        ...(name && { name }),
      });
      console.log(data.data.data);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signoutRequest = createAsyncThunk(
  "auth/signout",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (token) {
        setAuthHeader(token);
      }
      await axios.post("/api/user/logout");
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
