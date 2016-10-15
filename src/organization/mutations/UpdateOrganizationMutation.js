import Relay from 'react-relay';

export default class UpdateOrganizationMutation extends Relay.Mutation {
  static fragments = {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateOrganization}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateOrganizationPayload {
        organization {
          name,
          location,
          description,
          imageUrl,
        },
      }
    `;
  }
  getOptimisticResponse () {
    const {organizationPatch} = this.props;
    const {name, location, description, imageUrl} = organizationPatch;

    return {
      organization: {
        name,
        location,
        description,
        imageUrl,
      },
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          organization: this.props.organization.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.organization.id,
      organizationPatch: this.props.organizationPatch,
    };
  }
}
