import Relay from 'react-relay';

export default class NewTaskMutation extends Relay.Mutation {
  static fragments = {
    project: () => Relay.QL`
      fragment on Project {
        id,
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{newTask}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on NewTaskPayload {
        taskEdge,
        master {
          tasks,
        },
        project {
          tasks,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'master',
        parentID: this.props.master.id,
        connectionName: 'tasks',
        edgeName: 'taskEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'project',
        parentID: this.props.project.id,
        connectionName: 'tasks',
        edgeName: 'taskEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
    ];
  }
  getVariables () {
    return {
      projectId: this.props.project.id,
      name: this.props.name,
      description: this.props.description,
      category: this.props.category,
    };
  }
}
