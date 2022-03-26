import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line no-shadow
export enum Currency {
  usd = 'USD',
  eur = 'EURO',
}

/* eslint-disable no-param-reassign */
export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currency: Currency.usd as Currency,
  },
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
    },
  },
});
