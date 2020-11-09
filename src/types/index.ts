export type ComponentProps<T extends {}> = T & {
  children?: string|JSX.Element|(JSX.Element|string)[],
};

export type User = {
  name: string,
  email: string,
  address: string,
}

export type UserContext = {
  loading?: boolean,
  token: string,
  user: User|null,
}
