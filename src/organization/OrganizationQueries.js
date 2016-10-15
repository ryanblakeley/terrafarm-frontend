import Relay from 'react-relay';

export default {
  organization: () => Relay.QL`
    query { organization(id: $organizationId) }
  `,
  query: () => Relay.QL`query { query } `,
};
