import Relay from 'react-relay';

export default class ReserveShareMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        rowId,
      }
    `,
    product: () => Relay.QL`
      fragment on Product {
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
    return Relay.QL`mutation{createShare}`;
  }
  getVariables () {
    return {
      share: Object.assign({
        userId: this.props.user.rowId,
        productId: this.props.product.rowId,
        status: 'RESERVED',
      }, this.props.shareData),
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateSharePayload {
        share { rowId },
        shareEdge {
          node {
            id,
            rowId,
          }
        },
        query {
          allShares,
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
        connectionName: 'allShares',
        edgeName: 'shareEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on CreateSharePayload {
              shareEdge {
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
