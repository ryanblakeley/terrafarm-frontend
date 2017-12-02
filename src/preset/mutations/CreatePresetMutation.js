import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation CreatePresetMutation(
    $input: CreatePresetInput!
  ) {
    createPreset(input: $input) {
      presetEdge {
        node {
          rowId
          name
          active
          presetSelectionsByPresetId(
            first: 2147483647
          ) {
            edges {
              node {
                foodSelectionBySelectionId {
                  rowId
                  foodDescription
                  mass
                  foodId
                  foodByFoodId {
                    rowId
                    calories
                    protein
                    fat
                    carbs
                  }
                  measureWeightAmount,
                  measureWeightUnit,
                  measureVolumeAmount,
                  measureVolumeUnit,
                  measureCommonAmount,
                  measureCommonUnit,
                  unitOfMeasureByMeasureWeightUnitId {
                    category
                    siFactor
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function sharedUpdater (store, user, newEdge) {
  const userProxy = store.get(user.id);
  const connectionKeys = [
    'PresetsContainer_presetsByUserId',
  ];

  connectionKeys.forEach(c => {
    const connection = ConnectionHandler.getConnection(userProxy, c, {});

    if (connection) {
      ConnectionHandler.insertEdgeBefore(connection, newEdge);
    }
  });
}

function commit (environment, user, data, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { preset: data },
    },
    updater: (store) => {
      const payload = store.getRootField('createPreset');
      const newEdge = payload.getLinkedRecord('presetEdge');

      sharedUpdater(store, user, newEdge);
    },
    optimisticCreater () {
      return {
        createPreset: {
          preset: data,
        },
      };
    },
    onCompleted,
    onError,
  });
}

export default { commit };
