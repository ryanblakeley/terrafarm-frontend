import Relay from 'react-relay';

export default class CreateProjectResourceMutation extends Relay.Mutation {
  static fragments = {
    project: () => Relay.QL`
      fragment on Project {
        id,
        rowId,
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        rowId,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{createProjectResource}`;
  }
  getVariables () {
    return {
      projectResource: {
        projectId: this.props.project.rowId,
        resourceId: this.props.resource.rowId,
        status: this.props.status,
      },
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateProjectResourcePayload {
        projectResource,
        projectResourceEdge,
        projectByProjectId {
          projectResourcesByProjectId,
        },
        resourceByResourceId {
          projectResourcesByResourceId,
        },
        query,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'projectByProjectId',
        parentID: this.props.project.id,
        connectionName: 'projectResourcesByProjectId',
        edgeName: 'projectResourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'resourceByResourceId',
        parentID: this.props.resource.id,
        connectionName: 'projectResourcesByResourceId',
        edgeName: 'projectResourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
    ];
  }
}

