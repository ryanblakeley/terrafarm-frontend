import { graphql } from 'react-relay';

const UserJournalDateRootContainerQuery = graphql`
  query UserJournalDateRootContainerQuery(
    $userId: Uuid!,
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
      ...UserJournalDateContainer_userByRowId,
    },
  }
`;

export default UserJournalDateRootContainerQuery;
