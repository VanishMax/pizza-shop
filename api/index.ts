import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (request: VercelRequest, response: VercelResponse) => {
  response
    .status(200)
    .send('Welcome to the API! Try requesting the "/api/pizza" to see the pizza data set');
};
