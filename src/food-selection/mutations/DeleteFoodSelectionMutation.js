import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation DeleteFoodSelectionMutation(
    $input: DeleteFoodSelectionInput!
  ) {
    deleteFoodSelection(input: $input) {
      foodSelection {
        id
      }
      userByUserId {
        id
        foodSelectionsByUserId {
          edges {
            node {
              id
            }
          }
        }
      }
      deletedFoodSelectionId
    }
  }
`;

// TODO: fix this because it doesn't actually update the client cache
function sharedUpdater (store, user, deletedId) {
  const userProxy = store.get(user.id);
  const connectionKeys = [
    'JournalDateContainer_foodSelectionsByUserId',
  ];

  connectionKeys.forEach(c => {
    const connection = ConnectionHandler.getConnection(userProxy, c);

    if (connection) {
      ConnectionHandler.deleteNode(
        connection,
        deletedId,
      );
    }
  });
}

function commit (environment, user, foodSelection, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { id: foodSelection.id },
    },

    updater: (store) => {
      // const payload = store.getRootField('deleteFoodSelection');
      // payload.getValue('deletedFoodSelectionId'); // getting null :/
      sharedUpdater(store, user, foodSelection.id);
    },
/*
    optimisticUpdater: (store) => {
      sharedUpdater(store, user, foodSelection.id);
    },
*/
    onCompleted,
    onError,
  });
}

export default { commit };

/*
const getConfigs = (user) => ([
  {
    type: 'NODE_DELETE',
    deletedIDFieldName: 'deletedFoodSelectionId',
  },
  {
    type: 'RANGE_DELETE',
    parentID: user.id,
    connectionKeys: [
      {
        key: 'JournalContainer_foodSelectionsByUserId',
        rangeBehavior: 'append',
      },
      {
        key: 'JournalDateContainer_foodSelectionsByUserId',
        rangeBehavior: '',
      },
    ],
    pathToConnection: ['userByUserId', 'foodSelectionsByUserId'],
    deletedIDFieldName: 'deletedFoodSelectionId',
  },
]);
*/
