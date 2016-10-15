import 'fetch-everywhere';
import { RelayNetworkLayer, urlMiddleware, authMiddleware } from 'react-relay-network-layer';

const networkLayer = new RelayNetworkLayer([
  urlMiddleware({
    url: req => '/graphql',
    batchUrl: req => '/graphql',
  }),
  authMiddleware({
    token: () => localStorage.getItem('id_token'),
  }),
]);

export default networkLayer;
