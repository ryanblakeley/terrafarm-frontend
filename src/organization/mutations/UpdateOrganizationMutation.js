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
          image_url,
        },
      }
    `;
  }
  getOptimisticResponse () {
    const {attributes} = this.props;
    const {name, location, description, image_url} = attributes;

    return {
      organization: {
        name,
        location,
        description,
        image_url,
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
      attributes: this.props.attributes,
    };
  }
}
