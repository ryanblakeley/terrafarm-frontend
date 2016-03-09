import Relay from 'react-relay';

export default class PendingResourceToGroupMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        groupsPending(first: 18) {
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
    return Relay.QL`mutation{pendingResourceToGroup}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on PendingResourceToGroupPayload {
        groupEdge,
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
        connectionName: 'groupsPending',
        edgeName: 'groupEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'group',
        parentID: this.props.group.id,
        connectionName: 'resourcesPending',
        edgeName: 'resourceEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on PendingResourceToGroupPayload {
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
      group: {
        resources: {
          edges: group.resourcesPending.edges.push({
            node: {
              id: resource.id,
              name: resource.name,
            },
          }),
        },
      },
      resource: {
        edges: resource.groupsPending.edges.push({
          node: {
            id: group.id,
            name: group.name,
          },
        }),
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


