import express from 'express';
import auth from './_routes/auth';
import pizzas from './_routes/pizzas';
import orders from './_routes/order';

const app = express();
app.use('/api', auth);
app.use('/api', pizzas);
app.use('/api', orders);

export default app;
