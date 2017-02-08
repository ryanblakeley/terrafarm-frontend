import Relay from 'react-relay';

export default class CreateProductMutation extends Relay.Mutation {
  static fragments = {
    organization: () => Relay.QL`
      fragment on Organization {
        rowId,
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{createProduct}`;
  }
  getVariables () {
    return {
      product: Object.assign({
        organizationId: this.props.organization.rowId,
      }, this.props.productData),
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateProductPayload {
        product { rowId },
        productEdge {
          node {
            id,
            rowId,
          }
        },
        query {
          allProducts,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'query',
        parentID: this.props.query.id,
        connectionName: 'allProducts',
        edgeName: 'productEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on CreateProductPayload {
              productEdge {
                node {
                  id,
                  rowId,
                }
              },
            }
          `,
        ],
      },
    ];
  }
}
