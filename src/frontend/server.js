import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import url from 'url';
import httpProxy from 'http-proxy';

const app = express();

const isDeveloping = process.env.NODE_ENV !== 'production';
const { PRIVATE_IP, FRONTEND_PORT, GRAPHQL_PORT } = process.env

const publicPath = path.join(__dirname, '/..', 'public');
const proxyOptions = {
  target: `http://${PRIVATE_IP}:${GRAPHQL_PORT}/graphql`,
  ignorePath: true,
};
const proxy = httpProxy.createProxyServer(proxyOptions);

app.use(express.static(publicPath));
app.use(bodyParser.json({ limit: '1mb' }));
app.use('/graphql', (req, res) => {
  req.removeAllListeners('data');
  req.removeAllListeners('end');

  process.nextTick(function () {
    if (req.body) {
      req.emit('data', JSON.stringify(req.body));
    }
    req.emit('end');
  });

  proxy.web(req, res, proxyOptions);
});
app.get('*', function response(req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(FRONTEND_PORT, PRIVATE_IP, function onStart(err) {
  if (err) {
    console.log(`[Error]: ${err}`);
  }
  console.info(`[express server]: listening on ${PRIVATE_IP}:${FRONTEND_PORT}`);
});
