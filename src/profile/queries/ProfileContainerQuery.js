import { graphql } from 'react-relay';

const ProfileContainerQuery = graphql`
  query ProfileContainerQuery {
    currentPerson {
      ...ProfileContainer_currentPerson,
    }
  }
`;

export default ProfileContainerQuery;
