import Relay from 'react-relay';

export default class DeleteGroupMutation extends Relay.Mutation {
  static fragments = {
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
    group: () => Relay.QL`
      fragment on Group {
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
    return Relay.QL`mutation{deleteGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteGroupPayload {
        removedGroupID,
        master {
          groups,
        },
        user {
          groupsAdmin,
        },
      }
    `;
  }
/*
  getOptimisticResponse () {
    return {group: {}};
  }
*/
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'master',
        parentID: this.props.master.id,
        connectionName: 'groups',
        deletedIDFieldName: 'removedGroupID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'groupsAdmin',
        deletedIDFieldName: 'removedGroupID',
      },
    ];
  }
  getVariables () {
    return {
      groupId: this.props.group.id,
      userId: this.props.user.id,
    };
  }
}
