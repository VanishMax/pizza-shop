export interface User {
  name: string;
  email: string;
  address: string;
  orders: string[];
}

export interface UserContext {
  loading?: boolean;
  token: string;
  user: User | null;
}
