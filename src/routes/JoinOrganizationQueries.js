import Relay from 'react-relay';

export default {
  user: () => Relay.QL`
    query { userByRowId(rowId: $userId) }
  `,
  organization: () => Relay.QL`
    query { organizationByRowId(rowId: $organizationId) }
  `,
};

