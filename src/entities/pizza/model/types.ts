import type { Currency } from '~/features/currency';

export interface Pizza {
  id: number;
  title: string;
  description: string;
  photo: string;
  price: {
    [Currency.usd]: number;
    [Currency.eur]: number;
  };
}
