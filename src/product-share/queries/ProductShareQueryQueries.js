import Relay from 'react-relay';

export default {
  share: () => Relay.QL`
    query { shareByRowId(rowId: $shareId) }
  `,
  query: () => Relay.QL`query { query }`,
};

