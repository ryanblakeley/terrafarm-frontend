import Relay from 'react-relay';

export default {
  task: () => Relay.QL`
    query { taskByRowId(rowId: $taskId) }
  `,
};
