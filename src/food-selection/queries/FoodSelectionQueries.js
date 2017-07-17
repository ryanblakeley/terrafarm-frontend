import Relay from 'react-relay';

export default {
  foodSelection: () => Relay.QL`
    query { foodSelectionByRowId(rowId: $foodSelectionId) }
  `,
};
