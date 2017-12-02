import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

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

function sharedUpdater (store, user, preset) { // eslint-disable-line no-unused-vars
  const userProxy = store.get(user.id);
  const connectionKeys = [
    'PresetsContainer_presetsByUserId',
  ];

  connectionKeys.forEach(c => {
    const connection = ConnectionHandler.getConnection(userProxy, c);

    if (connection) {
      const payload = store.getRootField('updatePreset');
      const updatedPreset = payload.getLinkedRecord('preset');
      ConnectionHandler.update(store, updatedPreset);
    }
  });
}

function commit (environment, user, preset, patch, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id: preset.id,
        presetPatch: patch,
      },
    },
    updater: (store) => {
      sharedUpdater(store, user, preset);
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
