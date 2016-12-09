import Relay from 'react-relay';

export default {
  resource: () => Relay.QL`
    query { resourceByRowId(rowId: $resourceId) }
  `,
  query: () => Relay.QL`
    query { query }
  `,
  currentPerson: () => Relay.QL`
    query { currentPerson }
  `,
};