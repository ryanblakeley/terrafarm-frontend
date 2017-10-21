import { graphql } from 'react-relay';

const JournalDateRootContainerQuery = graphql`
  query JournalDateRootContainerQuery(
    $condition: FoodSelectionCondition!,
  ) {
    currentPerson {
      foodSelectionsByUserId(
        condition: $condition,
        first: 2147483647,
        orderBy: TIME_DESC
      ) {
        edges {
          node {
            rowId,
          },
        },
      },
      ...JournalDateContainer_currentPerson,
    },
  }
`;

export default JournalDateRootContainerQuery;
