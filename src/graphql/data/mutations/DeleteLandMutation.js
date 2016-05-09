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

import {LandType} from '../types/LandType';
import MasterType from '../types/MasterType';
import {UserType} from '../types/UserType';

const landEndpoint = getEndpoint(LandType);
const masterEndpoint = getEndpoint(MasterType);
const userEndpoint = getEndpoint(UserType);

export default mutationWithClientMutationId({
  name: 'DeleteLand',
  inputFields: {
    landId: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedLandID: {
      type: GraphQLID,
      resolve: ({landId}) => landId,
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(masterEndpoint, 1),
    },
    user: {
      type: UserType,
      resolve: async ({localUserId}) => await getItem(userEndpoint, localUserId),
    },
  },
  /* eslint eqeqeq: 0 */
  mutateAndGetPayload: async ({landId, userId}) => {
    const localLandId = fromGlobalId(landId).id;
    const localUserId = fromGlobalId(userId).id;

    return await deleteItem(landEndpoint, localLandId).then(() => {
      return { localUserId, landId };
    });
  },
});
