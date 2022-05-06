import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */
export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      // state.pizzas = action.payload;
    },
  },
  extraReducers: {},
});
