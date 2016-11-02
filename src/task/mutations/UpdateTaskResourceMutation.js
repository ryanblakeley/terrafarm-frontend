import Relay from 'react-relay';

export default class UpdateTaskMutation extends Relay.Mutation {
  static fragments = {
    taskResource: () => Relay.QL`
      fragment on TaskResource {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateTaskResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateTaskResourcePayload {
        taskResource {
          status,
        },
        taskByTaskId,
        resourceByResourceId,
        query,
      }
    `;
  }
  getOptimisticResponse () {
    const {taskResourcePatch} = this.props;
    const {status} = taskResourcePatch;

    return {
      taskResource: {
        status,
      },
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          taskResource: this.props.taskResource.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.taskResource.id,
      taskResourcePatch: this.props.taskResourcePatch,
    };
  }
}

