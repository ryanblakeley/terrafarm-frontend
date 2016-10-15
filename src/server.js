import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import httpProxy from 'http-proxy';

const app = express();

const { PRIVATE_IP, REVERSE_PROXY_PRIVATE_IP, PORT, API_PORT } = process.env;

const publicPath = path.join(__dirname, '/..', 'public');
const proxyOptions = {
  target: `http://${REVERSE_PROXY_PRIVATE_IP}:${API_PORT}/graphql`,
  ignorePath: true,
};
const proxy = httpProxy.createProxyServer({ ignorePath: true });

app.use(express.static(publicPath));
app.use(bodyParser.json({ limit: '1mb' }));

app.use('/graphql', (req, res) => {
  req.removeAllListeners('data');
  req.removeAllListeners('end');

  process.nextTick(_ => {
    if (req.body) {
      req.emit('data', JSON.stringify(req.body));
    }
    req.emit('end');
  });

  proxy.web(req, res, proxyOptions);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(PORT, PRIVATE_IP, err => {
  if (err) {
    console.log(`[Error]: ${err}`);
  }
  console.info(`[express server]: listening on ${PRIVATE_IP}:${PORT}`);
});
