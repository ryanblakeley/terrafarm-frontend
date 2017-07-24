import { graphql } from 'react-relay';

// TODO ...JournalDateContainer_foodSelection,

const UserJournalContainerQuery = graphql`
  query UserJournalContainerQuery($userId: Uuid!, $count: Int!, $orderBy: FoodSelectionsOrderBy!) {
    userByRowId(rowId: $userId) {
      ...UserJournalContainer_userByRowId,
      foodSelectionsByUserId(first: $count, orderBy: $orderBy) {
        edges {
          node {
            date,
          },
        },
      },
    }
  }
`;

export default UserJournalContainerQuery;
