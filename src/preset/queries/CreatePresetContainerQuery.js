import { graphql } from 'react-relay';

const CreatePresetContainerQuery = graphql`
  query CreatePresetContainerQuery {
    currentPerson {
      ...CreatePresetContainer_currentPerson,
    }
  }
`;

export default CreatePresetContainerQuery;

