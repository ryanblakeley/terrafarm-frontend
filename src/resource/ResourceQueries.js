import Relay from 'react-relay';

export default {
  resource: () => Relay.QL`
    query { resource(id: $resourceId) }
  `,
  query: () => Relay.QL`
    query { query }
  `,
};
