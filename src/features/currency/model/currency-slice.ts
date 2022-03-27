import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localData } from '~/shared/lib/local-storage';

// eslint-disable-next-line no-shadow
export enum Currency {
  usd = 'USD',
  eur = 'EURO',
}

/* eslint-disable no-param-reassign */
export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currency: localData.currency as Currency,
  },
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
    },
  },
});
