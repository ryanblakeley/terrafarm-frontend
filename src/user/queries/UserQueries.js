import Relay from 'react-relay';

export default {
  user: () => Relay.QL`
    query UserQueries { userByRowId(rowId: $userId) }
  `,
};
