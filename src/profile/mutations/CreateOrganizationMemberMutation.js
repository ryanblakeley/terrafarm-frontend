import Relay from 'react-relay';

export default class CreateOrganizationMemberMutation extends Relay.Mutation {
  static fragments = {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        rowId,
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
        rowId,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{createOrganizationMember}`;
  }
  getVariables () {
    return {
      organizationMember: {
        organizationId: this.props.organization.rowId,
        memberId: this.props.user.rowId,
        isAdmin: this.props.isAdmin,
      },
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateOrganizationMemberPayload {
        organizationMember,
        organizationMemberEdge,
        organizationByOrganizationId {
          organizationMembersByOrganizationId,
        },
        userByMemberId {
          organizationMembersByMemberId,
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
        connectionName: 'organizationMembersByOrganizationId',
        edgeName: 'organizationMemberEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'userByMemberId',
        parentID: this.props.user.id,
        connectionName: 'organizationMembersByMemberId',
        edgeName: 'organizationMemberEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on CreateOrganizationMemberPayload {
              organizationMemberEdge {
                node {
                  id,
                }
              },
            }
          `,
        ],
      },
    ];
  }
}
