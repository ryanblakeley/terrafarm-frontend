import Relay from 'react-relay';

export default class RemoveResourceFromProjectMutation extends Relay.Mutation {
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
    return Relay.QL`mutation{removeResourceFromProject}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on RemoveResourceFromProjectPayload {
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
        connectionName: 'projects',
        deletedIDFieldName: 'removedProjectID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'project',
        parentID: this.props.project.id,
        connectionName: 'resources',
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


