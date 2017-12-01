import { graphql } from 'react-relay';

const CreateFoodSelectionContainerQuery = graphql`
  query CreateFoodSelectionContainerQuery {
    query {
      ...CreateFoodSelectionContainer_query,
    }
    currentPerson {
      ...CreateFoodSelectionContainer_currentPerson,
    }
  }
`;

export default CreateFoodSelectionContainerQuery;

