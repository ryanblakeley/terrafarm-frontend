import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import {
  fromGlobalId,
  offsetToCursor,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import updateItem from '../api/updateItem';

import {UserType, UserEdge} from '../types/UserType';
import {LandType, LandEdge} from '../types/LandType';

const userEndpoint = getEndpoint(UserType);
const landEndpoint = getEndpoint(LandType);

export default mutationWithClientMutationId({
  name: 'LikeLand',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    landId: { type: new GraphQLNonNull(GraphQLID) },
  },
  /* eslint eqeqeq: 0 */
  outputFields: {
    landEdge: {
      type: LandEdge,
      resolve: async ({localUserId, localLandId}) => {
        const user = await getItem(userEndpoint, localUserId);
        const landPromises = user.lands_liked.map(g => getItem(landEndpoint, g.id));
        const landResults = await* landPromises;
        const offset = landResults.findIndex(g => g.id == localLandId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: landResults[offset],
        };
      },
    },
    userEdge: {
      type: UserEdge,
      resolve: async ({localLandId, localUserId}) => {
        const land = await getItem(landEndpoint, localLandId);
        const userPromises = land.liked_by.map(r => getItem(userEndpoint, r.id));
        const userResults = await* userPromises;
        const offset = userResults.findIndex(r => r.id == localUserId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: userResults[offset],
        };
      },
    },
    user: {
      type: UserType,
      resolve: async ({localUserId}) => await getItem(userEndpoint, localUserId),
    },
    land: {
      type: LandType,
      resolve: async ({localLandId}) => await getItem(landEndpoint, localLandId),
    },
  },
  mutateAndGetPayload: async ({userId, landId}) => {
    const localUserId = fromGlobalId(userId).id;
    const localLandId = fromGlobalId(landId).id;
    const user = await getItem(userEndpoint, localUserId);

    user.lands_liked.push({id: localLandId});

    return await updateItem(userEndpoint, localUserId, {
      lands_liked: user.lands_liked,
    }).then(() => {
      return { localUserId, localLandId };
    });
  },
});
