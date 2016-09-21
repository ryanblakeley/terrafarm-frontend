import Relay from 'react-relay';

export default class UpdateTaskMutation extends Relay.Mutation {
  static fragments = {
    task: () => Relay.QL`
      fragment on Task {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateTask}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateTaskPayload {
        task {
          name,
          category,
          description,
        },
      }
    `;
  }
  getOptimisticResponse () {
    const {attributes} = this.props;
    const {name, category, description} = attributes;

    return {
      task: {
        name,
        category,
        description,
      },
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          task: this.props.task.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.task.id,
      attributes: this.props.attributes,
    };
  }
}


