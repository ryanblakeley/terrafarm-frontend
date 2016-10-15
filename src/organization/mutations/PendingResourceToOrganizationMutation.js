import Relay from 'react-relay';

export default class PendingResourceToOrganizationMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        organizationsPending(first: 18) {
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
        resourcesPending(first: 18) {
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
    return Relay.QL`mutation{pendingResourceToOrganization}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on PendingResourceToOrganizationPayload {
        organizationEdge,
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
        connectionName: 'organizationsPending',
        edgeName: 'organizationEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'organization',
        parentID: this.props.organization.id,
        connectionName: 'resourcesPending',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on PendingResourceToOrganizationPayload {
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
      organization: {
        resources: {
          edges: organization.resourcesPending.edges.push({
            node: {
              id: resource.id,
              name: resource.name,
            },
          }),
        },
      },
      resource: {
        edges: resource.organizationsPending.edges.push({
          node: {
            id: organization.id,
            name: organization.name,
          },
        }),
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
