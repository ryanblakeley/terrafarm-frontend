import Relay from 'react-relay/classic';

export default {
  foodSelection: () => Relay.QL`
    query FoodSelectionQuery { foodSelectionByRowId(rowId: $foodSelectionId) }
  `,
};
