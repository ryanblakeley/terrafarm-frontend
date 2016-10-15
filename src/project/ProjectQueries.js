import Relay from 'react-relay';

export default {
  project: () => Relay.QL`
    query { project(id: $projectId) }
  `,
  query: () => Relay.QL`query { query }`,
};
