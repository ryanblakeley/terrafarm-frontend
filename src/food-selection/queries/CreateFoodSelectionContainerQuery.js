import { graphql } from 'react-relay';

const CreateFoodSelectionContainerQuery = graphql`
  query CreateFoodSelectionContainerQuery {
    currentPerson {
      ...CreateFoodSelectionContainer_currentPerson,
    }
  }
`;

export default CreateFoodSelectionContainerQuery;

