import 'fetch-everywhere';
import { RelayNetworkLayer, urlMiddleware, authMiddleware } from 'react-relay-network-layer';

const networkLayer = new RelayNetworkLayer([
  urlMiddleware({
    url: _ => '/graphql-api',
  }),
  authMiddleware({
    token: () => localStorage.getItem('id_token'),
  }),
// remove when postgraphql supports batch
], {disableBatchQuery: true});

export default networkLayer;
