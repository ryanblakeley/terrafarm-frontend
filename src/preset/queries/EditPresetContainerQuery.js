import { graphql } from 'react-relay';

const EditPresetContainerQuery = graphql`
  query EditPresetContainerQuery($presetId: UUID!) {
    currentPerson {
      ...EditPresetContainer_currentPerson,
    },
    presetByRowId(rowId: $presetId) {
      ...EditPresetContainer_presetByRowId
    }
  }
`;

export default EditPresetContainerQuery;
