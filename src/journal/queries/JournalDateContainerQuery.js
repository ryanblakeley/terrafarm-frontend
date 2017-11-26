import { graphql } from 'react-relay';

const JournalDateContainerQuery = graphql`
  query JournalDateContainerQuery ($userId: UUID!, $date: Date!) {
    query {
      ...JournalDateContainer_query,
    }
  }
`;

export default JournalDateContainerQuery;

