import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Pizza } from '~/shared/types/pizza';

/* eslint-disable no-param-reassign */
export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    pizzas: [] as Pizza[],
  },
  reducers: {
    setPizzas: (state, action: PayloadAction<Pizza[]>) => {
      state.pizzas = action.payload;
    },
  },
});
