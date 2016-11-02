import Relay from 'react-relay';

export default class DeleteOrganizationResourceMutation extends Relay.Mutation {
  static fragments = {
    organizationResource: () => Relay.QL`
      fragment on OrganizationResource {
        id,
        organizationByOrganizationId {
          id,
        },
        resourceByResourceId {
          id,
        },
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteOrganizationResource}`;
  }
  getVariables () {
    return {
      id: this.props.organizationResource.id,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteOrganizationResourcePayload {
        deletedOrganizationResourceId,
        organizationByOrganizationId {
          organizationResourcesByOrganizationId,
        },
        resourceByResourceId {
          organizationResourcesByResourceId,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'organizationByOrganizationId',
        parentID: this.props.organizationResource.organizationByOrganizationId.id,
        connectionName: 'organizationResourcesByOrganizationId',
        deletedIDFieldName: 'deletedOrganizationResourceId',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'resourceByResourceId',
        parentID: this.props.organizationResource.resourceByResourceId.id,
        connectionName: 'organizationResourcesByResourceId',
        deletedIDFieldName: 'deletedOrganizationResourceId',
      },
    ];
  }
}
