export const selectAllSugar = (state) => state.measuring.allSugar;

export const selectOneDay = (state) => state.measuring.oneDay;

export const selectOneMonth = (state) => state.measuring.oneMonth;

export const selectSixMonth = (state) => state.measuring.sixMonth;

export const selectIsLoading = (state) => state.measuring.isLoading;

export const selectIsLoadingAllSugar = (state) =>
  state.measuring.isLoadingAllSugar;

export const selectError = (state) => state.measuring.error;
