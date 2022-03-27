// eslint-disable-next-line import/named
import { prisma } from '~/shared/lib/prisma';
import type { Pizza } from '../model/types';

export const pizzaApi = {
  /**
   * Load all pizzas. Function is used in the Layout
   */
  list: async (): Promise<Pizza[]> => {
    try {
      return prisma.pizza.findMany();
    } catch (_) {
      return [];
    }
  },
};
