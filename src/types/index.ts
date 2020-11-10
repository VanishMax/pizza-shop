export type ComponentProps<T extends {}> = T & {
  children?: string|JSX.Element|(JSX.Element|string)[],
};

export type User = {
  name: string,
  email: string,
  address: string,
  orders: string[],
}

export type UserContext = {
  loading?: boolean,
  token: string,
  user: User|null,
}

export type Pizza = {
  _id: string,
  title: string,
  description: string,
  photo: string,
  price: {
    usd: number,
    eur: number,
  },
};

export type CartEntity = {
  id: string,
  count: number,
}
