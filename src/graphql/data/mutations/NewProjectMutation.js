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

import {UserType} from '../types/UserType';
import {ProjectType, ProjectEdge} from '../types/ProjectType';
import MasterType from '../types/MasterType';

const projectEndpoint = getEndpoint(ProjectType);
const masterEndpoint = getEndpoint(MasterType);
const userEndpoint = getEndpoint(UserType);

export default mutationWithClientMutationId({
  name: 'NewProject',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
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
  },
  mutateAndGetPayload: async ({userId, name, description, category, image}) => {
    const localUserId = fromGlobalId(userId).id;

    return await createItem(projectEndpoint, {
      name,
      description,
      category,
      image,
      admins: [{id: localUserId}],
      resources: [],
      tasks: [],
      masters: [{id: 1}],
    }).then(result => {
      return {
        localProjectId: result.id,
        localUserId,
      };
    });
  },
});

