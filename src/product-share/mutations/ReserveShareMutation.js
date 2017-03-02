import Relay from 'react-relay';

export default class ReserveShareMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
        rowId,
      }
    `,
    product: () => Relay.QL`
      fragment on Product {
        id,
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
        productByProductId {
          sharesByProductId,
        },
        userByUserId {
          sharesByUserId,
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
        type: 'RANGE_ADD',
        parentName: 'productByProductId',
        parentID: this.props.product.id,
        connectionName: 'sharesByProductId',
        edgeName: 'shareEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'userByUserId',
        parentID: this.props.user.id,
        connectionName: 'sharesByUserId',
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
