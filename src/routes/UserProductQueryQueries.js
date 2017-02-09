import Relay from 'react-relay';

export default {
  user: () => Relay.QL`
    query { userByRowId(rowId: $userId) }
  `,
  product: () => Relay.QL`
    query { productByRowId(rowId: $productId) }
  `,
  query: () => Relay.QL`query { query } `,
};
