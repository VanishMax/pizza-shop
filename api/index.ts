import express from 'express';
import auth from './_routes/auth';

const app = express();
app.use('/api', auth);

export default app;
