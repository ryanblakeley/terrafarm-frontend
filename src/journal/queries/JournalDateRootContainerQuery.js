import { graphql } from 'react-relay';

const JournalDateRootContainerQuery = graphql`
  query JournalDateRootContainerQuery(
    $userId: UUID!,
    $condition: FoodSelectionCondition!,
  ) {
    userByRowId(rowId: $userId) {
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
      ...JournalDateContainer_userByRowId,
    },
  }
`;

export default JournalDateRootContainerQuery;
