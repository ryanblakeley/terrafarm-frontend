import Relay from 'react-relay';

export default {
  shareByShareToken: () => Relay.QL`
    query { shareByShareToken(shareToken: $shareToken) }
  `,
  currentPerson: () => Relay.QL`
    query { currentPerson }
  `,
  share: () => Relay.QL`
    query { shareByRowId(rowId: $shareId) }
  `,
};
