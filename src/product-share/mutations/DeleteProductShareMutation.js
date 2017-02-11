/*
import Relay from 'react-relay';

export default class DeleteShareMutation extends Relay.Mutation {
  static fragments = {
    share: () => Relay.QL`
      fragment on Share {
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
    return Relay.QL`mutation{deleteShare}`;
  }
  getVariables () {
    return {
      id: this.props.share.id,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteSharePayload {
        deletedShareId,
        share,
        query {
          allShares,
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
        connectionName: 'allShares',
        deletedIDFieldName: 'deletedShareId',
      },
    ];
  }
}
*/
