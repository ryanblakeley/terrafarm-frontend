import Relay from 'react-relay';

export default class CreateTaskMutation extends Relay.Mutation {
  static fragments = {
    project: () => Relay.QL`
      fragment on Project {
        id,
        rowId,
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
      task: Object.assign({
        projectId: this.props.project.rowId,
        authorId: localStorage.getItem('user_uuid'),
      }, this.props.taskData),
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateTaskPayload {
        task,
        taskEdge,
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
        type: 'RANGE_ADD',
        parentName: 'projectByProjectId',
        parentID: this.props.project.id,
        connectionName: 'tasksByProjectId',
        edgeName: 'taskEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
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
    ];
  }
}
