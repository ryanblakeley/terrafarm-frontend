import Relay from 'react-relay';

export default class CreateTaskMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{createTask}`;
  }
  getVariables () {
    return {
      task: this.props.taskData,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateTaskPayload {
        task,
        taskEdge {
          node {
            id,
            rowId,
          }
        },
        userByAuthorId {
          tasksByAuthorId,
        },
        query {
          allTasks,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'query',
        parentID: this.props.query.id,
        connectionName: 'allTasks',
        edgeName: 'taskEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'userByAuthorId',
        parentID: this.props.user.id,
        connectionName: 'tasksByAuthorId',
        edgeName: 'taskEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on CreateTaskPayload {
              taskEdge {
                node {
                  id,
                  rowId,
                }
              },
            }
          `,
        ],
      },
    ];
  }
}
