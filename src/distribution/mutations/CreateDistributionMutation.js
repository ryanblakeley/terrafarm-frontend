import Relay from 'react-relay';

export default class CreateDistributionMutation extends Relay.Mutation {
  static fragments = {
    share: () => Relay.QL`
      fragment on Share {
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
    return Relay.QL`mutation{createDistribution}`;
  }
  getVariables () {
    return {
      distribution: Object.assign({
        shareId: this.props.share.rowId,
      }, this.props.distributionData),
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateDistributionPayload {
        shareByShareId { distributionsByShareId },
        distribution { rowId },
        distributionEdge {
          node {
            id,
            rowId,
          }
        },
        query { allDistributions },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'query',
        parentID: this.props.query.id,
        connectionName: 'allDistributions',
        edgeName: 'distributionEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on CreateDistributionPayload {
              distributionEdge {
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
