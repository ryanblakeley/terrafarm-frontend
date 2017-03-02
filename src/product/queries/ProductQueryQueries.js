import Relay from 'react-relay';

export default {
  product: () => Relay.QL`
    query { productByRowId(rowId: $productId) }
  `,
  query: () => Relay.QL`query { query } `,
};
