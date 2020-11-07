import express from 'express';
import mongodb from 'mongodb';
import getCollection from '../_utils/connection';

const router = express.Router();

const {ObjectID} = mongodb;
ObjectID.prototype.valueOf = function () {
  return this.toString();
};

type User = {
  _id: string,
};

router.get('/users', async (req, res) => {
  const Users: mongodb.Collection<User> = await getCollection('users');
  try {
    const users = await Users.find({}).toArray();
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({error: e.name});
  }
});

router.get('/', async (req, res) => {
  res.send('Hellooou');
});

// app.get('/api', (req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   res.end('Hello from API!');
// });

export default router;
