import 'fetch-everywhere';
import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-layer';
import headerMiddleware from './headerMiddleware';

export default function networkLayer (token) {
  return new RelayNetworkLayer([
    urlMiddleware({
      url: req => '/graphql',
      batchUrl: req => '/graphql',
    }),
    headerMiddleware(token),
  ]);
}
