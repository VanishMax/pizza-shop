import request from '~/shared/lib/request';
import type { Pizza } from '~/shared/types/pizza';

export const pizza = {
  /**
   * Load all pizzas. Function is used in the Layout
   */
  list: async (): Promise<Pizza[]> => {
    try {
      const res = await request<Pizza[]>('/api/pizza');
      return res.data || [];
    } catch (_) {
      return [];
    }
  },
};
