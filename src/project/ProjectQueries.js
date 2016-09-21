import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewer }`,
  project: () => Relay.QL`query { project(projectId: $projectId) }`,
  master: () => Relay.QL`query { master }`,
};
