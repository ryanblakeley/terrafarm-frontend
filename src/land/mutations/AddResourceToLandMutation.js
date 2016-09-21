import Relay from 'react-relay';

export default class AddResourceToLand extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        lands(first: 18) {
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
    return Relay.QL`mutation{addResourceToLand}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on AddResourceToLandPayload {
        landEdge {
          node,
        },
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
        connectionName: 'lands',
        edgeName: 'landEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'land',
        parentID: this.props.land.id,
        connectionName: 'resources',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on AddResourceToLandPayload {
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
      resource: {
        lands: {
          edges: resource.lands.edges.push({
            node: {
              id: land.id,
              name: land.name,
            },
          }),
        },
      },
      land: {
        resources: {
          edges: land.resources.edges.push({
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
      landId: this.props.land.id,
    };
  }
}

