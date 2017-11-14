import { graphql } from 'react-relay';

const EditFoodSelectionContainerQuery = graphql`
  query EditFoodSelectionContainerQuery($foodSelectionId: UUID!) {
    currentPerson {
      ...EditFoodSelectionContainer_currentPerson,
    },
    foodSelectionByRowId(rowId: $foodSelectionId) {
      ...EditFoodSelectionContainer_foodSelectionByRowId,
    }
  }
`;

export default EditFoodSelectionContainerQuery;

