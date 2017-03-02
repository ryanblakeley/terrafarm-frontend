import Relay from 'react-relay';

export default {
  distributionByDistributionToken: () => Relay.QL`
    query { distributionByDistributionToken(distributionToken: $distributionToken) }
  `,
  currentPerson: () => Relay.QL`
    query { currentPerson }
  `,
  distribution: () => Relay.QL`
    query { distributionByRowId(rowId: $distributionId) }
  `,
};
