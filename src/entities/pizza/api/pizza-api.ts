import request from '~/shared/lib/request';
import type { Pizza } from '../model/types';

export const pizzaApi = {
  /**
   * Load all pizzas. Function is used in the Layout
   */
  list: async (): Promise<Pizza[]> => {
    try {
      const res = await request<Pizza[]>('/api/pizza');
      console.log('theere', res);
      return res.data || [];
    } catch (_) {
      return [];
    }
  },
};
