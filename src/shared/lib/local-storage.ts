import { Currency } from '~/store/currency-slice';
import { CartEntity } from '~/shared/types';

const LSTORAGE_ITEM = 'pizza-shop';

interface LocalStorageData {
  cart: CartEntity[];
  currency: Currency;
}

const lstorageInit = () => {
  const data = localStorage.getItem(LSTORAGE_ITEM) || '{}';
  let json: LocalStorageData;
  try {
    json = {
      cart: [],
      currency: 'usd',
      ...JSON.parse(data),
    };
  } catch (_) {
    json = {
      cart: [],
      currency: 'usd',
    };
  }
  return json;
};

export const localData = lstorageInit();
