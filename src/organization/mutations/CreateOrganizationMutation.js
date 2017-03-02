import Relay from 'react-relay';

export default class CreateOrganizationMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        rowId,
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{createOrganization}`;
  }
  getVariables () {
    return {
      organization: Object.assign({
        ownerId: this.props.user.rowId,
      }, this.props.organizationData),
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateOrganizationPayload {
        organization { rowId },
        organizationEdge {
          node {
            id,
            rowId,
          }
        },
        query {
          allOrganizations,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'query',
        parentID: this.props.query.id,
        connectionName: 'allOrganizations',
        edgeName: 'organizationEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on CreateOrganizationPayload {
              organizationEdge {
                node {
                  id,
                  rowId,
                }
              },
            }
          `,
        ],
      },
    ];
  }
}
