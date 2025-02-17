const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');
const SERVER_KEY = process.env.SERVER_KEY;
const SERVER_CERT1 = process.env.SERVER_CERT1;
const SERVER_CERT2 = process.env.SERVER_CERT2;
const DOMAIN = process.env.DOMAIN;

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, SERVER_KEY)),
  cert: fs.readFileSync(path.resolve(__dirname, SERVER_CERT1)),
  ca: fs.readFileSync(path.resolve(__dirname, SERVER_CERT2))
};

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(443, () => {
    console.log(`HTTPS server is running on https://${DOMAIN}.com`);
  });
});
