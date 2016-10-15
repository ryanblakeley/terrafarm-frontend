import Relay from 'react-relay';

export default class DeleteOrganizationMutation extends Relay.Mutation {
  static fragments = {
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
    organization: () => Relay.QL`
      fragment on Organization {
        id,
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteOrganization}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteOrganizationPayload {
        removedOrganizationID,
        master {
          organizations,
        },
        user {
          organizationsAdmin,
        },
      }
    `;
  }
/*
  getOptimisticResponse () {
    return {organization: {}};
  }
*/
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'master',
        parentID: this.props.master.id,
        connectionName: 'organizations',
        deletedIDFieldName: 'removedOrganizationID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'organizationsAdmin',
        deletedIDFieldName: 'removedOrganizationID',
      },
    ];
  }
  getVariables () {
    return {
      organizationId: this.props.organization.id,
      userId: this.props.user.id,
    };
  }
}
