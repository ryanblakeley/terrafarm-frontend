import Relay from 'react-relay';

export default {
  resource: () => Relay.QL`
    query { resourceByRowId(rowId: $resourceId) }
  `,
};
