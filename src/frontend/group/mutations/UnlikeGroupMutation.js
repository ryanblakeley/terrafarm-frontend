import Relay from 'react-relay';

export default class UnlikeGroupMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    group: () => Relay.QL`
      fragment on Group {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{unlikeGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UnlikeGroupPayload {
        removedGroupID,
        removedUserID,
        user,
        group,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'groupsLiked',
        deletedIDFieldName: 'removedGroupID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'group',
        parentID: this.props.group.id,
        connectionName: 'likedBy',
        deletedIDFieldName: 'removedUserID',
      },
    ];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      groupId: this.props.group.id,
    };
  }
}
