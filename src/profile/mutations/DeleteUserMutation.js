import Relay from 'react-relay';

export default class DeleteUserMutation extends Relay.Mutation {
  static fragments = {
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
        user,
        deletedUserId,
        query {
         allUsers,
        },
      }
    `;
  }
  getConfigs () {
    return [
      /*
      {
        type: 'NODE_DELETE',
        parentName: 'query',
        parentID: this.props.query.id,
        connectionName: 'allUsers',
        deletedIDFieldName: 'deletedUserID',
      },
      */
    ];
  }
  getVariables () {
    return {
      id: this.props.user.id,
    };
  }
}
