import { graphql } from 'react-relay';

const UpdateFoodSelectionMutation = graphql`
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
        unitOfMeasureByUnitOfMeasureId {
          fullName,
        },
        date,
      }
    }
  }
`;

export default UpdateFoodSelectionMutation;

/*
export default class UpdateFoodSelectionMutation extends Relay.Mutation {
  static fragments = {
    foodSelection: () => Relay.QL`
      fragment on FoodSelection {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateFoodSelection}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateFoodSelectionPayload {
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
          unitOfMeasureByUnitOfMeasureId {
            fullName,
          },
          date,
        },
      },
    `;
  }
  getOptimisticResponse () {
    const {foodSelectionPatch} = this.props;

    return {
      foodSelection: {...foodSelectionPatch},
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          foodSelection: this.props.foodSelection.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.foodSelection.id,
      foodSelectionPatch: this.props.foodSelectionPatch,
    };
  }
}
*/
