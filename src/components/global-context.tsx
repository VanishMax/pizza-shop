import React, {useState, createContext, useEffect} from 'react';
import type {ComponentProps, UserContext} from '../types';
import request from '../api';

export const LocalStorageItem = 'pizza-shop';

type GlobalContextValueType = {
  auth: UserContext|null,
  currency: string|null,
  cart: string|null,
}

type GlobalContextType<T> = {
  value: GlobalContextValueType,
  set: ((field: T, value: any) => void)|null,
}

const defaultContextValue = {
  auth: null,
  currency: null,
  cart: null,
};

export const GlobalContext = createContext<GlobalContextType<keyof GlobalContextValueType>>({
  value: defaultContextValue,
  set: null,
});

export default function Context ({children}: ComponentProps<{}>) {
  const [auth, setAuth] = useState<UserContext|null>(null);
  const [currency, setCurrency] = useState<string|null>(null);
  const [cart, setCart] = useState<string|null>(null);

  const setter = {
    auth: setAuth,
    currency: setCurrency,
    cart: setCart,
  };

  const setField = (field: keyof GlobalContextValueType, value: any) => {
    localStorage.setItem(LocalStorageItem, JSON.stringify({
      ...{auth, currency, cart},
      [field]: value,
    }))
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

  const fetchUser = async () => {
    setAuth({loading: true, token: '', user: null});
    const res = await request('/api/profile');
    try {
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setField('auth', data);
      } else {
        setField('auth', null);
      }
    } catch (e) {
      console.error(e);
      setField('auth', null);
    }
  }

  useEffect(() => {
    const data: GlobalContextValueType = JSON.parse(localStorage.getItem(LocalStorageItem) || JSON.stringify(defaultContextValue));
    setCurrency(data.currency);
    setCart(data.cart);

    if (data.auth?.token) fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <GlobalContext.Provider value={val}>
      {children}
    </GlobalContext.Provider>
  );
}
