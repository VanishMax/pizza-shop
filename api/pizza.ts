import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma, pizzaApi } from './_utils/prisma';

const getPizzas = async (response: VercelResponse) => {
  const pizzas = await pizzaApi.list();
  prisma.$disconnect();
  response.status(200).json(pizzas);
};

export default async (request: VercelRequest, response: VercelResponse) => {
  const { method } = request;
  switch (method) {
    case 'GET':
      getPizzas(response);
      break;
    default:
      response.status(404).json({ error: 'Unsupported request method' });
  }
};
