import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { getSampleJson } from '../action/auth.action';

const authInitialstate = {
  isAuthenticated: false,
  loading: false,
  data: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialstate,
  reducers: {
    login(state, action) {
      Cookies.set("isLoggedin", true);
      state.isAuthenticated = true;
      if (action?.payload?.callback) action.payload.callback();
    },
    logout(state, action) {
      Cookies.remove("isLoggedin");
      state.isAuthenticated = false;
      if (action?.payload?.callback) action.payload.callback();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSampleJson.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSampleJson.fulfilled, (state, action) => {
        state.loading = false;
        const { apiResponse, callback } = action.payload;
        console.log(apiResponse);
        state.data = apiResponse;
        if (callback) callback(true);
      })
      .addCase(getSampleJson.rejected, (state, action) => {
        state.loading = false;
        const { error, callback } = action.payload;
        state.data = '';
        console.log(error?.message);
        if (callback) callback(false);
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
