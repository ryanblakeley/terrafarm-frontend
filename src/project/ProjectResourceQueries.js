import Relay from 'react-relay';

export default {
  projectResource: () => Relay.QL`
    query {
      projectResource(id: $projectResourceId)
    }
  `,
  currentPerson: () => Relay.QL`
    query { currentPerson }
  `,
};
