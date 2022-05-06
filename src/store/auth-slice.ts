import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: false,
    loading: false,
  },
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
  },
});
