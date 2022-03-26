export type ComponentProps<T extends {}> = T & {
  children?: string | JSX.Element | (JSX.Element | string)[];
};

export type User = {
  name: string;
  email: string;
  address: string;
  orders: string[];
};

export type UserContext = {
  loading?: boolean;
  token: string;
  user: User | null;
};

export type Pizza = {
  _id: string;
  title: string;
  description: string;
  photo: string;
  price: {
    usd: number;
    eur: number;
  };
};

export type CartEntity = {
  id: string;
  count: number;
};

export type PizzaOrder = {
  id: string;
  count: number;
  pizza: Pizza;
};

export type Order = {
  name: string;
  address: string;
  finalPrice: string;
  user: User;
  date: string;
  orders: PizzaOrder[];
};
