import { graphql } from 'react-relay';

const JournalEditRecordContainerQuery = graphql`
  query JournalEditRecordContainerQuery($userId: Uuid!, $foodSelectionId: Uuid!) {
    userByRowId(rowId: $userId) {
      ...JournalEditRecordContainer_userByRowId,
    },
    foodSelectionByRowId(rowId: $foodSelectionId) {
      ...JournalEditRecordContainer_foodSelectionByRowId,
    }
  }
`;

export default JournalEditRecordContainerQuery;
