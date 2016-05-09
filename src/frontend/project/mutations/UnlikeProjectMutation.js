import Relay from 'react-relay';

export default class UnlikeProjectMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{unlikeProject}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UnlikeProjectPayload {
        removedProjectID,
        removedUserID,
        user,
        project,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'projectsLiked',
        deletedIDFieldName: 'removedProjectID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'project',
        parentID: this.props.project.id,
        connectionName: 'likedBy',
        deletedIDFieldName: 'removedUserID',
      },
    ];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      projectId: this.props.project.id,
    };
  }
}
