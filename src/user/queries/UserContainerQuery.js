import { graphql } from 'react-relay';

const UserContainerQuery = graphql`
  query UserContainerQuery($userId: UUID!) {
    userByRowId(rowId: $userId) {
      ...UserContainer_userByRowId,
    }
  }
`;

export default UserContainerQuery;
