import Relay from 'react-relay';

export default {
  place: () => Relay.QL`query { placeByRowId(rowId: $placeId) }`,
};
