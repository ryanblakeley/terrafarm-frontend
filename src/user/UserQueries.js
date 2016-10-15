import Relay from 'react-relay';

export default {
  user: () => Relay.QL`
    query { userByRowId(rowId: $userId) }
  `,
};
