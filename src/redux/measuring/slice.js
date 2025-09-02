import { createSlice } from "@reduxjs/toolkit";
import {
  addMeasuringRequest,
  allSugarRequest,
  deleteMeasuringRequest,
  oneDayRequest,
  oneMonthRequest,
  sixMonthRequest,
} from "./operations.js";

const measuringSlice = createSlice({
  name: "measuring",
  initialState: {
    allSugar: [],
    oneDay: [],
    oneMonth: [],
    sixMonth: [],
    addSugar: {},
    isLoadingAllSugar: false,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMeasuringRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.addSugar = action.payload;
      })
      .addCase(addMeasuringRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(allSugarRequest.pending, (state) => {
        state.isLoadingAllSugar = true;
      })
      .addCase(allSugarRequest.fulfilled, (state, action) => {
        state.isLoadingAllSugar = false;
        state.error = null;
        state.allSugar = action.payload;
      })
      .addCase(allSugarRequest.rejected, (state, action) => {
        state.isLoadingAllSugar = false;
        state.error = action.payload;
      })
      .addCase(oneDayRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(oneDayRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.oneDay = action.payload;
      })
      .addCase(oneDayRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(oneMonthRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(oneMonthRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.oneMonth = action.payload;
      })
      .addCase(oneMonthRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sixMonthRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sixMonthRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.sixMonth = action.payload;
      })
      .addCase(sixMonthRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteMeasuringRequest.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteMeasuringRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
  reducers: {
    errorReset(state) {
      state.error = null;
    },
  },
});

export const { errorReset } = measuringSlice.actions;

export default measuringSlice.reducer;
