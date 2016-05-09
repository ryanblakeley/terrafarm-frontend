import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewer }`,
  task: () => Relay.QL`query { task(taskId: $taskId) }`,
  master: () => Relay.QL`query { master }`,
};
