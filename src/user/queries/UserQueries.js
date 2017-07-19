import Relay from 'react-relay/classic';

export default {
  user: () => Relay.QL`
    query UserQuery { userByRowId(rowId: $userId) }
  `,
};
