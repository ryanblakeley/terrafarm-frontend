import Relay from 'react-relay';

export default class PendingResourceToTaskMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        tasksPending(first: 18) {
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
    return Relay.QL`mutation{pendingResourceToTask}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on PendingResourceToTaskPayload {
        taskEdge,
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
        connectionName: 'tasksPending',
        edgeName: 'taskEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'task',
        parentID: this.props.task.id,
        connectionName: 'resourcesPending',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on PendingResourceToTaskPayload {
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
      task: {
        resources: {
          edges: task.resourcesPending.edges.push({
            node: {
              id: resource.id,
              name: resource.name,
            },
          }),
        },
      },
      resource: {
        edges: resource.tasksPending.edges.push({
          node: {
            id: task.id,
            name: task.name,
          },
        }),
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


