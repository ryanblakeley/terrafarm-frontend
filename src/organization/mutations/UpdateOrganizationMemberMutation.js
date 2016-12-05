import Relay from 'react-relay';

export default class UpdateOrganizationMemberMutation extends Relay.Mutation {
  static fragments = {
    organizationMember: () => Relay.QL`
      fragment on OrganizationMember {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateOrganizationMember}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateOrganizationMemberPayload {
        organizationMember {
          status,
        },
        organizationByOrganizationId,
        userByMemberId,
        query,
      }
    `;
  }
  getOptimisticResponse () {
    const {organizationMemberPatch} = this.props;
    const {status} = organizationMemberPatch;

    return {
      organizationMember: {
        status,
      },
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          organizationMember: this.props.organizationMember.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.organizationMember.id,
      organizationMemberPatch: this.props.organizationMemberPatch,
    };
  }
}

