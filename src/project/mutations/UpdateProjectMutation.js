import Relay from 'react-relay';

export default class UpdateProjectMutation extends Relay.Mutation {
  static fragments = {
    project: () => Relay.QL`
      fragment on Project {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateProject}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateProjectPayload {
        project {
          name,
          category,
        },
      }
    `;
  }
  getOptimisticResponse () {
    const {attributes} = this.props;
    const {name, category} = attributes;

    return {
      project: {
        name,
        category,
      },
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          project: this.props.project.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.project.id,
      attributes: this.props.attributes,
    };
  }
}


