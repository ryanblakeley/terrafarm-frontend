import Relay from 'react-relay';

export default {
  resource: () => Relay.QL`query { resource(resourceId: $resourceId) }`,
  viewer: () => Relay.QL`query { viewer }`,
  master: () => Relay.QL`query { master }`,
};
