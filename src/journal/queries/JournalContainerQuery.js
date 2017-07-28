import { graphql } from 'react-relay';

const JournalContainerQuery = graphql`
  query JournalContainerQuery($userId: Uuid!) {
    userByRowId(rowId: $userId) {
      ...JournalContainer_userByRowId,
    }
  }
`;

export default JournalContainerQuery;
