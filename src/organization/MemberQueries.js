import Relay from 'react-relay';

export default {
  organizationMember: () => Relay.QL`
    query { organizationMember(id: $organizationMemberId) }
  `,
  currentPerson: () => Relay.QL`
    query { currentPerson }
  `,
};
