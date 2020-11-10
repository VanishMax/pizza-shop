import express from 'express';
import mongodb, {WithId} from 'mongodb';
import type {Pizza} from './pizzas';
import type {User} from './auth';
import getCollection from '../_utils/connection';
import parseRequest from '../_utils/parse-request';
import {verifyAccessToken} from '../_utils/tokens';

const router = express.Router();

const {ObjectID} = mongodb;
ObjectID.prototype.valueOf = function () {
  return this.toString();
};

type Order = {
  email: string,
  name: string,
  address: string,
  finalPrice: string,
  userId: string|null,
  user?: User,
  date: string,
  orders: {
    id: string,
    count: number,
    pizza: Pizza,
  }[],
};

router.get('/orders', async (req, res) => {
  try {
    const Orders = await getCollection<Order>('orders');
    const Users = await getCollection<WithId<User>>('users');
    const Pizzas = await getCollection<Pizza>('pizzas');

    const token = req.headers['authorization'] || '';
    const auth = verifyAccessToken(token);
    if (auth) {
      const user = await Users.findOne({_id: new ObjectID(auth._id)}, {projection: {password: 0, orders: 0}});
      if (user) {
        const rawOrders = await (await Orders.find({userId: user._id.toString()})).toArray();
        const orders = await Promise.all(rawOrders.map(async (ord) => {
          ord.user = user;
          ord.orders = await Promise.all(ord.orders.map(async (aga) => {
            aga.pizza = (await Pizzas.findOne({_id: new ObjectID(aga.id)})) as Pizza;
            return aga;
          }));
          return ord;
        }));
        res.status(200).json({orders});
      }
      else res.status(401).json({error: 'Not allowed'});
    } else {
      res.status(401).json({error: 'Not allowed'});
    }
  } catch (e) {
    res.status(500).end();
  }
});

router.post('/orders', (req, res) => {
  parseRequest(req, res, async (body) => {
    const Orders = await getCollection<Order>('orders');
    const Users = await getCollection<WithId<User>>('users');

    const {name, email, address, finalPrice, orders} = body;

    const fieldErrors = {name: '', email: '', address: ''};
    if (!name) fieldErrors.name = 'Name field cannot be empty';
    else if (name.match(/[^A-Za-z ]/)) fieldErrors.name = 'Names can have only English letters or spaces';
    else if (name && name.length < 3) fieldErrors.name = 'Name is too short';

    if (!address) fieldErrors.address = 'Address field cannot be empty';
    else if (address && address.length < 3) fieldErrors.address = 'Address is too short';

    if (!email) fieldErrors.email = 'Email field cannot be empty';
    else if (!email.match(/[^@]+@[^.]+\.[a-zA-Z]+/i)) fieldErrors.email = 'Wrong email format';

    const hasErrors = Object.values(fieldErrors).some((err) => !!err);
    if (hasErrors) res.status(400).json({fieldErrors, error: ''});
    else if (!finalPrice || !orders || orders.length < 1) {
      res.status(400).json({fieldErrors, error: 'Wrong request data'});
    } else {
      try {
        const newOrder: Order = {
          name,
          email,
          address,
          finalPrice,
          orders,
          date: new Date().toString(),
          userId: null,
        };

        const user = await Users.findOne({email: email});
        if (user) newOrder.userId = user._id.toString();

        const order = await Orders.insertOne(newOrder);
        if (user) await Users.findOneAndUpdate({email: email}, {
          $push: {orders: order.insertedId.toString()}
        });

        res.status(200).json({id: order.insertedId.toString()});
      } catch (e) {
        console.error(e);
        res.status(500).json({error: e.name});
      }
    }
  });
});

export default router;
