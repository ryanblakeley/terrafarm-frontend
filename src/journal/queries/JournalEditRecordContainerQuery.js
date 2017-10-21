import { graphql } from 'react-relay';

const JournalEditRecordContainerQuery = graphql`
  query JournalEditRecordContainerQuery($foodSelectionId: UUID!) {
    currentPerson {
      ...JournalEditRecordContainer_currentPerson,
    },
    foodSelectionByRowId(rowId: $foodSelectionId) {
      ...JournalEditRecordContainer_foodSelectionByRowId,
    }
  }
`;

export default JournalEditRecordContainerQuery;
