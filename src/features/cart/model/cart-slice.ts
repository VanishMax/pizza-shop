import { createSlice } from '@reduxjs/toolkit';
import { CartEntity } from './types';

/* eslint-disable no-param-reassign */
export const cartSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [] as CartEntity[],
  },
  reducers: {},
});
