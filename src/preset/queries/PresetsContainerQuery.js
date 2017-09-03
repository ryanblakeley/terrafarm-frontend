import { graphql } from 'react-relay';

const PresetsContainerQuery = graphql`
  query PresetsContainerQuery($userId: UUID!) {
    userByRowId(rowId: $userId) {
      ...PresetsContainer_userByRowId,
    }
  }
`;

export default PresetsContainerQuery;
