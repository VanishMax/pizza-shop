import React, {useState, createContext, useEffect} from 'react';
import type {CartEntity, ComponentProps, Pizza, UserContext} from '../types';
import request from '../api';

export const LocalStorageItem = 'pizza-shop';

type GlobalContextValueType = {
  auth: UserContext|null,
  currency: string|null,
  cart: CartEntity[],
}

type GlobalContextType<T> = {
  value: GlobalContextValueType,
  set: ((field: T, value: any) => void)|null,
  pizzas: Pizza[],
}

const defaultContextValue = {
  auth: null,
  currency: null,
  cart: [],
};

export const GlobalContext = createContext<GlobalContextType<(keyof GlobalContextValueType)|'orders'>>({
  value: defaultContextValue,
  set: null,
  pizzas: [],
});

export default function Context ({children}: ComponentProps<{}>) {
  const [auth, setAuth] = useState<UserContext|null>(null);
  const [currency, setCurrency] = useState<string|null>(null);
  const [cart, setCart] = useState<CartEntity[]>([]);
  const [pizza, setPizza] = useState<Pizza[]>([]);

  const setter = {
    auth: (value: UserContext|null) => {
      setAuth(value);
      return value;
    },
    orders: (value: string) => {
      if (auth?.user) {
        const usr: UserContext = {...auth, user: {...auth.user, orders: [...(auth?.user?.orders || []), value]}}
        setAuth(usr);
        return usr;
      }
      return auth;
    },
    currency: (value: string|null) => {
      setCurrency(value);
      return;
    },
    cart: (value: CartEntity|null) => {
      if (value === null) {
        setCart([]);
        return [];
      }

      const isInTheCart = cart.some((item) => item.id === value.id);
      let newValue: CartEntity[];
      if (isInTheCart) {
        if (value.count > 0) newValue = cart?.map((item) => {
          if (item.id === value.id) return value;
          return item;
        });
        else newValue = cart.filter((item) => item.id !== value.id);
      }
      else newValue = [...cart, value];

      setCart(newValue);
      return newValue;
    },
  };

  const setField = (field: (keyof GlobalContextValueType)|'orders', value: any) => {
    const newValue = setter[field](value);
    localStorage.setItem(LocalStorageItem, JSON.stringify({
      ...{auth, currency, cart},
      [field]: newValue,
    }))
  };

  const val: GlobalContextType<(keyof GlobalContextValueType)|'orders'> = {
    value: {
      auth,
      currency,
      cart,
    },
    set: setField,
    pizzas: pizza,
  };

  const fetchUser = async () => {
    setAuth({loading: true, token: '', user: null});
    const res = await request('/api/profile');
    try {
      const data = await res.json();
      if (res.ok) setField('auth', data);
      else setField('auth', null);
    } catch (e) {
      console.error(e);
      setField('auth', null);
    }
  }

  const loadPizza = async () => {
    const res = await fetch('/api/pizza');
    try {
      setPizza(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPizza();

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
