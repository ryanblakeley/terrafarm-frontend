import Relay from 'react-relay';

export default class PendingResourceToLandMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        landsPending(first: 18) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
    land: () => Relay.QL`
      fragment on Land {
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
    return Relay.QL`mutation{pendingResourceToLand}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on PendingResourceToLandPayload {
        landEdge,
        resourceEdge,
        resource,
        land,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'landsPending',
        edgeName: 'landEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'land',
        parentID: this.props.land.id,
        connectionName: 'resourcesPending',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on PendingResourceToLandPayload {
            landEdge,
          }
        `],
      },
    ];
  }
  getOptimisticResponse () {
    const {resource, land} = this.props;

    return {
      landEdge: {
        node: {
          id: land.id,
          name: land.name,
        },
      },
      resourceEdge: {
        node: {
          id: resource.id,
          name: resource.name,
        },
      },
      land: {
        resources: {
          edges: land.resourcesPending.edges.push({
            node: {
              id: resource.id,
              name: resource.name,
            },
          }),
        },
      },
      resource: {
        edges: resource.landsPending.edges.push({
          node: {
            id: land.id,
            name: land.name,
          },
        }),
      },
    };
  }
  getVariables () {
    return {
      resourceId: this.props.resource.id,
      landId: this.props.land.id,
    };
  }
}


