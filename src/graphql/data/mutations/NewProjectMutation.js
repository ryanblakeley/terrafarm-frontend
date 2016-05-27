import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

import {
  fromGlobalId,
  offsetToCursor,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import createItem from '../api/createItem';

import {LandType} from '../types/LandType';
import {UserType} from '../types/UserType';
import {ProjectType, ProjectEdge} from '../types/ProjectType';
import MasterType from '../types/MasterType';

const projectEndpoint = getEndpoint(ProjectType);
const masterEndpoint = getEndpoint(MasterType);
const landEndpoint = getEndpoint(LandType);
const userEndpoint = getEndpoint(UserType);

export default mutationWithClientMutationId({
  name: 'NewProject',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    landId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
  },
  /* eslint eqeqeq: 0 */
  outputFields: {
    projectEdge: {
      type: ProjectEdge,
      resolve: async ({localProjectId}) => {
        const master = await getItem(masterEndpoint, 1);
        const projectPromises = master.projects.map(r => getItem(projectEndpoint, r.id));
        const projectResults = await* projectPromises;
        const offset = projectResults.findIndex(r => r.id == localProjectId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: projectResults[offset],
        };
      },
    },
    user: {
      type: UserType,
      resolve: async ({localUserId}) => await getItem(userEndpoint, localUserId),
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(masterEndpoint, 1),
    },
    land: {
      type: LandType,
      resolve: async ({localLandId}) => await getItem(landEndpoint, localLandId),
    },
  },
  mutateAndGetPayload: async ({userId, landId, name, description, category}) => {
    const localUserId = fromGlobalId(userId).id;
    const localLandId = fromGlobalId(landId).id;

    return await createItem(projectEndpoint, {
      name,
      description,
      category,
      admins: [{id: localUserId}],
      liked_by: [{id: localUserId}],
      lands: [{id: localLandId}],
      tasks: [],
      resources: [],
      resources_pending: [],
      masters: [{id: 1}],
    }).then(result => {
      return {
        localProjectId: result.id,
        localUserId,
        localLandId,
      };
    });
  },
});

