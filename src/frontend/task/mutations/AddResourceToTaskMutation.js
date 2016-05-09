import Relay from 'react-relay';

export default class AddResourceToTask extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        tasks(first: 18) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
    task: () => Relay.QL`
      fragment on Task {
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
    return Relay.QL`mutation{addResourceToTask}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on AddResourceToTaskPayload {
        taskEdge {
          node,
        },
        resourceEdge,
        resource,
        task,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'tasks',
        edgeName: 'taskEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'task',
        parentID: this.props.task.id,
        connectionName: 'resources',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on AddResourceToTaskPayload {
            taskEdge,
          }
        `],
      },
    ];
  }
  getOptimisticResponse () {
    const {resource, task} = this.props;

    return {
      taskEdge: {
        node: {
          id: task.id,
          name: task.name,
        },
      },
      resourceEdge: {
        node: {
          id: resource.id,
          name: resource.name,
        },
      },
      resource: {
        tasks: {
          edges: resource.tasks.edges.push({
            node: {
              id: task.id,
              name: task.name,
            },
          }),
        },
      },
      task: {
        resources: {
          edges: task.resources.edges.push({
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
      taskId: this.props.task.id,
    };
  }
}

