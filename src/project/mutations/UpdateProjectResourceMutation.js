import Relay from 'react-relay';

export default class UpdateProjectMutation extends Relay.Mutation {
  static fragments = {
    projectResource: () => Relay.QL`
      fragment on ProjectResource {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateProjectResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateProjectResourcePayload {
        projectResource {
          status,
        },
        projectByProjectId,
        resourceByResourceId,
        query,
      }
    `;
  }
  getOptimisticResponse () {
    const {projectResourcePatch} = this.props;
    const {status} = projectResourcePatch;

    return {
      projectResource: {
        status,
      },
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          projectResource: this.props.projectResource.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.projectResource.id,
      projectResourcePatch: this.props.projectResourcePatch,
    };
  }
}

