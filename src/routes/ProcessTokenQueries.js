import Relay from 'react-relay';

export default {
  validateToken: () => Relay.QL`
    query { validateToken(distributionToken: $distributionToken) }
  `,
};
