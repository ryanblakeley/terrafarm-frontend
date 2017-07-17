import Relay from 'react-relay';

export default class DeleteFoodSelectionMutation extends Relay.Mutation {
  static fragments = {
    foodSelection: () => Relay.QL`
      fragment on FoodSelection {
        id,
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
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
        query {
          allFoodSelections,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'query',
        parentID: this.props.query.id,
        connectionName: 'allFoodSelections',
        deletedIDFieldName: 'deletedFoodSelectionId',
      },
    ];
  }
}
