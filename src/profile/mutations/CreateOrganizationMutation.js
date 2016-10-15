import Relay from 'react-relay';

export default class CreateOrganizationMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
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
        // ownerId: this.props.user.rowId,
      }, this.props.organizationData),
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateOrganizationPayload {
        organizationEdge,
        organization {
          organizationMembersByOrganizationId,
        }
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
    ];
  }
}

/*
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'organizationsAdmin',
        edgeName: 'organizationEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'organizationsLiked',
        edgeName: 'organizationEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
*/
