import { commitMutation, graphql } from 'react-relay';

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
        unitAmount
        unitDescription
        unitOfMeasureId
        unitOfMeasureByUnitOfMeasureId {
          category
          siFactor
        }
        date
        time
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
