import express from 'express';
import bodyParser from 'body-parser';
import auth from './_routes/auth';

const app = express();

app.use(bodyParser.json());
app.use('/api', auth);

export default app;
