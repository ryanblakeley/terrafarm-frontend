import Relay from 'react-relay';

export default {
  organizationResource: () => Relay.QL`
    query {
      organizationResource(id: $organizationResourceId)
    }
  `,
  currentPerson: () => Relay.QL`
    query { currentPerson }
  `,
};
