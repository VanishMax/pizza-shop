import { createSlice } from '@reduxjs/toolkit';
import { localData } from '~/shared/lib/local-storage';
import { CartEntity } from './types';

/* eslint-disable no-param-reassign */
export const cartSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: localData.cart as CartEntity[],
  },
  reducers: {},
});
