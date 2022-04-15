import { useAppSelector } from '~/app/store';
import { Currency } from './currency-slice';

export const getCurrency = (
  currentCur: Currency | null,
  add: string | Record<Currency, number>,
) => {
  if (currentCur === null) return '';

  const curr = currentCur === 'usd' ? '$' : '€';

  if (typeof add === 'string') return curr + add;
  return curr + add[currentCur];
};

interface Price {
  usd: number;
  eur: number;
}

export const useCurrency = (price: Price | string): string => {
  const currency = useAppSelector((state) => state.currency.currency);
  if (currency === null) return '';

  const label = currency === 'usd' ? '$' : '€';
  if (typeof price === 'string') return `${label}${price}`;
  return `${label}${price[currency]}`;
};
