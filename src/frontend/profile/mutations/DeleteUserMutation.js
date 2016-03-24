import Relay from 'react-relay';

export default class DeleteUserMutation extends Relay.Mutation {
  static fragments = {
    master: () => Relay.QL`
      fragment on Master {
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
    return Relay.QL`mutation{deleteUser}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteUserPayload {
        removedUserID,
        master {
          users,
        },
      }
    `;
  }
/*
  getOptimisticResponse () {
    return {user: {}};
  }
*/
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'master',
        parentID: this.props.master.id,
        connectionName: 'users',
        deletedIDFieldName: 'removedUserID',
      },
    ];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
    };
  }
}
