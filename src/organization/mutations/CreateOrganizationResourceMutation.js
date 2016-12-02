import Relay from 'react-relay';

export default class CreateOrganizationResourceMutation extends Relay.Mutation {
  static fragments = {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        rowId,
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        rowId,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{createOrganizationResource}`;
  }
  getVariables () {
    return {
      organizationResource: {
        organizationId: this.props.organization.rowId,
        resourceId: this.props.resource.rowId,
        status: this.props.status,
        contact: this.props.contact,
      },
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateOrganizationResourcePayload {
        organizationResource,
        organizationResourceEdge,
        organizationByOrganizationId {
          organizationResourcesByOrganizationId,
        },
        resourceByResourceId {
          organizationResourcesByResourceId,
        },
        query,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'organizationByOrganizationId',
        parentID: this.props.organization.id,
        connectionName: 'organizationResourcesByOrganizationId',
        edgeName: 'organizationResourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'resourceByResourceId',
        parentID: this.props.resource.id,
        connectionName: 'organizationResourcesByResourceId',
        edgeName: 'organizationResourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
    ];
  }
}

