import Relay from 'react-relay';

export default {
  project: () => Relay.QL`
    query { projectByRowId(rowId: $projectId) }
  `,
  query: () => Relay.QL`
    query { query }
  `,
};
