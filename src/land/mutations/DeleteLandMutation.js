import Relay from 'react-relay';

export default class DeleteLandMutation extends Relay.Mutation {
  static fragments = {
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
    land: () => Relay.QL`
      fragment on Land {
        id,
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteLand}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteLandPayload {
        removedLandID,
        master {
          lands,
        },
        user {
          landsAdmin,
        },
      }
    `;
  }
/*
  getOptimisticResponse () {
    return {land: {}};
  }
*/
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'master',
        parentID: this.props.master.id,
        connectionName: 'lands',
        deletedIDFieldName: 'removedLandID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'landsAdmin',
        deletedIDFieldName: 'removedLandID',
      },
    ];
  }
  getVariables () {
    return {
      landId: this.props.land.id,
      userId: this.props.user.id,
    };
  }
}
