import Relay from 'react-relay';

export default class DeleteProjectResourceMutation extends Relay.Mutation {
  static fragments = {
    projectResource: () => Relay.QL`
      fragment on ProjectResource {
        id,
        projectByProjectId {
          id,
        },
        resourceByResourceId {
          id,
        },
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteProjectResource}`;
  }
  getVariables () {
    return {
      id: this.props.projectResource.id,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteProjectResourcePayload {
        deletedProjectResourceId,
        projectByProjectId {
          projectResourcesByProjectId,
        },
        resourceByResourceId {
          projectResourcesByResourceId,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'projectByProjectId',
        parentID: this.props.projectResource.projectByProjectId.id,
        connectionName: 'projectResourcesByProjectId',
        deletedIDFieldName: 'deletedProjectResourceId',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'resourceByResourceId',
        parentID: this.props.projectResource.resourceByResourceId.id,
        connectionName: 'projectResourcesByResourceId',
        deletedIDFieldName: 'deletedProjectResourceId',
      },
    ];
  }
}
