import Relay from 'react-relay';

export default class RemovePendingResourceToProjectMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
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
    return Relay.QL`mutation{removePendingResourceToProject}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on RemovePendingResourceToProjectPayload {
        removedProjectID,
        removedResourceID,
        resource,
        project,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'projectsPending',
        deletedIDFieldName: 'removedProjectID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'project',
        parentID: this.props.project.id,
        connectionName: 'resourcesPending',
        deletedIDFieldName: 'removedResourceID',
      },
    ];
  }
  getVariables () {
    return {
      resourceId: this.props.resource.id,
      projectId: this.props.project.id,
    };
  }
}

