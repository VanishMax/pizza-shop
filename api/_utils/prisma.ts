import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export interface Pizza {
  id: number;
  title: string;
  photo: string;
  description: string;
  priceUsd: number;
  priceEur: number;
  createdAt: Date;
}

export const pizzaApi = {
  list: async (): Promise<Pizza[]> => {
    try {
      return prisma.pizza.findMany();
    } catch (_) {
      return [];
    }
  },
};
