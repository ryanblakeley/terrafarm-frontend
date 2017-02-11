import Relay from 'react-relay';

export default {
  distribution: () => Relay.QL`
    query { distributionByRowId(rowId: $distributionId) }
  `,
  currentPerson: () => Relay.QL`query { currentPerson }`,
};
