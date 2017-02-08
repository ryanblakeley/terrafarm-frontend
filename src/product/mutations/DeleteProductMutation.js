import Relay from 'react-relay';

export default class DeleteProductMutation extends Relay.Mutation {
  static fragments = {
    product: () => Relay.QL`
      fragment on Product {
        id,
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteProduct}`;
  }
  getVariables () {
    return {
      id: this.props.product.id,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteProductPayload {
        deletedProductId,
        product,
        query {
          allProducts,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'query',
        parentID: this.props.query.id,
        connectionName: 'allProducts',
        deletedIDFieldName: 'deletedProductId',
      },
    ];
  }
}
