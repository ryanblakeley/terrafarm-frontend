import Relay from 'react-relay';

export default class AddResourceToProject extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        projects(first: 18) {
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
        resources(first: 18) {
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
    return Relay.QL`mutation{addResourceToProject}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on AddResourceToProjectPayload {
        projectEdge {
          node,
        },
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
        connectionName: 'projects',
        edgeName: 'projectEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'project',
        parentID: this.props.project.id,
        connectionName: 'resources',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on AddResourceToProjectPayload {
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
      resource: {
        projects: {
          edges: resource.projects.edges.push({
            node: {
              id: project.id,
              name: project.name,
            },
          }),
        },
      },
      project: {
        resources: {
          edges: project.resources.edges.push({
            node: {
              id: resource.id,
              name: resource.name,
            },
          }),
        },
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

