import Relay from 'react-relay';

export default class AddResourceToOrganization extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        organizations(first: 18) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        name,
        resources(first: 18) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{addResourceToOrganization}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on AddResourceToOrganizationPayload {
        organizationEdge {
          node,
        },
        resourceEdge,
        resource,
        organization,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'organizations',
        edgeName: 'organizationEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'organization',
        parentID: this.props.organization.id,
        connectionName: 'resources',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on AddResourceToOrganizationPayload {
            organizationEdge,
          }
        `],
      },
    ];
  }
  getOptimisticResponse () {
    const {resource, organization} = this.props;

    return {
      organizationEdge: {
        node: {
          id: organization.id,
          name: organization.name,
        },
      },
      resourceEdge: {
        node: {
          id: resource.id,
          name: resource.name,
        },
      },
      resource: {
        organizations: {
          edges: resource.organizations.edges.push({
            node: {
              id: organization.id,
              name: organization.name,
            },
          }),
        },
      },
      organization: {
        resources: {
          edges: organization.resources.edges.push({
            node: {
              id: resource.id,
              name: resource.name,
            },
          }),
        },
      },
    };
  }
  getVariables () {
    return {
      resourceId: this.props.resource.id,
      organizationId: this.props.organization.id,
    };
  }
}

