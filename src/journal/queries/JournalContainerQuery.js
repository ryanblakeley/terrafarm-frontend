import { graphql } from 'react-relay';

const JournalContainerQuery = graphql`
  query JournalContainerQuery {
    currentPerson {
      ...JournalContainer_currentPerson,
    }
  }
`;

export default JournalContainerQuery;
