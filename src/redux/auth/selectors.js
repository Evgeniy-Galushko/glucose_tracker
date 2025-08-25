export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const selectErrorUser = (state) => state.auth.error;

export const selectIsLoadingUser = (state) => state.auth.isLoading;
