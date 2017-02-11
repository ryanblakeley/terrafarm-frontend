import Relay from 'react-relay';

export default class UpdateProductMutation extends Relay.Mutation {
  static fragments = {
    product: () => Relay.QL`
      fragment on Product {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateProduct}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateProductPayload {
        product {
          name,
          description,
          sharePrice,
          creditsInitial,
          maxShares,
          startDate,
          endDate,
          imageUrl,
        },
      }
    `;
  }
  getOptimisticResponse () {
    const {productPatch} = this.props;

    return {
      product: {...productPatch},
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          product: this.props.product.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.product.id,
      productPatch: this.props.productPatch,
    };
  }
}
