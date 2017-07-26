import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation UpdateFoodSelectionMutation(
    $input: UpdateFoodSelectionInput!
  ) {
    updateFoodSelection(input: $input) {
      foodSelection {
        foodDescription,
        foodId,
        foodByFoodId {
          rowId,
          calories,
          protein,
          fat,
          carbs,
        },
        foodIdSource,
        mass,
        massSource,
        unitQuantity,
        unitDescription,
        unitOfMeasureId,
        brandDescription,
        physicalDescription,
        date,
        time,
      }
    }
  }
`;

function commit (environment, foodSelection, patch, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        id: foodSelection.id,
        foodSelectionPatch: patch,
      },
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
