import { Currency } from '~/features/currency';
import { CartEntity } from '~/features/cart';

const LSTORAGE_ITEM = 'pizza-shop';

interface LocalStorageData {
  cart: CartEntity[];
  currency: Currency;
}

const lstorageInit = () => {
  const data = localStorage.getItem(LSTORAGE_ITEM) || '{}';
  let json: LocalStorageData;
  try {
    json = JSON.parse(data);
  } catch (_) {
    json = {
      cart: [],
      currency: Currency.usd,
    };
  }
  return json;
};

export const localData = lstorageInit();
