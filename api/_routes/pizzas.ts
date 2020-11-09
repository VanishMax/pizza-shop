import express from 'express';
import mongodb from 'mongodb';
import getCollection from '../_utils/connection';

const router = express.Router();

const {ObjectID} = mongodb;
ObjectID.prototype.valueOf = function () {
  return this.toString();
};

type Pizza = {
  title: string,
  description: string,
  photo: string,
  price: {
    usd: number,
    eur: number,
  },
};

router.get('/pizza', async (req, res) => {
  const Pizzas = await getCollection<Pizza>('pizzas');
  try {
    const pizzas = await Pizzas.find({}).toArray();
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.json(pizzas);
  } catch (e) {
    console.error(e);
    res.status(500).json({error: e.name});
  }
});

export default router;
