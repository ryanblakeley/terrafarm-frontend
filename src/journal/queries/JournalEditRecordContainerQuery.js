import { graphql } from 'react-relay';

const JournalEditRecordContainerQuery = graphql`
  query JournalEditRecordContainerQuery($userId: UUID!, $foodSelectionId: UUID!) {
    userByRowId(rowId: $userId) {
      ...JournalEditRecordContainer_userByRowId,
    },
    foodSelectionByRowId(rowId: $foodSelectionId) {
      ...JournalEditRecordContainer_foodSelectionByRowId,
    }
  }
`;

export default JournalEditRecordContainerQuery;
