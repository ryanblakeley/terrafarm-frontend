import Relay from 'react-relay/classic';

export default {
  foodSelection: () => Relay.QL`
    query FoodSelectionQuery { foodSelectionByRowId(rowId: $foodSelectionId) }
  `,
  user: () => Relay.QL`
    query UserQuery { userByRowId(rowId: $userId) }
  `,
};
