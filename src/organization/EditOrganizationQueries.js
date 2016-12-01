import Relay from 'react-relay';

export default {
  organization: () => Relay.QL`
    query { organizationByRowId(rowId: $organizationId) }
  `,
  query: () => Relay.QL`query { query } `,
  currentPerson: () => Relay.QL`query { currentPerson }`,
};
