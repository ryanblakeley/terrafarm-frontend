import Relay from 'react-relay';

export default class UpdateOrganizationMutation extends Relay.Mutation {
  static fragments = {
    organizationResource: () => Relay.QL`
      fragment on OrganizationResource {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateOrganizationResource}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateOrganizationResourcePayload {
        organizationResource {
          status,
        },
        organizationByOrganizationId,
        resourceByResourceId,
        query,
      }
    `;
  }
  getOptimisticResponse () {
    const {organizationResourcePatch} = this.props;
    const {status} = organizationResourcePatch;

    return {
      organizationResource: {
        status,
      },
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          organizationResource: this.props.organizationResource.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.organizationResource.id,
      organizationResourcePatch: this.props.organizationResourcePatch,
    };
  }
}

