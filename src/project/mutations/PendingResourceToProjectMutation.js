import Relay from 'react-relay';

export default class PendingResourceToProjectMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        projectsPending(first: 18) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
    project: () => Relay.QL`
      fragment on Project {
        id,
        name,
        resourcesPending(first: 18) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{pendingResourceToProject}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on PendingResourceToProjectPayload {
        projectEdge,
        resourceEdge,
        resource,
        project,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'projectsPending',
        edgeName: 'projectEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'project',
        parentID: this.props.project.id,
        connectionName: 'resourcesPending',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on PendingResourceToProjectPayload {
            projectEdge,
          }
        `],
      },
    ];
  }
  getOptimisticResponse () {
    const {resource, project} = this.props;

    return {
      projectEdge: {
        node: {
          id: project.id,
          name: project.name,
        },
      },
      resourceEdge: {
        node: {
          id: resource.id,
          name: resource.name,
        },
      },
      project: {
        resources: {
          edges: project.resourcesPending.edges.push({
            node: {
              id: resource.id,
              name: resource.name,
            },
          }),
        },
      },
      resource: {
        edges: resource.projectsPending.edges.push({
          node: {
            id: project.id,
            name: project.name,
          },
        }),
      },
    };
  }
  getVariables () {
    return {
      resourceId: this.props.resource.id,
      projectId: this.props.project.id,
    };
  }
}


