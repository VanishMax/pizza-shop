import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Magic } from 'magic-sdk';

const magicApiKey = import.meta.env.VITE_MAGIC_KEY;
if (!magicApiKey) {
  throw new Error('Please, add VITE_MAGIC_KEY to the .env file!');
}

/* eslint-disable no-param-reassign */
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    magic: new Magic(magicApiKey),
  },
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      // state.pizzas = action.payload;
    },
  },
  extraReducers: {},
});
