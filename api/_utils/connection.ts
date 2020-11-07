import mongodb from 'mongodb';

const {MongoClient} = mongodb;

let database: mongodb.Db;

async function initPool () {
  const url = process.env.MONGO_URI || '';
  const client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
  database = await client.db('pizza-shop');
}

async function getCollection (name: string) {
  if (!database) await initPool();
  return database.collection(name);
}

export default getCollection;
