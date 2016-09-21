import Relay from 'react-relay';

export default class DeleteProjectMutation extends Relay.Mutation {
  static fragments = {
    master: () => Relay.QL`
      fragment on Master {
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
    return Relay.QL`mutation{deleteProject}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteProjectPayload {
        removedProjectID,
        master {
          projects,
        },
      }
    `;
  }
/*
  getOptimisticResponse () {
    return {project: {}};
  }
*/
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'master',
        parentID: this.props.master.id,
        connectionName: 'projects',
        deletedIDFieldName: 'removedProjectID',
      },
    ];
  }
  getVariables () {
    return {
      projectId: this.props.project.id,
    };
  }
}
