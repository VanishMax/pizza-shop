import React, {useState, createContext} from 'react';
import type {ComponentProps, UserContext} from '../types';

type GlobalContextValueType = {
  auth: UserContext|null,
  currency: string|null,
  cart: string|null,
}

type GlobalContextType<T> = {
  value: GlobalContextValueType,
  set: ((field: T, value: any) => void)|null,
}

export const Context = createContext<GlobalContextType<keyof GlobalContextValueType>>({
  value: {
    auth: null,
    currency: null,
    cart: null,
  },
  set: null,
});

export default function GlobalContext ({children}: ComponentProps<{}>) {
  const [auth, setAuth] = useState<UserContext|null>(null);
  const [currency, setCurrency] = useState<string|null>(null);
  const [cart, setCart] = useState<string|null>(null);

  const setter = {
    auth: setAuth,
    currency: setCurrency,
    cart: setCart,
  };

  const setField = (field: keyof GlobalContextValueType, value: any) => {
    setter[field](value);
  };

  const val: GlobalContextType<keyof GlobalContextValueType> = {
    value: {
      auth,
      currency,
      cart,
    },
    set: setField,
  };

  return (
    <Context.Provider value={val}>
      {children}
    </Context.Provider>
  );
}
