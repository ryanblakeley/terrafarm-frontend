import { graphql } from 'react-relay';

const JournalContainerQuery = graphql`
  query JournalContainerQuery($userId: Uuid!, $count: Int!, $orderBy: FoodSelectionsOrderBy!) {
    userByRowId(rowId: $userId) {
      ...JournalContainer_userByRowId,
    }
  }
`;

export default JournalContainerQuery;
