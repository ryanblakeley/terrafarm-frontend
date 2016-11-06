import Relay from 'react-relay';

export default {
  taskResource: () => Relay.QL`
    query {
      taskResource(id: $taskResourceId)
    }
  `,
  currentPerson: () => Relay.QL`
    query { currentPerson }
  `,
};
