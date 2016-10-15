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
  getVariables () {
    return {
      id: this.props.project.id,
      projectPatch: this.props.projectPatch,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateProjectPayload {
        project,
        organizationByOrganizationId,
        query,
      }
    `;
  }
  getOptimisticResponse () {
    const {projectPatch} = this.props;
    const {name, description} = projectPatch;

    return {
      project: {
        name,
        description,
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
}
