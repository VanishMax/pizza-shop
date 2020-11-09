import express from 'express';
import auth from './_routes/auth';
import pizzas from './_routes/pizzas';

const app = express();
app.use('/api', auth);
app.use('/api', pizzas);

export default app;
