import express from 'express';

const parseRequest = (req: express.Request, res: express.Response, cb: (body?: any) => void) => {
  let data: any[] = [];
  req.on('data', (chunk) => {
    data.push(chunk);
  }).on('end', () => {
    let buf: string = Buffer.concat(data).toString();

    let body: {[key: string]: any} = {};
    try {
      body = JSON.parse(buf);
    } catch (_) {
      buf.split('&').forEach((str) => {
        const obj = str.split('=');
        body[obj[0]] = obj[1];
      });
    }

    cb(body);
  });

  req.on('error', (err) => {
    res.statusCode = 500;
    res.end();
  });
};
export default parseRequest;
