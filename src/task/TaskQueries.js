import Relay from 'react-relay';

export default {
  task: () => Relay.QL`
    query { task(id: $taskId) }
  `,
  query: () => Relay.QL`
    query { query }
  `,
};
