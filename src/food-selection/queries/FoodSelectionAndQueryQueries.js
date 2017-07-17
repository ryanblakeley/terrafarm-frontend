import Relay from 'react-relay';

export default {
  foodSelection: () => Relay.QL`
    query { foodSelectionByRowId(rowId: $foodSelectionId) }
  `,
  query: () => Relay.QL`
    query { query }
  `,
};
