import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "https://blood-sugar-control-backend.onrender.com";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const addMeasuringRequest = createAsyncThunk(
  "auth/addMeasuring",
  async (measuring, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (token) {
        setAuthHeader(token);
      }
      const data = await axios.post("/api/measurements/add", measuring);
      console.log(data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const allSugarRequest = createAsyncThunk(
  "news/allSugar",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (token) {
        setAuthHeader(token);
      }
      const data = await axios.get(`/api/measurements/all-dimensions`);
      console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const oneDayRequest = createAsyncThunk(
  "news/oneDay",
  async (day, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (token) {
        setAuthHeader(token);
      }
      const data = await axios.get(`/api/measurements/in-one-day?day=${day}`);
      // console.log(data.data.data);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const oneMonthRequest = createAsyncThunk(
  "news/oneMonth",
  async (oneMonth, thunkAPI) => {
    console.log(oneMonth);
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (token) {
        setAuthHeader(token);
      }
      const data = await axios.get(
        `/api/measurements/in-one-month?month=${oneMonth}`
      );
      console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sixMonthRequest = createAsyncThunk(
  "news/sixMonth",
  async (sixMonth, thunkAPI) => {
    console.log(sixMonth);
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (token) {
        setAuthHeader(token);
      }
      const data = await axios.get(
        `/api/measurements/in-six-months?month=${sixMonth}`
      );
      console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteMeasuringRequest = createAsyncThunk(
  "news/deleteMeasuring",
  async (id, thunkAPI) => {
    console.log(id);
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (token) {
        setAuthHeader(token);
      }
      const data = await axios.get(
        `/api/measurements/delete-measurement/${id}`
      );
      console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
