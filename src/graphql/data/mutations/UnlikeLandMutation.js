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
import updateItem from '../api/updateItem';

import {UserType} from '../types/UserType';
import {LandType} from '../types/LandType';

const userEndpoint = getEndpoint(UserType);
const landEndpoint = getEndpoint(LandType);

export default mutationWithClientMutationId({
  name: 'UnlikeLand',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    landId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedUserID: {
      type: GraphQLID,
      resolve: ({localUserId}) => localUserId,
    },
    removedLandID: {
      type: GraphQLID,
      resolve: ({localLandId}) => localLandId,
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
  /* eslint eqeqeq: 0 */
  mutateAndGetPayload: async ({userId, landId}) => {
    const localUserId = fromGlobalId(userId).id;
    const localLandId = fromGlobalId(landId).id;
    const user = await getItem(userEndpoint, localUserId);
    const landIndex = user.lands_liked.findIndex(g => g.id == localLandId);

    user.lands_liked.splice(landIndex, 1);

    return await updateItem(userEndpoint, localUserId, {
      lands_liked: user.lands_liked,
    }).then(() => {
      return { localUserId, localLandId };
    });
  },
});
