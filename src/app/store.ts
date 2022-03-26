import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { pizzaSlice } from '~/entities/pizza';
import { cartSlice } from '~/features/cart';
import { authSlice } from '~/features/auth';
import { currencySlice } from '~/features/currency';

export const store = configureStore({
  reducer: {
    pizza: pizzaSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    currency: currencySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
