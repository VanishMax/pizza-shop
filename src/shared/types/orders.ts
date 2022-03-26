import type { Pizza } from '~/entities/pizza';
import type { User } from './user';

export interface PizzaOrder {
  id: string;
  count: number;
  pizza: Pizza;
}

export interface Order {
  name: string;
  address: string;
  finalPrice: string;
  user: User;
  date: string;
  orders: PizzaOrder[];
}
