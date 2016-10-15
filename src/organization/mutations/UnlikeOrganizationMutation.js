import Relay from 'react-relay';

export default class UnlikeOrganizationMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    organization: () => Relay.QL`
      fragment on Organization {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{unlikeOrganization}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UnlikeOrganizationPayload {
        removedOrganizationID,
        removedUserID,
        user,
        organization,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'organizationsLiked',
        deletedIDFieldName: 'removedOrganizationID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'organization',
        parentID: this.props.organization.id,
        connectionName: 'likedBy',
        deletedIDFieldName: 'removedUserID',
      },
    ];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      organizationId: this.props.organization.id,
    };
  }
}
