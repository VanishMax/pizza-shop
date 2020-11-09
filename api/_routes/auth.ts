import express from 'express';
import mongodb from 'mongodb';
import getCollection from '../_utils/connection';
import bcrypt from 'bcrypt';
import parseRequest from '../_utils/parse-request';
import {generateAccessToken} from '../_utils/tokens';

const router = express.Router();

const {ObjectID} = mongodb;
ObjectID.prototype.valueOf = function () {
  return this.toString();
};

type User = {
  name: string,
  email: string,
  password: string,
  address: string,
};
interface UserWithId extends User {
  _id: string
}

router.get('/users', async (req, res) => {
  const Users = await getCollection<User>('users');
  try {
    const users = await Users.find({}).toArray();
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({error: e.name});
  }
});

router.post('/register', (req, res) => {
  parseRequest(req, res, async (body) => {
    const Users = await getCollection<User>('users');
    const {name, email, address, password, passwordConfirm} = body;

    const fieldErrors = {name: '', email: '', address: '', password: '', passwordConfirm: ''};
    if (!name) fieldErrors.name = 'Name field cannot be empty';
    else if (name.match(/[^A-Za-z ]/)) fieldErrors.name = 'Names can have only English letters or spaces';
    else if (name && name.length < 3) fieldErrors.name = 'Name is too short';

    if (!email) fieldErrors.email = 'Email field cannot be empty';
    else if (!email.match(/[^@]+@[^.]+\.[a-zA-Z]+/i)) fieldErrors.email = 'Wrong email format';
    else if (await Users.findOne({email: email})) fieldErrors.email = 'Such email already exists';

    if (!password) fieldErrors.password = 'Password field cannot be empty';
    else if (password.length < 8 || !password.match(/[a-zA-Z]/)) fieldErrors.password = 'Password should be longer than 8 characters and contain both numbers and English letters';

    if (!passwordConfirm) fieldErrors.password = 'Password confirmation field cannot be empty';
    else if (passwordConfirm !== password) fieldErrors.password = 'Passwords do not match';

    const hasErrors = Object.values(fieldErrors).some((err) => !!err);
    if (hasErrors) res.status(400).json({fieldErrors, error: ''});
    else {
      try {
        const pass = bcrypt.hashSync(password, 13);
        const newUser = {name, email, address};
        const user = await Users.insertOne({...newUser, password: pass});
        const token = generateAccessToken(user.insertedId as unknown as string);
        res.json({token, user});
      } catch (e) {
        console.error(e);
        res.status(500).json({error: e.name});
      }
    }
  });
});

router.post('/login', (req, res) => {
  parseRequest(req, res, async (body) => {
    const Users = await getCollection<User>('users');
    const {email, password} = body;

    const fieldErrors = {name: '', email: '', address: '', password: '', passwordConfirm: ''};
    if (!email) fieldErrors.email = 'Email field cannot be empty';
    if (!password) fieldErrors.password = 'Password field cannot be empty';

    const hasErrors = Object.values(fieldErrors).some((err) => !!err);
    if (hasErrors) res.status(400).json({fieldErrors, error: ''});

    else {
      try {
        const user: UserWithId|null = await Users.findOne({email: email});
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            const token = generateAccessToken(user._id as unknown as string);

            const noPassUser: Omit<User, 'password'>&{password?: string} = {...user, password: undefined};
            delete noPassUser.password;
            res.json({token, user: noPassUser});
          } else {
            res.status(400).json({error: 'Incorrect password'});
          }
        } else {
          res.status(400).json({error: 'This user does not exist'});
        }
      } catch (e) {
        console.error(e);
        res.status(500).json({error: e.name});
      }
    }
  });
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
