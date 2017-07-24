import { graphql } from 'react-relay';

// TODO ...JournalDateContainer_foodSelection,

const UserJournalContainerQuery = graphql`
  query UserJournalContainerQuery($userId: Uuid!, $count: Int!, $orderBy: FoodSelectionsOrderBy!) {
    userByRowId(rowId: $userId) {
      ...UserJournalContainer_userByRowId,
    }
  }
`;

export default UserJournalContainerQuery;
