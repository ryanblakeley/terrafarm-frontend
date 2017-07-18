import Relay from 'react-relay';

export default class DeleteFoodSelectionMutation extends Relay.Mutation {
  static fragments = {
    foodSelection: () => Relay.QL`
      fragment on FoodSelection {
        id,
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteFoodSelection}`;
  }
  getVariables () {
    return {
      id: this.props.foodSelection.id,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteFoodSelectionPayload {
        deletedFoodSelectionId,
        foodSelection,
        user {
          foodSelectionsByUserId,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'foodSelectionsByUserId',
        deletedIDFieldName: 'deletedFoodSelectionId',
      },
    ];
  }
}
