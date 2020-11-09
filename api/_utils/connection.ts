import mongodb from 'mongodb';

const {MongoClient} = mongodb;

let database: mongodb.Db;

async function initPool () {
  const url = process.env.MONGO_URI || '';
  const client = await MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  database = await client.db('pizza-shop');
}

const memoizedCollections: {[key: string]: mongodb.Collection} = {};
async function getCollection<T> (name: string): Promise<mongodb.Collection<T>> {
  if (!database) await initPool();

  console.log('memoized', Object.keys(memoizedCollections));
  if (memoizedCollections[name]) return memoizedCollections[name];

  const collection = await database.collection(name);
  memoizedCollections[name] = collection;
  return collection;
}

export default getCollection;
