import Relay from 'react-relay';

export default {
  currentPerson: () => Relay.QL`
    query { currentPerson }
  `,
  share: () => Relay.QL`
    query { shareByRowId(rowId: $shareId) }
  `,
};
