import Relay from 'react-relay';

export default {
  foodSelection: () => Relay.QL`
    query FoodSelectionQuery { foodSelectionByRowId(rowId: $foodSelectionId) }
  `,
};
