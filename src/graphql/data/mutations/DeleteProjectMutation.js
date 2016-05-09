import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import deleteItem from '../api/deleteItem';

import {ProjectType} from '../types/ProjectType';
import MasterType from '../types/MasterType';

const projectEndpoint = getEndpoint(ProjectType);
const masterEndpoint = getEndpoint(MasterType);

export default mutationWithClientMutationId({
  name: 'DeleteProject',
  inputFields: {
    projectId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedProjectID: {
      type: GraphQLID,
      resolve: ({projectId}) => projectId,
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(masterEndpoint, 1),
    },
  },
  /* eslint eqeqeq: 0 */
  mutateAndGetPayload: async ({projectId}) => {
    const localProjectId = fromGlobalId(projectId).id;

    return await deleteItem(projectEndpoint, localProjectId).then(() => {
      return { projectId };
    });
  },
});
