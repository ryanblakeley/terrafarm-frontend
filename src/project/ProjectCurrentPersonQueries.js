import Relay from 'react-relay';

export default {
  project: () => Relay.QL`
    query { projectByRowId(rowId: $projectId) }
  `,
  currentPerson: () => Relay.QL`query { currentPerson } `,
};
