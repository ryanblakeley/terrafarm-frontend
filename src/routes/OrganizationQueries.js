import Relay from 'react-relay';

export default {
  organization: () => Relay.QL`
    query { organizationByRowId(rowId: $organizationId) }
  `,
};
