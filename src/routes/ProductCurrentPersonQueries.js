import Relay from 'react-relay';

export default {
  product: () => Relay.QL`
    query { productByRowId(rowId: $productId) }
  `,
  currentPerson: () => Relay.QL`
    query { currentPerson }
  `,
};
