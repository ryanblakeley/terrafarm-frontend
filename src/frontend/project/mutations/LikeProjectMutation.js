import Relay from 'react-relay';

export default class LikeProjectMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id,
        likedBy(first: 18) {
          edges {
            node { id },
          },
        },
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{likeProject}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on LikeProjectPayload {
        projectEdge,
        userEdge,
        user,
        project,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'projectsLiked',
        edgeName: 'projectEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'project',
        parentID: this.props.project.id,
        connectionName: 'likedBy',
        edgeName: 'userEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on LikeProjectPayload {
            projectEdge,
          }
        `],
      },
    ];
  }
  getOptimisticResponse () {
    const {user, project} = this.props;

    return {
      userEdge: {
        node: {
          id: user.id,
        },
      },
      projectEdge: {
        node: {
          id: project.id,
        },
      },
      project: {
        likedBy: {
          edges: project.likedBy.edges.push({
            node: {
              id: user.id,
            },
          }),
        },
      },
    };
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      projectId: this.props.project.id,
    };
  }
}
