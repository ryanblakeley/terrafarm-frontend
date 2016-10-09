import 'fetch-everywhere';
import headerMiddleware from './headerMiddleware';
import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-layer';

const { REVERSE_PROXY_PUBLIC_IP, PORT } = process.env;

const networkAddress = REVERSE_PROXY_PUBLIC_IP === 'localhost'
  ? `${REVERSE_PROXY_PUBLIC_IP}:${PORT}`
  : REVERSE_PROXY_PUBLIC_IP;

export default function networkLayer (token) {
  return new RelayNetworkLayer([
    urlMiddleware({
      url: (req) => '/graphql',
      batchUrl: (req) => '/graphql'
    }),
    headerMiddleware(token)
  ]);
}
