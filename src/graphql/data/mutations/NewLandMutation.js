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
import {LandType, LandEdge} from '../types/LandType';
import MasterType from '../types/MasterType';

const landEndpoint = getEndpoint(LandType);
const masterEndpoint = getEndpoint(MasterType);
const userEndpoint = getEndpoint(UserType);

export default mutationWithClientMutationId({
  name: 'NewLand',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
  },
  /* eslint eqeqeq: 0 */
  outputFields: {
    landEdge: {
      type: LandEdge,
      resolve: async ({localLandId}) => {
        const master = await getItem(masterEndpoint, 1);
        const landPromises = master.lands.map(r => getItem(landEndpoint, r.id));
        const landResults = await* landPromises;
        const offset = landResults.findIndex(r => r.id == localLandId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: landResults[offset],
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

    return await createItem(landEndpoint, {
      name,
      description,
      category,
      image,
      admins: [{id: localUserId}],
      resources: [],
      masters: [{id: 1}],
    }).then(result => {
      return {
        localLandId: result.id,
        localUserId,
      };
    });
  },
});

