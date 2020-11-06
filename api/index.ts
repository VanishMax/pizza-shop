import express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end('Hello from API!');
});

app.get('/date', (req, res) => {
  res.end(new Date().toString());
});

app.get('/api/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

export default app;
