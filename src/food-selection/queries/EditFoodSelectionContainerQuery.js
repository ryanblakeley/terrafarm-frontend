import { graphql } from 'react-relay';

const EditFoodSelectionContainerQuery = graphql`
  query EditFoodSelectionContainerQuery($foodSelectionId: UUID!) {
    query {
      ...EditFoodSelectionContainer_query
    }
    foodSelectionByRowId(rowId: $foodSelectionId) {
      ...EditFoodSelectionContainer_foodSelectionByRowId
    }
  }
`;

export default EditFoodSelectionContainerQuery;
/*
    currentPerson {
      ...EditFoodSelectionContainer_currentPerson,
    },
*/
