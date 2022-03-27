import { useState, createContext, useEffect } from 'react';
import type { CartEntity, UserContext } from '~/shared/types';
import { Pizza } from '~/entities/pizza';
import request from '~/shared/lib/request';

export const LocalStorageItem = 'pizza-shop';

export type Currency = 'usd' | 'eur';

type GlobalContextValueType = {
  auth: UserContext | null;
  currency: Currency | null;
  cart: CartEntity[];
};

type GlobalContextType<T> = {
  value: GlobalContextValueType;
  set: ((field: T, value: any) => void) | null;
  pizzas: Pizza[];
};

const defaultContextValue = {
  auth: null,
  currency: null,
  cart: [],
};

export const GlobalContext = createContext<
  GlobalContextType<keyof GlobalContextValueType | 'orders'>
>({
  value: defaultContextValue,
  set: null,
  pizzas: [],
});

const DEFAULT_CURRENCY: Currency = 'usd';

type ContextProps = JSX.IntrinsicElements['div'] & Readonly<{}>;

export default function Context({ children }: ContextProps) {
  const [auth, setAuth] = useState<UserContext | null>(null);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [cart, setCart] = useState<CartEntity[]>([]);
  const [pizza, setPizza] = useState<Pizza[]>([]);

  const setter = {
    auth: (value: UserContext | null) => {
      setAuth(value);
      return value;
    },
    orders: (value: string) => {
      if (auth?.user) {
        const usr: UserContext = {
          ...auth,
          user: { ...auth.user, orders: [...(auth?.user?.orders || []), value] },
        };
        setAuth(usr);
        return usr;
      }
      return auth;
    },
    currency: (value: Currency | null) => {
      setCurrency(value);
    },
    cart: (value: CartEntity | null) => {
      if (value === null) {
        setCart([]);
        return [];
      }

      const isInTheCart = cart.some((item) => item.id === value.id);
      let newValue: CartEntity[];
      if (isInTheCart) {
        if (value.count > 0) {
          newValue = cart?.map((item) => {
            if (item.id === value.id) return value;
            return item;
          });
        } else newValue = cart.filter((item) => item.id !== value.id);
      } else newValue = [...cart, value];

      setCart(newValue);
      return newValue;
    },
  };

  const setField = (field: keyof GlobalContextValueType | 'orders', value: any) => {
    const newValue = setter[field](value);
    localStorage.setItem(
      LocalStorageItem,
      JSON.stringify({
        ...{ auth, currency, cart },
        [field]: newValue,
      }),
    );
  };

  // eslint-disable-next-line
  const val: GlobalContextType<keyof GlobalContextValueType | 'orders'> = {
    value: {
      auth,
      currency,
      cart,
    },
    set: setField,
    pizzas: pizza,
  };

  const fetchUser = async () => {
    setAuth({ loading: true, token: '', user: null });
    const res = await request('/api/profile');
    try {
      const data = await res.json();
      if (res.ok) setField('auth', data);
      else setField('auth', null);
    } catch (e) {
      console.error(e);
      setField('auth', null);
    }
  };

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

    const data: GlobalContextValueType = JSON.parse(
      localStorage.getItem(LocalStorageItem) || JSON.stringify(defaultContextValue),
    );
    setCurrency((data.currency as Currency) || DEFAULT_CURRENCY);
    setCart(data.cart);

    if (data.auth?.token) fetchUser();
  }, []);

  return <GlobalContext.Provider value={val}>{children}</GlobalContext.Provider>;
}
