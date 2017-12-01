import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation UpdateFoodSelectionMutation(
    $input: UpdateFoodSelectionInput!
  ) {
    updateFoodSelection(input: $input) {
      foodSelection {
        foodDescription
        foodId
        foodByFoodId {
          rowId
          description
          calories
          protein
          fat
          carbs
        }
        mass
        occurredOn
        measureWeightAmount
        measureWeightUnit
        measureWeightUnitId
        unitOfMeasureByMeasureWeightUnitId {
          category
          siFactor
        }
        measureVolumeAmount
        measureVolumeUnit
        measureCommonAmount
        measureCommonUnit
      }
    }
  }
`;

function sharedUpdater (store, query, foodSelection) { // eslint-disable-line no-unused-vars
  const queryProxy = store.get(query.id);
  // const foodSelectionProxy = store.get(foodSelection.id);
  const connectionKeys = [
    'JournalDateContainer_foodSelectionsByDate',
  ];

  connectionKeys.forEach(c => {
    const connection = ConnectionHandler.getConnection(queryProxy, c);

    if (connection) {
      const payload = store.getRootField('updateFoodSelection');
      const updatedFoodSelection = payload.getLinkedRecord('foodSelection');
      ConnectionHandler.update(store, updatedFoodSelection);
    }
  });
}

function commit (environment, query, foodSelection, patch, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id: foodSelection.id,
        foodSelectionPatch: patch,
      },
    },
    updater: (store) => {
      sharedUpdater(store, query, foodSelection);
    },
    optimisticUpdater () {
      return {
        updateFoodSelection: {
          foodSelection: Object.assign({}, foodSelection, patch),
        },
      };
    },
    onCompleted,
    onError,
  });
}

export default { commit };
