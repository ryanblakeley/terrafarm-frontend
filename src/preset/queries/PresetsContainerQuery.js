import { graphql } from 'react-relay';

const PresetsContainerQuery = graphql`
  query PresetsContainerQuery {
    currentPerson {
      ...PresetsContainer_currentPerson,
    }
  }
`;

export default PresetsContainerQuery;
