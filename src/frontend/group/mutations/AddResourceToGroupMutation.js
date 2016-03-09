import Relay from 'react-relay';

export default class AddResourceToGroup extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        groups(first: 18) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
    group: () => Relay.QL`
      fragment on Group {
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
    return Relay.QL`mutation{addResourceToGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on AddResourceToGroupPayload {
        groupEdge {
          node,
        },
        resourceEdge,
        resource,
        group,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'groups',
        edgeName: 'groupEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'group',
        parentID: this.props.group.id,
        connectionName: 'resources',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on AddResourceToGroupPayload {
            groupEdge,
          }
        `],
      },
    ];
  }
  getOptimisticResponse () {
    const {resource, group} = this.props;

    return {
      groupEdge: {
        node: {
          id: group.id,
          name: group.name,
        },
      },
      resourceEdge: {
        node: {
          id: resource.id,
          name: resource.name,
        },
      },
      resource: {
        groups: {
          edges: resource.groups.edges.push({
            node: {
              id: group.id,
              name: group.name,
            },
          }),
        },
      },
      group: {
        resources: {
          edges: group.resources.edges.push({
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
      groupId: this.props.group.id,
    };
  }
}

