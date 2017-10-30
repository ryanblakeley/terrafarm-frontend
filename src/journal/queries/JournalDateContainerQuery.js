import { graphql } from 'react-relay';

const JournalDateContainerQuery = graphql`
  query JournalDateContainerQuery ($condition: FoodSelectionCondition) {
    currentPerson {
      ...JournalDateContainer_currentPerson,
    }
  }
`;

export default JournalDateContainerQuery;

