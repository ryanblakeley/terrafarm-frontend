import 'babel/polyfill';
import express from 'express';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import { Schema } from './data/schema';
import graphQLHTTP from 'express-graphql';

const app = express();

const { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;
let { PRIVATE_IP, GRAPHQL_PORT } = process.env;
GRAPHQL_PORT = Number(GRAPHQL_PORT);

const authenticate = jwt({
  audience: AUTH0_CLIENT_ID,
  secret: new Buffer(AUTH0_CLIENT_SECRET, 'base64'),
});

app.enable('trust proxy');
app.use(bodyParser.json({ limit: '1mb' }));
app.use('/', authenticate, graphQLHTTP(req => {
  return {
    schema: Schema,
    rootValue: { user: req.user },
    pretty: true,
    graphiql: true,
  };
}));
app.listen(GRAPHQL_PORT, (err) => {
  if (err) {
    return console.error(`[Error]: ${err}`);
  }
  console.log(`[graphql server]: listening on ${PRIVATE_IP}:${GRAPHQL_PORT}`);
});
