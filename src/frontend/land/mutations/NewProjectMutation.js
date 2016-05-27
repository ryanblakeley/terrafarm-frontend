import Relay from 'react-relay';

export default class NewProjectMutation extends Relay.Mutation {
  static fragments = {
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
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{newProject}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on NewProjectPayload {
        projectEdge,
        master {
          projects,
        },
        user {
          projectsAdmin,
          projectsLiked,
        },
        land {
          projects,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'master',
        parentID: this.props.master.id,
        connectionName: 'projects',
        edgeName: 'projectEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'land',
        parentID: this.props.land.id,
        connectionName: 'projects',
        edgeName: 'projectEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'projectsAdmin',
        edgeName: 'projectEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
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
    ];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      landId: this.props.land.id,
      name: this.props.name,
      description: this.props.description,
      category: this.props.category,
    };
  }
}
