import { graphql } from 'react-relay';

const EditFoodSelectionContainerQuery = graphql`
  query EditFoodSelectionContainerQuery($userId: Uuid!, $foodSelectionId: Uuid!) {
    userByRowId(rowId: $userId) {
      ...EditFoodSelectionContainer_userByRowId,
    },
    foodSelectionByRowId(rowId: $foodSelectionId) {
      ...EditFoodSelectionContainer_foodSelectionByRowId,
    }
  }
`;

export default EditFoodSelectionContainerQuery;
