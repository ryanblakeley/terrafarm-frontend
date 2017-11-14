import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation UpdatePresetMutation(
    $input: UpdatePresetInput!
  ) {
    updatePreset(input: $input) {
      preset {
        name
        active
      }
    }
  }
`;

function commit (environment, preset, patch, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id: preset.id,
        presetPatch: patch,
      },
    },
    optimisticUpdater () {
      return {
        updatePreset: {
          preset: Object.assign({}, preset, patch),
        },
      };
    },
    onCompleted,
    onError,
  });
}

export default { commit };
