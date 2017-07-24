import { graphql } from 'react-relay';

const UserJournalContainerQuery = graphql`
  query UserJournalContainerQuery($userId: Uuid!, $count: Int!, $orderBy: FoodSelectionsOrderBy!) {
    userByRowId(rowId: $userId) {
      ...UserJournalContainer_userByRowId,
    }
  }
`;

export default UserJournalContainerQuery;
