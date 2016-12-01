import Relay from 'react-relay';

export default {
  task: () => Relay.QL`
    query { taskByRowId(rowId: $taskId) }
  `,
  query: () => Relay.QL`
    query { query }
  `,
  currentPerson: () => Relay.QL`
    query { currentPerson }
  `,
};

