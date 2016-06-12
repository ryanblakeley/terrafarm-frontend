import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewer }`,
  land: () => Relay.QL`query { land(landId: $landId) }`,
  master: () => Relay.QL`query { master }`,
};
