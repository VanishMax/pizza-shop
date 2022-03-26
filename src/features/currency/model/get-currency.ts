import { Currency } from './currency-slice';

export const getCurrency = (
  currentCur: Currency | null,
  add: string | { [Currency.usd]: number; [Currency.eur]: number },
) => {
  if (currentCur === null) return '';

  const curr = currentCur === Currency.usd ? '$' : '€';

  if (typeof add === 'string') return curr + add;
  return curr + add[currentCur];
};
