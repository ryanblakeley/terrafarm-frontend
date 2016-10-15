import Relay from 'react-relay';

export default class DeleteTaskMutation extends Relay.Mutation {
  static fragments = {
    task: () => Relay.QL`
      fragment on Task {
        id,
        projectByProjectId {
          id,
        },
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteTask}`;
  }
  getVariables () {
    return {
      id: this.props.task.id,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteTaskPayload {
        deletedTaskId,
        userByAuthorId,
        projectByProjectId {
          tasksByProjectId,
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
        type: 'NODE_DELETE',
        parentName: 'query',
        parentID: this.props.query.id,
        connectionName: 'allTasks',
        deletedIDFieldName: 'deletedTaskId',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'projectByProjectId',
        parentID: this.props.task.projectByProjectId.id,
        connectionName: 'tasksByProjectId',
        deletedIDFieldName: 'deletedTaskId',
      },
    ];
  }
}
