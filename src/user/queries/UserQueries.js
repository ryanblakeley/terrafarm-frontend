import Relay from 'react-relay';

export default {
  user: () => Relay.QL`
    query UserQuery { userByRowId(rowId: $userId) }
  `,
};
