import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation CreateFoodSelectionMutation(
    $input: CreateFoodSelectionInput!
  ) {
    createFoodSelection(input: $input) {
      foodSelectionEdge {
        node {
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
  }
`;

function sharedUpdater (store, query, newEdge) {
  const queryProxy = store.get(query.id);
  // const foodSelectionProxy = store.get(foodSelection.id);
  const connectionKeys = [
    'JournalDateContainer_foodSelectionsByDate',
  ];

  connectionKeys.forEach(c => {
    const connection = ConnectionHandler.getConnection(queryProxy, c, {});

    console.log('Connection', connection);

    if (connection) {
      ConnectionHandler.insertEdgeAfter(connection, newEdge);
    }
  });
}

function commit (environment, query, data, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { foodSelection: data },
    },
    updater: (store) => {
      const payload = store.getRootField('createFoodSelection');
      const newEdge = payload.getLinkedRecord('foodSelectionEdge');

      // console.log('Payload:', payload);
      // console.log('New edge:', newEdge);

      sharedUpdater(store, query, newEdge);
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
