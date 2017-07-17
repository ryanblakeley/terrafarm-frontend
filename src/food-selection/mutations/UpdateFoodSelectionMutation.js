import Relay from 'react-relay';

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
          foodId,
          mass,
        },
      }
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
