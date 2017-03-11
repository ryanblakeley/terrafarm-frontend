import Relay from 'react-relay';

export default {
  currentPerson: () => Relay.QL`
    query { currentPerson }
  `,
  query: () => Relay.QL`
    query { query }
  `,
};
