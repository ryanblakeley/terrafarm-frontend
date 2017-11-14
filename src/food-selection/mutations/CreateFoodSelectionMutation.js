import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation CreateFoodSelectionMutation(
    $input: CreateFoodSelectionInput!
  ) {
    createFoodSelection(input: $input) {
      foodSelection {
        rowId
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

function sharedUpdater (store, user) {
  const userProxy = store.get(user.id);
  const connectionKeys = [
    'JournalDateContainer_foodSelectionsByUserId',
  ];

  connectionKeys.forEach(c => {
    const connection = ConnectionHandler.getConnection(userProxy, c);

    if (connection) {
      const payload = store.getRootField('createFoodSelection');
      const newFoodSelection = payload.getLinkedRecord('foodSelection');
      const newEdge = ConnectionHandler.createEdge(
        store,
        connection,
        newFoodSelection,
        'FoodSelectionEdge',
      );
      ConnectionHandler.insertEdgeBefore(connection, newEdge);
    }
  });
}

function commit (environment, user, data, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { foodSelection: data },
    },
    updater: (store) => {
      sharedUpdater(store, user);
    },
    optimisticCreater () {
      return {
        createFoodSelection: {
          foodSelection: data,
        },
      };
    },
    onCompleted,
    onError,
  });
}

export default { commit };
